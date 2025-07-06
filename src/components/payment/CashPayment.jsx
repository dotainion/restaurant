import { useRef, useState } from "react";
import { useOrder } from "../../providers/OrderProvider";
import { useUtils } from "../../providers/UtilsProvider";
import { Spinner } from "../../widgets/Spinner";
import { TableNumberInput } from "./TableNumberInput";

export const CashPayment = () =>{
    const { service, processPayment, total, order } = useOrder();
    const { paymentUtils, toast } = useUtils();
    
    const [loading, setLoading] = useState(false);

    const amountRef = useRef();

    const submit = (e) =>{
        e.preventDefault();
        if(!order.attributes.tableNumber) return toast.error('Require a table number.');
        setLoading(true);
        const data = {
            amount: amountRef.current.value
        }
        //process payment here
        processPayment({}, null, ()=>setLoading(false));
    }

    return(
        <form onSubmit={submit} className="position-relative">
            <div className="small mb-1">Order Type</div>
            <div className="border-lightly form-control bg-dark border shadow-none text-light mb-3">{service.type} </div>
            <TableNumberInput/>
            <div className="small mb-1">Amount Paid</div>
            <input
                ref={amountRef}
                className="border-lightly form-control bg-dark border shadow-none text-light mb-3"
                placeholder="Enter amount paid by customer..."
                type="number"
                defaultValue={total}
                readOnly 
                required
            />
            <div className="small text-orange mb-4">Please confirm the cash amount received before completing the order.</div>
            <div className="d-flex gap-2 text-nowrap mt-4">
                <button onClick={paymentUtils.hide} className="rounded-start-3 btn btn-outline-orange rounded-0 border border-orange w-100">Cancel</button>
                <button className="rounded-end-3 btn btn-orange rounded-0 w-100" type="submit">Confirm Payment</button>
            </div>
            <Spinner show={loading} inline transparent sm />
        </form>
    )
}