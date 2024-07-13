import React, { Component } from 'react';
import Helpers from '../../../../utils/Helpers';
import AxiosAPI from '../../../../AxiosConfig';
import Topbar from '../../components/Topbar';
import LeftSidebar from '../../components/LeftSidebar';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';

export class Edit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                id: "",
                name: "",
                email: "",
                password: "",
            },
            errors: {}
        };
    }

    componentDidMount() {
        let title = `My Account Edit | ${Helpers.appInfo().app_name}`;
        let meta_description = "My Account Edit Description";

        Helpers.updateHeadComponentDidMount(title, meta_description);

        AxiosAPI.get(`/api/user-panel/dashboard/my-account`)
            .then(response => {
                const userData = response.data.result;

                this.setState({
                    user: userData.user
                });
            })
            .catch(error => {
                console.error("Error fetching users:", error);
            });
    }

    componentWillUnmount() {
        Helpers.updateHeadComponentWillUnmount();
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                [name]: value
            }
        }));
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const { user } = this.state;

        AxiosAPI.put(`/api/user-panel/dashboard/my-account-update`, {
                name: user.name,
                email: user.email,
                password: user.password
            })
            .then(response => {
                window.location.href = '/user-panel/dashboard/my-account';
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    this.setState({ errors: error.response.data.errors || {} });
                }
                else {
                    console.error("Error creating user:", error);
                }
            });
    }

    render() {
        const { user, errors } = this.state;

        return (
            <div className='Edit'>
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
                                                    <li className="breadcrumb-item"><Link to={'/user-panel/dashboard/my-account'}> My Account </Link></li>
                                                    <li className="breadcrumb-item active"> My Account Edit </li>
                                                </ol>
                                            </div>

                                            <h4 className="page-title"> My Account Edit </h4>
                                        </div>
                                    </div>
                                </div>

                                {Object.keys(errors).length > 0 && (
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="alert alert-danger" role="alert">
                                                <ul>
                                                    {Object.values(errors).map((error, index) => (
                                                        <li key={index}>{error}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="row">
                                    <div className="col-12">
                                        <div className="card">
                                            <div className="card-body">
                                                <form onSubmit={this.handleSubmit}>
                                                    <div className="row g-2">
                                                        <div className="mb-2 col-md-12">
                                                            <label htmlFor="name"> Name <span className="text-danger">*</span></label>
                                                            <input type="text" className="form-control" id="name" name="name" value={user.name} onChange={this.handleInputChange} placeholder="Enter your full name" required />
                                                        </div>
                                                    </div>

                                                    <div className="row g-2">
                                                        <div className="mb-2 col-md-8">
                                                            <label htmlFor="email"> Email <span className="text-danger">*</span></label>
                                                            <input type="text" className="form-control" id="email" name="email" value={user.email} onChange={this.handleInputChange} placeholder="e.g: example@f-mail.com" required />
                                                        </div>

                                                        <div className="mb-2 col-md-4">
                                                            <label htmlFor="password"> Password <span className="text-danger">*</span></label>
                                                            <div className="input-group input-group-merge">
                                                                <input type="password" id="password" className="form-control" placeholder="Enter your password" value={user.password} onChange={this.handleInputChange} />
                                                                <div className="input-group-text" data-password="false">
                                                                    <span className="password-eye"></span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="float-end">
                                                        <Link to={'/user-panel/dashboard/my-account'} className="btn btn-primary button-last"> Go Back </Link>
                                                        <button type="submit" className="btn btn-success button-last"> Save </button>
                                                    </div>
                                                </form>
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

export default Edit;
