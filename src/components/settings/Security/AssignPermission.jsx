import { useState } from 'react';
import { FiShield } from 'react-icons/fi';
import { UserBuilder } from '../users/UserBuilder';
import { PermissionBuilder } from './PermissionBuilder';
import { api } from '../../../request/Api';
import { useUtils } from '../../../providers/UtilsProvider';

export const AssignPermission = () =>{
    const { toast } = useUtils();

    const [user, setUser] = useState(null);

    const onRoleSelect = (role) =>{
        api.user.assignRole(user.id, role.id).then((response)=>{
            setUser(null);
        }).catch((error)=>{
            toast.error(error);
        });
    }

    return(
        <div className="p-sm-4 p-2 bg-dark text-light rounded shadow-sm h-100">
            <div className="mb-4 d-flex align-items-center justify-content-between gap-3">
                <h4 className="d-flex align-items-center gap-2"><FiShield size={22} /> Security Permission</h4>
                {user && <button onClick={()=>setUser(null)} className="btn btn-sm btn-outline-orange">View Users</button>}
            </div>
            <div className="row p-0 m-0">
                <div className="col-12 col-lg-6">
                    <input className="form-control shadow-none border border-lightly bg-darker text-light" placeholder="Search users.."/>
                </div>
            </div>
            {
                user
                ? <PermissionBuilder readOnly onSelect={onRoleSelect} selectedUser={user} />
                : <UserBuilder assignRole={setUser} />
            }
        </div>
    )
}