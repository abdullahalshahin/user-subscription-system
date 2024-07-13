import React, { Component } from 'react';
import Helpers from '../../../../utils/Helpers';
import AxiosAPI from '../../../../AxiosConfig';
import Topbar from '../../components/Topbar';
import LeftSidebar from '../../components/LeftSidebar';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';

export class Create extends Component {
    constructor(props) {
        super(props);

        this.state = {
            account_number: '',
            currency: 'USD',
            amount: '10',
            error: ''
        };
    }

    componentDidMount() {
        let title = `Payment | ${Helpers.appInfo().app_name}`;
        let meta_description = "Payment Description";

        Helpers.updateHeadComponentDidMount(title, meta_description);
    }

    componentWillUnmount() {
        Helpers.updateHeadComponentWillUnmount();
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    };

    handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await AxiosAPI.post(`/api/user-panel/dashboard/payment/store`, {
                account_number: this.state.account_number,
                currency: this.state.currency,
                amount: this.state.amount
            });

            window.location.href = "/user-panel/dashboard";
        } 
        catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                this.setState({ error: error.response.data.message });
            }
            else {
                this.setState({ error: 'An error occurred. Please try again later.' });
            }
        }
    };

    render() {
        return (
            <div className='Create'>
                <div className="wrapper">
                    <Topbar />

                    <LeftSidebar />

                    <div className="content-page">
                        <div className="content">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="page-title-box">
                                            <div className="page-title-right">
                                                <ol className="breadcrumb m-0">
                                                    <li className="breadcrumb-item"><Link to={'/'}> User Subscription </Link></li>
                                                    <li className="breadcrumb-item"><Link to={'/user-panel/dashboard'}> Dashboard </Link></li>
                                                    <li className="breadcrumb-item active"> Make Payment </li>
                                                </ol>
                                            </div>

                                            <h4 className="page-title"> Make Payment </h4>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-12">
                                        <div className="account-pages pt-2 pt-sm-5 pb-4 pb-sm-5 position-relative">
                                            <div className="container">
                                                <div className="row justify-content-center">
                                                    <div className="col-xxl-4 col-lg-5">
                                                        <span className='text-danger'>[I have no payment gateway, that's why I am using manual payment]</span>

                                                        <div className="card">
                                                            <div className="card-body px-4">
                                                                {this.state.error && (
                                                                    <div className="row mt-3">
                                                                        <div className="col-12 text-center">
                                                                            <p className="text-danger">{this.state.error}</p>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                                
                                                                <form onSubmit={this.handleSubmit}>
                                                                    <div className="mb-3">
                                                                        <label htmlFor="account_number" className="form-label">Account Number</label>
                                                                        <input className="form-control" type="text" id="account_number" placeholder="Enter your mail" value={this.state.account_number} onChange={this.handleInputChange} required />
                                                                    </div>

                                                                    <div className="mb-3">
                                                                        <label htmlFor="currency" className="form-label">Currency</label>
                                                                        <input className="form-control" type="text" id="currency" placeholder="Enter your mail" value={this.state.currency} onChange={this.handleInputChange} required />
                                                                    </div>

                                                                    <div className="mb-3">
                                                                        <label htmlFor="amount" className="form-label">Amount</label>
                                                                        <input className="form-control" type="text" id="amount" placeholder="Enter your mail" value={this.state.amount} onChange={this.handleInputChange} required />
                                                                    </div>

                                                                    <div className="mb-3 mb-0 text-center">
                                                                        <button className="btn btn-primary" type="submit"> Pay Now </button>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Footer />
                </div>
            </div>
        );
    };
};

export default Create;
