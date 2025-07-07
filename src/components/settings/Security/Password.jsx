import { FiShield, FiKey, FiUser, FiSettings } from 'react-icons/fi';
import { api } from '../../../request/Api';
import { useUtils } from '../../../providers/UtilsProvider';
import { useAuth } from '../../../providers/AuthProvider';
import { useRef } from 'react';

export const Password = () =>{
    const { user } = useAuth();
    const { toast } = useUtils();

    const passwordRef = useRef();
    const currentPasswordRef = useRef();
    const confirmPasswordRef = useRef();

    const reset = () =>{
        if(currentPasswordRef.current.value !== confirmPasswordRef.current.value){
            return toast.error('Passwords do not match. Please try again.');
        }
        api.auth.changePassword(
            user.id,
            passwordRef.current.value,
            currentPasswordRef.current.value
        ).then(()=>{
            toast.success('Your password has been updated successfully.');
        }).catch((error)=>{
            toast.error(error);
        });
    }
    return(
        <div className="p-sm-4 p-2 bg-darker text-light rounded shadow-sm m-3" style={{maxWidth: '500px'}}>
            <h4 className="mb-4 d-flex align-items-center gap-2"><FiShield size={22} /> Security Settings</h4>

            <div className="mb-4">
                <h6 className="d-flex align-items-center gap-2 mb-4"><FiKey /> Reset Password</h6>
                <label>Old password</label>
                <input
                    ref={passwordRef}
                    className="form-control shadow-none bg-dark border border-lightly text-light mb-3"
                    placeholder="Old Password"
                    type="password"
                />
                <label>New password</label>
                <input
                    ref={currentPasswordRef}
                    className="form-control shadow-none bg-dark border border-lightly text-light mb-3"
                    placeholder="New Password"
                    type="password"
                />
                <label>Confirm new password</label>
                <input
                    ref={confirmPasswordRef}
                    className="form-control shadow-none bg-dark border border-lightly text-light mb-4"
                    placeholder="Confirm New Password"
                    type="password"
                />
                <button onClick={reset} className="btn btn-outline-lightly">Reset Password</button>
            </div>
        </div>
    )
}