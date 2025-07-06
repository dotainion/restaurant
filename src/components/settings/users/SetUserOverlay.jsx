import React, { useEffect, useState } from 'react';
import { OverlayModal } from "../../OverlayModal"
import { FaUser, FaEnvelope, FaPhone, FaEyeSlash, FaCamera, FaAlignLeft, FaVenusMars, FaMapMarkerAlt, FaHome, FaBuilding, FaRoad } from 'react-icons/fa';
import { Spinner } from "../../../widgets/Spinner";
import { api } from "../../../request/Api";
import { useUtils } from "../../../providers/UtilsProvider";

const initialUser = {
    id: '',
    attributes: {
        foreignId: '',
        firstName: '',
        lastName: '',
        email: '',
        hide: false,
        phoneNumber: '',
        picture: '',
        bio: '',
        gender: '',
        addressId: '',
        address: {
            id: '',
            attributes: {
                country: '',
                state: '',
                address: '',
                apt: '',
                zip: ''
            }
        }
    }
};

export const SetUserOverlay = ({userToEdit, show, close, update}) =>{
    const { toast } = useUtils();

    const [user, setUser] = useState(initialUser);
    const [loading, setLoading] = useState(false);

    const handleChange = (key, value) => {
        setUser(prev => ({
            ...prev,
            attributes: {
                ...prev.attributes,
                [key]: value
            }
        }));
    }

    const handleAddressChange = (key, value) => {
        setUser(prev => ({
            ...prev,
            attributes: {
                ...prev.attributes,
                address: {
                    ...prev.attributes.address,
                    attributes: {
                        ...prev.attributes.address.attributes,
                        [key]: value
                    }
                }
            }
        }));
    }

    const submit = (e) => {
        e.preventDefault();
        setLoading(true);

        api.user.editProfile({
            id: user.id,
            ...user.attributes
        }).then((response)=>{
            update?.(response.data.data[0]);
        }).catch((error)=>{
            toast.error(error);
        }).finally(()=>{
            setLoading(false);
        });

        if(!user.attributes.address) return;

        api.user.setAddress({
            id: user.id,
            ...user.attributes.address.attributes
        }).then((response)=>{
            
        }).catch((error)=>{
            toast.error(error);
        }).finally(()=>{
            setLoading(false);
        });
    }

    const { attributes } = user;
    const addr = attributes.address?.attributes || {};

    useEffect(() => {
        if(!userToEdit) return;
        if(!userToEdit.attributes.address){
            userToEdit.attributes.address = initialUser.attributes.address;
        }
        setUser(userToEdit);
    }, [userToEdit]);

    return(
        <OverlayModal title="Create Role" show={show} close={close}>
            <div className="container-fluid position-relative" style={{maxWidth: '1000px'}}>
                <h2 className="mb-3">{userToEdit ? 'Edit User' : 'Create User'}</h2>

                <form onSubmit={submit} className="row g-4">
                    <div className="col-md-6">
                        <div className="input-group">
                            <span className="input-group-text bg-dark text-light border border-lightly"><FaUser /></span>
                            <input
                                type="text"
                                className="form-control border border-lightly text-light bg-dark shadow-none"
                                placeholder="First Name"
                                value={attributes.firstName}
                                onChange={e => handleChange('firstName', e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="input-group">
                            <span className="input-group-text bg-dark text-light border border-lightly"><FaUser /></span>
                            <input
                                type="text"
                                className="form-control border border-lightly text-light bg-dark shadow-none"
                                placeholder="Last Name"
                                value={attributes.lastName}
                                onChange={e => handleChange('lastName', e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="input-group">
                            <span className="input-group-text bg-dark text-light border border-lightly"><FaEnvelope /></span>
                            <input
                                type="email"
                                className="form-control border border-lightly text-light bg-dark shadow-none"
                                placeholder="Email"
                                value={attributes.email}
                                onChange={e => handleChange('email', e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="input-group">
                            <span className="input-group-text bg-dark text-light border border-lightly"><FaPhone /></span>
                            <input
                                type="tel"
                                className="form-control border border-lightly text-light bg-dark shadow-none"
                                placeholder="Phone Number"
                                value={attributes.phoneNumber}
                                onChange={e => handleChange('phoneNumber', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="input-group">
                            <span className="input-group-text bg-dark text-light border border-lightly"><FaCamera /></span>
                            <input type="file" hidden id="add-image" />
                            <label className="form-control btn btn-dark shadow-none border border-lightly" htmlFor="add-image">Add Image</label>
                        </div>
                    </div>
                    <div className="col-md-6 d-flex align-items-center">
                        <div className="form-check form-switch">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="hideUser"
                                checked={attributes.hide}
                                onChange={e => handleChange('hide', e.target.checked)}
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
                            className="form-control border border-lightly text-light bg-dark shadow-none"
                            placeholder="Bio"
                            rows="3"
                            value={attributes.bio || ''}
                            onChange={e => handleChange('bio', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="col-12">
                        <label className="form-label d-block"><FaVenusMars className="me-2" />Gender</label>
                        {['Male', 'Female'].map(g => (
                            <div className="form-check form-check-inline" key={g}>
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="gender"
                                    id={`gender${g}`}
                                    value={g}
                                    checked={attributes.gender === g}
                                    onChange={() => handleChange('gender', g)}
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
                                type="text"
                                className="form-control border border-lightly text-light bg-dark shadow-none"
                                placeholder="Country"
                                value={addr.country}
                                onChange={e => handleAddressChange('country', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="input-group">
                            <span className="input-group-text bg-dark text-light border border-lightly"><FaHome /></span>
                            <input
                                type="text"
                                className="form-control border border-lightly text-light bg-dark shadow-none"
                                placeholder="State"
                                value={addr.state}
                                onChange={e => handleAddressChange('state', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="input-group">
                            <span className="input-group-text bg-dark text-light border border-lightly"><FaRoad /></span>
                            <input
                                type="text"
                                className="form-control border border-lightly text-light bg-dark shadow-none"
                                placeholder="Zip Code"
                                value={addr.zip}
                                onChange={e => handleAddressChange('zip', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="input-group">
                            <span className="input-group-text bg-dark text-light border border-lightly"><FaBuilding /></span>
                            <input
                                type="text"
                                className="form-control border border-lightly text-light bg-dark shadow-none"
                                placeholder="Street Address"
                                value={addr.address}
                                onChange={e => handleAddressChange('address', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="input-group">
                            <span className="input-group-text bg-dark text-light border border-lightly"><FaBuilding /></span>
                            <input
                                type="text"
                                className="form-control border border-lightly text-light bg-dark shadow-none"
                                placeholder="Apt/Suite"
                                value={addr.apt}
                                onChange={e => handleAddressChange('apt', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="col-12 d-flex justify-content-end gap-3 mt-4">
                        <button onClick={close} className="btn btn-sm text-orange border border-lightly" type="button">Cancel</button>
                        <button className="btn btn-sm btn-orange" type="submit">Save User</button>
                    </div>
                </form>
                <Spinner show={loading} inline transparent />
            </div>
        </OverlayModal>
    )
}
