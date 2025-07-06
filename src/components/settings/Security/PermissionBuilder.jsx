import { useEffect, useState } from "react";
import { IoAddSharp } from "react-icons/io5"
import { SetPermissionOverlay } from "./SetPermissionOverlay";
import { CiEdit } from "react-icons/ci";
import { api } from "../../../request/Api";
import { Spinner } from "../../../widgets/Spinner";

export const PermissionBuilder = ({readOnly, onSelect, params, selectedUser}) =>{
    const [roles, setRoles] = useState([]);
    
    const [overlay, setOverlay] = useState({show: false, state: null});
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        setLoading(true);
        api.user.listRoles(params).then((response)=>{
            setRoles(response.data.data);
        }).catch((error)=>{

        }).finally(()=>{
            setLoading(false);
        });
    }, [params]);

    return(
        <div className="row p-0 m-0 mt-2 position-relative">
            {!readOnly && (
                <div className="col-12 col-lg-6 col-xl-4 col-xxl-3 p-2" style={{minHeight: '200px'}}>
                    <div onClick={()=>setOverlay({show: true, state: null})} className="h-100 user-select-none">
                        <div className="bg-darker rounded-4 text-center border border-dash-orange pt-0 pointer h-100">
                            <div className="d-flex align-items-center justify-content-center h-100 p-3">
                                <div className="text-orange">
                                    <IoAddSharp className="fs-1"/>
                                    <div className="mt-3">Create new role</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {roles.map((role, key)=>(
                <div className="col-12 col-lg-6 col-xl-4 col-xxl-3 p-2" key={key}>
                    <div onClick={()=>readOnly && onSelect(role)} className={`${readOnly ? 'pointer pointer-effect rounded-4' : ''} h-100 user-select-none`}>
                        <div className={`d-flex flex-column bg-darker rounded-4 text-center border pt-0 h-100 ${selectedUser?.attributes?.role?.id === role.id ? 'border-orange' : 'border-dark'}`}>
                            <div className="p-3 mb-auto">
                                <div className="mb-3">{role.attributes.name}</div>
                                <div className="d-flex flex-wrap justify-content-center gap-1 my-2 small">
                                    <small className={`btn btn-sm cursor-default py-0 border-lightly border ${role.attributes.read ? 'text-orange' : 'text-secondary'}`}>Read</small>
                                    <small className={`btn btn-sm cursor-default py-0 border-lightly border ${role.attributes.write ? 'text-orange' : 'text-secondary'}`}>Write</small>
                                    <small className={`btn btn-sm cursor-default py-0 border-lightly border ${role.attributes.edit ? 'text-orange' : 'text-secondary'}`}>Edit</small>
                                    <small className={`btn btn-sm cursor-default py-0 border-lightly border ${role.attributes.delete ? 'text-orange' : 'text-secondary'}`}>Delete</small>
                                </div>
                                <div className="text-secondary">{role.attributes.details}</div>
                            </div>
                           {!readOnly && ( 
                                <button onClick={()=>setOverlay({show: true, state: role})} className={`btn ${role.attributes.hide ? 'bg-danger' : 'btn-orange'} bg-opacity-25 rounded-top-0 rounded-bottom-4 w-100`}>
                                    <span className="text-orange">View or</span>
                                    <CiEdit className="text-orange mx-2"/>
                                    <span className="text-orange">View or Edit Role</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            ))}
            <SetPermissionOverlay
                roleToEdit={overlay.state}
                show={overlay.show}
                close={()=>setOverlay({show: false, state: null})}
                onSave={(role)=>{
                    if(role.attributes.hide){
                        return setRoles((prev)=>prev.filter((r)=>r.id !== role.id));
                    }
                    setRoles((prev)=>prev.map((r)=>r.id === role.id ? role : r))
                }}
            />
            <Spinner show={loading} inline />
        </div>
    )
}