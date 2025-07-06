import { useState } from 'react';
import { Password } from './Password';
import { AssignPermission } from './AssignPermission';
import { PermissionViewer } from './PermissionViewer';

const property = {
    security: 'security',
    users: 'users',
    permission: 'permission',
}

export const Security = () =>{
    const [tab, setTab] = useState(property.security);

    const tabs = [
        { 
            title: 'Security', 
            active: tab === property.security ? 'text-orange' : '', 
            action: () => setTab(property.security)
        },{ 
            title: 'Permission', 
            active: tab === property.permission ? 'text-orange' : '', 
            action: () => setTab(property.permission)
        },{ 
            title: 'Users', 
            active: tab === property.users ? 'text-orange' : '', 
            action: () => setTab(property.users)
        },
    ];

    return(
        <div className="d-flex flex-column bg-dark h-100">
            <div className="bg-darker d-flex">
                <div className="d-flex border border-lightly border-bottom-0 rounded-top-3">
                    {tabs.map((t)=>(
                        <div className="nav-item" key={t.title}>
                            <button onClick={t.action} className={`btn rounded-0 border-0 text-light ${t.active}`}>{t.title}</button>
                        </div>
                    ))}
                </div>
            </div>
            <div className="overflow-auto scrollbar-md">
                {tab === property.security && (
                    <div className="p-sm-4">
                        <Password/>
                    </div>
                )}
                {tab === property.users && <AssignPermission/>}
                {tab === property.permission && <PermissionViewer/>}
            </div>
        </div>
    )
}