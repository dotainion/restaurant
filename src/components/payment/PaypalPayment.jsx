import { useRef, useState } from "react";
import { useOrder } from "../../providers/OrderProvider";
import { useUtils } from "../../providers/UtilsProvider";
import { Spinner } from "../../widgets/Spinner";
import { TableNumberInput } from "./TableNumberInput";

export const PaypalPayment = () =>{
    const { paymentUtils, toast } = useUtils();
    const { processPayment, order } = useOrder();
    
    const [loading, setLoading] = useState(false);

    const emailRef = useRef();

    const submit = (e) =>{
        e.preventDefault();
        if(!order.attributes.tableNumber) return toast.error('Require a table number.');
        setLoading(true);
        const data = {
            email: emailRef.current.value
        }
        //process payment here
        processPayment({
            email: emailRef.current.value
        }, null, ()=>setLoading(false));
    }

    return(
        <form onSubmit={submit} className="position-relative">
            <div className="small mb-1">PayPal Account Email</div>
            <input ref={emailRef} className="border-lightly form-control bg-dark border shadow-none text-light mb-3" placeholder="example@paypal.com" type="email" required/>            
            <TableNumberInput/>
            <div className="small text-orange mb-4">
                Please ensure the email is associated with an active PayPal account. You'll be redirected to PayPal to complete the payment.
            </div>
            <div className="d-flex gap-2 text-nowrap mt-4">
                <button onClick={paymentUtils.hide} className="rounded-start-3 btn btn-outline-orange rounded-0 border border-orange w-100">Cancel</button>
                <button className="rounded-end-3 btn btn-orange rounded-0 w-100" type="submit">Continue to PayPal</button>
            </div>
            <Spinner show={loading} inline transparent sm />
        </form>
    )
}