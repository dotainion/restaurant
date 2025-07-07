import { useEffect, useRef } from "react"
import { api } from "../../../request/Api"
import { useUtils } from "../../../providers/UtilsProvider"
import { OverlayModal } from "../../OverlayModal";
import { FiClock, FiDollarSign, FiList, FiMail, FiMapPin, FiPhone, FiSave, FiStar, FiTag, FiType, FiX } from "react-icons/fi";
import { MdOutlineDataSaverOn } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import { FaImages } from "react-icons/fa";

export const SetRestaurantOverlay = ({restaurantToEdit, show, close}) =>{
    const { toast } = useUtils();
    
    //restaurant
    const idRef = useRef(null);
    const nameRef = useRef();
    const taglineRef = useRef();
    const logoRefRef = useRef();
    const isActiveRef = useRef();
    const phoneRef = useRef();
    const emailRef = useRef();
    const cuisineRef = useRef();
    const categoryRef = useRef();
    const ratingRef = useRef();
    const openingHoursRef = useRef();
    const priceRangeRef = useRef();
    
    //address
    const addressIdRef = useRef(uuidv4());
    const countryRef = useRef();
    const stateRef = useRef();
    const addressRef = useRef();
    const aptRef = useRef();
    const zipRef = useRef();

    const save = () =>{
        const data = {
            id: idRef.current,
            name: nameRef.current.value,
            tagline: taglineRef.current.value,
            logoRef: logoRefRef.current.value,
            isActive: isActiveRef.current.value || true,
            phone: phoneRef.current.value,
            email: emailRef.current.value,
            addressId: addressIdRef.current,
            cuisine: cuisineRef.current.value,
            category: categoryRef.current.value,
            rating: ratingRef.current.value,
            openingHours: openingHoursRef.current.value,
            priceRange: priceRangeRef.current.value
        }
        api.restaurant.set(data).then((response)=>{

        }).catch((error)=>{
            toast.error(error);
        });

        const addr = {
            id: addressIdRef.current,
            country: countryRef.current.value,
            state: stateRef.current.value,
            address: addressRef.current.value,
            apt: aptRef.current.value,
            zip: zipRef.current.value,
        }
        api.user.setAddress(addr).then((response)=>{
            close?.();
        }).catch((error)=>{
            toast.error(error);
        });
    }

    useEffect(()=>{
        if(!restaurantToEdit) return;
        //restaurant
        idRef.current = restaurantToEdit.id;
        nameRef.current.value = restaurantToEdit.attributes.name;
        taglineRef.current.value = restaurantToEdit.attributes.tagline;
        logoRefRef.current.value = restaurantToEdit.attributes.logoRef;
        //isActiveRef.current.value = restaurantToEdit.attributes.isActive;
        phoneRef.current.value = restaurantToEdit.attributes.phone;
        emailRef.current.value = restaurantToEdit.attributes.email;
        cuisineRef.current.value = restaurantToEdit.attributes.cuisine;
        categoryRef.current.value = restaurantToEdit.attributes.category;
        ratingRef.current.value = restaurantToEdit.attributes.rating;
        openingHoursRef.current.value = restaurantToEdit.attributes.openingHours;
        priceRangeRef.current.value = restaurantToEdit.attributes.priceRange;
    
        //address
        addressIdRef.current = restaurantToEdit.attributes.address.id;
        countryRef.current.value = restaurantToEdit.attributes.address.attributes.country;
        stateRef.current.value = restaurantToEdit.attributes.address.attributes.state;
        addressRef.current.value = restaurantToEdit.attributes.address.attributes.address;
        aptRef.current.value = restaurantToEdit.attributes.address.attributes.apt;
        zipRef.current.value = restaurantToEdit.attributes.address.attributes.zip;
    }, [restaurantToEdit]);
    
    return(
        <OverlayModal title="Edit Restaurant Details" show={show} close={close}>
            <form onSubmit={e=>e.preventDefault()} className="restaurant-entry">
                <div className="row mb-3">
                    <div className="col-md-6 mb-3 mb-md-0">
                        <label className="form-label"><FiType className="me-2" />Restaurant Name</label>
                        <input ref={nameRef} className="form-control bg-dark border border-lightly text-light" type="text" required />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label"><FiTag className="me-2" />Tagline</label>
                        <input ref={taglineRef} className="form-control bg-dark border border-lightly text-light" type="text" />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-6 mb-3 mb-md-0">
                        <label className="form-label"><FiPhone className="me-2" />Phone</label>
                        <input ref={phoneRef} className="form-control bg-dark border border-lightly text-light" type="text" />
                    </div>
                    <div className="col-md-6 mb-3 mb-md-0">
                        <label className="form-label"><FiMail className="me-2" />Email</label>
                        <input ref={emailRef} className="form-control bg-dark border border-lightly text-light" type="email" />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-6 mb-md-0">
                        <label className="form-label"><FiList className="me-2" />Cuisine Type</label>
                        <input ref={cuisineRef} className="form-control bg-dark border border-lightly text-light" type="text" />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label w-100"><FiList className="me-2" />Restaurant Logo</label>
                        <div className="d-flex align-items-center">
                            <input type="file" id="image-restaurant" hidden />
                            <label className="btn form-label mb-0 border border-lightly text-light" htmlFor="image-restaurant">
                                <FaImages className="me-2" />
                                <span>Restaurant Logo</span>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-6 mb-3 mb-md-0">
                        <label className="form-label"><FiClock className="me-2" />Opening Hours</label>
                        <input ref={openingHoursRef} className="form-control bg-dark border border-lightly text-light" type="text" />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label"><FiList className="me-2" />Category</label>
                        <input ref={categoryRef} className="form-control bg-dark border border-lightly text-light" type="text" />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-6 mb-3 mb-md-0">
                        <label className="form-label"><FiDollarSign className="me-2" />Price Range</label>
                        <select ref={priceRangeRef} className="form-select bg-dark border border-lightly text-light" >
                            <option value="$">$ (Budget)</option>
                            <option value="$$">$$ (Moderate)</option>
                            <option value="$$$">$$$ (Premium)</option>
                            <option value="$$$$">$$$$ (Luxury)</option>
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label"><FiStar className="me-2" />Rating</label>
                        <input ref={ratingRef} className="form-control bg-dark border border-lightly text-light" type="number" step="0.1" min="0" max="5" />
                    </div>
                </div>

                <hr></hr>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <label className="form-label"><FiMapPin className="me-2" />Country</label>
                        <input ref={countryRef} className="form-control bg-dark border border-lightly text-light" type="text" />
                    </div>
                    <div className="col-md-6 mb-3 mb-md-0">
                        <label className="form-label"><FiMapPin className="me-2" />State</label>
                        <input ref={stateRef} className="form-control bg-dark border border-lightly text-light" type="text" />
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label"><FiMapPin className="me-2" />Address</label>
                    <input ref={addressRef} className="form-control bg-dark border border-lightly text-light" type="text" />
                </div>
                <div className="row mb-3">
                    <div className="col-md-6 mb-3 mb-md-0">
                        <label className="form-label"><FiMapPin className="me-2" />Apartment</label>
                        <input ref={aptRef} className="form-control bg-dark border border-lightly text-light" type="text" />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label"><FiMapPin className="me-2" />Zip</label>
                        <input ref={zipRef} className="form-control bg-dark border border-lightly text-light" type="text" />
                    </div>
                </div>
                <div className="d-flex justify-content-end gap-2 mt-4">
                    <button onClick={close} className="d-flex gap-1 align-items-center btn btn-sm border border-lightly text-light">
                        <FiX />
                        <span>Cancel</span>
                    </button>
                    <button onClick={save} className="d-flex gap-1 align-items-center btn btn-sm btn-orange" type="submit">
                        <MdOutlineDataSaverOn />
                        <span>{restaurantToEdit ? 'Add restaurant' : 'Update restaurant'}</span>
                    </button>
                </div>
            </form>
        </OverlayModal>
    )
}