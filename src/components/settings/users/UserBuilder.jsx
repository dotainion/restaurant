import { useEffect, useState } from "react";
import { IoAddSharp } from "react-icons/io5"
import { api } from "../../../request/Api";
import { Spinner } from "../../../widgets/Spinner";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export const UserBuilder = () =>{
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

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
                <div onClick={()=>navigate(`/settings/profile/account/${uuidv4()}`)} className="h-100 user-select-none">
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
                        <div onClick={()=>navigate(`/settings/profile/account/${user.id}`)} className="d-flex flex-column bg-darker rounded-4 text-center border border-dark pointer pointer-effect pt-0 h-100">
                            <div className="p-3 mb-auto">
                                <div className="mb-2 text-break">{user.attributes.fullName}</div>
                                <div className="mb-2 text-break">{user.attributes.phoneNumber}</div>
                                <div className="mb-2 text-break">{user.attributes.email}</div>
                            </div>
                            <div className="d-flex justify-content-end px-3 pb-3">
                                <div className="text-secondary">{user.attributes.role.attributes.role}</div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            <Spinner show={loading} inline />
        </div>
    )
}