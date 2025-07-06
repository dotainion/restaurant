export const PERMISSIONS = [
    {
        title: 'admin',
        description: 'Full system access, including user management, system settings, financials, and all operational features.'
    },{
        title: 'supervisor',
        description: 'Can oversee staff activities, manage reservations and orders, and access reporting tools, but cannot change system-wide settings.'
    },{
        title: 'staff',
        description: 'Can handle daily operations such as placing orders, managing tables, and interacting with customers, but with limited access to sensitive data.'
    },{
        title: 'viewer',
        description: 'Read-only access to assigned sections such as schedules, menus, or reports. Cannot make changes or perform actions.'
    },{
        title: 'guest',
        description: 'Very limited access, typically used for temporary access or demonstrations. Can only view public or assigned content.'
    }
];
