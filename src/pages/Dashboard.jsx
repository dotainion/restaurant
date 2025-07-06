import { DashboardRevenue } from "../components/dashboard/DashboardRevenue";
import { DashboardReport } from "../components/dashboard/DashboardReport";
import { DashboardMostOrdered } from "../components/dashboard/DashboardMostOrdered";
import { DashboardMostTypeOfOrder } from "../components/dashboard/DashboardMostTypeOfOrder";

export const Dashboard = () =>{
    return(
        <div className="d-flex flex-column flex-md-row vh-100 overflow-auto text-light">
            <div className="col-12 col-md-8 p-0">
                <div className="d-flex flex-column gap-3 vh-100 p-3 pe-2">
                    <DashboardRevenue/>
                    <DashboardReport/>
                </div>
            </div>
            <div className="col-12 col-md-4 p-0">
                <div className="d-flex flex-column gap-2 vh-100 p-3 ps-2">
                    <DashboardMostOrdered/>
                    <DashboardMostTypeOfOrder/>
                </div>
            </div>
        </div>
    )
}