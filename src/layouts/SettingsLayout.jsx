import { CiLock } from "react-icons/ci";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CiCalculator2 } from "react-icons/ci";
import { BsHouseGear } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import { useLocation, useNavigate } from "react-router-dom";
import { LuSettings2 } from "react-icons/lu";
import { DateDisplay } from "../components/DateDisplay";
import { GiTakeMyMoney } from "react-icons/gi";
import { FaProductHunt } from "react-icons/fa";
import { MdMenu } from "react-icons/md";

export const SettingsLayout = ({children}) =>{
    const navigate = useNavigate();
    const location = useLocation();

    const settings = [
        {
            title: 'Appearance', 
            details: 'Dark and Light mode, Font size, etc',
            active: location.pathname.includes('appearance'),
            icon: CiHeart,
            action: ()=>navigate('/settings/appearance')
        },{
            title: 'Your Restaurant', 
            details: 'Dark and Light mode, Font size, etc',
            active: location.pathname.includes('restaurant'),
            icon: BsHouseGear,
            action: ()=>navigate('/settings/restaurant')
        },{
            title: 'Finance', 
            details: 'Discounts, Payment history, etc',
            active: location.pathname.includes('finance'),
            icon: GiTakeMyMoney,
            action: ()=>navigate('/settings/finance')
        },{
            title: 'Orders', 
            details: 'History by date filtering and status',
            active: location.pathname.includes('orders'),
            icon: FaProductHunt,
            action: ()=>navigate('/settings/orders')
        },{
            title: 'Products Management', 
            details: 'Manage your product, pricing, etc',
            active: location.pathname.includes('product/management'),
            icon: CiCalculator2,
            action: ()=>navigate('/settings/product/management')
        },{
            title: 'Notifications', 
            details: 'Customize your notifications',
            active: location.pathname.includes('notifications'),
            icon: IoMdNotificationsOutline,
            action: ()=>navigate('/settings/notifications')
        },{
            title: 'Security', 
            details: 'Configure Password, PIN, etc',
            active: location.pathname.includes('security'),
            icon: CiLock,
            action: ()=>navigate('/settings/security')
        },
    ];

    return(
        <div className="p-md-3 d-md-flex gap-3 vh-100 overflow-hidden">
            <div className="bg-darker rounded-3 d-none d-md-flex flex-column h-100">
                <div className="position-sticky pt-3 pb-0 px-4 border-bottom border-lightly">
                    <h4>Settings</h4>
                    <DateDisplay/>
                </div>
                <div className="overflow-auto scrollbar-md h-100 user-select-none" style={{minWidth: '230px', maxWidth: '230px'}}>
                    {settings.map((s)=>(
                        <div onClick={s.action} className={`d-flex gap-2 pointer py-2 px-4 mb-2 ${s.active ? 'bg-orange bg-opacity-25' : ''}`} key={s.title}>
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
                <div className="bg-darker border-bottom border-lightly d-md-none d-flex align-items-center justify-content-end p-2 pb-0">
                    <div className="dropdown">
                        <button className="d-flex align-items-center gap-2 text-nowrap btn btn-sm border border-lightly text-light border-bottom-0 rounded-top" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <MdMenu />
                            <span>Menu</span>
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
                <div className="bg-darker rounded-3 overflow-auto scrollbar-md p-sm-4 pt-3 pt-ms-auto h-100" data-settings="scroll">
                    {children}
                </div>
            </div>
        </div>
    )
}