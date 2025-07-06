import { LuSettings2 } from "react-icons/lu"
import { ReservationCardBuilder } from "../components/ReservationCardBuilder"
import { DateDisplay } from "../components/DateDisplay"
import { useEffect, useState } from "react";
import { api } from "../request/Api";
import { utils } from "../utils/Utils";
import { Spinner } from "../widgets/Spinner";
import { TimeFilter } from "../components/TimeFilter";

export const Reservation = () =>{
    const [loading, setLoading] =  useState(false);
    const [reservations, setReservations] = useState([]);
    const [status, setStatus] = useState(null);
    const [filter, setFilter] = useState({});

    const search = (data) =>{
        setLoading(true);
        api.reservation.list(data).then((response)=>{
            setReservations(response.data.data);
        }).catch((error)=>{
            setReservations([]);
        }).finally(()=>{
            setLoading(false);
        });
    }

    useEffect(()=>{
        search({...filter, status});
    }, [status, filter]);

    return(
        <div className="d-flex flex-column vh-100 p-0 text-light position-relative">
            <div className="border-bottom border-lightly d-flex justify-content-between flex-wrap gap-2 px-3 py-2">
                <div>
                    <h5>Reservation</h5>
                    <DateDisplay />
                </div>
                <div className="d-flex align-items-center text-nowrap flex-wrap gap-3">
                    <TimeFilter search={setFilter} noSatus noHidden />
                    <div className="dropdown">
                        <button className="d-flex align-items-center gap-2 btn btn-sm bg-dark border border-lightly text-light" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <LuSettings2/>
                            <span>Status</span>
                        </button>
                        <ul className="dropdown-menu bg-darker">
                            <li><a onClick={()=>setStatus(null)} className="dropdown-item">All</a></li>
                            <li><a onClick={()=>setStatus('pending')} className="dropdown-item">Pending</a></li>
                            <li><a onClick={()=>setStatus('arrived')} className="dropdown-item">Arrived</a></li>
                            <li><a onClick={()=>setStatus('canceled')} className="dropdown-item">Canceled</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="overflow-auto scrollbar-md">
                <ReservationCardBuilder
                    reservations={reservations}
                    onSave={(record)=>{
                        const found = reservations.find((re)=>re.id === record.id);
                        if(!found) return setReservations((reserves)=>[record, ...reserves]);
                        setReservations((reserves)=>reserves.map((rese)=>{
                            if(rese.id === record.id) return record;
                            return rese;
                        }));
                    }}
                />
            </div>
            <Spinner sm inline show={loading} />
        </div>
    )
}
