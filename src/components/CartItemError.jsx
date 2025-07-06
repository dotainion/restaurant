import { MdErrorOutline } from "react-icons/md"
import { useOrder } from "../providers/OrderProvider";
import { useState } from "react";
import { Spinner } from "../widgets/Spinner";

export const CartItemError = ({item}) =>{
    const { resubmitProduct } = useOrder();

    const [loading, setLoading] = useState(false);

    const resubmit = () =>{
        setLoading(true);
        resubmitProduct(item, ()=>{
            setLoading(false);
        });
    }

    if(!item?.error) return null;

    return(
        <div className="d-flex align-items-center gap-2 small mt-1 text-danger">
            <div>
                <MdErrorOutline size={18} />
            </div>
            <div className="text-truncate flex-fill" title={item?.error}>{item?.error}</div>
            <button 
                onClick={resubmit} 
                className="position-relative d-flex align-items-center btn btn-outline-danger border border-lightly btn-sm py-0" 
                disabled={loading}
            >
                <Spinner show={loading} sm inline />
                <span>Retry</span>
            </button>
        </div>
    )
}