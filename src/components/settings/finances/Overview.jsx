import React from "react";
import { FaDollarSign, FaUsers, FaChartLine, FaReceipt } from "react-icons/fa";
import { utils } from "../../../utils/Utils";

export const Overview = () => {
    const metrics = [
        {
            icon: <FaDollarSign />,
            label: "Total Revenue",
            value: "$25,340",
            color: "success",
        },{
            icon: <FaReceipt />,
            label: "Expenses",
            value: "$7,810",
            color: "danger",
        },{
            icon: <FaChartLine />,
            label: "Net Profit",
            value: "$17,530",
            color: "primary",
        },{
            icon: <FaUsers />,
            label: "Active Users",
            value: "1,294",
            color: "info",
        },
    ];

    const recentActivities = [
        { id: 1, action: "New reservation", by: "John Doe", date: utils.date.dbFormat(new Date()) },
        { id: 2, action: "Processed refund", by: "Admin", date: utils.date.dbFormat(new Date()) },
        { id: 3, action: "Expense added", by: "Nick", date: utils.date.dbFormat(new Date()) },
    ];

    return (
        <div className="container py-4">
            <div className="mb-4">
                <h3 className="mb-1">Overview / Summary</h3>
                <p>A quick glance at your key business metrics and recent activity.</p>
            </div>

            <div className="row g-3 mb-4">
                {metrics.map((metric, index) => (
                    <div key={index} className="col-md-6 col-xl-3">
                        <div className={`card border-start border-${metric.color} border-4`}>
                            <div className="card-body d-flex align-items-center justify-content-between">
                                <div>
                                    <h6 className="mb-1">{metric.label}</h6>
                                    <h4 className="mb-0 fw-bold">{metric.value}</h4>
                                </div>
                                <div className={`text-${metric.color} fs-3`}>{metric.icon}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="card rounded-4">
                <div className="card-header bg-dark text-light">
                    <h5 className="mb-0">Recent Activity</h5>
                </div>
                <div className="table-responsive">
                    <table className="table table-hover mb-0">
                        <thead>
                            <tr>
                                <th>Action</th>
                                <th>By</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentActivities.map((activity) => (
                                <tr key={activity.id}>
                                    <td>{activity.action}</td>
                                    <td>{activity.by}</td>
                                    <td>{utils.date.toLocalDate(activity.date)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
