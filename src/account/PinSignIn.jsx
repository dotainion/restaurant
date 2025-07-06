import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import { IoMdKeypad } from 'react-icons/io';

export const PinSignIn = () => {
    const { pinSignIn, isAuthenticated } = useAuth();

    const [pin, setPin] = useState('');

    const navigate = useNavigate();

    const pad = (num) =>{
        setPin(pin + num);
    }

    const backspace = () =>{
        setPin(pin.slice(0, -1));
    }

    const clear = () =>{
        setPin('');
    }

    const submit = (e) =>{
        e.preventDefault();
        if(!pin) return;
        pinSignIn(pin, ()=>{
            setTimeout(()=>{
                navigate('/');
            }, 500);
        });
    }

    if (isAuthenticated) return <Navigate to="/" />;

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
            <div style={{maxWidth: 400, width: '100%'}}>
                <div className="d-flex justify-content-center mb-3">
                    <button onClick={()=>navigate('/sign/in')} className="btn btn-sm btn-orange rounded-end-0">USER LOGIN</button>
                    <button className="btn btn-sm rounded-start-0 border border-lightly text-light cursor-default">PIN LOGIN</button>
                </div>
                <div className="card bg-darker border border-lightly p-4">
                    <div className="text-center mb-4">
                        <IoMdKeypad className="text-light mb-2" size={48} />
                        <h3 className="text-light fw-semibold">PIN Sign In</h3>
                    </div>
                    <div className="mb-3">
                        <label className="small text-light mb-1">PIN</label>
                        <input
                            type="password"
                            value={pin}
                            onChange={(e)=>setPin(e.target.value)}
                            className="form-control bg-dark border border-lightly text-light text-center shadow-none"
                            placeholder="Enter PIN"
                        />
                    </div>
                    <div className="grid text-center mb-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                        {[1,2,3,4,5,6,7,8,9].map(num => (
                            <button key={num} className="btn btn-outline-lightly fs-4 py-3" onClick={()=>pad(num)}>{num}</button>
                        ))}
                        <button className="btn btn-outline-lightly py-3" onClick={clear}>Clear</button>
                        <button className="btn btn-outline-lightly fs-4 py-3" onClick={()=>pad(0)}>0</button>
                        <button className="btn btn-outline-lightly py-3" onClick={backspace}>⌫</button>
                    </div>
                    <button className="btn btn-orange w-100 mb-2" onClick={submit}>Log In</button>
                </div>
            </div>
        </div>
    )
}
