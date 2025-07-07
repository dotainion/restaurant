import React, { useEffect, useRef, useState } from 'react';
import { OverlayModal } from "../../OverlayModal"
import { FaUser, FaEnvelope, FaPhone, FaEyeSlash, FaCamera, FaAlignLeft, FaVenusMars, FaMapMarkerAlt, FaHome, FaBuilding, FaRoad } from 'react-icons/fa';
import { Spinner } from "../../../widgets/Spinner";
import { api } from "../../../request/Api";
import { useUtils } from "../../../providers/UtilsProvider";
import { useParams } from 'react-router-dom';

export const Profile = () =>{
    const { toast } = useUtils();

    const [loading, setLoading] = useState(true);

    const params = useParams();

    const idRef = useRef(null);
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const hideRef = useRef();
    const phoneNumberRef = useRef();
    const pictureRef = useRef();
    const bioRef = useRef();
    const genderRef = useRef();
    const countryRef = useRef();
    const stateRef = useRef();
    const addressRef = useRef();
    const aptRef = useRef();
    const zipRef = useRef();

    const getData = () =>({
        id: idRef.current.value,
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        email: emailRef.current.value,
        hide: hideRef.current.checked,
        phoneNumber: phoneNumberRef.current.value,
        picture: pictureRef.current.value,
        bio: bioRef.current.value,
        gender: genderRef.current.value,
        country: countryRef.current.value,
        state: stateRef.current.value,
        address: addressRef.current.value,
        apt: aptRef.current.value,
        zip: zipRef.current.value,
    });

    const submit = (e) => {
        e.preventDefault();
        setLoading(true);

        const data = getData();

        api.user.editProfile(data).then((response)=>{
            
        }).catch((error)=>{
            toast.error(error);
        }).finally(()=>{
            setLoading(false);
        });

        api.user.setAddress(data).then((response)=>{
            
        }).catch((error)=>{
            toast.error(error);
        }).finally(()=>{
            setLoading(false);
        });
    }


    useEffect(() => {
        if(!params?.userId){
            setLoading(false);
            return;
        }
        api.user.user(params.userId).then((response)=>{
            const user = response.data.data[0];
            idRef.current.value = user.id;
            firstNameRef.current.value = user.attributes.firstName;
            lastNameRef.current.value = user.attributes.lastName;
            emailRef.current.value = user.attributes.email;
            hideRef.current.checked = user.attributes.hide;
            phoneNumberRef.current.value = user.attributes.phoneNumber;
            //pictureRef.current.value = user.attributes.pictureRef;
            bioRef.current.value = user.attributes.bioRef;
            genderRef.current.value = user.attributes.gender;
            countryRef.current.value = user.attributes.country;
            stateRef.current.value = user.attributes.state;
            addressRef.current.value = user.attributes.address;
            aptRef.current.value = user.attributes.apt;
            zipRef.current.value = user.attributes.zip;
        }).catch((error)=>{

        }).finally(()=>{
            setLoading(false);
        });
    }, []);

    return(
        <div className="container-fluid position-relative">
            <h4 className="mb-4">Profile</h4>
            <form onSubmit={submit} className="row g-4">
                <div className="col-lg-6">
                    <div className="input-group">
                        <span className="input-group-text bg-dark text-light border border-lightly"><FaUser /></span>
                        <input
                            ref={firstNameRef}
                            type="text"
                            className="form-control border border-lightly text-light bg-dark shadow-none"
                            placeholder="First Name"
                            required
                        />
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="input-group">
                        <span className="input-group-text bg-dark text-light border border-lightly"><FaUser /></span>
                        <input
                            ref={lastNameRef}
                            type="text"
                            className="form-control border border-lightly text-light bg-dark shadow-none"
                            placeholder="Last Name"
                            required
                        />
                    </div>
                </div>

                <div className="col-lg-6">
                    <div className="input-group">
                        <span className="input-group-text bg-dark text-light border border-lightly"><FaEnvelope /></span>
                        <input
                            ref={emailRef}
                            type="email"
                            className="form-control border border-lightly text-light bg-dark shadow-none"
                            placeholder="Email"
                            required
                        />
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="input-group">
                        <span className="input-group-text bg-dark text-light border border-lightly"><FaPhone /></span>
                        <input
                            ref={phoneNumberRef}
                            type="tel"
                            className="form-control border border-lightly text-light bg-dark shadow-none"
                            placeholder="Phone Number"
                        />
                    </div>
                </div>

                <div className="col-lg-6">
                    <div className="input-group">
                        <span className="input-group-text bg-dark text-light border border-lightly"><FaCamera /></span>
                        <input type="file" hidden id="add-image" />
                        <label className="form-control btn btn-dark shadow-none border border-lightly" htmlFor="add-image">Add Image</label>
                    </div>
                </div>
                <div className="col-lg-6 d-flex align-items-center">
                    <div className="form-check form-switch">
                        <input
                            ref={hideRef}
                            className="form-check-input"
                            type="checkbox"
                            id="hideUser"
                        />
                        <label className="form-check-label ms-2" htmlFor="hideUser">
                            <FaEyeSlash className="me-1 text-muted" /> Hide User
                        </label>
                    </div>
                </div>

                <div className="col-12">
                    <div className="input-group">
                        <span className="input-group-text bg-dark text-light border border-lightly"><FaAlignLeft /></span>
                        <textarea
                            ref={bioRef}
                            className="form-control border border-lightly text-light bg-dark shadow-none"
                            placeholder="Bio"
                            rows="3"
                        />
                    </div>
                </div>

                <div className="col-12">
                    <label className="form-label d-block"><FaVenusMars className="me-2" />Gender</label>
                    {['Male', 'Female'].map(g => (
                        <div className="form-check form-check-inline" key={g}>
                            <input
                                ref={genderRef}
                                className="form-check-input"
                                type="radio"
                                name="gender"
                                id={`gender${g}`}
                            />
                            <label className="form-check-label ms-1" htmlFor={`gender${g}`}>{g}</label>
                        </div>
                    ))}
                </div>

                <h5 className="mt-4 mb-0">Address Information</h5>
                <div className="col-md-4">
                    <div className="input-group">
                        <span className="input-group-text bg-dark text-light border border-lightly"><FaMapMarkerAlt /></span>
                        <input
                            ref={countryRef}
                            type="text"
                            className="form-control border border-lightly text-light bg-dark shadow-none"
                            placeholder="Country"
                        />
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="input-group">
                        <span className="input-group-text bg-dark text-light border border-lightly"><FaHome /></span>
                        <input
                            ref={stateRef}
                            type="text"
                            className="form-control border border-lightly text-light bg-dark shadow-none"
                            placeholder="State"
                        />
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="input-group">
                        <span className="input-group-text bg-dark text-light border border-lightly"><FaRoad /></span>
                        <input
                            ref={zipRef}
                            type="text"
                            className="form-control border border-lightly text-light bg-dark shadow-none"
                            placeholder="Zip Code"
                        />
                    </div>
                </div>
                <div className="col-lg-8">
                    <div className="input-group">
                        <span className="input-group-text bg-dark text-light border border-lightly"><FaBuilding /></span>
                        <input
                            ref={addressRef}
                            type="text"
                            className="form-control border border-lightly text-light bg-dark shadow-none"
                            placeholder="Street Address"
                        />
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="input-group">
                        <span className="input-group-text bg-dark text-light border border-lightly"><FaBuilding /></span>
                        <input
                            ref={aptRef}
                            type="text"
                            className="form-control border border-lightly text-light bg-dark shadow-none"
                            placeholder="Apt/Suite"
                        />
                    </div>
                </div>

                <div className="col-12 d-flex justify-content-end gap-3 mt-4">
                    <button className="btn btn-sm btn-orange" type="submit">Save User</button>
                </div>
            </form>
            <Spinner show={loading} inline transparent />
        </div>
    )
}
