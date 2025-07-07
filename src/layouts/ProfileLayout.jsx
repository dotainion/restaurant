import { useLocation, useNavigate } from "react-router-dom";
import { ProfileRouter } from "../routers/ProfileRouter";
import { useEffect, useRef } from "react";

export const ProfileLayout = () =>{
    const navigate = useNavigate();
    const location = useLocation();

    const userIdRef = useRef();

    const menus = [
        {
            title: 'Asign Role',
            action: ()=>navigate(`/settings/profile/assign/role/${userIdRef.current}`)
        },
    ];

    useEffect(()=>{
        const parts = location.pathname.split('/');
        userIdRef.current = parts[parts.length -1];
    }, [location]);

    return(
        <div className="d-flex gap-2 h-100">
            <div className="flex-fill h-100">
                <ProfileRouter/>
            </div>
            <div className="bg-dark d-flex flex-column border border-lightly h-100 rounded overflow-auto scrollbar-md" style={{minWidth: '230px'}}>
                {menus.map((menu)=>(
                    <div className="border-bottom border-lightly" key={menu.title}>
                        <button 
                            onClick={menu.action}
                            className="btn btn-dark border-0 rounded-0 text-light w-100 py-3"
                        >{menu.title}</button>
                    </div>
                ))}
            </div>
        </div>
    )
}