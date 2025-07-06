import React, { useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { OverlayModal } from "../../OverlayModal";

const initialExpenses = [
    {
        id: 1,
        description: "Purchased kitchen supplies",
        category: "Supplies",
        amount: 120.5,
        date: "2025-06-15",
    },{
        id: 2,
        description: "Monthly electricity bill",
        category: "Utilities",
        amount: 300,
        date: "2025-06-10",
    },
];

export const Expenses = () => {
    const [expenses, setExpenses] = useState(initialExpenses);
    const [showModal, setOverlay] = useState({show: false, expense: null});
    const [form, setForm] = useState({
        description: "",
        category: "",
        amount: "",
        date: "",
    });

    const handleSave = () => {
        const newExpense = {
            ...form,
            id: Date.now(),
            amount: parseFloat(form.amount),
        };
        setExpenses([newExpense, ...expenses]);
        setOverlay({show: false, expense: null});
        setForm({ description: "", category: "", amount: "", date: "" });
    }

    const handleDelete = (id) => {
        setExpenses(expenses.filter((e) => e.id !== id));
    }

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                    <h3 className="mb-0">Expenses</h3>
                    <small>Track and manage your business expenses</small>
                </div>
                <button onClick={()=>setOverlay({show: true, expense: null})} className="btn btn-outline-orange">
                    <FaPlus className="me-2" />
                    <span>Add Expense</span>
                </button>
            </div>

            <table className="table table-bordered table-hover">
                <thead className="table-light">
                    <tr>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th style={{width: "100px"}}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map((exp) => (
                        <tr key={exp.id}>
                            <td>{exp.description}</td>
                            <td>{exp.category}</td>
                            <td>${exp.amount.toFixed(2)}</td>
                            <td>{exp.date}</td>
                            <td>
                                <div className="d-flex align-items-center gap-2">
                                    <button onClick={()=>setOverlay({show: true, expense: exp})} className="d-flex align-tems-center btn btn-sm btn-outline-light"><FaEdit /></button>
                                    <div className="dropdown">
                                        <button className="d-flex align-tems-center btn btn-sm btn-outline-danger" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <FaTrash />
                                        </button>
                                        <ul className="dropdown-menu bg-dark">
                                            <li><a onClick={()=>handleDelete(exp.id)} className="dropdown-item text-danger pointer">Confirm Delete</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <OverlayModal title="Add Expense" show={showModal.show} close={()=>setOverlay({show: false, expense: null})}>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <input
                        className="form-control bg-dark text-light shadow-none border border-lightly"
                        value={form.description}
                        onChange={(e)=>setForm({...form, description: e.target.value})}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Category</label>
                    <input
                        className="form-control bg-dark text-light shadow-none border border-lightly"
                        value={form.category}
                        onChange={(e)=>setForm({...form, category: e.target.value})}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Amount</label>
                    <input
                        type="number"
                        step="0.01"
                        className="form-control bg-dark text-light shadow-none border border-lightly"
                        value={form.amount}
                        onChange={(e)=>setForm({...form, amount: e.target.value})}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Date</label>
                    <input
                        type="date"
                        className="form-control bg-dark text-light shadow-none border border-lightly"
                        value={form.date}
                        onChange={(e)=>setForm({...form, date: e.target.value})}
                    />
                </div>
                <div className="d-flex gap-2 mt-4">
                    <button onClick={()=>setOverlay({show: false, expense: null})} className="btn text-light border border-lightly">Cancel</button>
                    <button onClick={handleSave} className="btn btn-outline-orange">Save Expense</button>
                </div>
            </OverlayModal>
        </div>
    )
}
