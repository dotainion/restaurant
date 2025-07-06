import { useEffect, useLayoutEffect, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom";
import { useUtils } from "../providers/UtilsProvider";
import { FiUser, FiLock } from 'react-icons/fi';
import { api } from "../request/Api";
import { IoArrowBack } from "react-icons/io5";
import { useAuth } from "../providers/AuthProvider";

export const AuthAccessPoint = () =>{
    const { user } = useAuth();
    const { infiniteScroll, toast, navigateBack } = useUtils();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authenticated, setAuthenticated] = useState(false);

    const navigate = useNavigate();

    const submit = (e) => {
        e.preventDefault();
        api.auth.authVerification(email, password).then((response)=>{
            const account = response.data.data[0];
            if(account.attributes.role.attributes.role === 'admin'){
                setAuthenticated(true);
            }
        }).catch((error)=>{
            toast.error(error);
        });
    }

    useLayoutEffect(()=>{
        if(user.attributes.role.attributes.role === 'admin'){
            //setAuthenticated(true);
        }
        infiniteScroll.off();
        return ()=>infiniteScroll.on();
    }, []);

    return(
        <div className="d-flex flex-column h-100">
            <div className="d-flex justify-content-between align-items-center gap-3 bg-darker rounded-top-4 overflow-hidden mb-3 px-3 py-2">
                <div className="d-flex align-items-center gap-2 flex-nowrap">
                    <button onClick={navigateBack} className="btn btn-sm text-light"><IoArrowBack /></button>
                    <span>Administrator</span>
                </div>
                <div className="d-flex flex-wrap align-items-center gap-3">
                </div>
            </div>
            <div className="border border-lightly rounded-4 h-100 overflow-auto scrollbar-md">
                {authenticated ? <Outlet/> : (
                    <div className="d-flex align-items-center justify-content-center w-100 h-100 user-select-none">
                        <div className="card rounded-4 text-light shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
                            <h4 className="mb-4 text-center">Admin Login</h4>
                            <form onSubmit={submit}>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-dark text-light border border-lightly"><FiUser /></span>
                                        <input
                                            type="email"
                                            autoComplete="new-email"
                                            className="form-control bg-dark border border-lightly text-light shadow-none"
                                            placeholder="admin@example.com"
                                            value={email}
                                            onChange={(e)=>setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-dark text-light border border-lightly"><FiLock /></span>
                                        <input
                                            type="password"
                                            autoComplete="new-password"
                                            className="form-control bg-dark border border-lightly text-light shadow-none"
                                            placeholder="••••••••"
                                            value={password}
                                            onChange={(e)=>setPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-check mb-3">
                                    <input className="form-check-input bg-dark" type="checkbox" id="remember" />
                                    <label className="form-check-label" htmlFor="remember">Remember me</label>
                                </div>

                                <button type="submit" className="btn btn-dark w-100">Login</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>            
        </div>
    )
}