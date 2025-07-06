import { useState } from 'react'
import { HashRouter, Navigate, Routes, Route } from "react-router-dom";
import { Layout } from './layouts/Layout'
import { Home } from './pages/Home';
import { OrderProvider } from './providers/OrderProvider';
import { Dashboard } from './pages/Dashboard';
import { Settings } from './pages/Settings';
import { Reservation } from './pages/Reservation';
import { Messaging } from './pages/Messaging';
import { AuthProvider } from './providers/AuthProvider';
import { Logout } from './pages/Logout';
import { UtilsProvider } from './providers/UtilsProvider';
import { Protected } from './routers/Protected';
import { Unauthorized } from './errors/Unauthorized';
import { SignIn } from './account/SignIn';
import { PageNotFound } from './errors/PageNotFound';
import { Notifications } from './pages/Notifications';
import { Testing } from './testing/Testing';
import { Recovery } from './account/Recovery';
import { Kitchen } from './pages/Kitchen';
import { PinSignIn } from './account/PinSignIn';

function App() {
    return (
        <HashRouter>
            <UtilsProvider>
                <AuthProvider>
                    <OrderProvider>
                        <Routes>
                            <Route element={<Layout/>}>
                                <Route path="/" element={<Navigate to="/home/*" />} />
                                <Route path="/home/*" element={<Protected><Home/></Protected>} />
                                <Route path="/dashboard" element={<Protected><Dashboard/></Protected>} />
                                <Route path="/kitchen/*" element={<Protected><Kitchen/></Protected>} />
                                <Route path="/settings/*" element={<Protected><Settings/></Protected>} />
                                <Route path="/reservation" element={<Protected><Reservation/></Protected>} />
                                <Route path="/message" element={<Protected><Messaging/></Protected>} />
                                <Route path="/notifications" element={<Protected><Notifications/></Protected>} />
                                <Route path="/logout" element={<Logout/>} />
                            </Route>
                            <Route path="/sign/in" element={<SignIn/>} />
                            <Route path="/pin/sign/in" element={<PinSignIn/>} />
                            <Route path="/recovery" element={<Recovery/>} />
                            <Route path="/unauthorized" element={<Unauthorized/>} />
                            <Route path="/test" element={<Testing/>} />
                            <Route path="*" element={<PageNotFound/>} />
                        </Routes>
                    </OrderProvider>
                </AuthProvider>
            </UtilsProvider>
        </HashRouter>
    )
}

export default App
