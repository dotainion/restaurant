import { useRef, useState } from "react";
import { useOrder } from "../../providers/OrderProvider";
import { useUtils } from "../../providers/UtilsProvider";
import { Spinner } from "../../widgets/Spinner";
import { TableNumberInput } from "./TableNumberInput";

export const CardPayment = () =>{
    const { service, processPayment, order } = useOrder();
    const { paymentUtils } = useUtils();

    const [loading, setLoading] = useState(false);

    const cardNameRef = useRef();
    const cardNumberRef = useRef();
    const expireRef = useRef();
    const cvvRef = useRef();

    const formatDate = (e) =>{
        let value = e.target.value.replace(/\D/g, '');
        if(value.length >= 3) value = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
        e.target.value = value;
    }

    const formatCVV = (e) =>{
        let value = e.target.value.replace(/\D/g, '');
        if(value.length >= 3) value = value.slice(0, 4);
        e.target.value = value;
    }

    const formatCardNumber = (e) =>{
        let value = e.target.value.replace(/\D/g, '').slice(0, 16);
        value = value.replace(/(.{4})/g, '$1 ').trim();
        e.target.value = value;
    }

    const submit = (e) =>{
        e.preventDefault();
        if(!cardNumberRef.current.value) return toast.error('Card number is required.');
        if(!order.attributes.tableNumber) return toast.error('Require a table number.');
        setLoading(true);
        const data = {
            cardholderName: cardNameRef.current.value,
            cardNumber: cardNumberRef.current.value,
            expire: expireRef.current.value,
            cvv: cvvRef.current.value,
        }
        //need to send payment here... 
        processPayment({}, null, ()=>setLoading(false));
    }

    return(
        <form onSubmit={submit} className="position-relative">
            <div className="small mb-1">Cardholder Name</div>
            <input ref={cardNameRef} className="border-lightly form-control bg-dark border shadow-none text-light mb-3" placeholder="Cardholder Name..." required/>
            <div className="small mb-1">Card Number</div>
            <input ref={cardNumberRef} className="border-lightly form-control bg-dark border shadow-none text-light mb-3" onInput={formatCardNumber} placeholder="Card Number..." required />
            <div className="d-flex gap-2">
                <div className="w-100">
                    <div className="small mb-1">Expiration Date</div>
                    <input ref={expireRef} className="border-lightly form-control bg-dark border shadow-none text-light mb-3" onInput={formatDate} placeholder="MM/YY..." required/>
                </div>
                <div className="w-100">
                    <div className="small mb-1">CVV</div>
                    <input ref={cvvRef} className="border-lightly form-control bg-dark border shadow-none text-light mb-3" onInput={formatCVV} placeholder="CVV..." required/>
                </div>
            </div>
            <div className="d-flex gap-2">
                <div className="w-100">
                    <div className="small mb-1">Order Type</div>
                    <div 
                        className="border-lightly form-control bg-dark border shadow-none text-light mb-3" 
                        placeholder="Dine in, To go, Delivery..."
                    >{service.type}</div>
                </div>
                <div className="w-100">
                    <TableNumberInput/>
                </div>
            </div>
            <div className="small text-orange mb-4">Please confirm the card amount received before completing the order.</div>
            <div className="d-flex gap-2 text-nowrap mt-4">
                <button onClick={paymentUtils.hide} className="rounded-start-3 btn btn-outline-orange rounded-0 border border-orange w-100">Cancel</button>
                <button className="rounded-end-3 btn btn-orange rounded-0 w-100" type="submit">Confirm Payment</button>
            </div>
            <Spinner show={loading} inline transparent sm />
        </form>
    )
}