import { createContext, useContext, useEffect, useRef, useState } from "react"
import { api } from "../request/Api";
import { useUtils } from "./UtilsProvider";
import { v4 as uuidv4 } from "uuid";
import { STATUS } from "../contents/Products";
import { useAuth } from "./AuthProvider";
import { ParseError } from "../utils/ParseError";
import { OrderPriceChangeAlert } from "../components/OrderPriceChangeAlert";
import { DISCOUNT_TYPE } from "../contents/Discounts";

const Context = createContext();
export const useOrder = () => useContext(Context);

export const OrderProvider = ({children}) =>{
    const { user } = useAuth();
    const { toast, setLoading, paymentUtils } = useUtils();

    const [order, setOrder] = useState();
    const [orders, setOrders] = useState([]);
    const [preference, setPreference] = useState('dine-in');
    const [duplicateProduct, setDuplicateProduct] = useState({product: null, cartItems: []});
    const [subTotal, setSubTotal] = useState(0);
    const [discountTotal, setDiscountTotal] = useState(0);
    const [total, setTotal] = useState(0);

    const service = {
        type: preference,
        dineIn: ()=>setPreference('dine-in'),
        toGo: ()=>setPreference('to-go'),
        delivery: ()=>setPreference('delivery'),
    }

    const handleError = (item, error) =>{
        setOrders(prevOrders=>prevOrders.map((prod)=>{
            if(prod.id === item.id){
                prod.error = new ParseError(error).message();
                return prod;
            }
            return prod;
        }));
    }

    const saveOrder = (data, success, final) =>{
        api.order.set({
            id: order.id,
            ...order.attributes,
            createdById: user.id,
            preference: preference,
            ...data,
        }).then((response)=>{
            success?.(response.data.data[0]);
        }).catch((error)=>{
            toast.error(error);
        }).finally(()=>{
            final?.();
        });
    }

    const saveAndClearOrder = (data, success, final) =>{
        saveOrder(data, (record)=>{
            setOrder(null);
            setOrders([]);
            success?.(record);
        }, ()=>final?.());
    }

    const newOrder = async(item) =>{
        try{
            const response = await api.order.set({
                status: STATUS.pending, 
                createdById: user.id,
                preference: preference,
                tableNumber: null,
                note: null,
            });
            const record = response.data.data[0];
            setOrder(record);
            return record.id;
        }catch(error){
            handleError(item, error);
            return {error};
        }
    }

    const save = async(item, option={}, success, final) =>{
        const orderId = order ? order.id : await newOrder(item);
        if(orderId?.error){
            toast.error(orderId.error);
            return final?.();
        }

        item.error = null;
        const productId = item.type.includes('discount')
            ? null 
            : item.id;
        
        //this may have property associated with either discount or product
        const data = {
            id: item.itemId,
            discountId: item.id,
            orderId: orderId,
            amount: item.attributes.amount,
            type: item.attributes.type,
            note: item?.note || null,
            productId: productId,
            price: item.attributes.price,
            quantity: item?.quantity || null,
            ...option
        }

        const method = item.type.includes('discount')
            ? ()=>api.order.setDiscountToCart(data)
            : ()=>api.order.setToCart(data);

        method().then((response)=>{
            success?.(response.data.data[0]);
        }).catch((error)=>{
            toast.error(error);
            handleError(item, error);
        }).finally(()=>final?.());
    }

    const findMatches = (item) =>{
        const sameProducts = orders.filter((p)=>p.id === item.id);
        if(!sameProducts.length){
            return false;
        }
        let priceDifferences = sameProducts.filter((p)=>item.attributes.price !== p.attributes.price);
        if(priceDifferences.length){
            setDuplicateProduct({product: item, cartItems: sameProducts});
            return {hasPriceDifference: true};
        }
        //if am here there will be only one product. if there is multipel then there will be price difference.
        return sameProducts[0];
    }

    const addProduct = (item) =>{
        //new incomming product
        let found = findMatches(item);
        if(found.hasPriceDifference) return;
        if(found){
            return updateQantity(found, found.quantity +1);
        }
        item.quantity = 1;
        item.itemId = uuidv4();
        setOrders(prevOrders=>[item, ...prevOrders]);
        save(item);
    }

    const overrideProduct = (item, cartItem, final) =>{
        //new incomming product and product from cart to be targeted.
        item.itemId = uuidv4();
        item.quantity = cartItem.quantity +1;
        setOrders(previousOrder=>previousOrder.map((product)=>{
            if(product.itemId === cartItem.itemId) return item;
            return product;
        }));
        save(cartItem, {hide: true});
        save(item, {}, null, final);
    }

    const addAsNewProduct = (item, final) =>{
        if(!orders.filter((p)=>p.id === item.id)){
            return console.error('This method should only be use if there is an existing item in the cart with the same id.');
        }
        item.itemId = uuidv4();
        item.quantity = 1;
        setOrders(prevOrders=>[item, ...prevOrders]);
        save(item, {}, null, final);
    }

    const addNote = (item, note) =>{
        item.note = note;
        setOrders(prevOrders=>prevOrders.map((prod)=>{
            if(item.itemId === prod.itemId) return item;
            return prod;
        }));
        save(item);
    }

    const resubmitProduct = (product, final) =>{
        save(product, {}, null, final);
    }

    const deleteProduct = (item, success, final) =>{
        save(item, {hide: true}, ()=>{
            success?.(()=>setOrders(prevOrders=>prevOrders.filter((p)=>p.itemId !== item.itemId)));
        }, final);
    }

    const updateQantity = (item, quantity) =>{
        item.quantity = parseInt(quantity);
        setOrders(previousOrder=>previousOrder.map((product)=>{
            if(product.itemId === item.itemId) return item;
            return product;
        }));
        save(item);
    }
    
    const applyDiscount = (promotion) => {
        if (!Array.isArray(promotion)) promotion = [promotion];
        promotion.map((promo)=>({...promo, itemId: uuidv4()}));
        setOrders((currentOrders) => {
            const existingIds = new Set(currentOrders.map(item => item.id));
            const newItems = promotion.filter(item => !existingIds.has(item.id));
            return [...newItems, ...currentOrders];
        });
        promotion.map((promo)=>save(promo));
    }

    const placeOrderOnHold = (data, success, final) =>{
        saveAndClearOrder({status: STATUS.hold, ...data}, (record)=>{
            success?.(record);
        }, ()=>final?.());
    }

    const sendToKitchen = (data, success, final) =>{
        setLoading(true);
        saveAndClearOrder({status: STATUS.kitchen, ...data}, (record)=>{
            success?.(record);
        }, ()=>{
            final?.();
            setLoading(false);
        });
    }

    const updateOrder = (data, success, final) =>{
        saveOrder(data, success, final);
    }

    const processPayment = (data={}, success, final) =>{
        api.payment.create({orderId: order.id, ...data}).then((response)=>{
            setOrder(null);
            setOrders([]);
            paymentUtils.hide();
            success?.(response.data.data[0]);
        }).catch((error)=>{
            toast.error(error);
        }).finally(()=>final?.());
    }

    const mountOrder = (data) =>{
        api.order.list(data).then((response)=>{
            if(response.data.data[0].attributes.status === STATUS.paid){
                return toast.error('You cannot mount a paid order.');
            }
            setOrder(response.data.data[0]);
            const products = response.data.data[0].attributes.products.map((prod)=>{
                let product = prod.attributes.product;
                product.itemId = prod.id;
                product.attributes.price = prod.attributes.price;
                product.note = prod.attributes.note || '';
                product.quantity = parseInt(prod.attributes.quantity);
                return product;
            });
            const discounts = response.data.data[0].attributes.discounts.map((disc)=>{
                let discount = disc.attributes.discount;
                discount.itemId = disc.id;
                discount.attributes.amount = disc.attributes.amount;
                discount.note = disc.attributes.note || '';
                return discount;
            });
            setOrders([...products, ...discounts]);
        }).catch((error)=>{
            console.log(error)
        });
    }

    const values = {
        service,
        order,
        orders,
        total,
        subTotal,
        discountTotal,
        addNote,
        addProduct,
        updateQantity,
        deleteProduct,
        resubmitProduct,
        overrideProduct,
        addAsNewProduct,
        applyDiscount,
        placeOrderOnHold,
        sendToKitchen,
        processPayment,
        updateOrder,
        mountOrder
    }
    
    useEffect(()=>{
        const productItems = orders.filter(o => o.type === 'product');
        const discountItems = orders.filter(o => o.type.includes('discount'));

        const productMap = {};
        let calculatedSubtotal = 0;

        // Build subtotal and product map
        for (const item of productItems) {
            const { id, attributes: { price = 0 }, quantity = 1 } = item;
            const lineTotal = price * (quantity || 1);
            productMap[id] = { price, quantity, total: lineTotal };
            calculatedSubtotal += lineTotal;
        }

        let calculatedDiscount = 0;

        for (const discount of discountItems) {
            const { amount = 0, type, productId, hide } = discount.attributes;
            if (hide) continue;

            if (productId && productMap[productId]) {
                const target = productMap[productId];
                const lineTotal = target.total;

                if (type === DISCOUNT_TYPE.percentage) {
                    calculatedDiscount += (amount / 100) * lineTotal;
                } else if (type === DISCOUNT_TYPE.fixedAmount) {
                    calculatedDiscount += Math.min(amount, lineTotal);
                }
            } else {
                // Order-level discount
                if (type === DISCOUNT_TYPE.percentage) {
                    calculatedDiscount += calculatedSubtotal > 0
                        ? (amount / 100) * calculatedSubtotal
                        : 0;
                } else if (type === DISCOUNT_TYPE.fixedAmount) {
                    calculatedDiscount += amount; // apply even if subtotal is 0
                }
            }
        }

        setSubTotal(calculatedSubtotal);
        setDiscountTotal(calculatedDiscount);
        setTotal(calculatedSubtotal - calculatedDiscount);
    }, [orders]);

    useEffect(()=>{
        if(!user) return;
        mountOrder({
            status: STATUS.pending, 
            createdById: user.id
        });
    }, [user]);

    return (
        <Context.Provider value={values}>
            {children}
            <OrderPriceChangeAlert
                product={duplicateProduct.product}
                cartItems={duplicateProduct.cartItems}
                show={duplicateProduct.cartItems.length}
                close={()=>setDuplicateProduct({product: null, cartItems: []})}
            />
        </Context.Provider>
    )
}