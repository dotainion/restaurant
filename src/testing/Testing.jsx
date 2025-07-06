import { useState } from "react"
import { DashboardMostOrdered } from "../components/dashboard/DashboardMostOrdered"
import { DashboardMostTypeOfOrder } from "../components/dashboard/DashboardMostTypeOfOrder"
import { DashboardReport } from "../components/dashboard/DashboardReport"
import { SetReservationOverlay } from "../components/SetReservationOverlay"
import { TimeFilter } from "../components/TimeFilter"
import { Dashboard } from "../pages/Dashboard"
import { Reservation } from "../pages/Reservation"
import { api } from "../request/Api"
import { Spinner } from "../widgets/Spinner"

export const Testing = () =>{
    const [data, setDate] = useState({});

    const click = () =>{
        api.order.list(data).then((response)=>{
            console.log(response.data.data.length);
        }).catch((error)=>{
            console.log(error);
        });
    }

    return(
        <div className="d-flex w-100 vh-100 align-items-center justify-content-center">
            <div className="text-end">
                <TimeFilter search={setDate} />
                <button onClick={click} className="mt-5">Click Me</button>
            </div>
        </div>
    )
}