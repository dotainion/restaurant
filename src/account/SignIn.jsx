import { useState } from 'react';
import { FiUser, FiLock } from 'react-icons/fi';
import { useAuth } from '../providers/AuthProvider';
import { Navigate, useNavigate } from 'react-router-dom';

export const SignIn = () =>{
    const { signIn, isAuthenticated } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const submit = (e) => {
        signIn(email, password, ()=>{
            setTimeout(()=>{
                navigate('/');
            }, 500);
        });
    }

    if(isAuthenticated) return <Navigate to="/"/>

    return(
        <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
            <div style={{maxWidth: 400, width: '100%'}}>
                <div className="d-flex justify-content-center mb-3">
                    <button className="btn btn-sm rounded-end-0 border border-lightly text-light cursor-default">USER LOGIN</button>
                    <button onClick={()=>navigate('/pin/sign/in')} className="btn btn-sm btn-orange rounded-start-0">PIN LOGIN</button>
                </div>
                <div className="card bg-darker border border-lightly p-4">
                    <div className="text-center mb-4">
                        <FiUser className="text-light mb-2" size={48} />
                        <h3 className="text-light fw-semibold">Sign In</h3>
                    </div>
                    <form onSubmit={submit}>
                        <div className="mb-3">
                            <label className="small text-light mb-1" htmlFor="loginEmail"><FiUser className="me-1" />Email</label>
                            <input 
                                id="loginEmail" 
                                type="email" 
                                required
                                className="form-control bg-dark border border-lightly text-light"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="small text-light mb-1" htmlFor="loginPassword"><FiLock className="me-1" />Password</label>
                            <input
                                id="loginPassword"
                                type="password"
                                required
                                className="form-control bg-dark border border-lightly text-light"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                            />
                        </div>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <div className="form-check">
                                <input
                                    id="rememberMe"
                                    name="remember"
                                    type="checkbox"
                                    className="form-check-input bg-dark border-lightly"
                                />
                                <label htmlFor="rememberMe" className="form-check-label text-light small">Remember me</label>
                            </div>
                            <button 
                                type="button" 
                                className="btn btn-link text-light small p-0"
                                onClick={()=>navigate('/recovery')}
                            >Forgot password?</button>
                        </div>
                        <button type="submit" className="btn btn-orange w-100 mb-2">Sign In</button>
                    </form>
                </div>
            </div>
        </div>
    )
}