import { LuSettings2 } from "react-icons/lu";
import { utils } from "../../utils/Utils";
import { useEffect, useState } from "react";
import { api } from "../../request/Api";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../../widgets/Spinner";
import { STATUS } from "../../contents/Products";

const date = new Date();
date.setDate(date.getDate() -30);

export const DashboardReport = () =>{
    const [orders, setOrders] = useState([]);
    const [status, setStatus] = useState(null);
    const [from, setFrom] = useState(utils.date.dbFormat(date).split(' ')[0]);
    const [to, setTo] = useState(utils.date.dbFormat(new Date()).split(' ')[0]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    
    const search = (data) =>{
        setOrders([]);
        setLoading(true);
        api.order.list(data).then((response)=>{
            setOrders(response.data.data);
        }).catch((error)=>{

        }).finally(()=>{
            setLoading(false);
        });
    }

    const yesterday = () =>{
        const date = new Date();
        date.setMonth(date.getDay() -1);
        setFrom(utils.date.startOfDay(date));
        setTo(utils.date.endOfDay(date));
    }

    const today = () =>{
        setFrom(utils.date.startOfDay(new Date()));
        setTo(utils.date.endOfDay(new Date()));
    }

    useEffect(()=>{
        search({status, from, to});
    }, [status, to, from]);

    return(
        <div className="bg-darker rounded-3 p-3 h-100 overflow-auto scrollbar-md text-light position-relative">
            <div className="d-flex flex-wrap justify-content-between">
                <h4>Order Report</h4>
                <div className="d-flex align-items-center gap-3">
                    <div className="d-flex align-items-center gap-2">
                        <input
                            onChange={(e)=>setFrom(utils.date.startOfDay(new Date(e.target.value)))}
                            className="form-control bg-dark text-light border border-lightly w-auto"
                            type="date"
                            value={from.split(' ')[0]}
                        />
                        <span>-</span>
                        <input
                            onChange={(e)=>setTo(utils.date.endOfDay(new Date(e.target.value)))}
                            className="form-control bg-dark text-light border border-lightly w-auto"
                            type="date"
                            value={to.split(' ')[0]}
                        />
                    </div>
                    <div className="dropdown">
                        <button className="d-flex align-items-center gap-2 btn border border-secondary text-light" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <LuSettings2/>
                            <span>Filter Order</span>
                        </button>
                        <ul className="dropdown-menu bg-darker">
                            <li><a onClick={yesterday} className="dropdown-item">Yesterday</a></li>
                            <li><a onClick={today} className="dropdown-item">Today</a></li>
                            <li><a onClick={()=>setStatus('paid')} className="dropdown-item">Paid</a></li>
                            <li><a onClick={()=>setStatus('hold')} className="dropdown-item">Hold</a></li>
                            <li><a onClick={()=>setStatus('refund')} className="dropdown-item">Refund</a></li>
                            <li><a onClick={()=>setStatus('pending')} className="dropdown-item">Pending</a></li>
                            <li><a onClick={()=>setStatus('canceled')} className="dropdown-item">Canceled</a></li>
                            <li><a onClick={()=>setStatus('kitchen')} className="dropdown-item">Kitchen</a></li>
                            <li><a onClick={()=>setStatus('preparing')} className="dropdown-item">Preparing</a></li>
                            <li><a onClick={()=>setStatus('ready')} className="dropdown-item">Ready</a></li>                          
                        </ul>
                    </div>
                </div>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Customer</th>
                        <th>menu</th>
                        <th>Total Payment</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order)=>(
                        <tr key={order.id}>
                            <td>
                                <div className="d-flex gap-2">
                                    <div
                                        className="d-flex align-items-center justify-content-center rounded-circle"
                                        style={{
                                            minWidth: '30px',
                                            maxWidth: '30px',
                                            minHeight: '30px',
                                            maxHeight: '30px',
                                            backgroundColor: utils.randomColor()
                                        }}
                                    >U</div>
                                    <span>Unknown</span>
                                </div>
                            </td>
                            <td>{order.attributes.products?.[0]?.attributes?.name} <span className="text-secondary">See all {order.attributes.products.length} items</span></td>
                            <td>${order.attributes.price.attributes.total}</td>
                            <td>
                                {order.attributes.status === STATUS.paid && (
                                    <div className="bg-success bg-opacity-25 px-3 py-1 text-success rounded-pill d-inline-block text-center" style={{minWidth: '110px'}}>Completed</div>
                                )}
                                {order.attributes.status === STATUS.hold && (
                                    <div className="bg-info bg-opacity-25 px-3 py-1 text-warning rounded-pill d-inline-block text-center" style={{minWidth: '110px'}}>Hold</div>
                                )}
                                {order.attributes.status === 'refund' && (
                                    <div className="bg-warning bg-opacity-25 px-3 py-1 text-secondary rounded-pill d-inline-block text-center" style={{minWidth: '110px'}}>Refund</div>
                                )}
                                {order.attributes.status === STATUS.pending && (
                                    <div className="bg-info bg-opacity-25 px-3 py-1 text-info rounded-pill d-inline-block text-center" style={{minWidth: '110px'}}>Pending</div>
                                )}
                                {order.attributes.status === STATUS.canceled && (
                                    <div className="bg-warning bg-opacity-25 px-3 py-1 text-danger rounded-pill d-inline-block text-center" style={{minWidth: '110px'}}>Canceled</div>
                                )}
                                {order.attributes.status === STATUS.kitchen && (
                                    <div className="bg-warning bg-opacity-25 px-3 py-1 text-light rounded-pill d-inline-block text-center" style={{minWidth: '110px'}}>Kitchen</div>
                                )}
                                {order.attributes.status === STATUS.preparing && (
                                    <div className="bg-warning bg-opacity-25 px-3 py-1 text-light rounded-pill d-inline-block text-center" style={{minWidth: '110px'}}>Preparing</div>
                                )}
                                {order.attributes.status === STATUS.ready && (
                                    <div className="bg-warning bg-opacity-25 px-3 py-1 text-light rounded-pill d-inline-block text-center" style={{minWidth: '110px'}}>Ready</div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {!orders.length && (
                <div className="py-5">
                    <div className="card border-lightly text-light">
                        <div className="card-header bg-dark d-flex justify-content-between align-items-center">
                            <h5 className="mb-0">📊 Order Report</h5>
                        </div>
                        <div className="card-body text-light text-center py-5">
                            <img className="mb-4" src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png" alt="No Data" width="100" />
                            <h6>No Orders Found</h6>
                            <p className="mb-3">There are currently no orders to display in the report.</p>
                            <button onClick={()=>navigate('/home/')} className="btn border border-lightly text-light">Add New Order</button>
                        </div>
                    </div>
                </div>
            )}
            <Spinner show={loading} inline />
        </div>
    )
}