import { Fragment, useLayoutEffect, useState } from "react"
import { useAuth } from "../providers/AuthProvider"
import { api } from "../request/Api";
import { useUtils } from "../providers/UtilsProvider";

export const RestaurantAuthentication = ({children}) =>{
    const { setLoading } =  useUtils();
    const { user, restaurnt, registerRestaurant } = useAuth();

    const [restaurnts, setRestaurnts] = useState([]);

    const defaultLogo = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-YFnEBqymGudV2EJNY9KLlw0nH7378i52aQ&s';

    useLayoutEffect(()=>{
        if(!user) return;
        setLoading(true);
        api.restaurant.list({userId: user.id}).then((response)=>{
            setRestaurnts(response.data.data);
        }).catch((error)=>{

        }).finally(()=>{
            setLoading(false);
        });
    }, [user]);

    return(
        <Fragment>
            {restaurnt ? children : (
                <div className="d-flex flex-column vh-100">
                    <div className="container my-3">
                        <h2 className="fw-bold mb-1">Select a Restaurant</h2>
                        <p className="fs-6">Manage one of your restaurant locations</p>
                    </div>
                    <div className="overflow-auto scrollbar-md">
                        <div className="container">
                            <div className="row gap-0 m-0 p-0">
                                {
                                    restaurnts.length ?
                                    restaurnts.map((res, key)=>(
                                        <div className="col-12 col-md-6 col-lg-4 col-xl-3 col-xxl-3 p-2" key={key}>
                                            <div onClick={()=>registerRestaurant(res)} className="overflow-hidden pointer pointer-effect bg-darker rounded-4 border border-lightly h-100">
                                                <img className="w-100" src={defaultLogo} alt="" style={{minHeight: '150px', maxHeight: '150px'}} />
                                                <div className="p-3">
                                                    <div className="text-break fs-3 mb-2">{res.attributes.name}</div>
                                                    <div className="text-break small">Operation</div>
                                                    <div className="text-break">{res.attributes.openingHours}</div>
                                                </div>
                                            </div>
                                        </div>
                                    )):
                                    <div className="text-center p-5">
                                        <img
                                            src="https://cdn-icons-png.flaticon.com/512/706/706797.png"
                                            alt="No access"
                                            style={{width: "80px", height: "80px", opacity: 0.6}}
                                            className="mb-3"
                                        />
                                        <h4 className="fw-semibold mb-2">No Restaurant Assigned</h4>
                                        <p className="mb-3">Your account is not currently linked to any restaurant. Please contact an administrator to be assigned.</p>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    )
}