import { useEffect, useState } from "react";
import { IoAddSharp } from "react-icons/io5";
import { SetReservationOverlay } from "./SetReservationOverlay";
import { utils } from "../utils/Utils";
import { useUtils } from "../providers/UtilsProvider";
import { api } from "../request/Api";
import { Spinner } from "../widgets/Spinner";

export const ReservationCardBuilder = ({reservations, onSave}) =>{
    const { toast } = useUtils();

    const [overlay, setOverlay] = useState({reservation: null, show: false});
    
    const save = (reserves, status, final) =>{
        const data = {
            ...reserves, 
            ...reserves.attributes, 
            status
        }
        api.reservation.set(data).then((response)=>{
            onSave?.(response.data.data[0]);
        }).catch((error)=>{
            toast.error(error);
        }).finally(()=>final());
    }

    return(
        <div className="d-flex flex-wrap px-0 mt-3">
            <div onClick={()=>setOverlay({reservation: null, show: true})} className="col-12 col-md-6  col-lg-6 col-xl-4 col-xxl-3 p-2" style={{minHeight: '150px'}}>
                <div className="h-100 user-select-none">
                    <div className="bg-darker rounded-4 text-center border border-dash-orange pt-0 pointer h-100">
                        <div className="d-flex align-items-center justify-content-center h-100 p-3">
                            <div className="text-orange">
                                <IoAddSharp className="fs-1"/>
                                <div className="mt-3">Add new reservation</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                reservations.length ?
                reservations.map((resv)=>(
                    <div className="col-12 col-md-6 col-lg-6 col-xl-4 col-xxl-3 p-2" key={resv.id}>
                        <div className="text-secondary- bg-darker rounded-4 text-center p-3 h-100 user-select-none">
                            <div className="d-flex flex-wrap">
                                <div className="flex-fill text-start mb-2">
                                    <div className="text-orange fw-bold">{resv.attributes.name}</div>
                                    <div className="text-secondary small">{resv.attributes.number}</div>
                                    <div className="text-secondary small">{resv.attributes.email}</div>
                                </div>
                                <div className="d-flex flex-column bg-dark rounded-3 text-orange small p-2">
                                    <div className="">{utils.date.toLocalDate(resv.attributes.date)}</div>
                                    <div className="mb-2">{utils.date.toLocalTime(resv.attributes.date)}</div>
                                    {resv.attributes.status === 'pending' && (
                                        <span className="bg-warning text-dark px-2 rounded-pill small">Pending</span>
                                    )}
                                    {resv.attributes.status === 'arrived' && (
                                        <span className="bg-success text-light px-2 rounded-pill small">Arrived</span>
                                    )}
                                    {resv.attributes.status === 'canceled' && (
                                        <span className="bg-danger text-light px-2 rounded-pill small">Canceled</span>
                                    )}
                                </div>
                            </div>
                            <div className="bg-dark rounded-3 p-2 mt-2">
                                {
                                    resv.attributes.people > 1 
                                        ? <div className="bg-dark">{resv.attributes.people} People at NA Branch</div>
                                        : <div className="bg-dark">1 Person at NA Branch</div>
                                }
                                <div className="bg-dark">{resv.attributes.note}</div>
                                <div className="d-flex flex-wrap justify-content-center gap-2 mt-3">
                                    <ButtonLoader
                                        reservation={resv}
                                        onChange={((final)=>save(resv, 'canceled', final))}
                                        status="canceled"
                                    />
                                    <ButtonLoader
                                        reservation={resv}
                                        onChange={((final)=>save(resv, 'arrived', final))}
                                        status="arrived"
                                    />
                                    <button
                                        onClick={()=>setOverlay({reservation: resv, show: true})}
                                        className="btn btn-sm btn-secondary"
                                        style={{minWidth: '75px'}}
                                    >Edit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )):
                <div className="col-12 d-flex flex-column justify-content-center">
                    <div className="text-center p-5 rounded-4">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/4525/4525879.png"
                            alt="No reservations"
                            style={{width: "70px", height: "70px", opacity: 0.5}}
                            className="mb-3"
                        />
                        <h5 className="fw-semibold mb-2">No Reservations Found</h5>
                        <p className="small mb-3">There are currently no reservations. They will appear here once guests book a table.</p>
                        <button 
                            onClick={()=>setOverlay({reservation: null, show: true})}
                            className="btn btn-outline-orange border-orange"
                        >+ Add Reservation</button>
                    </div>
                </div>
            }
            <SetReservationOverlay 
                reservationToEdit={overlay.reservation}
                show={overlay.show}
                close={()=>setOverlay({reservation: null, show: false})}
                onSave={onSave}
            />
        </div>
    )
}

const ButtonLoader = ({onChange, reservation, status}) =>{
    const [loading, setLoading] = useState(false);

    const action = () =>{
        setLoading(true);
        onChange(()=>setLoading(false));
    }

    return(
        <button
            onClick={action}
            className={`btn btn-sm btn-${status === 'canceled' ? 'danger' : 'success'} position-relative`}
            style={{minWidth: '75px'}}
            disabled={reservation.attributes.status === status}
        >
            <span className="text-capitalize">{status}</span>
            {loading && <Spinner show sm inline />}
        </button>
    )
}