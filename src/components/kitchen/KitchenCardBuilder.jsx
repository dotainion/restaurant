import { useNavigate } from "react-router-dom";
import { utils } from "../../utils/Utils"
import { api } from "../../request/Api";
import { useUtils } from "../../providers/UtilsProvider";
import { useRef, useState } from "react";
import { Spinner } from "../../widgets/Spinner";
import { STATUS } from "../../contents/Products";
import $ from "jquery";
import { useOrder } from "../../providers/OrderProvider";

export const KitchenCardBuilder = ({orders, onRemove, children}) =>{
    const navigate = useNavigate();

    const status = (order) =>{
        if(order.attributes.status === 'kitchen') return 'border-primary';
        if(order.attributes.status === 'preparing') return 'border-warning';
        if(order.attributes.status === 'ready') return 'border-success';
        return 'border-secondary';
    }

    return(
        <div className="h-100 overflow-auto scrollbar-md">
            <div className="d-flex flex-wrap px-0 mt-3">
                {orders.map((order)=>(
                    <div className="col-12 col-sm-6 col-xl-4 col-xxl-3 p-2" style={{minWidth: '178px'}} key={order.id}>
                        <div className={`border border-2 d-flex flex-column bg-darker rounded-4 text-center p-3 h-100 user-select-none ${status(order)}`}>
                            <div className="mb-auto">
                                <div className="position-relative mb-2">
                                    <div className="text-break fw-bold">{order.attributes.preference}</div>
                                    <button 
                                        onClick={()=>navigate(`/kitchen/view/${order.id}`)}
                                        className="position-absolute top-50 end-0 translate-middle-y btn btn-sm bg-secondary bg-opacity-10 text-light border border-lightly"
                                    >View</button>
                                </div>
                                <div className="text-break">Table NO: {order.attributes.tableNumber}</div>
                                <div className="text-break my-1">{utils.date.toLocalDateTime(order.attributes.created)}</div>
                                {order.attributes.note && (
                                    <div className="bg-dark bg-opacity-50 text-break rounded-3 p-2 my-3">{order.attributes.note}</div>
                                )}
                            </div>
                            <div className="text-start small text-secondary">Agent: {order.attributes.user.attributes.fullName}</div>
                            <div className="text-secondary text-break mt-3">
                                {order.attributes.status === 'kitchen' && <StartOrderButton order={order} />}
                                {order.attributes.status === 'preparing' && <ReadyOrderButton order={order} onRemove={onRemove} />}
                                {order.attributes.status === 'ready' && <CheckOutOrderButton order={order} />}
                                <DeleteOrderButton order={order} onRemove={onRemove} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {children}
        </div>
    )
}

const StartOrderButton = ({order}) =>{
    const { toast } = useUtils();

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const btnRef = useRef();

    const save = () =>{
        setLoading(true);
        api.order.set({
            id: order.id,
            ...order.attributes,
            status: STATUS.preparing
        }).then(()=>{
            navigate(`/kitchen/view/${order.id}`);
        }).catch((error)=>{
            toast.error(error);
        }).finally(()=>{
            setLoading(false);
        });
    }

    return(
        <button ref={btnRef} onClick={save} className="btn btn-primary w-100 position-relative">
            <span>Start Order</span>
            <Spinner show={loading} sm inline transparent />
        </button>
    )
}

const ReadyOrderButton = ({order, onRemove}) =>{
    const { toast } = useUtils();

    const [loading, setLoading] = useState(false);

    const btnRef = useRef();

    const save = () =>{
        setLoading(true);
        api.order.set({
            id: order.id,
            ...order.attributes,
            status: STATUS.ready
        }).then((response)=>{
            const record = response.data.data[0];
            $(btnRef.current).closest('.col-12').hide('fast').promise().then(()=>{
                onRemove?.(record);
            });
        }).catch((error)=>{
            toast.error(error);
        }).finally(()=>{
            setLoading(false);
        });
    }

    return(
        <button ref={btnRef} onClick={save} className="btn btn-warning w-100 position-relative">
            <span>Ready</span>
            <Spinner show={loading} sm inline transparent />
        </button>
    )
}

const CheckOutOrderButton = ({order}) =>{
    const { mountOrder } = useOrder();

    const navigate = useNavigate();

    const checkout = () =>{
        mountOrder({id: order.id});
        navigate('/home/');
    }

    return(
        <button onClick={checkout} className="btn btn-success w-100">
            <span>Check out</span>
        </button>
    )
}

const DeleteOrderButton = ({order, onRemove}) =>{
    const { toast } = useUtils();

    const [loading, setLoading] = useState(false);

    const btnRef = useRef();

    const save = () =>{
        setLoading(true);
        api.order.set({
            id: order.id,
            ...order.attributes,
            hide: true
        }).then((response)=>{
            const record = response.data.data[0];
            $(btnRef.current).closest('.col-12').hide('fast').promise().then(()=>{
                onRemove?.(record);
            });
        }).catch((error)=>{
            toast.error(error);
        }).finally(()=>{
            setLoading(false);
        });
    }

    return(                                           
        <div ref={btnRef} className="dropdown">
            <button className="btn btn-danger w-100 mt-3" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <span>Delete</span>
                <Spinner show={loading} sm inline transparent />
            </button>
            <ul className="dropdown-menu bg-danger border border-lightly">
                <li><a onClick={save} className="btn btn-danger border-0 rounded-0 w-100">Confirm Delete</a></li>
            </ul>
        </div>
    )
}
