import { useEffect, useLayoutEffect, useState } from "react";
import { LiaFileInvoiceSolid } from "react-icons/lia"
import { MdHistory, MdCalendarToday } from 'react-icons/md';
import { v4 as uuidv4 } from "uuid";
import { utils } from "../../../utils/Utils";
import { TbCreditCardRefund } from "react-icons/tb";
import { mock } from "../../../mock/Mock";
import { HiOutlineEllipsisVertical } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { LuSettings2 } from "react-icons/lu";
import { api } from "../../../request/Api";
import { Spinner } from "../../../widgets/Spinner";

const currentDate = new Date();
currentDate.setMonth(currentDate.getMonth() -6);
const fromDate = utils.date.dbFormat(currentDate).split(' ')[0];
const toDate = utils.date.dbFormat(new Date()).split(' ')[0];

export const OrderHistory = () =>{
    const [history, setHistory] = useState([]);
    const [from, setFrom] = useState(fromDate);
    const [to, setTo] = useState(toDate);
    const [filter, setFilter] = useState(null);
    const [noResult, setNoResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const statusColor = (order) =>{
        if(order.attributes.status === 'paid') return 'success';
        if(order.attributes.status === 'hold') return 'secondary';
        if(order.attributes.status === 'refund') return 'primary';
        if(order.attributes.status === 'canceled') return 'danger';
        return 'warning';
    }

    const search = (result) =>{
        setLoading(true);
        const data = {
            status: result.status,
            from: utils.date.dbFormat(result.from),
            to: utils.date.dbFormat(result.to)
        }
        api.order.list(data).then((response)=>{
            setHistory(()=>response.data.data.map((order)=>({
                ...order,
                statusColor: statusColor(order)
            })));
            setNoResult(false);
        }).catch((error)=>{
            setNoResult(true);
        }).finally(()=>{
            setLoading(false);
        });
    }

    const process = (cmd, value) =>{
        let data = {};
        data[cmd] = value;
        if(cmd === 'filter') setFilter(value);
        if(cmd === 'from') setFrom(value);
        if(cmd === 'to') setTo(value);
        search(data);
    }

    useLayoutEffect(()=>{
        const data = {
            from: utils.date.dbFormat(from),
            to: utils.date.dbFormat(to)
        }
        api.order.list(data).then((response)=>{
            setHistory(()=>response.data.data.map((order)=>({
                ...order,
                statusColor: statusColor(order)
            })));
        }).catch((error)=>{

        });
    }, []);

    return(
        <div className="d-flex flex-column h-100">
            <div className="d-flex flex-wrap justify-content-between gap-3 mb-4">
                <div className="d-flex align-items-center gap-2 mb-4">
                    <MdHistory size={24} />
                    <h5 className="fw-semibold mb-0">Order History</h5>
                </div>
                
                <div className="d-flex flex-wrap align-items-center gap-2">
                    <input
                        onChange={(e)=>process('from', e.target.value)}
                        className="form-control bg-darker border border-lightly text-light w-auto"
                        type="date"
                        value={from}
                    />
                    <div>-</div>
                    <input
                        onChange={(e)=>process('to', e.target.value)}
                        className="form-control bg-darker border border-lightly text-light w-auto"
                        type="date"
                        value={to}
                    />
                    <div className="dropdown">
                        <button className="d-flex align-items-center gap-2 text-nowrap btn border border-lightly text-light" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <LuSettings2/>
                            <span>Filter order</span>
                        </button>
                        <ul className="dropdown-menu overflow-auto scrollbar-md bg-dark border border-lightly">
                            <li><a onClick={()=>process('filter', 'paid')} className="dropdown-item pointer">💰 Paid Orders</a></li>
                            <li><a onClick={()=>process('filter', 'hold')} className="dropdown-item pointer">⏸️ On Hold</a></li>
                            <li><a onClick={()=>process('filter', 'refund')} className="dropdown-item pointer">🔄 Refunded</a></li>
                            <li><a onClick={()=>process('filter', 'pending')} className="dropdown-item pointer">⏳ Pending Approval</a></li>
                            <li><a onClick={()=>process('filter', 'canceled')} className="dropdown-item pointer">❌ Canceled Orders</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <hr></hr>

            <div className="position-relative h-100">
                <table className="table">
                    <tbody>
                        {history.map((order)=>(
                            <tr className="rounded-4 pointer pointer-effect border-bottom border-lightly position-relative" key={order.id}>
                                <td>
                                    <div> {order.attributes.orderNumber}</div>
                                    <span className="small text-secondary">Created by:</span>
                                    <div className="fw-semibold">{order.attributes.user.attributes.fullName}</div>
                                </td>
                                <td>
                                    <div className="small text-secondary">Date</div>
                                    <div className="d-flex align-items-center gap-2">
                                        <MdCalendarToday size={14} />
                                        <div>{utils.date.toLocalDate(order.attributes.created)}</div>
                                    </div>
                                </td>
                                <td>
                                    <div className="small text-secondary">Completed on</div>
                                    <div className="d-flex align-items-center gap-2">
                                        <MdCalendarToday size={14} />
                                        <div>{utils.date.toLocalDate(order.attributes.completedOn) || 'NA'}</div>
                                    </div>
                                </td>
                                <td>
                                    <div className="d-flex gap-2">
                                        <div className="text-secondary">
                                            <div>Discount:</div>
                                            <div>Sub Total:</div>
                                            <div>Total:</div>
                                        </div>
                                        <div>
                                            <div>${order.attributes.price.attributes.discount.toFixed(2)}</div>
                                            <div>${order.attributes.price.attributes.subtotal.toFixed(2)}</div>
                                            <div>${order.attributes.price.attributes.total.toFixed(2)}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span
                                        className={`position-lg-absolute top-0 end-0 me-2 me-lg-0 mt-2 mt-lg-0 badge px-3 py-1 rounded-pill bg-${order.statusColor}`}
                                    >{order.attributes.status}</span>
                                </td>
                                <td>
                                    <div className="dropdown dropstart" onClick={e=>e.stopPropagation()}>
                                        <button className="btn btn-sm btn-dark btn-secondary" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <HiOutlineEllipsisVertical />
                                        </button>
                                        <ul className="dropdown-menu bg-dark">
                                            <li>
                                                <a onClick={()=>navigate(`/settings/finance/view/order/${order.id}`)} className="dropdown-item d-flex align-items-center gap-2">
                                                    <LiaFileInvoiceSolid />
                                                    <small>View invoice</small>
                                                </a>
                                            </li>
                                            <li>
                                                <a onClick={()=>navigate(`/settings/finance/order/refund/${order.id}`)} className="dropdown-item text-danger d-flex align-items-center gap-2">
                                                    <TbCreditCardRefund />
                                                    <small>Refund order</small>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {noResult === null && (
                    <div className="d-flex flex-column align-items-center justify-content-center text-center p-5">
                        <div className="display-3 mb-3">🔍</div>
                        <h5 className="mb-2">Start Searching Orders</h5>
                        <p className="mb-0">Use the search or filter options above to find orders by their status or other criteria.</p>
                    </div>
                )}
                {noResult && (
                    <div className="d-flex flex-column align-items-center justify-content-center text-center p-5">
                        <div className="display-3 mb-3">🧾</div>
                        <h5 className="mb-2">No Orders Found</h5>
                        <p className="mb-0">You currently have no orders in this list. Try adjusting your filters or check back later.</p>
                    </div>
                )}
                <Spinner show={loading} inline transparent />
            </div>
        </div>
    )
}