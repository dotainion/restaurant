import { MdDashboard, MdReceiptLong, MdPayments, MdPercent, MdTrendingUp, MdFileDownload, MdSecurity, MdHistory } from 'react-icons/md';
import { TbCreditCardRefund } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

export const FinancialNavigation = () =>{
    const navigate = useNavigate();

    const financialSections = [
        {
            title: 'Overview / Summary',
            details: 'Total revenue (daily, weekly, monthly), gross vs. net, total refunds, balances, payment methods breakdown.',
            icon: MdDashboard,
            route: '/settings/finance/overview'
        },{
            title: 'Order History',
            details: 'View all completed, canceled, or refunded orders with filters by status, customer, and date.',
            icon: MdHistory,
            route: '/settings/finance/order/history'
        },{
            title: 'Refund Management',
            details: 'Manage refunds, link to original orders, provide refund reasons, and view refund status history.',
            icon: TbCreditCardRefund,
            route: '/settings/finance/refund/management'
        },{
            title: 'Discounts & Promotions',
            details: 'Track applied discount codes, their impact on revenue, expiration dates, and usage count.',
            icon: MdPercent,
            route: '/settings/finance/discounts'
        },{
            title: 'Expenses',
            details: 'List recurring and operational expenses such as salaries, supplies, or service fees.',
            icon: MdTrendingUp,
            route: '/settings/finance/expenses'
        },{
            title: 'Reports & Exports',
            details: 'Download CSV or PDF reports of transactions and tax summaries. Filter by time period.',
            icon: MdFileDownload,
            route: '/settings/finance/reports'
        },{
            title: 'Permissions & Access',
            details: 'Control who can view or manage refunds, exports, and payouts with role-based access.',
            icon: MdSecurity,
            route: '/settings/finance/permissions/and/access'
        }
    ];

    return(
        <div className="row">
            {financialSections.map((section, key) => (
                <div className="col-12 col-md-6 col-lg-4 p-1" key={key}>
                    <div onClick={()=>navigate(section.route)} className="card border border-lightly pointer pointer-effect text-light h-100">
                        <div className="card-body">
                            <div className="d-flex align-items-center gap-2 mb-2">
                                <section.icon size={30} />
                                <h6 className="mb-1 fw-semibold">{section.title}</h6>
                            </div>
                            <p className="mb-0 small">{section.details}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}