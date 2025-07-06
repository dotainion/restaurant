import { FiBarChart2, FiBell, FiCalendar, FiHome, FiLogOut, FiMessageCircle, FiSettings } from "react-icons/fi";
import { Home } from "../pages/Home";
import { Reservation } from "../pages/Reservation";
import { Dashboard } from "../pages/Dashboard";
import { Messaging } from "../pages/Messaging";
import { Notifications } from "../pages/Notifications";
import { Settings } from "../pages/Settings";
import { Logout } from "../pages/Logout";
import { Kitchen } from "../pages/Kitchen";
import { TbToolsKitchen3 } from "react-icons/tb";

export const PAGE_ACCESS = {
    [Home.name]: {
        icon: FiHome,
        roles: ['admin', 'supervisor', 'staff', 'viewer', 'guest'], 
        page: 'Order',
        details: 'Access and manage customer orders, including viewing details, updating statuses, and processing transactions.'
    },
    [Kitchen.name]: {
        icon: TbToolsKitchen3,
        roles: ['admin', 'supervisor', 'staff', 'viewer', 'guest'], 
        page: 'Order',
        details: 'Access and manage customer orders, including viewing details, updating statuses, and processing transactions.'
    },
    [Reservation.name]: {
        icon: FiCalendar,
        roles: ['admin', 'supervisor', 'staff', 'viewer'], 
        page: 'Reservation',
        details: 'View, create, and manage reservations. Ideal for handling bookings, availability, and guest details.'
    },
    [Dashboard.name]: {
        icon: FiBarChart2,
        roles: ['admin', 'supervisor', 'viewer'], 
        page: 'Dashboard',
        details: 'Get an overview of key metrics, summaries, and insights. Useful for tracking performance and activity.'
    },
    [Messaging.name]: {
        icon: FiMessageCircle,
        roles: ['admin', 'supervisor', 'staff', 'viewer'], 
        page: 'Message',
        details: 'Send and receive direct messages with users, guests, or team members. Central hub for communication.'
    },
    [Notifications.name]: {
        icon: FiBell,
        roles: ['admin', 'supervisor', 'staff', 'viewer'], 
        page: 'Notifications',
        details: 'View system alerts, updates, and important notices relevant to the user or role.'
    },
    [Settings.name]: {
        icon: FiSettings,
        roles: ['admin'], 
        page: 'Settings',
        details: 'Access system or user-specific configuration options. Manage preferences, integrations, and other settings.'
    },
    [Logout.name]: {
        icon: FiLogOut,
        roles: ['admin', 'supervisor', 'staff', 'viewer', 'guest'], 
        page: 'Logout',
        details: 'Sign out of the application securely and end the current session.'
    },
};