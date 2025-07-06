import { createContext, useContext, useEffect, useLayoutEffect, useRef, useState } from "react"
import { Spinner } from "../widgets/Spinner";
import { Toast } from "../widgets/Toast";
import { ParseError } from "../utils/ParseError";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const Context = createContext();
export const useUtils = () => useContext(Context);

export const UtilsProvider = ({children}) =>{
    const [loading, setLoading] = useState(false);
    const [cartOverlay, setCartOverlay] = useState('d-none d-md-block');
    const [layoutOverlay, setLayoutOverlay] = useState('');
    const [paymentType, setPaymentType] = useState('');
    const [showPayment, setShowPayment] = useState(false);
    const [showPaymentLarge, setShowPaymentLarge] = useState(false);
    const [appTheme, setAppTheme] = useState();
    const [toasts, setToasts] = useState([]);
    const [scrollEffects, setScrollEffects] = useState(true);
    const [previousRoute, setPreviousRoute] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();

    const cartUtils = {
        overlayClass: cartOverlay,
        show: ()=>setCartOverlay(''),
        hide: ()=>setCartOverlay('d-none d-md-block')
    }

    const layoutUtils = {
        overlayClass: layoutOverlay,
        show: ()=>setLayoutOverlay('show'),
        hide: ()=>setLayoutOverlay(''),
    }

    const paymentUtils = {
        state: showPayment,
        asOverlay: showPaymentLarge,
        show: ()=>setShowPayment(true),
        hide: ()=>{
            setShowPayment(false);
            setShowPaymentLarge(false);
        },
        showAsOverlay: ()=>setShowPaymentLarge(true),
        method: {
            state: paymentType,
            card: ()=>setPaymentType(paymentUtils.name.card),
            paypal: ()=>setPaymentType(paymentUtils.name.paypal),
            cash: ()=>setPaymentType(paymentUtils.name.cash),
            hold: ()=>setPaymentType(paymentUtils.name.hold),
            external: ()=>setPaymentType(paymentUtils.name.external)
        },
        name: {
            card: 'card',
            paypal: 'paypal',
            cash: 'cash',
            hold: 'hold',
            external: 'external'
        }
    }

    const themeUtils = {
        theme: appTheme,
        mode: {
            light: ()=>setAppTheme('light'),
            dark: ()=>setAppTheme('dark'),
            auto: ()=>setAppTheme('auto')
        },
        name: {
            light: 'light',
            dark: 'dark',
            auto: 'auto'
        }
    }

    const toast = {
        set: (msg, bgColor, timeout) =>{
            const toastId = new Date().getTime();
            const toasting = {
                id: toastId,
                message: new ParseError(msg).message(),
                type: bgColor,
                remove: ()=>setToasts((list)=>[...list.filter((t)=>t.id !== toastId)])
            };
            setTimeout(()=>toasting.remove(), timeout);
            setToasts((list)=>[toasting, ...list]);
        },
        success: (msg, timeout = 5000) => toast.set(msg, 'success', timeout),
        error: (msg, timeout = 5000) => toast.set(msg, 'danger', timeout),
        warning: (msg, timeout = 5000) => toast.set(msg, 'warning', timeout),
    }

    const infiniteScroll = {
        state: scrollEffects,
        off: ()=>setScrollEffects(false),
        on: ()=>setScrollEffects(true),
    }

    const navigateTo = (route) =>{
        setPreviousRoute(location.pathname);
        navigate(route);
    }

    const navigateBack = () =>{
        if(previousRoute){
            return navigate(previousRoute);
        }
        navigate('/home/hot/dishes');
    }

    useEffect(()=>{
        /*if(appTheme === themeUtils.name.dark){
            document.documentElement.style.setProperty('--bg-dark', '#212529');
            document.documentElement.style.setProperty('--bg-darker', '#191a1b');
            document.documentElement.style.setProperty('--color-lightly', 'rgb(54, 54, 54)');
        }
        if(appTheme === themeUtils.name.light){
            document.documentElement.style.setProperty('--bs-dark-rgb', '255, 255, 255');
            document.documentElement.style.setProperty('--bg-dark', 'white');
            document.documentElement.style.setProperty('--bg-darker', 'white');
            document.documentElement.style.setProperty('--color-lightly', 'black');
        }
        if(appTheme === themeUtils.name.auto){
            
        }*/
    }, [appTheme]);

    const values = {
        toast,
        loading, 
        setLoading,
        cartUtils,
        layoutUtils,
        paymentUtils,
        themeUtils,
        infiniteScroll,
        navigateTo,
        navigateBack
    }

    return (
        <Context.Provider value={values}>
            {children}
            <Spinner show={loading}/>
            <Toast toasts={toasts}/>
        </Context.Provider>
    )
}