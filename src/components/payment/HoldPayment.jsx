import { FiClock } from "react-icons/fi";
import { useOrder } from "../../providers/OrderProvider";
import { useUtils } from "../../providers/UtilsProvider";
import { useRef, useState } from "react";
import { Spinner } from "../../widgets/Spinner";
import { CustomerPreference } from "../CustomerPreference";
import { TableNumberInput } from "./TableNumberInput";

export const HoldPayment = ({editable}) =>{
    const { service, placeOrderOnHold, order } = useOrder();
    const { paymentUtils, toast } = useUtils();

    const [loading, setLoading] = useState(false);

    const noteRef = useRef();

    const submit = () =>{
        if(!order.attributes.tableNumber) return toast.error('Require a table number.');
        setLoading(true);
        placeOrderOnHold({
            note: noteRef.current.value,
        }, ()=>paymentUtils.hide(), ()=>setLoading(false));
    }

    return(
        <form onSubmit={submit} className="position-relative">
            <div className="d-flex align-items-center gap-2 mb-3 text-light">
                <FiClock size={22} />
                <h5 className="mb-0">Put Order on Hold</h5>
            </div>
            <div className="small mb-1">Order Type</div>
            {
                editable
                    ? <CustomerPreference onlyPreference md />
                    : <div className="border-lightly form-control bg-dark border shadow-none text-light mb-3">{service.type}</div>
            }            
            <TableNumberInput/>
            <div className="small mb-1">Add a Note (Optional)</div>
            <input ref={noteRef} className="border-lightly form-control bg-dark border shadow-none text-light mb-3" placeholder="e.g. Waiting on customer" required />
            <div className="small text-orange mb-4">This order will be saved temporarily and can be resumed at any time.</div>
            <div className="d-flex gap-2 text-nowrap mt-4">
                <button onClick={paymentUtils.hide} className="rounded-start-3 btn btn-outline-orange rounded-0 border border-orange w-100">Cancel</button>
                <button className="rounded-end-3 btn btn-orange rounded-0 w-100" type="submit">Confirm Hold</button>
            </div>
            <Spinner show={loading} inline transparent />
        </form>
    )
}