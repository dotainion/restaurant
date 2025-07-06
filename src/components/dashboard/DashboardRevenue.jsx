import { CiDollar } from "react-icons/ci";
import { IoPeopleOutline } from "react-icons/io5";
import { TfiTag } from "react-icons/tfi";
import { IoMdArrowUp, IoMdArrowDown } from "react-icons/io";
import { DateDisplay } from "../DateDisplay";

export const DashboardRevenue = () =>{
    return(
        <div>
            <h5>Dashboard</h5>
            <DateDisplay />
            <hr></hr>
            <div className="d-flex flex-column flex-sm-row gap-3">
                <div className="card w-100">
                    <div className="card-body">
                        <div className="d-flex flex-wrap gap-2">
                            <CiDollar className="bg-secondary bg-opacity-25 rounded-2 p-1 fs-3"/>
                            <div className="flex-fill">+32.40%</div>
                            <IoMdArrowUp className="bg-success bg-opacity-25 rounded-circle text-success p-1 fs-4"/>
                        </div>
                        <div className="h4 my-2">$0.0</div>
                        <div className="small">Total Revenue</div>
                    </div>
                </div>
                <div className="card w-100">
                    <div className="card-body">
                        <div className="d-flex flex-wrap gap-2">
                            <TfiTag className="bg-secondary bg-opacity-25 rounded-2 p-1 fs-3"/>
                            <div className="flex-fill">-0.0%</div>
                            <IoMdArrowDown className="bg-danger bg-opacity-25 rounded-circle text-danger p-1 fs-4"/>
                        </div>
                        <div className="h4 my-2">0.0</div>
                        <div className="small">Total Dish Ordered</div>
                    </div>
                </div>
                <div className="card w-100">
                    <div className="card-body">
                        <div className="d-flex flex-wrap gap-2">
                            <IoPeopleOutline className="bg-secondary bg-opacity-25 rounded-2 p-1 fs-3"/>
                            <div className="flex-fill">+0.0%</div>
                            <IoMdArrowUp className="bg-success bg-opacity-25 rounded-circle text-success p-1 fs-4"/>
                        </div>
                        <div className="h4 my-2">0.0</div>
                        <div className="small">Total Customer</div>
                    </div>
                </div>
            </div>
        </div>
    )
}