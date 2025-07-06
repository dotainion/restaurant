import { useOrderManagement } from "./OrderManagementProvider";

export const OrderItems = () =>{
    const { order, refundedItems, toggleRefundItem } = useOrderManagement();
    return(
        <div>
            <h6 className="mb-3">Select Items to Refund</h6>
            <div className="mb-auto">
                {order.items.map((item) => (
                    <div className="d-flex justify-content-between align-items-center border-bottom border-lightly py-2" key={item.id}>
                        <div>
                            <div className="fw-medium">{item.name}</div>
                            <div className="small">Qty: {item.quantity} × ${item.price.toFixed(2)}</div>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                checked={refundedItems.includes(item.id)}
                                onChange={()=>toggleRefundItem(item.id)}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}