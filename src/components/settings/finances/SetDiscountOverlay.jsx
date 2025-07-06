import { useEffect, useState } from "react";
import { OverlayModal } from "../../OverlayModal";
import { FaPercent, FaDollarSign } from 'react-icons/fa';
import { api } from "../../../request/Api";
import { utils } from "../../../utils/Utils";
import { DISCOUNT_TYPE } from "../../../contents/Discounts";

const defaultDiscount = {
    id: null,
    title: '',
    description: '',
    amount: '',
    start: '',
    end: '',
    type: '',
    hide: false
};

export const SetDiscountOverlay = ({discountToBeEdited ,show, close, onSaved}) =>{
    const [discount, setDiscount] = useState(defaultDiscount);

    const save = () => {
        const data = {
            ...discount,
            start: utils.date.dbFormat(discount.start),
            end: utils.date.dbFormat(discount.end),
        };
        api.discount.set(data).then((response)=>{
            onSaved(response.data.data[0]);
            setDiscount(defaultDiscount);
        }).catch((error)=>{

        }).finally(()=>close?.());
    }

    useEffect(()=>{
        if(!discountToBeEdited) return;
        setDiscount({
            id: discountToBeEdited.id,
            title: discountToBeEdited.attributes.title,
            description: discountToBeEdited.attributes.description,
            amount: discountToBeEdited.attributes.amount,
            start: discountToBeEdited.attributes.start.split(' ')[0],
            end: discountToBeEdited.attributes.end.split(' ')[0],
            type: discountToBeEdited.attributes.type,
            hide: discountToBeEdited.attributes.hide
        });
    }, [discountToBeEdited]);

    return(
        <OverlayModal title="Add New Promotion" show={show} close={close}>
            {discountToBeEdited && (
                <div className="d-flex justify-content-end">
                    <div className="form-check form-switch">
                        <input
                            className="form-check-input shadow-none"
                            type="checkbox"
                            role="switch"
                            id="flexSwitchCheckDefault"
                            checked={discount.hide}
                            onChange={(e)=>setDiscount({...discount, hide: !e.target.checked})}
                        />
                        <label className="form-check-label" for="flexSwitchCheckDefault">Active</label>
                    </div>
                </div>
            )}
            <div className="mb-3">
                <label className="form-label small">Title</label>
                <input
                    className="form-control bg-dark border border-lightly shadow-none text-light"
                    value={discount.title}
                    onChange={(e)=>setDiscount({...discount, title: e.target.value})}
                    placeholder="e.g. 10% Off All Burgers"
                />
            </div>
            <div className="mb-3">
                <label className="form-label small">Description</label>
                <textarea
                    rows="2"
                    className="form-control bg-dark border border-lightly shadow-none text-light"
                    value={discount.description}
                    onChange={(e)=>setDiscount({...discount, description: e.target.value})}
                    placeholder="Optional details, e.g. Available for dine-in only"
                ></textarea>
            </div>
            <hr></hr>
            <label className="form-label small">Discount Type</label>
            <div className="d-flex gap-2 mb-3">
                <button
                    type="button"
                    className={`btn flex-fill ${discount.type === DISCOUNT_TYPE.percentage ? 'text-orange border border-lightly' : 'btn-outline-lightly'}`}
                    onClick={()=>setDiscount({...discount, type: DISCOUNT_TYPE.percentage})}
                >
                    <FaPercent className="me-1" /> Percentage
                </button>
                <button
                    type="button"
                    className={`btn flex-fill ${discount.type === DISCOUNT_TYPE.fixedAmount ? 'text-orange border border-lightly' : 'btn-outline-lightly'}`}
                    onClick={()=>setDiscount({...discount, type: DISCOUNT_TYPE.fixedAmount})}
                >
                    <FaDollarSign className="me-1" /> Fixed Amount
                </button>
            </div>
            <label className="form-label small">Discount Value</label>
            <div className="input-group">
                {discount.type === DISCOUNT_TYPE.fixedAmount && (
                    <span className="input-group-text bg-dark border border-lightly text-light">$</span>
                )}
                <input
                    type="number"
                    className="form-control bg-dark border border-lightly shadow-none text-light"
                    placeholder={discount.type === DISCOUNT_TYPE.percentage ? 'e.g. 10 for 10%' : 'e.g. 5 for $5 off'}
                    value={discount.amount}
                    onChange={(e)=>setDiscount({...discount, amount: e.target.value})}
                    min="0"
                    max={discount.type === DISCOUNT_TYPE.percentage ? 100 : undefined}
                />
                {discount.type === DISCOUNT_TYPE.percentage && (
                    <span className="input-group-text bg-dark border border-lightly text-light">%</span>
                )}
            </div>
            <hr></hr>
            <div className="row g-2">
                <div className="col">
                    <label className="form-label small">Start Date</label>
                    <input
                        type="date"
                        className="form-control bg-dark border border-lightly shadow-none text-light"
                        value={discount.start}
                        onChange={(e)=>setDiscount({...discount, start: e.target.value})}
                    />
                </div>
                <div className="col">
                    <label className="form-label small">End Date</label>
                    <input
                        type="date"
                        className="form-control bg-dark border border-lightly shadow-none text-light"
                        value={discount.end}
                        onChange={(e)=>setDiscount({...discount, end: e.target.value})}
                    />
                </div>
            </div>
            
            <div className="d-flex gap-3 mt-4">
                <button onClick={close} className="btn btn-sm btn-secondary">Cancel</button>
                <button className="btn btn-sm btn-outline-orange" onClick={save}>Save Promotion</button>
            </div>
        </OverlayModal>
    )
}