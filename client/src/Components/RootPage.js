import React, { Component } from 'react';
import {
    Form, Input,
} from 'antd';
import './rootPage.css';
import { HttpUtils } from '../Services/HttpUtils';
import { Redirect } from 'react-router';

class RootPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isLoader: false,
            mgs: '',
            isAlert: false,
            goToHome: false,
            forHome: true
        }
    }

    componentWillMount() {
        let data = this.props.location.state;
        // if (data.from.pathname == '/home' && data.from.state && this.state.forHome && !this.state.goToHome) {
        //     this.setState({
        //         goToHome: true,
        //         forHome: false
        //     })
        // }
        window.scrollTo(0, 0);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.fectSignInApiFunc(values)
                this.setState({
                    email: '',
                    password: '',
                    isLoader: true
                })
            }
        });
    }

    fectSignInApiFunc = async (values) => {
        // fetch signIn api
        let response = await HttpUtils.post('signin', values);
        console.log(response, 'response')
        try {
            if (response.role == "admin") {
                this.setState({ isLoader: false, isAlert: false, goToHome: true });
                localStorage.setItem('admin', JSON.stringify(response.role))

            }
            else {
                this.setState({
                    isLoader: false,
                    isAlert: true,
                    mgs: response.msg
                })
            }
        }
        catch (error) {
            //error handling if user enter wrong email or password
            if (response === undefined) {
                this.setState({
                    isAlert: true,
                    isLoader: false,
                    mgs: ' Please cheak your email or password'
                })
            }
        }
    }


    render() {
        const { email, password, isAlert, isLoader, mgs, goToHome } = this.state;
        const { getFieldDecorator } = this.props.form;
        console.log(goToHome, 'goToHome')
        if (goToHome) {
            return <Redirect to={{ pathname: '/home', state: goToHome }} />

        }
        return (
            <div className='backImgee_baner'>
                <div className="row">
                    <div className='col-1 col-md-4 col-lg-4 col-xl-4'></div>
                    <div className='col-10 col-md-4 col-lg-4 col-xl-4' style={{ textAlign: 'center' }}>
                        <h2 className="mainTextBaner">Selmore Advertising Agency</h2>
                    </div>
                    <div className='col-1 col-md-4 col-lg-4 col-xl-4'></div>
                </div>
                <div className="row">
                    <div className='col-1 col-md-4 col-lg-4 col-xl-4'></div>
                    <div className='col-10 col-md-4 col-lg-4 col-xl-4'>
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <div className='formFiled'>
                                <div className="form-group">
                                    <label for="exampleInputEmail1" style={{ marginBottom: '0px' }}>
                                        <span className="school3">
                                            Email address:
                                        </span>
                                    </label>
                                    <Form.Item>
                                        {getFieldDecorator('email', {
                                            initialValue: email,
                                            rules: [{
                                                type: 'email',
                                                message: 'The input is not valid E-mail!',
                                            }, {
                                                required: true,
                                                message: 'Please input your E-mail!',
                                            }],
                                        })(
                                            <Input
                                                type="text"
                                                className={"form-control"}
                                                id={"exampleInputEmail1"}
                                                name="username"
                                                placeholder="Email:*"
                                            />
                                        )}
                                    </Form.Item>
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputPassword1" style={{ marginBottom: '0px' }}>
                                        <span className="school3"
                                        >Password:
                            </span>
                                    </label>
                                    <Form.Item>
                                        {getFieldDecorator('password', {
                                            initialValue: password,
                                            rules: [{ required: true, message: 'Please input your Password!' }],
                                        })(
                                            <Input type="password"
                                                className={"form-control"}
                                                id={"exampleInputPassword1"}
                                                placeholder="Password" />
                                        )}
                                    </Form.Item>
                                </div>
                                <button type="submit" className="btn btn-primary"><span className="school5">Login</span></button>
                                <br />
                                {isAlert ?
                                    <div class="alert alert-danger" role="alert" style={{ marginTop: '3vw' }}>
                                        {mgs}
                                    </div>
                                    : null
                                }
                            </div>
                        </Form>
                    </div>
                    <div className='col-1 col-md-4 col-lg-4 col-xl-4'></div>

                </div>


                {isLoader ? <div class="loading1">   </div>
                    : null
                }
                {/* <div className="col-md-1">
                </div> */}
                {/* <div className= 'col-12 col-md-4 col-lg-4 col-xl-4'></div> */}
            </div>
        );
    }
}

const WrappedNormalLoginForm = Form.create()(RootPage);
export default WrappedNormalLoginForm;
