import React from 'react';
import { MdReceiptLong } from 'react-icons/md';
import 'bootstrap/dist/css/bootstrap.min.css';
import { OrderItems } from './OrderItems';
import { OrderManagementProvider } from './OrderManagementProvider';
import { OrderDetails } from './OrderDetails';

export const ViewOrder = () =>{
    return (
        <OrderManagementProvider>
            <div className="d-flex flex-column h-100">
                <div className="d-flex align-items-center gap-2 mb-4">
                    <MdReceiptLong size={24} />
                    <h5 className="fw-semibold mb-0">Order Summary</h5>
                </div>
                <div className="d-flex flex-column h-100">
                    <div className="row g-3 h-100">
                        <div className="col-12 col-md-5 h-100">
                            <div className="border border-lightly rounded p-3 shadow-sm h-100">
                                <OrderDetails/>
                            </div>
                        </div>

                        <div className="col-12 col-md-7 h-100">
                            <div className="border border-lightly rounded p-3 shadow-sm h-100">
                                <OrderItems />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </OrderManagementProvider>
    )
}