import { useState } from 'react';
import { FiMail } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { api } from '../request/Api';
import { useUtils } from '../providers/UtilsProvider';

export const Recovery = () => {
    const { toast } = useUtils();

    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const navigate = useNavigate();

    const submit = (e) => {
        e.preventDefault();
        api.auth.recovery(email).then((response)=>{
            setSubmitted(true);
        }).catch((error)=>{
            toast.error(error);
        });
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
            <div className="card bg-darker border border-lightly p-4" style={{ maxWidth: 400, width: '100%' }}>
                <div className="text-center mb-4">
                    <FiMail className="text-light mb-2" size={48} />
                    <h4 className="text-light fw-semibold">Recover Password</h4>
                    <p className="text-light small mb-0">Enter your email to receive a reset link</p>
                </div>

                {submitted ? (
                    <div className="bg-dark text-light text-center p-3 rounded-3">
                        If your email is registered, a reset link has been sent.
                    </div>
                ) : (
                    <form onSubmit={submit}>
                        <div className="mb-3">
                            <label className="small text-light mb-1" htmlFor="recoverEmail">
                                Email address
                            </label>
                            <input
                                id="recoverEmail"
                                type="email"
                                required
                                className="form-control bg-dark border border-lightly text-light"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="btn btn-orange w-100 mt-3">Send Reset Link</button>
                    </form>
                )}

                <div className="text-center mt-4">
                    <button
                        type="button"
                        className="btn link-primary text-light small p-0"
                        onClick={()=>navigate('/sign/in')}
                    >← Back to Sign In</button>
                </div>
            </div>
        </div>
    )
}
