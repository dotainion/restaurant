import { useLocation, useNavigate } from "react-router-dom";
import { LuSettings2 } from "react-icons/lu";
import { GiCook } from "react-icons/gi";
import { MdDone, MdHourglassEmpty, MdListAlt } from "react-icons/md";

export const KitchenLayout = ({children}) =>{
    const navigate = useNavigate();
    const location = useLocation();

    const settings = [
        {
            title: 'All Orders', 
            details: 'Dark and Light mode, Font size, etc',
            active: location.pathname.includes('all'),
            icon: MdListAlt,
            action: ()=>navigate('/kitchen/all')
        },{
            title: 'Waiting Orders', 
            details: 'Dark and Light mode, Font size, etc',
            active: location.pathname.includes('pending'),
            icon: MdHourglassEmpty,
            action: ()=>navigate('/kitchen/pending')
        },{
            title: 'Preparing Orders', 
            details: 'Dark and Light mode, Font size, etc',
            active: location.pathname.includes('preparing'),
            icon: GiCook,
            action: ()=>navigate('/kitchen/preparing')
        },{
            title: 'Ready Order', 
            details: 'Discounts, Payment history, etc',
            active: location.pathname.includes('ready'),
            icon: MdDone,
            action: ()=>navigate('/kitchen/ready')
        },
    ];

    return(
        <div className="p-3 d-md-flex gap-3 vh-100 overflow-hidden">
            <div className="d-none d-md-flex flex-column h-100">
                <div className="bg-darker rounded-3 overflow-auto scrollbar-md h-100 pt-4 user-select-none" style={{minWidth: '230px', maxWidth: '230px'}}>
                    {settings.map((s)=>(
                        <div onClick={s.action} className={`d-flex gap-2 pointer py-3 px-4 mb-2 ${s.active ? 'bg-orange bg-opacity-25' : ''}`} key={s.title}>
                            <div className="fs-4 d-flex">
                                <s.icon className={s.active ? 'text-orange' : ''}/>
                            </div>
                            <div>
                                <div className={`fw-bold ${s.active ? 'text-orange' : ''}`}>{s.title}</div>
                                <div className="text-secondary small">{s.details}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="d-flex flex-column flex-fill h-100">
                <div className="d-flex align-items-center justify-content-end">
                    <div className="d-block d-md-none">
                        <div className="dropdown">
                            <button className="d-flex align-items-center gap-2 text-nowrap btn btn-sm border border-secondary text-light" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <LuSettings2/>
                                <span>Options</span>
                            </button>
                            <ul className="dropdown-menu overflow-auto scrollbar-md bg-dark border border-lightly">
                                {settings.map((s, key)=>(
                                    <li key={`${s.title}-${key}`}>
                                        <a onClick={s.action} className="dropdown-item pointer">
                                            <span>{s.title}</span>
                                            <div className="small text-secondary"><small>{s.details}</small></div>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="bg-darker rounded-3 overflow-auto scrollbar-md p-4 h-100" data-settings="scroll">
                    {children}
                </div>
            </div>
        </div>
    )
}