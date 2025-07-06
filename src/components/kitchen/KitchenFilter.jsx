import { Fragment } from "react"
import { BiRefresh } from "react-icons/bi";
import { TimeFilter } from "../TimeFilter";

export const KitchenFilter = ({title, icon, reload, search}) =>{
    return(
        <Fragment>
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-2">
                <div className="d-flex flex-wrap align-items-center gap-2">
                    {icon}
                    <h5>{title}</h5>
                    <button
                        onClick={reload}
                        className="btn btn-sm border border-lightly text-light d-flex align-items-center gap-2 ms-3"
                    >
                        <BiRefresh/>
                        <span>Referesh</span>
                    </button>
                </div>
                <TimeFilter search={search} />
            </div>
            <hr></hr>
        </Fragment>
    )
}