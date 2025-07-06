import { useRef } from "react";
import { MdClose } from "react-icons/md";
import { useAuth } from "../providers/AuthProvider";
import { useUtils } from "../providers/UtilsProvider";

export const AuthenticatedExpired = ({show, close}) =>{
    const { toast } = useUtils();
    const { user, signIn, abort } = useAuth();

    const passwordRef = useRef();

    const loggin = () =>{
        signIn(user.attributes.email, passwordRef.current.value, ()=>{
            toast.success('You have been re-authenticated successfully.');
        });
        close();
    }

    const onAbort = () =>{
        abort('You are not authenticated.');
        close();
    }

    if(!show) return null;

    return(
        <div className="position-fixed top-0 start-0 w-100 vh-100 bg-dark bg-opacity-50" style={{zIndex: '999999999'}}>
            <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                <div className="position-relative bg-darker text-center border p-5 rounded shadow border border-lightly text-light w-100" style={{maxWidth: 400}}>
                    <h3 className="mb-4">You are not authenticated</h3>
                    <p className="mb-4">Please enter your password to sign in.</p>

                    <button onClick={onAbort} className="position-absolute top-0 end-0 btn btn-sm p-0">
                        <MdClose className="fs-3 text-danger" />
                    </button>

                    <input
                        ref={passwordRef}
                        type="password"
                        className="form-control bg-dark shadow-none border border-lightly text-light mb-4"
                        placeholder="Enter password"
                    />

                    <button onClick={loggin} className="btn btn-orange w-100">Sign In</button>
                </div>
            </div>
        </div>
    )
}