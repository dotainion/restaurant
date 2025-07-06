import { MdSearchOff } from "react-icons/md"
import { KitchenFilter } from "../../kitchen/KitchenFilter"
import { useEffect, useState } from "react"
import { utils } from "../../../utils/Utils";
import { FaProductHunt } from "react-icons/fa";
import { api } from "../../../request/Api";
import { Spinner } from "../../../widgets/Spinner";
import { STATUS } from "../../../contents/Products";
import { useNavigate } from "react-router-dom";

export const Orders = () =>{
    const [data, setData] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const onSearch = () =>{
        setLoading(true);
        api.order.list(data).then((response)=>{
            setOrders(response.data.data);
        }).catch((error)=>{
            setOrders([]);
        }).finally(()=>{
            setLoading(false);
        });
    }

    useEffect(()=>{
        if(!data) return;
        onSearch();
    }, [data]);

    return(
        <div className="d-flex flex-column h-100 w-100 position-relative">
            <KitchenFilter
                title="View orders"
                icon={<FaProductHunt className="fs-1" />}
                reload={onSearch}
                search={setData}
            />
            <div className="d-flex flex-wrap px-0 mt-3">
                {
                    orders.length?
                    orders.map((order)=>(
                        <div className="col-12 col-sm-6 col-xl-4 col-xxl-3 p-2" style={{minWidth: '178px'}} key={order.id}>
                            <div className={`border border-lightly ${order.attributes.hide ? 'text-danger' : ''} bg-darker d-flex flex-column rounded-4 text-center p-3 h-100 user-select-none`}>
                                <div className="mb-auto">
                                    <div className="position-relative mb-2">
                                        <div className="text-break fw-bold">{order.attributes.preference}</div>
                                        <button 
                                            onClick={()=>navigate(`/settings/view/order/${order.id}`)}
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
                                <div className="text-secondary text-end mt-3">
                                    <span className={`badge 
                                        ${order.attributes.status === STATUS.paid ? 'bg-success text-light' : ''} 
                                        ${order.attributes.status === STATUS.hold ? 'bg-secondary text-light' : ''} 
                                        ${order.attributes.status === STATUS.pending ? 'bg-secondary text-light' : ''} 
                                        ${order.attributes.status === STATUS.canceled ? 'bg-danger text-light' : ''} 
                                        ${order.attributes.status === STATUS.kitchen ? 'bg-primary text-light' : ''} 
                                        ${order.attributes.status === STATUS.preparing ? 'bg-warning text-light' : ''} 
                                        ${order.attributes.status === STATUS.ready ? 'bg-success text-light' : ''} 
                                    text-capitalize`}>{order.attributes.status}</span>
                                </div>
                            </div>
                        </div>
                    )):
                    <div className="text-center py-5 w-100">
                        <div className="d-flex text-light justify-content-center">
                            <div className="col-md-6">
                                <div className="mb-4">
                                    <MdSearchOff size={64}/>
                                </div>
                                <h4>No Orders Found</h4>
                                <p>There are currently no <strong>pending</strong>, <strong>preparing</strong>, or <strong>ready</strong> orders.</p>
                            </div>
                        </div>
                    </div>
                }
            </div>
            <Spinner show={loading} inline transparent />
        </div>
    )
}