import { useRef } from "react";
import { useOrder } from "../providers/OrderProvider";

export const CartItemNote = ({item}) =>{
    const { addNote } = useOrder();

    const timeoutRef = useRef();

    const updateNote = (e) =>{
        const note = e.target.value;
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            addNote(item, note);
        }, 500);
    }

    return(
        <input 
            onChange={updateNote}
            className="cart-description form-control shadow-none text-light bg-dark border-0"
            placeholder={`${item.type.includes('discount') ? 'Discount' : 'Order'} Note...`}
            defaultValue={item.note}
        />
    )
}