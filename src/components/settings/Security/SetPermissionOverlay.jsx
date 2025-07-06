import React, { useEffect, useRef, useState } from 'react';
import { OverlayModal } from "../../OverlayModal"
import { FiUserPlus } from 'react-icons/fi';
import { PERMISSIONS } from '../../../permission/Permission';
import { MdDataSaverOn } from 'react-icons/md';
import { api } from '../../../request/Api';
import { useUtils } from '../../../providers/UtilsProvider';

export const SetPermissionOverlay = ({roleToEdit, show, close, onSave}) =>{
    const { toast } = useUtils();

    const [role, setRole] = useState({
        id: null, 
        name: '', 
        role: '', 
        description: '', 
        r: false, 
        w: false, 
        e: false, 
        d: false,
        hide: false
    });

    const save = () =>{
        const data = {
            id: role.id,
            name: role.name,
            role: role.role,
            details: role.description,
            read: role.r,
            write: role.w,
            edit: role.e,
            delete: role.d,
            hide: role.hide
        }
        api.user.setRole(data).then((response)=>{
            onSave(response.data.data[0]);
            close?.();
        }).catch((error)=>{
            toast.error(error);
        });
    }

    const toggleRole = (name, value) =>{
        setRole((prev)=>({
            ...prev,
            [name]: value
        }));
    }

    useEffect(()=>{
        if(!roleToEdit){
            setRole({id: null,  name: '',  role: '',  description: '',  r: false,  w: false,  e: false,  d: false, hide: false});
            return;
        }
        setRole({
            id: roleToEdit.id, 
            name: roleToEdit.attributes.name, 
            role: roleToEdit.attributes.role, 
            description: roleToEdit.attributes.description, 
            r: roleToEdit.attributes.read, 
            w: roleToEdit.attributes.write, 
            e: roleToEdit.attributes.edit, 
            d: roleToEdit.attributes.delete, 
            hide: roleToEdit.attributes.hide
        });
    }, [roleToEdit, show]);

    return(
        <OverlayModal title="Create Role" show={show} close={close}>
            <div className="w-100 m-auto" style={{minWidth: '500px', maxWidth: '500px'}}>
                <h4 className="text-light mb-4 d-flex align-items-center gap-2"><FiUserPlus />{roleToEdit ? 'Edit' : 'Create'} Permission</h4>
                <div className="mb-4">
                    {roleToEdit && (
                        <div className="mb-3">
                            <div className="form-check form-switch">
                                <input
                                    onChange={(e)=>toggleRole('hide', e.target.checked)}
                                    className="form-check-input"
                                    type="checkbox"
                                    role="switch"
                                    id="hide-role"
                                    checked={role.hide}
                                />
                                <label className="form-check-label text-light" htmlFor="hide-role">Delete Role</label>
                            </div>
                        </div>
                    )}
                    <div className="mb-3">
                        <label className="form-label text-light">Role Name</label>
                        <input 
                            onChange={(e)=>toggleRole('name', e.target.value)}
                            className="form-control bg-dark border border-lightly text-light shadow-none" 
                            placeholder="e.g. Bar Manager"
                            value={role.name}
                        />
                    </div>
                    <div>
                        <label className="form-label text-light">Role Description</label>
                        <textarea 
                            onChange={(e)=>toggleRole('description', e.target.value)}
                            className="form-control bg-dark border border-lightly text-light shadow-none" 
                            value={role.description}
                        />
                    </div>
                </div>

                <hr></hr>

                <div className="text-secondary small mb-1">Select a permission</div>
                <div className="d-flex flex-wrap gap-2 mb-3 user-select-none">
                    <label className={`${role.r ? 'bg-orange border-orange' : 'border-lightly'} d-flex align-items-center gap-3 border rounded-2 pointer px-2 py-0`}>
                        <span>Read</span>
                        <input onChange={(e)=>toggleRole('r', e.target.checked)} className="form-check-input bg-dark m-0 shadow-none" type="checkbox" checked={role.r} />
                    </label>
                    <label className={`${role.w ? 'bg-orange border-orange' : 'border-lightly'} d-flex align-items-center gap-3 border rounded-2 pointer px-2 py-0`}>
                        <span>Write</span>
                        <input onChange={(e)=>toggleRole('w', e.target.checked)} className="form-check-input bg-dark m-0 shadow-none" type="checkbox" checked={role.w} />
                    </label>
                    <label className={`${role.e ? 'bg-orange border-orange' : 'border-lightly'} d-flex align-items-center gap-3 border rounded-2 pointer px-2 py-0`}>
                        <span>Edit</span>
                        <input onChange={(e)=>toggleRole('e', e.target.checked)} className="form-check-input bg-dark m-0 shadow-none" type="checkbox" checked={role.e} />
                    </label>
                    <label className={`${role.d ? 'bg-orange border-orange' : 'border-lightly'} d-flex align-items-center gap-3 border rounded-2 pointer px-2 py-0`}>
                        <span>delete</span>
                        <input onChange={(e)=>toggleRole('d', e.target.checked)} className="form-check-input bg-dark m-0 shadow-none" type="checkbox" checked={role.d} />
                    </label>
                </div>

                <hr></hr>

                <div className="mb-3">
                    <div className="text-secondary small mb-1">Select a role</div>
                    <select onChange={(e)=>toggleRole('role', e.target.value)} className="form-control bg-dark border border-lightly shadow-none form-select text-light w-auto">
                        {PERMISSIONS.map((perm)=>(
                            <option value={perm.title} key={perm.title}>{perm.title}</option>
                        ))}
                    </select>
                    <div className="small text-orange mt-3">
                        {PERMISSIONS.find((p)=>p.title === role.role)?.description || 'Please select a role.'}
                    </div>
                </div>

                <div className="d-flex justify-content-end mt-4">
                    <button onClick={save} className="btn btn-outline-orange d-flex align-items-center gap-2">
                        <MdDataSaverOn />
                        {roleToEdit ? 'Update' : 'Save'} Permission
                    </button>
                </div>
            </div>
        </OverlayModal>
    )
}
