import { Fragment, useState } from "react";
import { createPortal } from "react-dom";
import { HoldPayment } from "./payment/HoldPayment";
import { useUtils } from "../providers/UtilsProvider";
import { CustomerPreference } from "./CustomerPreference";

export const ServicePreference = () =>{
    const { paymentUtils } = useUtils();
    return(
        <Fragment>
            <CustomerPreference/>
            {paymentUtils.asOverlay && createPortal(
                <div className="bg-dark bg-opacity-75 position-absolute top-0 start-0 w-100 vh-100">
                    <div className="d-flex align-items-center justify-content-center w-100 h-100 p-2">
                        <div className="border border-lightly rounded-4 bg-darker text-light p-4">
                            <HoldPayment editable />
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </Fragment>
    )
}