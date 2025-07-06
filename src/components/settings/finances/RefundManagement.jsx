import React, { useState } from "react";
import { FaUndo } from "react-icons/fa";

const mockContributions = [
    { id: 1, name: "June Susu", amount: 500, date: "2025-06-10", user: "Kendra Peters" },
    { id: 2, name: "Meal Order", amount: 35.75, date: "2025-06-18", user: "Leo Blair" },
    { id: 3, name: "Event Ticket", amount: 75.0, date: "2025-06-20", user: "Trisha Green" },
];

export const RefundManagement = () => {
    const [selected, setSelected] = useState(null);
    const [form, setForm] = useState({ method: "", reason: "" });

    const handleRefund = () => {
        if (!selected) return alert("Select an item to refund.");
        console.log("Refunded", selected, form);
        alert("Refund processed!");
        setSelected(null);
        setForm({ method: "", reason: "" });
    };

    return (
        <div className="container py-4">
            <div className="mb-4">
                <h3 className="mb-1">Refund Management</h3>
                <p className="text-muted">Select a contribution or payment to initiate a refund.</p>
            </div>

            <div className="row g-4">
                {/* Left Column - Refundable Items */}
                <div className="col-md-6">
                <div className="card shadow-sm">
                    <div className="card-header bg-light">
                    <strong>Refundable Items</strong>
                    </div>
                    <ul className="list-group list-group-flush">
                    {mockContributions.map((item) => (
                        <li
                        key={item.id}
                        className={`list-group-item list-group-item-action ${
                            selected?.id === item.id ? "active text-white" : ""
                        }`}
                        onClick={() => setSelected(item)}
                        role="button"
                        >
                        <div className="fw-semibold">{item.name}</div>
                        <small className="d-block">
                            {item.user} • ${item.amount.toFixed(2)} • {item.date}
                        </small>
                        </li>
                    ))}
                    </ul>
                </div>
                </div>

                {/* Right Column - Refund Form */}
                <div className="col-md-6">
                <div className="card shadow-sm">
                    <div className="card-header bg-light d-flex justify-content-between">
                    <strong>Refund Details</strong>
                    <FaUndo />
                    </div>
                    <div className="card-body">
                    {selected ? (
                        <>
                        <div className="mb-3">
                            <label className="form-label">Selected</label>
                            <input
                            className="form-control"
                            value={`${selected.name} — $${selected.amount}`}
                            readOnly
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Refund Method</label>
                            <select
                            className="form-select"
                            value={form.method}
                            onChange={(e) => setForm({ ...form, method: e.target.value })}
                            >
                            <option value="">Select Method</option>
                            <option value="cash">Cash</option>
                            <option value="bank">Bank Transfer</option>
                            <option value="credit">Credit to Account</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Reason</label>
                            <textarea
                            className="form-control"
                            rows="2"
                            value={form.reason}
                            onChange={(e) => setForm({ ...form, reason: e.target.value })}
                            />
                        </div>
                        <div className="d-flex justify-content-end">
                            <button className="btn btn-outline-secondary me-2" onClick={() => setSelected(null)}>
                            Cancel
                            </button>
                            <button className="btn btn-success" onClick={handleRefund}>
                            Process Refund
                            </button>
                        </div>
                        </>
                    ) : (
                        <p className="text-muted">Select an item on the left to begin refunding.</p>
                    )}
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}
