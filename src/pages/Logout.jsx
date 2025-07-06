import { Fragment } from "react"
import { MdOutlineLogout } from "react-icons/md";
import { useUtils } from "../providers/UtilsProvider";
import { useLayoutEffect } from "react";
import { useAuth } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

export const Logout = () =>{
    const { signOut } = useAuth();
    const { loading, toast } = useUtils();

    const navigate = useNavigate();

    useLayoutEffect(()=>{
        signOut(()=>{
            toast.success('You’ve successfully logged out');
            setTimeout(()=>navigate('/sign/in'), 5000);
        });
    }, []);

    if(loading) return null;

    return(
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="d-flex flex-column justify-content-center align-items-center text-center p-5 text-light">
                <MdOutlineLogout className="text-light display-4" />
                <h5 className="fw-semibold mt-3">You’ve been logged out</h5>
                <p className="text-secondary">You’ve successfully logged out of your account.<br/>We’ll be here when you’re ready to log back in.</p>
            </div>
        </div>
    )
}