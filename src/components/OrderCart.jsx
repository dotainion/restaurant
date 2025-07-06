import { Fragment, useRef, useState } from "react"
import { ServicePreference } from "./ServicePreference"
import { OrderCartItems } from "./OrderCartItems";
import { useOrder } from "../providers/OrderProvider";
import { LuEllipsis } from "react-icons/lu";
import { useUtils } from "../providers/UtilsProvider";
import $ from "jquery";
import { ToKitchenOverlay } from "./kitchen/ToKitchenOverlay";

export const OrderCart = () =>{
    const { orders, order } = useOrder();
    const { navigateTo, paymentUtils } = useUtils();

    const [showKitchen, setShowKitchen] = useState(false);

    const dropdownRef = useRef();
    const dropdownBtnRef = useRef();

    const handleClick = (e) =>{
        e.stopPropagation();
        if($(e.target).is(dropdownBtnRef.current) || $(e.target).parent().is(dropdownBtnRef.current)){
            return;
        }
        $(dropdownRef.current).removeClass('show');
        $(dropdownBtnRef.current).removeClass('show');
    }

    return(
        <div className="cart d-flex flex-column bg-darker vh-100" onClick={handleClick}>
            <div className="p-3">
                <div className="d-flex gap-2">
                    <div className="flex-fill text-truncate">Orders #<small>{order?.attributes?.orderNumber}</small></div>
                    <div className="dropdown">
                        <button ref={dropdownBtnRef} className="btn btn-sm btn-dark border border-lightly" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <LuEllipsis />
                        </button>
                        <ul ref={dropdownRef} className="dropdown-menu bg-dark border border-lightly">
                            <li><a onClick={()=>navigateTo('/home/admin/discounts')} className="dropdown-item">Discounts</a></li>
                            {!!orders.length && <li><a onClick={()=>setShowKitchen(true)} className="dropdown-item">Send to kitchen</a></li>}
                        </ul>
                    </div>
                </div>
                <ServicePreference/>
                <div className="d-flex gap-2">
                    <div className="flex-fill h-0">Item</div>
                    <div className="cart-col-size h-0 text-center">Qty</div>
                    <div className="cart-col-size h-0">Price</div>
                </div>
            </div>
            <OrderCartItems/>
            <div className="px-3 pb-3">
                <button 
                    onClick={()=>setShowKitchen(true)}
                    className="btn btn-outline-orange rounded-0 text-nowrap w-100" 
                    disabled={!orders.length}
                >Send to kitchen</button>
            </div>
            <div className="px-3 pb-4">
                <button 
                    onClick={paymentUtils.show} 
                    className="btn btn-orange rounded-0 border-orange border text-nowrap w-100" 
                    disabled={!orders.length}
                >Continue to Payment</button>
            </div>
            <ToKitchenOverlay show={showKitchen} close={()=>setShowKitchen(false)} />
        </div>
    )
}