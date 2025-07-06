import React, { useState, useEffect } from 'react';
import { FaBell } from 'react-icons/fa';

const events = [
    { key: 'order', label: 'New Order', desc: 'Receive an in-app alert when a new order is placed.' },
    { key: 'reservation', label: 'New Reservation', desc: 'Receive an in-app alert when a reservation is booked.' },
    { key: 'payment', label: 'Payment Received', desc: 'Receive an in-app alert when a payment is successfully processed.' },
    { key: 'lowStock', label: 'Low Stock Alert', desc: 'Receive an in-app alert when inventory is low.' },
    { key: 'dailyReport', label: 'Daily Summary', desc: 'Receive a daily summary of activity.' },
];

const defaultSettings = events.reduce((acc, ev) => {
    acc[ev.key] = true;
    return acc;
}, {});

export const Notifications = () =>{
    const [settings, setSettings] = useState({});

    const toggleEvent = eventKey => {
        setSettings(prev => ({
            ...prev,
            [eventKey]: !prev[eventKey]
        }));
    }

    const onSave = () => {
        console.log('Saved notification settings:', settings);
    }

    useEffect(() => {
        setSettings(defaultSettings);
    }, []);

    return (
        <div className="container-fluid">
            <div className="mb-4">
                <h4>Notification Settings</h4>
                <p>Manage which events trigger live in-app notifications (via Pusher).</p>
            </div>

            <div onChange={onSave} className="row">
                {events.map(ev => (
                    <div className="col-md-6 col-lg-4 mb-4" key={ev.key}>
                        <div className="card border border-lightly h-100 shadow-sm">
                            <div className="card-body">
                                <div className="d-flex align-items-center text-orange mb-3">
                                    <FaBell className="me-2" />
                                    <h5 className="mb-0">{ev.label}</h5>
                                </div>
                                <p className="small">{ev.desc}</p>
                                <div className="form-check form-switch mt-3">
                                    <input
                                        id={`switch-${ev.key}`}
                                        type="checkbox"
                                        className="form-check-input shadow-none"
                                        checked={settings[ev.key] || false}
                                        onChange={() => toggleEvent(ev.key)}
                                    />
                                    <label className="form-check-label ms-2" htmlFor={`switch-${ev.key}`}>Enabled</label>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}