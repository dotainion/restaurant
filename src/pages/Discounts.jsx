import { useEffect, useState } from 'react';
import { AiOutlineTags } from 'react-icons/ai';
import { FiCheckCircle } from 'react-icons/fi';
import { MdLocalOffer } from 'react-icons/md';
import { utils } from '../utils/Utils';
import { useOrder } from '../providers/OrderProvider';
import { api } from '../request/Api';
import { DISCOUNT_TYPE } from '../contents/Discounts';
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useUtils } from '../providers/UtilsProvider';

export const Discounts = () =>{
    const { applyDiscount } = useOrder();
    const { navigateBack } = useUtils();

    const [selection, setSelection] = useState([]);
    const [discounts, setDiscounts] = useState([]);

    const complete = () =>{
        applyDiscount(selection);
        navigateBack();
    }

    const toggleDiscount = (discount) =>{
        const found = selection.find((disc)=>disc.id === discount.id);
        if(!found) return setSelection((discs)=>[discount, ...discs]);
        setSelection((discs)=>discs.filter((disc)=>disc.id !== discount.id));
    }

    useEffect(()=>{
        api.discount.list().then((response)=>{
        setDiscounts(response.data.data);
        }).catch((error)=>{

        });
    }, []);

    return(
        <div className="d-flex flex-column h-100">
            <div className="d-flex flex-wrap justify-content-between p-3">
                <h5>Apply a discount to the current order</h5>
                <div className="d-flex justify-content-end gap-3">
                    <button onClick={()=>complete()} className="d-flex align-items-center gap-2 btn btn-sm btn-outline-orange">
                        <AiOutlineCheckCircle/>
                        <span>Done – Return to Order</span>
                    </button>
                </div>
            </div>
            <div className="overflow-auto scrollbar-md d-flex flex-column gap-2 user-select-none p-3">
                {
                    discounts.length ?
                    discounts.map((discount)=>(
                        <div
                            className={`bg-darker position-relative p-3 rounded-4 pointer pointer-effect d-flex align-items-center justify-content-between border ${
                                selection.find((d)=>d.id === discount.id) ? 'border-orange text-orange' : 'border-lightly text-light'
                            }`}
                            onClick={()=>toggleDiscount(discount)}
                            role="button"
                            key={discount.id}
                        >
                            <div className="d-flex flex-fill align-items-center gap-3">
                                <AiOutlineTags className="display-5" />
                                <div className="d-flex flex-fill flex-column flex-lg-row align-items-stretch align-items-center gap-2">
                                    <div className="flex-fill">
                                        <div className="fw-semibold">{discount.attributes.title}</div>
                                        <div className="small">{discount.attributes.description}</div>
                                        <div className="d-flex">
                                            <div className="me-2">Price:</div>
                                            {discount.attributes.type === DISCOUNT_TYPE.fixedAmount && (
                                                <div className="fw-semibold">$</div>
                                            )}
                                            <div className="fw-semibold">{discount.attributes.amount}</div>
                                            {discount.attributes.type === DISCOUNT_TYPE.percentage && (
                                                <div className="fw-semibold">%</div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="d-flex flex-column justify-content-center small border-start border-lightly ps-2 ps-lg-3 user-select-none">
                                        <div>{utils.date.toLocalDate(discount.attributes.created)}</div>
                                        <div>Expire on: {utils.date.toLocalDate(discount.attributes.end)}</div>
                                    </div>
                                </div>
                            </div>
                            {selection.find((d)=>d.id === discount.id) && (
                                <FiCheckCircle className="position-absolute top-0 start-0 mt-1 ms-1" size={20} />
                            )}
                        </div>
                    )):
                    <div className="d-flex align-items-center justify-content-center my-4">
                        <div className="text-center p-5">
                            <MdLocalOffer size={64} className="mb-3" />
                            <h5>No Discounts Available</h5>
                            <p>There are currently no discounts applicable to this order.</p>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}