import { CiCreditCard1 } from "react-icons/ci";
import { RiPaypalLine } from "react-icons/ri";
import { TbCashBanknote } from "react-icons/tb";
import { useUtils } from "../../providers/UtilsProvider";
import { useEffect, useState } from "react";
import { FiClock } from "react-icons/fi";
import { PiHandDepositLight } from "react-icons/pi";

export const PaymentMethods = () =>{
    const { paymentUtils } = useUtils();

    const [method, setMethod] = useState({
        card: null,
        paypal: null,
        cash: null,
        hold: null,
        external: null
    });

    const methods = [
        {
            title: 'Credit Card', 
            css: method.card,
            icon: CiCreditCard1,
            action: ()=>paymentUtils.method.card(), 
            details: 'Make credit Card payment'
        },{
            title: 'Paypal', 
            css: method.paypal,
            icon: RiPaypalLine,
            action: ()=>paymentUtils.method.paypal(), 
            details: 'Make paypal payment'
        },{
            title: 'Cash', 
            css: method.cash,
            icon: TbCashBanknote,
            action: ()=>paymentUtils.method.cash(), 
            details: 'Make cash payment'
        },{
            title: 'Hold', 
            css: method.hold,
            icon: FiClock,
            action: ()=>paymentUtils.method.hold(), 
            details: 'Place order on hold'
        },{
            title: 'Ext Payment', 
            css: method.external,
            icon: PiHandDepositLight,
            action: ()=>paymentUtils.method.external(), 
            details: 'Track external payment'
        },
    ];  
    
    useEffect(()=>{
        setMethod({
            card: paymentUtils.method.state === paymentUtils.name.card ? 'btn-orange' : '',
            paypal: paymentUtils.method.state === paymentUtils.name.paypal ? 'btn-orange' : '',
            cash: paymentUtils.method.state === paymentUtils.name.cash ? 'btn-orange' : '',
            hold: paymentUtils.method.state === paymentUtils.name.hold ? 'btn-orange' : '',
            external: paymentUtils.method.state === paymentUtils.name.external ? 'btn-orange' : ''
        });
    }, [paymentUtils.method.state]);

    return(
        <div>
            <h4 className="mt-3">Payment</h4>
            <div className="small">3 payment method available</div>
            <hr></hr>
            <h5 className="mt-3">Payment Method</h5>
            <div className="d-flex flex-wrap gap-1 mb-3">
                {methods.map((meth, key)=>(
                    <button onClick={meth.action} className={`${meth.css} btn payment-method-btn small`} title={meth.details} key={key}>
                        <meth.icon/>
                        <small className="d-block text-nowrap">
                            <small>{meth.title}</small>
                        </small>
                    </button>
                ))}
            </div>
        </div>
    )
}