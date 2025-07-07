import { FiEdit, FiPhone, FiMapPin, FiMail, FiStar } from 'react-icons/fi';
import { useLayoutEffect, useState } from 'react';
import { utils } from '../../../utils/Utils';
import { SetRestaurantOverlay } from './SetRestaurantOverlay';
import { api } from '../../../request/Api';
import { GrAdd } from 'react-icons/gr';

export const Restaurant = () =>{
    const [overlay, setOverlay] = useState({show: false, state: null});
    const [restaurant, setRestaurant] = useState();
    const [restaurants, setRestaurants] = useState([]);

    const defaultLogo = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-YFnEBqymGudV2EJNY9KLlw0nH7378i52aQ&s';

    useLayoutEffect(()=>{
        api.restaurant.list().then((response)=>{
            setRestaurants(response.data.data);
        }).catch((error)=>{

        })
    }, []);

    return (
        <div className="d-flex flex-column h-100">
            <div className="restaurant-img-container position-relative">
                <img className="rounded-4 w-100 h-100" src="https://t3.ftcdn.net/jpg/03/24/73/92/360_F_324739203_keeq8udvv0P2h1MLYJ0GLSlTBagoXS48.jpg" alt="restaurant logo" />
                <img className="logo position-absolute rounded-circle shadow-lg" src={restaurant?.attributes?.logo || defaultLogo} alt="" />
            </div>
            {
                restaurant
                ? <div className="d-flex flex-column flex-wrap flex-md-row justify-content-between align-items-center gap-1 gap-sm-4">
                    <h2 className="fw-bold mt-3 mb-1">{restaurant.attributes.name}</h2>
                    <p className="mb-1">{restaurant.attributes.tagline}</p>
                    <div className="d-flex flex-wrap align-items-center gap-2 small">
                        <span className={`badge bg-${restaurant.attributes.isOpen ? 'success' : 'secondary'}`}>
                            {restaurant.attributes.isOpen ? 'Open Now' : 'Closed'}
                        </span>
                        <span>• {restaurant.attributes.cuisine}</span>
                        <span>• {restaurant.attributes.category}</span>
                        <span>• {restaurant.attributes.priceRange}</span>
                        <span className="d-flex align-items-center">
                            <FiStar className="text-warning me-1" />
                            {restaurant.attributes.rating} ({restaurant.attributes.openingHours})
                        </span>
                    </div>
                    <div className="d-flex justify-content-end gap-2 w-100">
                        <button onClick={()=>setOverlay({show: true, state: restaurant})} className="btn btn-sm btn-outline-orange d-flex align-items-center gap-2">
                            <FiEdit />
                            <span>Edit</span>
                        </button>
                        <button onClick={()=>setOverlay({show: true, state: null})} className="btn btn-sm btn-outline-orange d-flex align-items-center gap-2">
                            <GrAdd />
                            <span>Create</span>
                        </button>
                    </div>
                </div>
                : <div className="text-center p-5 border border-lightly rounded-4 bg-dark mt-3">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png"
                        alt="No restaurant selected"
                        style={{ width: "80px", height: "80px", opacity: 0.5 }}
                        className="mb-3"
                    />
                    <h4 className="fw-semibold mb-2">No Restaurant Selected</h4>
                    <p className="mb-2">Please select a restaurant to view its details.</p>
                    <p className="mb-2">or</p>
                    <button onClick={()=>setOverlay({show: true, state: null})} className="btn btn-outline-orange">Create a Restaurant</button>
                </div>
            }

            <hr className="my-4 mt-2 mt-sm-3 mb-2" />

            <div className="overflow-auto scrollbar-md">
                {restaurants.map((rest)=>(
                    <div onClick={()=>setRestaurant(rest)} className="bg-dark p-3 text-light rounded-3 pointer mb-3" key={rest.id}>
                        <div className="d-flex flex-wrap gap-3 mb-2">
                            <div className="d-flex align-items-start gap-2">
                                <FiPhone className="fs-5 mt-1" />
                                <span className='text-nowrap'>{rest.attributes.phone}</span>
                            </div>
                            <div className="d-flex align-items-start gap-2">
                                <FiMail className="fs-5 mt-1" />
                                <span>{rest.attributes.email}</span>
                            </div>
                            <div className="text-nowrap">{utils.date.toLocalDate(rest.attributes.created)}</div>
                        </div>
                        <div className="d-flex gap-2">
                            <FiMapPin className="fs-5 mt-1" />
                            <span>{rest.attributes.address}</span>
                        </div>
                    </div>
                ))}
            </div>
            <SetRestaurantOverlay 
                restaurantToEdit={overlay.state}
                show={overlay.show} 
                close={()=>setOverlay({show: false, state: null})} 
            />
        </div>
    )
}
