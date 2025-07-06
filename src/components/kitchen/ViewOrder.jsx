import { useNavigate, useParams } from "react-router-dom"
import { utils } from "../../utils/Utils"
import { useEffect, useState } from "react";
import { api } from "../../request/Api";
import { Spinner } from "../../widgets/Spinner";
import { FaBoxOpen, FaConciergeBell, FaSearchMinus } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import { useOrder } from "../../providers/OrderProvider";
import { useUtils } from "../../providers/UtilsProvider";

export const ViewOrder = () =>{
    const { mountOrder } = useOrder();
    const { toast } = useUtils();

    const [order, setOrder] = useState();
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const params = useParams();

    const defaultImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv--1V2lC_lbBYKLohiCq4-_4UAe3pn0tTKA&s";

    const modifyOrder = () =>{
        mountOrder({id: order.id});
        navigate('/home/');
    }
    
    const deleteOrder = () =>{
        setLoading(true);
        api.order.set({
            id: order.id, 
            ...order.attributes, 
            hide: true
        }).then(()=>{
            navigate('/kitchen/all');
        }).catch((error)=>{
            toast.error(error);
        }).finally(()=>{
            setLoading(false);
        });
    }

    useEffect(()=>{
        if(!params.orderId) return;
        api.order.list({id: params.orderId}).then((response)=>{
            setOrder(response.data.data[0]);
        }).catch((error)=>{

        }).finally(()=>{
            setLoading(false);
        });
    }, [params]);

    if(loading){
        return(
            <div className="position-relative w-100 h-100">
                <Spinner show inline transparent sm />
            </div>
        )
    }

    if(!order){
        return(
            <div className="position-relative d-flex align-items-center justify-content-center w-100 h-100">
                <div className="text-center py-5">
                    <div className="mb-3"><FaSearchMinus size={48}/></div>
                    <h4>Order Not Found</h4>
                    <p>We couldn’t find any order matching your search or selection. Please check the order number or try again.</p>
                </div>
            </div>
        )
    }

    return(
        <div className="w-100 h-100 position-relative">
            <div className="d-flex align-items-center gap-2 mb-4">
                    <button onClick={()=>navigate(-1)} className="btn btn-sm text-light border-0">
                        <IoArrowBack size={25} />
                    </button>
                <FaConciergeBell size={40} />
                <h4 className="mb-0">Kitchen Orders</h4>
            </div>
            <div className="d-flex flex-lg-row flex-column gap-4 mb-4">
                <img className="rounded-4" src={defaultImage} alt="" style={{width: '200px', height: '200px'}} />
                <div className="flex-fill border border-lightly rounded-4 p-3">
                    <div className="text-break fw-bold mb-2">{order.attributes.preference}</div>
                    <div className="text-break">Table NO: {order.attributes.tableNumber}</div>
                    <div className="text-break my-1">{utils.date.toLocalDateTime(order.attributes.created)}</div>
                    <div className="text-start small text-secondary my-3">Agent: {order.attributes.user.attributes.fullName}</div>
                    <div className="bg-secondary bg-opacity-10 text-break rounded-3 p-2">{order.attributes.note}</div>
                    <div className="d-flex align-items-center justify-content-end gap-2 mt-4">
                        <button onClick={modifyOrder} className="btn border border-lightly text-light">Add Item</button>
                        <button onClick={deleteOrder} className="btn border border-lightly text-danger">Delete Order</button>
                    </div>
                </div>
            </div>
            <div className="d-flex flex-wrap w-100">
                {
                    order.length?
                    order.attributes.products.map((product, key)=>(
                        <div className="col-12 col-sm-6 col-xl-4 col-xxl-3 p-2" key={`${product.id}-${key}`}>
                            <div className="bg-secondary bg-opacity-10 text-light border border-lightly rounded-4 p-3 border border-danger h-100">
                                <div className="fw-bold text-center border-bottom border-lightly pb-1">{product.attributes.product.attributes.category}</div>
                                <div className="d-flex gap-3 my-2">
                                    <img className="rounded-3" src={defaultImage} alt="" style={{width: '50px', height: '50px'}} />
                                    <div className="fw-semibold mb-2">{product.attributes.product.attributes.name}</div>
                                </div>
                                <div className="my-3">
                                    <div className="small text-secondary">Description:</div>
                                    <div className="small">{product.attributes.product.attributes.description}</div>
                                </div>
                                <div className="bg-secondary bg-opacity-25 rounded-2 p-2 mb-3">
                                    <div className="small">Note:</div>
                                    {!!product.attributes.note ? <div>{product.attributes.note}</div> : <div>None</div>}
                                </div>
                                <div className="fs-4 text-center">QTY: {product.attributes.quantity}</div>
                            </div>
                        </div>
                    )):
                    <div className="text-center py-5 mx-auto">
                        <div className="mb-3"><FaBoxOpen size={48} /></div>
                        <h4>No Items in Order</h4>
                        <p>This order has no items yet. Start adding dishes to build the order.</p>
                        <div className="d-flex align-items-center justify-content-center gap-2">
                            <button onClick={modifyOrder} className="btn border border-lightly text-light">Add Item</button>
                            <button onClick={deleteOrder} className="btn border border-lightly text-danger">Delete Order</button>
                        </div>
                    </div>
                }
            </div>
            <Spinner show={loading} inline />
        </div>
    )
}