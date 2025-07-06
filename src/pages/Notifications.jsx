import React, { useState } from "react";
import { FaCheck, FaTrash, FaInfoCircle, FaExclamationTriangle } from "react-icons/fa";

const initialNotifications = [
    {
        id: 1,
        type: "info",
        title: "New reservation received",
        message: "You have a new booking for June 22nd.",
        date: "2025-06-20",
        read: false,
    },{
        id: 2,
        type: "warning",
        title: "Payment delayed",
        message: "Refund for Order ORD-1002 has not been completed.",
        date: "2025-06-19",
        read: false,
    },{
        id: 3,
        type: "success",
        title: "Export ready",
        message: "Your June sales report is now available for download.",
        date: "2025-06-18",
        read: true,
    },{
        id: 1,
        type: "info",
        title: "New reservation received",
        message: "You have a new booking for June 22nd.",
        date: "2025-06-20",
        read: false,
    },{
        id: 2,
        type: "warning",
        title: "Payment delayed",
        message: "Refund for Order ORD-1002 has not been completed.",
        date: "2025-06-19",
        read: false,
    },{
        id: 3,
        type: "success",
        title: "Export ready",
        message: "Your June sales report is now available for download.",
        date: "2025-06-18",
        read: true,
    },
];

const getIcon = (type) => {
    switch (type) {
        case "info":
        return <FaInfoCircle className="text-primary me-2" />;
        case "warning":
        return <FaExclamationTriangle className="text-warning me-2" />;
        case "success":
        return <FaCheck className="text-success me-2" />;
        default:
        return <FaInfoCircle className="text-muted me-2" />;
    }
}

export const Notifications = () => {
    const [notifications, setNotifications] = useState(initialNotifications);

    const markAsRead = (id) => {
        setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
        );
    };

    const deleteNotification = (id) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    };

    return (
        <div className="container py-4">
            <div className="mb-4">
                <h3 className="mb-1">Notifications</h3>
                <p>View system updates, alerts, and messages.</p>
            </div>

            <div className="list-group">
                {
                    [].length ?
                    [].map((n) => (
                        <div className={`list-group-item list-group-item-action mb-2 rounded-3 bg-darker border border-lightly d-flex justify-content-between align-items-start ${n.read ? 'text-secondary' : 'text-light'}`} key={n.id}>
                            <div className="d-flex">
                                <div className="fs-4">{getIcon(n.type)}</div>
                                <div className="ms-2">
                                    <div className="fw-semibold">{n.title}</div>
                                    <div className="small">{n.message}</div>
                                    <div className="small">{n.date}</div>
                                </div>
                            </div>
                            <div className="ms-auto d-flex align-items-center gap-2">
                                {!n.read && (
                                    <button
                                        onClick={()=>markAsRead(n.id)}
                                        className="btn btn-sm btn-outline-success"
                                        title="Mark as read"
                                    ><FaCheck /></button>
                                )}
                                <button
                                    onClick={()=>deleteNotification(n.id)}
                                    className="btn btn-sm btn-outline-danger"
                                    title="Delete"
                                ><FaTrash /></button>
                            </div>
                        </div>
                    )):
                    <div className="text-center p-5">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/5974/5974636.png"
                            alt="No notifications"
                            style={{ width: "70px", height: "70px", opacity: 0.5 }}
                            className="mb-3"
                        />
                        <h5 className="fw-semibold mb-2">No Notifications</h5>
                        <p className="small mb-0">You’re all caught up! New notifications will appear here.</p>
                    </div>
                }
            </div>
        </div>
    )
}
