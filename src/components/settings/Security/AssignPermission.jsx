import { useEffect, useState } from 'react';
import { FiShield } from 'react-icons/fi';
import { PermissionBuilder } from './PermissionBuilder';
import { api } from '../../../request/Api';
import { useUtils } from '../../../providers/UtilsProvider';
import { Spinner } from '../../../widgets/Spinner';
import { useParams } from 'react-router-dom';

export const AssignPermission = () =>{
    const { toast } = useUtils();

    const [user, setUser] = useState();

    const params = useParams();

    const onRoleSelect = (role) =>{
        api.user.assignRole(user.id, role.id).then((response)=>{
            setUser((prevUser)=>({...prevUser, attributes: {role: response.data.data[0]}}));
            toast.success('Role assign successfully.');
        }).catch((error)=>{
            toast.error(error);
        });
    }

    useEffect(()=>{
        if(!params?.userId) return;
        api.user.user(params.userId).then((response)=>{
            setUser(response.data.data[0]);
        }).catch((error)=>{

        });
    }, []);

    return(
        <div className="position-relative p-sm-4 p-2 bg-dark text-light rounded shadow-sm h-100">
            <div className="mb-4 d-flex align-items-center justify-content-between gap-3">
                <h4 className="d-flex align-items-center gap-2"><FiShield size={22} /> Security Permission</h4>
            </div>
            <div className="row p-0 m-0">
                <div className="col-12 col-lg-6">
                    <input className="form-control shadow-none border border-lightly bg-darker text-light" placeholder="Search users.."/>
                </div>
            </div>
            {user 
                ? <PermissionBuilder
                    readOnly
                    onSelect={onRoleSelect}
                    selectedUser={user}
                />
                : <Spinner show inline transparent />
            }
        </div>
    )
}