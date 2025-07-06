import { Fragment, useRef } from "react"
import { useOrder } from "../../providers/OrderProvider"

export const TableNumberInput = () =>{
    const { updateOrder, order } = useOrder();

    const timeoutRef = useRef();

    const upate = (e) =>{
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            console.log('fising...')
            updateOrder({tableNumber: e.target.value});
        }, 500);
    }

    return(
        <Fragment>
            <div className="small mb-1">Table No.</div>
            <input
                onChange={upate}
                className="border-lightly form-control bg-dark border shadow-none text-light mb-3"
                placeholder="Enter table number..."
                defaultValue={order?.attributes?.tableNumber}
                required
            />
        </Fragment>
    )
}