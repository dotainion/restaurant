import { TbToolsKitchen2 } from "react-icons/tb";
import { useOrder } from "../../providers/OrderProvider";
import { useRef, useState } from "react";
import { useUtils } from "../../providers/UtilsProvider";

export const ToKitchenOverlay = ({show, close}) =>{
    const { sendToKitchen } = useOrder();
    const { toast } = useUtils();

    const tableNoRef = useRef();
    const noteRef = useRef();

    const toKitchen = () =>{
        if(!tableNoRef.current.value) return toast.error('Table number is required to send order to kitchen.');
        sendToKitchen({
            tableNumber: tableNoRef.current.value,
            note: noteRef.current.value,
        }, ()=>close?.());
    }

    if(!show) return null;

    return(
        <div className="bg-dark bg-opacity-50 position-absolute top-0 start-0 w-100 vh-100">
            <div className="d-flex align-items-center justify-content-center w-100 h-100">
                <div className="p-3 position-relative">
                    <div className="bg-darker p-4 border border-lightly rounded-4">
                        <div className="text-center">
                            <TbToolsKitchen2 size={70} />
                        </div>
                        <h5 className="text-center my-3">Send Order to Kitchen</h5>
                        <div className="small mb-1 mt-2">Table no.</div>
                        <input
                            ref={tableNoRef}
                            className="border-lightly form-control bg-dark border shadow-none text-light mb-3"
                            placeholder="Table no..."
                        />
                        <div className="small mb-1">Add a Note (Optional)</div>
                        <input
                            ref={noteRef} 
                            className="border-lightly form-control bg-dark border shadow-none text-light mb-3" 
                            placeholder="e.g. Waiting on customer"
                        />
                        <div className="small text-orange mb-5">Enter the table number and confirm the order to send it<br/> directly to the kitchen.</div>
                        <div className="d-flex gap-2 text-nowrap mt-4">
                            <button onClick={close} className="rounded-start-3 btn btn-outline-orange rounded-0 border border-orange w-100">Cancel</button>
                            <button onClick={toKitchen} className="rounded-end-3 btn btn-orange rounded-0 w-100">Confirm</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}