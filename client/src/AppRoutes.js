import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Landing from './views/Landing';
import NotFound from './views/NotFound';
import Login from './views/user_panel/auth/Login';
import Registration from './views/user_panel/auth/Registration';
import DashboardInbox from './views/user_panel/dashboard/Index';
import PaymentCreate from './views/user_panel/dashboard/payment/Create';
import MyAccountIndex from './views/user_panel/dashboard/my_account/Index';
import MyAccountEdit from './views/user_panel/dashboard/my_account/Edit';

class AppRoutes extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null 
        };
    }

    render() {
        return (
            <Router>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="*" element={<NotFound />} />

                    {/* USER AUTH */}
                    <Route path="/user-panel/dashboard/login" element={<Login />} />
                    <Route path="/user-panel/dashboard/registration" element={<Registration />} />

                    {/* Private Routes */}
                    {(localStorage.getItem('AUTH_USER_TOKEN')) ? 
                        (
                            <>
                                <Route path="/user-panel/dashboard" element={<DashboardInbox />} />
                                <Route path="/user-panel/dashboard/payment/create" element={<PaymentCreate />} />
                                <Route path="/user-panel/dashboard/my-account" element={<MyAccountIndex />} />
                                <Route path="/user-panel/dashboard/my-account-edit" element={<MyAccountEdit />} />
                            </>
                        ) 
                        : (
                            <Route path="/user-panel/dashboard/*" element={<Navigate to="/user-panel/dashboard/login" replace />} />
                        )
                    }
                </Routes>
            </Router>
        );
    };
};

export default AppRoutes;
