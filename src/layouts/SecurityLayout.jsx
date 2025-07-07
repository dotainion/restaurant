import { useLocation, useNavigate } from 'react-router-dom';

export const SecurityLayout = ({children}) =>{

    const navigate = useNavigate();
    const location = useLocation();

    const tabs = [
        { 
            title: 'Security', 
            active: location.pathname === '/settings/security/credentials', 
            action: () => navigate('/settings/security/credentials')
        },{ 
            title: 'Permission', 
            active: location.pathname === '/settings/security/permission', 
            action: () => navigate('/settings/security/permission')
        },{ 
            title: 'Users', 
            active: location.pathname === '/settings/security/users', 
            action: () => navigate('/settings/security/users')
        },
    ];

    return(
        <div className="d-flex flex-column bg-dark h-100">
            <div className="bg-darker d-flex">
                <div className="d-flex border border-lightly border-bottom-0 rounded-top-3">
                    {tabs.map((tab)=>(
                        <div className="nav-item" key={tab.title}>
                            <button onClick={tab.action} className={`btn rounded-0 border-0 text-light ${tab.active ? 'text-orange' : ''}`}>{tab.title}</button>
                        </div>
                    ))}
                </div>
            </div>
            <div className="overflow-auto scrollbar-md">
                {children}
            </div>
        </div>
    )
}