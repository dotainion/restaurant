import { TbCreditCardRefund } from "react-icons/tb"
import { OrderManagementProvider } from "./OrderManagementProvider";
import { RefundOrderDetails } from "./RefundOrderDetails";
import { RefundOrderItems } from "./RefundOrderItems";

export const Refund = () =>{
    return(
        <OrderManagementProvider>
            <div className="d-flex flex-column w-100 h-100">
                <div className="d-flex align-items-center gap-2 mb-3">
                    <TbCreditCardRefund size={24} />
                    <h5 className="fw-semibold mb-0">Refund</h5>
                </div>

                <div className="row g-3 h-100 m-0 p-0">
                    <div className="col-lg-5">
                        <div className="border border-lightly rounded p-3 shadow-sm h-100">
                            <RefundOrderDetails/>
                        </div>
                    </div>

                    <div className="col-lg-7">
                        <div className="d-flex flex-column border border-lightly rounded p-3 shadow-sm h-100">
                            <RefundOrderItems/>
                        </div>
                    </div>
                </div>
            </div>
        </OrderManagementProvider>
    )
}