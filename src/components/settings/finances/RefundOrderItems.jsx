import { Fragment } from "react"
import { useOrderManagement } from "./OrderManagementProvider"
import { OrderItems } from "./OrderItems";

export const RefundOrderItems = () =>{
    const { refundedItems, submitRefund } = useOrderManagement();
    return(
        <Fragment>
            <OrderItems />
            <div className="d-flex align-items-center justify-content-center mt-4">
                <button
                    className="btn btn-orange border border-orange w-100"
                    disabled={refundedItems.length === 0}
                    onClick={submitRefund}
                    style={{maxWidth: '400px'}}
                >Process Refund</button>
            </div>
        </Fragment>
    )
}