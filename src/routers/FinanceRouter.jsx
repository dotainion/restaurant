import { Navigate, Route, Routes } from "react-router-dom"
import { FinancialNavigation } from "../components/settings/finances/FinancialNavigation"
import { OrderHistory } from "../components/settings/finances/OrderHistory"
import { Refund } from "../components/settings/finances/Refund"
import { ViewOrder } from "../components/settings/finances/ViewOrder"
import { Discounts } from "../components/settings/finances/Discounts"
import { PermissionsAccess } from "../components/settings/finances/PermissionAccess"
import { Expenses } from "../components/settings/finances/Expenses"
import { Reports } from "../components/settings/finances/Report"
import { Overview } from "../components/settings/finances/Overview"
import { RefundManagement } from "../components/settings/finances/RefundManagement"
import { ViewReport } from "../components/settings/finances/ViewReport"

export const FinanceRouter = () =>{
    return(
        <Routes>
            <Route path="navigation" element={<FinancialNavigation/>} />
            <Route path="order/history" element={<OrderHistory/>} />
            <Route path="order/refund/:orderId" element={<Refund/>} />
            <Route path="view/order/:orderId" element={<ViewOrder/>} />
            <Route path="discounts" element={<Discounts/>} />
            <Route path="permissions/and/access" element={<PermissionsAccess/>} />
            <Route path="expenses" element={<Expenses/>} />
            <Route path="reports" element={<Reports/>} />
            <Route path="view/report/:reportId" element={<ViewReport/>} />
            <Route path="overview" element={<Overview/>} />
            <Route path="refund/management" element={<RefundManagement/>} />
            <Route path="*" element={<Navigate to="/settings/finance/navigation"/>} />
        </Routes>
    )
}