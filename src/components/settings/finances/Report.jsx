import React, { useState } from "react";
import { FaFileExport, FaDownload } from "react-icons/fa";
import { MdReport } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { OverlayModal } from "../../OverlayModal";

const mockReports = [
    {
        id: 1,
        name: "Monthly Sales Report",
        type: "Sales",
        createdAt: "2025-06-01",
        format: "CSV",
    },{
        id: 2,
        name: "Refund Summary",
        type: "Finance",
        createdAt: "2025-06-10",
        format: "PDF",
    },
];

export const Reports = () => {
    const [reports, setReports] = useState(mockReports);
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({
        name: "",
        type: "Sales",
        format: "CSV",
        from: "",
        to: "",
    });

    const navigate = useNavigate();

    const handleGenerate = () => {
        const newReport = {
            ...form,
            id: Date.now(),
            createdAt: new Date().toISOString().split("T")[0],
        };
        setReports([newReport, ...reports]);
        setShowModal(false);
        setForm({ name: "", type: "Sales", format: "CSV", from: "", to: "" });
    };

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                    <h3 className="mb-0">Reports & Exports</h3>
                    <small>Generate and export business data like sales, refunds, and payouts.</small>
                </div>
                <button className="btn btn-primary" onClick={()=>setShowModal(true)}>
                    <FaFileExport className="me-2" />
                    Generate Report
                </button>
            </div>

            <div className="table-responsive shadow-sm">
                <table className="table table-bordered table-hover">
                    <thead className="table-light">
                        <tr>
                            <th>Report Name</th>
                            <th>Type</th>
                            <th>Format</th>
                            <th>Date Created</th>
                            <th style={{width: "120px"}}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.map((report) => (
                            <tr key={report.id}>
                                <td>{report.name}</td>
                                <td>{report.type}</td>
                                <td>{report.format}</td>
                                <td>{report.createdAt}</td>
                                <td>
                                    <div className="d-flex gap-2">
                                        <button 
                                            onClick={()=>navigate(`/settings/finance/view/report/${report.id}`)}
                                            className="d-flex gap-2 align-items-center btn btn-sm text-light border border-lightly"
                                        >
                                            <MdReport />
                                            <span>View</span>
                                        </button>
                                        <button className="d-flex gap-2 align-items-center btn btn-sm text-light border border-lightly">
                                            <FaDownload />
                                            <span>Download</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <OverlayModal title="Generate New Report" show={showModal} close={()=>setShowModal(false)}>
                <div className="mb-3">
                    <label className="form-label">Report Name</label>
                    <input
                        className="form-control bg-dark text-light shadow-none border border-lightly"
                        value={form.name}
                        onChange={(e)=>setForm({...form, name: e.target.value})}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Report Type</label>
                    <select
                        className="form-select bg-dark text-light shadow-none border border-lightly"
                        value={form.type}
                        onChange={(e)=>setForm({...form, type: e.target.value})}
                    >
                        <option>Sales</option>
                        <option>Finance</option>
                        <option>Reservations</option>
                        <option>Staff Activity</option>
                    </select>
                </div>
                <div className="row g-2 mb-3">
                    <div className="col">
                        <label className="form-label">From</label>
                        <input
                            type="date"
                            className="form-control bg-dark text-light shadow-none border border-lightly"
                            value={form.from}
                            onChange={(e) => setForm({...form, from: e.target.value})}
                        />
                    </div>
                    <div className="col">
                        <label className="form-label">To</label>
                        <input
                            type="date"
                            className="form-control bg-dark text-light shadow-none border border-lightly"
                            value={form.to}
                            onChange={(e) => setForm({...form, to: e.target.value})}
                        />
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Format</label>
                    <select
                        className="form-select bg-dark text-light shadow-none border border-lightly"
                        value={form.format}
                        onChange={(e) => setForm({...form, format: e.target.value})}
                    >
                        <option value="CSV">CSV</option>
                        <option value="PDF">PDF</option>
                    </select>
                </div>
                <div className="d-flex gap-2 mt-4">
                    <button className="btn border border-lightly text-light" onClick={()=>setShowModal(false)}>Cancel</button>
                    <button className="btn btn-outline-orange" onClick={handleGenerate}>Generate Report</button>
                </div>
            </OverlayModal>
        </div>
    )
}

