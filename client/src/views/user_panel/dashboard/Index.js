import React, { Component } from 'react';
import Helpers from '../../../utils/Helpers';
import AxiosAPI from '../../../AxiosConfig';
import Topbar from '../components/Topbar';
import LeftSidebar from '../components/LeftSidebar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

export class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            is_active: false,
            expires_at: null,
            error: null,
            showModal: false,
            paymentHistory: [],
            loading: false
        };
    }

    componentDidMount() {
        let title = `Dashboard | ${Helpers.appInfo().app_name}`;
        let meta_description = "Dashboard Description";

        Helpers.updateHeadComponentDidMount(title, meta_description);

        AxiosAPI.get(`/api/user-panel/dashboard/index`)
            .then(response => {
                const is_active = response.data.result.is_active || false;
                const expires_at = response.data.result.expires_at || null;

                this.setState({
                    is_active: is_active,
                    expires_at: expires_at
                });
            })
            .catch(error => {
                this.setState({
                    error: error,
                });

                console.log('error: ', error);
            });
    }

    componentWillUnmount() {
        Helpers.updateHeadComponentWillUnmount();
    }

    handleOpenModal = () => {
        this.setState({ loading: true });

        AxiosAPI.get('/api/user-panel/dashboard/payment/list')
            .then(response => {
                this.setState({
                    paymentHistory: response.data.payment_history,
                    loading: false,
                    showModal: true
                });
            })
            .catch(error => {
                console.error('Error fetching payment history:', error);
                this.setState({ loading: false });
            });
    };

    handleCloseModal = () => {
        this.setState({ showModal: false });
    };

    render() {
        const { is_active, expires_at, showModal, paymentHistory, loading } = this.state;

        return (
            <div className="wrapper">
                <Topbar />
                <LeftSidebar />
                <div className="content-page">
                    <div className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12">
                                    <div className="page-title-box">
                                        <h4 className="page-title"> Dashboard </h4>
                                    </div>
                                </div>
                            </div>

                            <div className="row mt-sm-5 mb-3">
                                <div className="col-md-4"></div>

                                {is_active ? (
                                    <div className="col-md-4">
                                        <div className="card card-pricing card-pricing-recommended">
                                            <div className="card-body text-center">
                                                <p className="card-pricing-plan-name fw-bold text-uppercase">Your account will remain active until <span className='text-danger'>{expires_at}</span></p>
                                                <button className="btn btn-primary" onClick={this.handleOpenModal}>Payment History</button>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="col-md-4">
                                        <div className="card card-pricing card-pricing-recommended">
                                            <div className="card-body text-center">
                                                <div className="card-pricing-plan-tag">you need to pay for active your account</div>
                                                <p className="card-pricing-plan-name fw-bold text-uppercase">Package</p>
                                                <h2 className="card-pricing-price">$10 <span>/ Month</span></h2>
                                                <Link to={'/user-panel/dashboard/payment/create'} className="btn btn-primary mt-4 mb-2 rounded-pill"> Pay Now For Active </Link>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="col-md-4"></div>
                            </div>
                        </div>
                    </div>

                    <Footer />
                </div>

                {showModal && (
                    <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                        <div className="modal-dialog bg-dark" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Payment History</h5>
                                    <button type="button" className="close" aria-label="Close" onClick={this.handleCloseModal}>
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    {loading ? (
                                        <p>Loading payment history...</p>
                                    ) : (
                                        <table class="table mb-0">
                                            <thead>
                                                <tr>
                                                    <th>Account No.</th>
                                                    <th>Amount</th>
                                                    <th>Transaction ID</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {paymentHistory && paymentHistory.map(payment => (
                                                    <tr>
                                                        <td>{payment.account_number}</td>
                                                        <td>{payment.amount} USD</td>
                                                        <td>{payment.transaction_id}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    )}
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={this.handleCloseModal}>Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    };
};

export default Index;
