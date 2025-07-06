import React, { useState } from "react";

const roles = ["admin", "supervisor", "staff", "viewer", "guest"];
const permissionFields = [
    { key: "canViewRefunds", label: "View Refunds" },
    { key: "canManageRefunds", label: "Manage Refunds" },
    { key: "canExport", label: "Export Data" },
    { key: "canPayout", label: "Payout Access" },
];

const initialPermissions = roles.map((role) => ({
    role,
    canViewRefunds: role === "admin" || role === "supervisor",
    canManageRefunds: role === "admin",
    canExport: role !== "guest" && role !== "viewer",
    canPayout: role === "admin",
}));

export const PermissionsAccess = () => {
    const [permissions, setPermissions] = useState(initialPermissions);

    const togglePermission = (roleIndex, field) => {
        const updated = [...permissions];
        updated[roleIndex][field] = !updated[roleIndex][field];
        setPermissions(updated);
    };

    //this is wrong and need review or removing

    return (
        <div className="container py-4">
            <div className="mb-4">
                <h3>Permissions & Access</h3>
                <p className="text-muted">
                Control who can view or manage refunds, exports, and payouts with role-based access.
                </p>
            </div>

            <div className="table-responsive shadow-sm">
                <table className="table table-bordered bg-white align-middle text-center">
                <thead className="table-light">
                    <tr>
                    <th className="text-start">Role</th>
                    {permissionFields.map((perm) => (
                        <th key={perm.key}>{perm.label}</th>
                    ))}
                    </tr>
                </thead>
                <tbody>
                    {permissions.map((perm, index) => (
                    <tr key={perm.role}>
                        <td className="text-start text-capitalize fw-semibold">{perm.role}</td>
                        {permissionFields.map(({ key }) => (
                        <td key={key}>
                            <input
                            type="checkbox"
                            className="form-check-input"
                            checked={perm[key]}
                            onChange={() => togglePermission(index, key)}
                            />
                        </td>
                        ))}
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>

            <div className="d-flex justify-content-end mt-4">
                <button className="btn btn-primary">Save Changes</button>
            </div>
        </div>
    )
}
