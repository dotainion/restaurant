import { Fragment } from "react"
import { useOrderManagement } from "./OrderManagementProvider";
import { MdUndo } from "react-icons/md";
import { OrderDetails } from "./OrderDetails";

export const RefundOrderDetails = () =>{
    const { refundAll } = useOrderManagement();
    return(
        <Fragment>
            <OrderDetails />

            <div className="d-flex align-items-center justify-content-center mt-4">
                <button onClick={refundAll} className="btn btn-outline-danger mt-3 w-100" style={{maxWidth: '400px'}}>
                    <MdUndo /> Refund Entire Order
                </button>
            </div>
        </Fragment>
    )
}