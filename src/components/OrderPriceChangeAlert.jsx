import { MdWarningAmber } from "react-icons/md";
import { useOrder } from "../providers/OrderProvider"
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Spinner } from "../widgets/Spinner";

export const OrderPriceChangeAlert = ({product, cartItems, show, close}) =>{
    const { overrideProduct, addAsNewProduct } = useOrder();

    const [loading, setLoading] = useState(false);

    const processOverrideProduct = (prod) =>{
        setLoading(true);
        overrideProduct(product, prod, ()=>{
            setLoading(false);
            typeof close === 'function' && close();
        });
    }

    const processAddAsNewProduct = () =>{
        setLoading(true);
        addAsNewProduct(product, ()=>{
            setLoading(false);
            typeof close === 'function' && close();
        });
    } 

    if(!show) return null;

    return(
        <div onClick={close} className="position-fixed top-0 start-0 w-100 vh-100 bg-dark bg-opacity-50" style={{zIndex: '99999999999999999999'}}>
            <div className="d-flex align-items-center justify-content-center w-100 h-100">
                <div className="bg-darker border border-lightly text-light rounded-4" onClick={e=>e.stopPropagation()}>
                    <div className="position-relative d-flex flex-column gap-2" style={{maxWidth: '500px'}}>
                        <button onClick={close} className="btn position-absolute top-0 end-0 mt-2 me-2 p-0 text-danger">
                            <IoMdClose className="fs-3"/>
                        </button>
                        <div className="p-3 p-sm-4">
                            <div className="d-flex align-items-center gap-2 text-orange mb-2">
                                <MdWarningAmber size={24} />
                                <strong>Price Change Notice</strong>
                            </div>

                            <div>The following item{cartItems.length > 1 ? 's have' : ' has'} changed in price since being placed on hold.</div>
                            <div className="mb-3">Please review and choose what you'd like to do:</div>
                            <button onClick={processAddAsNewProduct} className="btn btn-sm btn-orange">Add as New Item (Keep Previous)</button>
                        </div>

                        <hr className="m-0"></hr>

                        <div className="position-relative overflow-auto scrollbar-md p-3 p-sm-4 pt-0" style={{maxHeight: '60vh'}}>
                            {cartItems.map((prod, index) => (
                                <div className="d-flex flex-column gap-2 mb-3" key={`price-change-${prod.id}-${index}`}>
                                    <div><strong>{prod.attributes.name}</strong></div>
                                    <div className="mb-2">
                                        This item was previously on hold at 
                                        <strong>${prod.attributes.price}</strong>. The new price is now 
                                        <strong>${product.attributes.price}</strong>.
                                    </div>
                                    <button
                                        onClick={()=>processOverrideProduct(prod)}
                                        className="btn btn-sm btn-danger w-100 w-md-auto"
                                    >Update Quantity and Accept New Price</button>
                                    <small className="text-danger d-block">* Updating will remove any discounted price previously applied.</small>
                                    {index !== cartItems.length - 1 && <hr className="my-2" />}
                                </div>
                            ))}
                        </div>
                        <Spinner show={loading} sm inline />
                    </div>
                </div>
            </div>
        </div>
    )
}