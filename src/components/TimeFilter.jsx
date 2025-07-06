import { useEffect, useState } from "react";
import { utils } from "../utils/Utils";
import { STATUS } from "../contents/Products";

const date = new Date();
date.setDate(date.getDate() -30);

export const TimeFilter = ({search, noSatus, noHidden}) =>{
    const [fromDate, setFromDate] = useState(utils.date.dbFormat(date).split(' ')[0]);
    const [toDate, setToDate] = useState(utils.date.dbFormat(new Date()).split(' ')[0]);
    const [fromTime, setFromTime] = useState(utils.date.startOfDay(date).split(' ')[1]);
    const [toTime, setToTime] = useState(utils.date.endOfDay(new Date()).split(' ')[1]);
    const [filter, setFiler] = useState(null);
    const [status, setStatus] = useState(null);
    const [hide, setHide] = useState(false);

    const passDays = (days=0) =>{
        const date = new Date();
        date.setDate(date.getDate() -days);
        setFromDate(utils.date.startOfDay(date).split(' ')[0]);
        setToDate(utils.date.endOfDay(new Date()).split(' ')[0]);
    }
    
    const yesterday = () =>{
        const date = new Date();
        date.setMonth(date.getDay() -1);
        setFromDate(utils.date.startOfDay(date).split(' ')[0]);
        setToDate(utils.date.endOfDay(date).split(' ')[0]);
    }

    const today = () =>{
        setFromDate(utils.date.startOfDay(new Date()).split(' ')[0]);
        setToDate(utils.date.endOfDay(new Date()).split(' ')[0]);
    }

    const change = (e) =>{
        setFiler(e.target.value);
        if(e.target.value === 'today') return today();
        if(e.target.value === 'yesterday') return yesterday();
        if(e.target.value === '7-days') return passDays(7);
        if(e.target.value === '14-days') return passDays(14);
        if(e.target.value === '30-days') return passDays(30);
        if(e.target.value === '60-days') return passDays(60);
        if(e.target.value === '90-days') return passDays(90);
    }

    const statuses = (e) =>{
        let statusValue = e.target.value;
        if(e.target.value === '') statusValue = null;
        setStatus(statusValue);
    }
    
    useEffect(()=>{
        search({
            hide,
            status,
            from: utils.date.startOfDay(utils.date.bindFromInputValue(fromDate, fromTime)), 
            to: utils.date.endOfDay(utils.date.bindFromInputValue(toDate, toTime))
        });
    }, [fromDate, toDate, fromTime, toTime, status, hide]);

    return(
        <div className="d-flex align-items-center flex-wrap gap-2 user-select-none">
            <div onChange={()=>setFiler('')} className="d-flex align-items-center border border-lightly rounded-2 bg-dark">
                <small className="text-secondary ps-2">From</small>
                <input
                    onChange={(e)=>setFromDate(e.target.value)}
                    className="form-control form-control-sm bg-transparent text-light border-0 shadow-none w-auto pe-0"
                    value={fromDate}
                    type="date"
                />
                <input
                    onChange={(e)=>setFromTime(e.target.value)}
                    className="form-control form-control-sm bg-transparent text-light border-0 shadow-none w-auto ps-0"
                    value={fromTime}
                    type="time"
                />
            </div>
            <div onChange={()=>setFiler('')} className="d-flex align-items-center border border-lightly rounded-2 bg-dark">
                <small className="text-secondary ps-2">To</small>
                <input
                    onChange={(e)=>setToDate(e.target.value)}
                    className="form-control form-control-sm bg-transparent text-light border-0 shadow-none w-auto pe-0"
                    value={toDate}
                    type="date"
                />
                <input
                    onChange={(e)=>setToTime(e.target.value)}
                    className="form-control form-control-sm bg-transparent text-light border-0 shadow-none w-auto ps-0"
                    value={toTime}
                    type="time"
                />
            </div>
            <select onChange={change} className="form-control form-control-sm text-capitalize form-select form-select-sm bg-dark border border-lightly text-light shadow-none w-auto" value={filter}>
                <option value="" hidden>Filter</option>
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="7-days">Pass 7 Days</option>
                <option value="14-days">Pass 2 Weeks</option>
                <option value="30-days">Pass 30 Days</option>
                <option value="60-days">Pass 60 Days</option>
                <option value="90-days">Pass 90 Days</option>
            </select>
            {!noSatus && (
                <select onChange={statuses} className="form-control form-control-sm text-capitalize form-select form-select-sm bg-dark border border-lightly text-light shadow-none w-auto">
                    <option value="" hidden>Status</option>
                    <option value="">All</option>
                    {Object.keys(STATUS).map((status)=>(
                        <option value={status} key={status}>{status} Orders</option>
                    ))}
                    <option className="text-danger" value="hide">Deleted Records</option>
                </select>
            )}
            {!noHidden && (
                <div class="form-check">
                    <input onChange={(e)=>setHide(e.target.checked)} className="form-check-input bg-dark shadow-none" type="checkbox" id="filter-hidden" checked={hide} />
                    <label className="form-check-label" htmlFor="filter-hidden">
                        Hidden
                    </label>
                </div>
            )}
        </div>
    )
}