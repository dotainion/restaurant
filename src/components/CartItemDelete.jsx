import { MdDeleteOutline } from "react-icons/md"
import { useOrder } from "../providers/OrderProvider";
import { useRef, useState } from "react";
import $ from "jquery";
import { Spinner } from "../widgets/Spinner";

export const CartItemDelete = ({item}) =>{
    const { deleteProduct } = useOrder();
    
    const [loading, setLoading] = useState(false);

    const deleteRef = useRef();

    const remove = () =>{
        setLoading(true);
        deleteProduct(item, (mutate)=>{
            const row = $(deleteRef.current).closest('[data-cart-item]');
            row.hide('fast').promise().then(()=>mutate());
        }, ()=>setLoading(false));
    }

    return(
        <button ref={deleteRef} onClick={remove} className="position-relative d-flex align-items-center btn border border-orange cart-col-size" disabled={loading}>
            <Spinner show={loading} inline sm />
            <MdDeleteOutline className="text-orange"/>
        </button>
    )
}