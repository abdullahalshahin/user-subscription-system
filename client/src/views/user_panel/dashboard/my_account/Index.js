import React, { Component } from 'react';
import Helpers from '../../../../utils/Helpers';
import AxiosAPI from '../../../../AxiosConfig';
import Topbar from '../../components/Topbar';
import LeftSidebar from '../../components/LeftSidebar';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';

export class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                id: "",
                name: "",
                email: "",
                profile_image: "",
            },
            errors: {}
        };
    }

    componentDidMount() {
        let title = `My Account | ${Helpers.appInfo().app_name}`;
        let meta_description = "My Account Description";

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

    render() {
        const { user } = this.state;

        return (
            <div className='Index'>
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
                                                    <li className="breadcrumb-item active"> My Account </li>
                                                </ol>
                                            </div>

                                            <h4 className="page-title"> My Account </h4>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-12">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row mb-2">
                                                    <div className="text-start mt-3">
                                                        <p className="text-muted mb-2 font-13"><strong>Name :</strong> <span className="ms-2"> {user.name} </span></p>
                                                        
                                                        <p className="text-muted mb-2 font-13"><strong>Email :</strong> <span className="ms-2"> {user.email} </span></p>
                                                    </div>
                                                </div>

                                                <div className="float-end">
                                                    <Link to={'/user-panel/dashboard/my-account-edit'} className="btn btn-success button-last"> Edit </Link>
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

export default Index;
