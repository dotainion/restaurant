import { OrderLayout } from "../layouts/OrderLayout";
import { OrderCart } from "../components/OrderCart";
import { OrderCartItems } from "../components/OrderCartItems";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoAdd } from "react-icons/io5";
import { useUtils } from "../providers/UtilsProvider";
import { PaymentChoices } from "../components/payment/PaymentChoices";
import $ from "jquery";

export const Home = () =>{
    const { cartUtils, paymentUtils } = useUtils();

    return(
        <OrderLayout>
            <div className={`${cartUtils.overlayClass} position-md-absolute top-0 w-100 w-md-auto start-0 vh-100 bg-dark bg-opacity-50 user-select-none`}>
                <div className="w-100 h-100 d-flex align-items-center justify-content-end" onClick={cartUtils.hide}>
                    <OrderCart/>
                </div>
            </div>
            {paymentUtils.state && (
                <div className="position-fixed top-0 start-0 w-100 vh-100 bg-dark bg-opacity-50 user-select-none">
                    <div className="d-flex justify-content-end">
                        <div className="cart d-flex flex-column vh-100 bg-darker rounded-start-5 overflow-hidden border border-lightly">
                            <div className="px-4 py-3">
                                <button onClick={paymentUtils.hide} className="btn p-0">
                                    <IoIosArrowRoundBack className="text-light fs-2"/>
                                </button>
                            </div>
                            <div className="d-flex justify-content-between px-4 py-3 pt-0">
                                <h4>Conformation</h4>
                                <button onClick={paymentUtils.hide} className="btn btn-sm btn-orange">
                                    <IoAdd className="text-light fs-4"/>
                                </button>
                            </div>
                            <OrderCartItems/>
                        </div>
                        <PaymentChoices />
                    </div>
                </div>
            )}
        </OrderLayout>
    )
}