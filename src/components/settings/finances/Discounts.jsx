import React, { useEffect, useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaPercent, FaPlusCircle } from "react-icons/fa";
import { SetDiscountOverlay } from "./SetDiscountOverlay";
import { api } from "../../../request/Api";
import { Spinner } from "../../../widgets/Spinner";
import { utils } from "../../../utils/Utils";

export const Discounts = () => {
    const [promotions, setPromotions] = useState([]);
    const [showModal, setShowModal] = useState({show: false, discount: null});
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        api.discount.list().then((response)=>{
            setPromotions(response.data.data);
        }).catch((error)=>{

        }).finally(()=>{
            setLoading(false);
        });
    }, []);

    return (
        <div className="container py-4 position-relative h-100">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>Discounts & Promotions</h3>
                <button onClick={()=>setShowModal({show: true, discount: null})} className="d-flex align-items-center gap-2 btn border border-lightly text-light">
                    <FaPlus />
                    <span>Add Promotion</span>
                </button>
            </div>

            <div className="table-responsive shadow-sm">
                <table className="table table-bordered table-hover">
                    <thead className="table-light">
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Discount</th>
                            <th>Dates</th>
                            <th>Status</th>
                            <th style={{width: "100px"}}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {promotions.map((promo) => (
                            <tr className="border border-lightly" key={promo.id}>
                                <td>{promo.attributes.title}</td>
                                <td>{promo.attributes.description}</td>
                                <td>{promo.attributes.discount}</td>
                                <td>{utils.date.toLocalDateTime(promo.attributes.start)} - {utils.date.toLocalDateTime(promo.attributes.end)}</td>
                                <td>
                                    <span className={`badge ${promo.attributes.expired ? 'bg-danger' : 'bg-success'}`}>
                                        {promo.attributes.expired ? 'Expired' : 'Active'}
                                    </span>
                                </td>
                                <td>
                                    <div className="d-flex gap-2">
                                        <button onClick={()=>setShowModal({show: true, discount: promo})} className="d-flex align-items-center btn btn-sm btn-outline-secondary">
                                            <FaEdit />
                                        </button>
                                        <button className="d-flex align-items-center btn btn-sm btn-outline-danger">
                                            <FaTrash />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {!loading && !promotions.length && (
                    <div className="text-center py-5">
                        <div className="mb-3"><FaPercent size={48} /></div>
                        <h4>No Discounts Available</h4>
                        <p>You haven’t created any discounts yet. Add one to attract more customers or increase loyalty.</p>
                        <button onClick={()=>setShowModal({show: true, discount: null})} className="mx-auto d-flex align-items-center gap-2 btn border border-lightly text-light mt-3">
                            <FaPlusCircle />
                            <span>Add Discount</span>
                        </button>
                    </div>
                )}
            </div>
            <SetDiscountOverlay
                discountToBeEdited={showModal.discount}
                show={showModal.show}
                close={()=>setShowModal({show: false, discount: null})}
                onSaved={(discount)=>{
                    if(showModal.discount){
                        return setPromotions((promos)=>promos.map((promo)=>{
                            if(promo.id === discount.id) return discount;
                            return promo;
                        }));
                    }
                    setPromotions((promos)=>[discount, ...promos]);
                }}
            />
            <Spinner show={loading} inline transparent />
        </div>
    )
}
