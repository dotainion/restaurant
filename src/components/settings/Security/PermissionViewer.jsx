import { MdOutlineSecurity } from "react-icons/md"
import { PermissionBuilder } from "./PermissionBuilder"
import { useState } from "react"

export const PermissionViewer = () =>{
    const [hide, setHide] = useState(false);
    return(
        <div className="py-4 px-2 px-sm-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex align-items-center gap-2">
                    <MdOutlineSecurity size={22} />
                    <h4>Permissions</h4>
                </div>
                <div className="form-check form-switch">
                    <input
                        onChange={(e)=>setHide(e.target.checked)}
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="view-all-role"
                        checked={hide}
                    />
                    <label className="form-check-label text-light" htmlFor="view-all-role">View All</label>
                </div>
            </div>
            <PermissionBuilder params={{hide: hide ? [true, false] : false}} />
        </div>
    )
}