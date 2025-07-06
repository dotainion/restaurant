import { FiClock } from "react-icons/fi";
import { useOrder } from "../providers/OrderProvider";
import { useUtils } from "../providers/UtilsProvider";

export const CustomerPreference = ({onlyPreference, md}) =>{
    const { service, orders } = useOrder();
    const { paymentUtils } = useUtils();
    return(
        <div className="d-flex flex-wrap gap-2 text-nowrap my-3">
            <div className="flex-fill d-flex align-items-center">
                <button 
                    onClick={()=>service.dineIn()} 
                    className={`btn ${md ? 'btn-md' : 'btn-sm'} flex-fill btn-outline-orange ${service.type === 'dine-in' ? 'active' : ''}`}
                >Dine In</button>
            </div>
            <div className="flex-fill d-flex align-items-center">
                <button 
                    onClick={()=>service.toGo()} 
                    className={`btn ${md ? 'btn-md' : 'btn-sm'} flex-fill btn-outline-orange ${service.type === 'to-go' ? 'active' : ''}`}
                >To Go</button>
                </div>
            <div className="flex-fill d-flex align-items-center">
                <button 
                    onClick={()=>service.delivery()} 
                    className={`btn ${md ? 'btn-md' : 'btn-sm'} flex-fill btn-outline-orange ${service.type === 'delivery' ? 'active' : ''}`}
                >Delivery</button>
            </div>
            {!onlyPreference && !!orders.length && (
                <button onClick={paymentUtils.showAsOverlay} className="flex-fill d-flex align-items-center gap-2 btn btn-sm btn-outline-secondary border border-lightly text-light small" title="Place order on hold">
                    <FiClock className="small"/>
                    <small className="text-nowrap">
                        <small>Hold</small>
                    </small>
                </button>
            )}
        </div>
    )
}