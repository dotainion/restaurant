import { useEffect, useState } from "react";
import { useUtils } from "../../providers/UtilsProvider";
import { CardPayment } from "./CardPayment"
import { CashPayment } from "./CashPayment";
import { PaymentMethods } from "./PaymentMethods"
import { PaypalPayment } from "./PaypalPayment";
import { FiCreditCard } from "react-icons/fi";
import { HoldPayment } from "./HoldPayment";
import { ExternalPayment } from "./ExternalPayment";

export const PaymentChoices = () =>{
    const { paymentUtils } = useUtils();

    const [noSelection, setNoSelection] = useState();

    useEffect(()=>{
        setNoSelection(
            paymentUtils.method.state !== paymentUtils.name.card &&
            paymentUtils.method.state !== paymentUtils.name.paypal &&
            paymentUtils.method.state !== paymentUtils.name.cash &&
            paymentUtils.method.state !== paymentUtils.name.hold &&
            paymentUtils.method.state !== paymentUtils.name.external
        );
    }, [paymentUtils.method.state]);

    return(
        <div className="cart bg-darker">
            <div className="px-4 py-3">
                <PaymentMethods/>
                {paymentUtils.method.state === paymentUtils.name.card && <CardPayment/>}
                {paymentUtils.method.state === paymentUtils.name.paypal && <PaypalPayment/>}
                {paymentUtils.method.state === paymentUtils.name.cash && <CashPayment/>}
                {paymentUtils.method.state === paymentUtils.name.hold && <HoldPayment/>}
                {paymentUtils.method.state === paymentUtils.name.external && <ExternalPayment/>}
                {noSelection && (
                    <div className="text-center">
                        <FiCreditCard size={48} className="my-3" />
                        <h5 className="fw-semibold">No Payment Method Selected</h5>
                        <p className="mb-4">Please add or select a payment method to process a payment.</p>
                    </div>
                )}
            </div>
        </div>
    )
}