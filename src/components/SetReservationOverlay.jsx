import { OverlayModal } from "./OverlayModal"
import { FaUser, FaPhone, FaEnvelope, FaCalendarAlt, FaClock, FaUsers, FaStickyNote } from 'react-icons/fa';
import { AiOutlineSave, AiOutlinePlusCircle } from 'react-icons/ai'
import { useEffect, useRef } from "react";
import { api } from "../request/Api";
import { utils } from "../utils/Utils";
import { useUtils } from "../providers/UtilsProvider";
import { GrStatusWarning } from "react-icons/gr";

export const SetReservationOverlay = ({show, close, onSave, reservationToEdit}) =>{
    const { toast } = useUtils();
    
    const idRef = useRef(null);
    const statusRef = useRef();
    const nameRef = useRef();
    const numberRef = useRef();
    const emailRef = useRef();
    const dateRef = useRef();
    const timeRef = useRef();
    const peopleRef = useRef();
    const noteRef = useRef();

    const save = () =>{
        const data = {
            id: idRef.current,
            status: statusRef.current?.value || 'pending',
            name: nameRef.current.value,
            number: numberRef.current.value,
            email: emailRef.current.value,
            date: utils.date.dbFormat(utils.date.bindFromInputValue(dateRef.current.value, timeRef.current.value)),
            people: peopleRef.current.value,
            note: noteRef.current.value,
        }
        api.reservation.set(data).then((response)=>{
            onSave?.(response.data.data[0]);
            close?.();
        }).catch((error)=>{
            toast.error(error);
        });
    }

    useEffect(()=>{
        if(!reservationToEdit){
            idRef.current = null;
            return;
        }
        const [datePart, timePart] = reservationToEdit.attributes.date.split(' ');
        idRef.current = reservationToEdit.id;
        statusRef.current.value = reservationToEdit.attributes.status;
        nameRef.current.value = reservationToEdit.attributes.name;
        numberRef.current.value = reservationToEdit.attributes.number;
        emailRef.current.value = reservationToEdit.attributes.email;
        dateRef.current.value = datePart;
        timeRef.current.value = timePart.slice(0, 5);
        peopleRef.current.value = reservationToEdit.attributes.people;
        noteRef.current.value = reservationToEdit.attributes.note;
    }, [reservationToEdit]);

    return(
        <OverlayModal title={`${reservationToEdit ? 'Edit' : 'Create new'} Reservation`} show={show} close={close}>
            <div className="flex-fill details">
                {reservationToEdit && (
                    <div className="mb-3">
                        <label className="small mb-1">Status</label>
                        <div className="input-group">
                            <span className="input-group-text bg-dark text-light border border-lightly"><GrStatusWarning /></span>
                            <select ref={statusRef} className="form-control form-select bg-dark text-light border border-lightly shadow-none">
                                <option value="pending">Pending</option>
                                <option value="arrived">Arrived</option>
                                <option value="canceled">Canceled</option>
                            </select>
                        </div>
                    </div>
                )}
                <div className="mb-3">
                    <label className="small mb-1">Full name</label>
                    <div className="input-group">
                        <span className="input-group-text bg-dark text-light border border-lightly"><FaUser /></span>
                        <input ref={nameRef} className="bg-dark text-light form-control border border-lightly shadow-none" placeholder="Full name..." />
                    </div>
                </div>
                <div className="mb-3">
                    <label className="small mb-1">Phone number</label>
                    <div className="input-group">
                        <span className="input-group-text bg-dark text-light border border-lightly"><FaPhone /></span>
                        <input ref={numberRef} className="bg-dark text-light form-control border border-lightly shadow-none" placeholder="Phone number..." />
                    </div>
                </div>
                <div className="mb-3">
                    <label className="small mb-1">Email</label>
                    <div className="input-group">
                        <span className="input-group-text bg-dark text-light border border-lightly"><FaEnvelope /></span>
                        <input ref={emailRef} type="email" className="bg-dark text-light form-control border border-lightly shadow-none" placeholder="Email..." />
                    </div>
                </div>
                <div className="d-flex gap-2">
                    <div className="w-100 mb-3">
                        <label className="small mb-1">Date</label>
                        <div className="input-group">
                            <span className="input-group-text bg-dark text-light border border-lightly"><FaCalendarAlt /></span>
                            <input ref={dateRef} type="date" className="bg-dark text-light form-control border border-lightly shadow-none" />
                        </div>
                    </div>
                    <div className="w-100 mb-3">
                        <label className="small mb-1">Time</label>
                        <div className="input-group">
                            <span className="input-group-text bg-dark text-light border border-lightly"><FaClock /></span>
                            <input ref={timeRef} type="time" className="bg-dark text-light form-control border border-lightly shadow-none" />
                        </div>
                    </div>
                </div>
                <div className="mb-3">
                    <label className="small mb-1">People</label>
                    <div className="input-group">
                        <span className="input-group-text bg-dark text-light border border-lightly"><FaUsers /></span>
                        <input ref={peopleRef} className="bg-dark text-light form-control border border-lightly shadow-none" placeholder="People quantity..." type="number" min={1} />
                    </div>
                </div>
                <div className="mb-5">
                    <label className="small mb-1">Note</label>
                    <div className="input-group">
                        <span className="input-group-text bg-dark text-light border border-lightly"><FaStickyNote /></span>
                        <textarea ref={noteRef} rows={5} className="bg-dark text-light form-control border border-lightly shadow-none" placeholder="Enter a description" />
                    </div>
                </div>
                <button onClick={save} className="d-flex align-items-center justify-content-center gap-2 btn btn-orange w-100">
                    {reservationToEdit ? 'Save' : 'Reserve'} Reservation {reservationToEdit ? <AiOutlineSave /> : <AiOutlinePlusCircle />}
                </button>
            </div>
        </OverlayModal>
    )
}