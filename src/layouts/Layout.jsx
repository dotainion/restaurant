import { GoHome } from "react-icons/go";
import { MdLogout } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";
import { MdOutlineDashboard } from "react-icons/md";
import { IoFastFoodOutline } from "react-icons/io5";
import { LuMessageSquareMore } from "react-icons/lu";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { FaRegCalendarAlt } from 'react-icons/fa';
import { useUtils } from "../providers/UtilsProvider";
import { MdMenu } from "react-icons/md";
import { useAuth } from "../providers/AuthProvider";
import { RestaurantAuthentication } from "../components/RestaurantAuthentication";
import { TbToolsKitchen3 } from "react-icons/tb";

export const Layout = () =>{
    const { isAuthenticated } = useAuth();
    const { layoutUtils } = useUtils();

    const location = useLocation();
    const navigate = useNavigate();

    const menus = [
        {
            title: 'Home',
            icon: GoHome,
            route: '/home'
        },{
            title: 'Reservation',
            icon: FaRegCalendarAlt,
            route: '/reservation'
        },{
            title: 'Kitchen',
            icon: TbToolsKitchen3,
            route: '/kitchen'
        },{
            title: 'Dashboard',
            icon: MdOutlineDashboard,
            route: '/dashboard'
        },{
            title: 'Message',
            icon: LuMessageSquareMore,
            route: '/message'
        },{
            title: 'Notifications',
            icon: IoNotificationsOutline,
            route: '/notifications'
        },{
            title: 'Settings',
            icon: IoSettingsOutline,
            route: '/settings'
        },{
            title: 'Logout',
            icon: MdLogout,
            route: '/logout'
        },
    ];

    const handleActive = (menu) =>{
        const index = menus.findIndex(m => m.route.startsWith(menu.route));
        if (index === -1) return '';

        const current = menus[index];
        const prev = index > 0 ? menus[index - 1] : null;
        const next = index < menus.length - 1 ? menus[index + 1] : null;

        if (location.pathname.startsWith(current.route)) return 'active';
        if (next && location.pathname.startsWith(next.route)) return 'previous';
        if (prev && location.pathname.startsWith(prev.route)) return 'next';
        return '';
    }

    const to = (route) =>{
        navigate(route);
        layoutUtils.hide();
    }

    if(!isAuthenticated) return <Navigate to="/sign/in" />;

    return(
        <div className="layout d-sm-flex vh-100 bg-dark">
            <div onClick={layoutUtils.hide} className={`backdrop ${layoutUtils.overlayClass} d-none position-absolute top-0 start-0 w-100 vh-100 bg-dark bg-opacity-50`}></div>
            <div className={`${layoutUtils.overlayClass} d-none d-sm-flex flex-column sidebar bg-darker vh-100 ps-2`}>
                <div className="d-none d-sm-flex align-items-center d-block p-2 border-bottom border-orange text-orange">
                    <IoFastFoodOutline className="rounded-2 p-1" size={50} />
                </div>
                <div className="bg-dark overflow-auto scrollbar-sm">
                    {menus.map((menu)=>(
                        <div className={`position-relative bg-darker ${handleActive(menu)}`} key={menu.title}>
                            <div className="position-absolute top-0 start-0 w-25 h-100 bg-darker rounded-end"/>
                            <button 
                                onClick={()=>to(menu.route)}
                                title={menu.title} 
                                className="d-flex align-items-center gap-3 btn d-block border-0 p-2 w-100 position-relative"
                            >
                                <menu.icon className="rounded-2 p-3" size={50} />
                                <span className="d-block d-sm-none">{menu.title}</span>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex-fill text-light">
                <RestaurantAuthentication>
                    <Outlet/>
                </RestaurantAuthentication>
            </div>
            <div className={`menu ${layoutUtils.overlayClass} d-block d-sm-none position-absolute bottom-0 end-0 pe-3`} style={{marginBottom: '80px'}}>
                <button className="btn btn-orange bg-opacity-75 btn-lg rounded-circle" onClick={layoutUtils.show}>
                    <MdMenu className="text-light"/>
                </button>
            </div>
        </div>
    )
}