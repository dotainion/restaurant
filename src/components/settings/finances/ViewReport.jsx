import React, { useState } from "react";

const mockReports = [
    {
        id: 1,
        name: "June Sales Report",
        type: "Sales",
        createdAt: "2025-06-15",
        data: [
            { orderNumber: "ORD-1001", customer: "Kendra Peters", date: "2025-06-15", total: 150.5, status: "Completed" },
            { orderNumber: "ORD-1002", customer: "Leo Blair", date: "2025-06-16", total: 75.0, status: "Completed" },
        ],
    },{
        id: 2,
        name: "Refund Summary",
        type: "Finance",
        createdAt: "2025-06-10",
        data: [
            { id: 1, description: "Refund for Order ORD-1001", amount: 50.0, date: "2025-06-17" },
            { id: 2, description: "Refund for Order ORD-0999", amount: 20.0, date: "2025-06-12" },
        ],
    },
];

export const ViewReport = () =>{
    const [selectedReport, setSelectedReport] = useState(null);

    return (
        <div className="container py-4">
        <h3 className="mb-4">Reports & Exports</h3>
        <div className="row g-4">
            {/* Left: Reports List */}
            <div className="col-md-4">
            <div className="list-group shadow-sm">
                {mockReports.map((report) => (
                <button
                    key={report.id}
                    className={`list-group-item bg-darker text-light list-group-item-action ${
                    selectedReport?.id === report.id ? "active" : ""
                    }`}
                    onClick={() => setSelectedReport(report)}
                >
                    <div className="fw-semibold">{report.name}</div>
                    <small className="">{report.type} — {report.createdAt}</small>
                </button>
                ))}
            </div>
            </div>

            {/* Right: Report Detail */}
            <div className="col-md-8">
            {selectedReport ? (
                <div className="card shadow-sm">
                <div className="card-header text-light">
                    <h5 className="mb-0">{selectedReport.name}</h5>
                    <small>{selectedReport.type} report created on {selectedReport.createdAt}</small>
                </div>
                <div className="card-body">
                    {/* Example: Sales Report Table */}
                    {selectedReport.type === "Sales" && (
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                            <th>Order #</th>
                            <th>Customer</th>
                            <th>Date</th>
                            <th>Total ($)</th>
                            <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedReport.data.map((sale, i) => (
                            <tr key={i}>
                                <td>{sale.orderNumber}</td>
                                <td>{sale.customer}</td>
                                <td>{sale.date}</td>
                                <td>{sale.total.toFixed(2)}</td>
                                <td>{sale.status}</td>
                            </tr>
                            ))}
                        </tbody>
                        </table>
                    </div>
                    )}

                    {/* Example: Finance / Refund Summary Table */}
                    {selectedReport.type === "Finance" && (
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover">
                        <thead className="table-light">
                            <tr>
                            <th>Description</th>
                            <th>Amount ($)</th>
                            <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedReport.data.map((item, i) => (
                            <tr key={i}>
                                <td>{item.description}</td>
                                <td>{item.amount.toFixed(2)}</td>
                                <td>{item.date}</td>
                            </tr>
                            ))}
                        </tbody>
                        </table>
                    </div>
                    )}

                    {/* You can add more report types and their views here */}
                </div>
                </div>
            ) : (
                <div className="text-center text-muted fst-italic">
                Select a report from the list to view details
                </div>
            )}
            </div>
        </div>
        </div>
    )
}
