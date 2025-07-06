import { createContext, useContext, useEffect, useRef, useState } from "react"
import { api } from "../request/Api";
import { mock } from "../mock/Mock";
import { token } from "../utils/Token";
import { useUtils } from "./UtilsProvider";
import { AuthenticatedExpired } from "../errors/AuthenticatedExpired";

const Context = createContext();
export const useAuth = () => useContext(Context);

export const AuthProvider = ({children}) =>{
    const { setLoading, toast } =  useUtils();

    const [user, setUser] = useState();
    const [waiting, setWaiting] = useState(true);
    const [restaurnt, setRestaurnt] = useState(null);
    const [authExpired, setAuthExpired] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const isAuthRef = useRef(isAuthenticated);

    const setSuccess = (response, success) =>{
        token.set(response.data.data[0].attributes.token);
        api.reInitializeAuthorizationHeader();
        setUser(response.data.data[0]);
        setIsAuthenticated(true);
        success?.();
    }

    const setUnsuccess = (error) =>{
        toast.error(error);
        setUser(null);
        setIsAuthenticated(false);
    }

    const signIn = (email, password, success) =>{
        setLoading(true);
        api.auth.signIn(email, password).then((response)=>{
            setSuccess(response, success);
        }).catch((error)=>{
            setUnsuccess(error);
        }).finally(()=>{
            setLoading(false);
        });
    }

    const pinSignIn = (pin, success) =>{
        setLoading(true);
        api.auth.pinSignIn(pin).then((response)=>{
            setSuccess(response, success);
        }).catch((error)=>{
            setUnsuccess(error);
        }).finally(()=>{
            setLoading(false);
        });
    }
    
    const signUp = (data, success) =>{
        setLoading(true);
        api.auth.signUp(data).then((response)=>{
            setSuccess(response, success);
        }).catch((error)=>{
            setUnsuccess(error);
        }).finally(()=>{
            setLoading(false);
        });
    }
    
    const pinSignUp = (id, pin, success) =>{
        setLoading(true);
        api.auth.createPinSignIn(id, pin).then((response)=>{
            setSuccess(response, success);
        }).catch((error)=>{
            setUnsuccess(error);
        }).finally(()=>{
            setLoading(false);
        });
    }

    const signOut = (success) =>{
        setLoading(true);
        api.auth.logout().then((response)=>{
            token.set(null);
            setUser(null);
            setIsAuthenticated(false);
            success?.(response);
        }).catch((error)=>{
            token.set(null);
            setUser(null);
            setIsAuthenticated(false);
        }).finally(()=>{
            setLoading(false);
        });
    }

    const registerRestaurant = (rest) =>{
        setLoading(true);
        api.auth.assignRestaurantToSession(rest.id).then((response)=>{
            api.setOption({restaurantId: response.data.data[0].id});
            setRestaurnt(response.data.data[0]);
        }).catch((error)=>{
            toast.error(error);
        }).finally(()=>{
            setLoading(false);
        });
    }

    useEffect(()=>{
        /*if(process.env.NODE_ENV === 'development'){
            setUser(mock.user());
            setIsAuthenticated(true);
            return setWaiting(false);
        }*/
        api.auth.session().then((response)=>{
            setUser(response.data.data[0]);
            setIsAuthenticated(true);
            if(response.data.data[0].attributes.restaurant){
                setRestaurnt(response.data.data[0].attributes.restaurant);
            }
        }).catch((error)=>{
            setUser(null);
            setIsAuthenticated(false);
        }).finally(()=>{
            setWaiting(false);
        });
        api.setNotAuthenticatedCallback((status)=>{
            if(!isAuthRef.current) return;
            setAuthExpired(true);
        });
    }, []);

    useEffect(()=>{
        isAuthRef.current = isAuthenticated;
    }, [isAuthenticated]);
    
    const values = {
        user,
        isAuthenticated,
        restaurnt,
        signIn,
        pinSignIn,
        pinSignUp,
        signUp,
        signOut,
        registerRestaurant,
        abort: setUnsuccess,
    }

    return(
        <Context.Provider value={values}>
            {waiting ? null : children}
            <AuthenticatedExpired
                show={authExpired}
                close={()=>setAuthExpired(false)}
            />
        </Context.Provider>
    )
}