import { Fragment } from "react";
import { useOrderManagement } from "./OrderManagementProvider";

export const OrderDetails = () =>{
    const { order } = useOrderManagement();
    return(
        <Fragment>
            <table className="table">
                <tbody>
                    <tr>
                        <td>Order ID:</td>
                        <td>{order.id}</td>
                    </tr>
                    <tr>
                        <td>Date:</td>
                        <td>{order.date}</td>
                    </tr>
                    <tr>
                        <td>Agent:</td>
                        <td>{order.customer}</td>
                    </tr>
                    <tr>
                        <td>Customer:</td>
                        <td>{order.customer}</td>
                    </tr>
                    <tr>
                        <td>Status:</td>
                        <td>
                            <span className="badge bg-success">{order.status}</span>
                        </td>
                    </tr>
                    <tr>
                        <td>Payment:</td>
                        <td>{order.payment}</td>
                    </tr>
                </tbody>
            </table>
            <hr></hr>
            <div className="display-3 text-center">${order.total.toFixed(2)}</div>
        </Fragment>
    )
}