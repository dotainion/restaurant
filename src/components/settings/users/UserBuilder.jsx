import { useEffect, useState } from "react";
import { IoAddSharp } from "react-icons/io5"
import { SetUserOverlay } from "./SetUserOverlay";
import { GrShieldSecurity } from "react-icons/gr";
import { api } from "../../../request/Api";
import { Spinner } from "../../../widgets/Spinner";

export const UserBuilder = ({assignRole}) =>{
    const [show, setShow] = useState({show: false, state: null});
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        api.user.users().then((response)=>{
            setUsers(response.data.data);
        }).catch((error)=>{

        }).finally(()=>{
            setLoading(false);
        });
    }, []);

    return(
        <div className="row p-0 m-0 mt-3 position-relative">
            <div className="col-12 col-lg-6 col-xl-4 col-xxl-3 p-2" style={{minHeight: '250px'}}>
                <div onClick={()=>setShow({show: true, state: null})} className="h-100 user-select-none">
                    <div className="bg-darker rounded-4 text-center border border-dash-orange pt-0 pointer h-100">
                        <div className="d-flex align-items-center justify-content-center h-100 p-3">
                            <div className="text-orange">
                                <IoAddSharp className="fs-1"/>
                                <div className="mt-3">Create new user</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {users.map((user)=>(
                <div className="col-12 col-lg-6 col-xl-4 col-xxl-3 p-2" key={user.id}>
                    <div className="h-100 user-select-none">
                        <div className="d-flex flex-column bg-darker rounded-4 text-center border border-dark pt-0 h-100">
                            <div className="p-3 mb-auto">
                                <div className="mb-2 text-break">{user.attributes.fullName}</div>
                                <div className="mb-2 text-break">{user.attributes.phoneNumber}</div>
                                <div className="mb-2 text-break">{user.attributes.email}</div>
                            </div>
                            <div className="d-flex justify-content-end px-3">
                                <div className="text-secondary">{user.attributes.role.attributes.role}</div>
                            </div>
                            <button onClick={()=>setShow({show: true, state: user})} className="d-flex align-items-center justify-content-center flex-wrap gap-3 btn btn-orange bg-opacity-25 rounded-top-0 rounded-bottom-4 w-100">
                                <span onClick={()=>assignRole(user)} className="link-orange d-flex align-items-center gap-1- btn border-0 p-0">
                                    <GrShieldSecurity />
                                    <span>Assign Role</span>
                                </span>
                                <span onClick={()=>setShow({show: true, state: user})} className="link-orange btn border-0 p-0">Edit User</span>
                            </button>
                        </div>
                    </div>
                </div>
            ))}
            <SetUserOverlay
                userToEdit={show.state}
                show={show.show}
                close={()=>setShow({show: false, state: null})}
                update={(data)=>{
                    setUsers((items)=>items.map((item)=>item.id === data.id ? data : item));
                }}
            />
            <Spinner show={loading} inline />
        </div>
    )
}