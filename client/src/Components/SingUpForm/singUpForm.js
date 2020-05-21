import React, { Component } from 'react';
import {
    Form, Input,
} from 'antd';
import '../Login Form/loginform.scss';
import { HttpUtils } from '../../Services/HttpUtils';

class SingUpForm extends Component {
    constructor() {
        super()
        //initilize states
        this.state = {
            companyName: '',
            email: '',
            password: '',
            confrimPassword: '',
            landlineNo: "",
            mobileNo: "",
            emailsArr: [],
            registerBtn: false
        }
    }

    componentDidMount() {
        this.checkEmails();
    }

    checkEmails = async () => {
        let response = await HttpUtils.get('getemails');
        let getEmail = response.content;
        this.setState({
            emailsArr: getEmail
        })
    }

    onChangeEmail = (rule, value, callback) => {
        if (this.state.emailsArr.includes(value)) {
            callback('Email is already exists');
            this.setState({
                registerBtn: true
            })
        } else {
            callback()
            this.setState({
                registerBtn: false
            })
        }
    }

    validateNumber(rule, value, callback) {
        if (isNaN(value)) {
            callback('Please type Numbers');
        } else {
            callback()
        }
    }

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({
                    companyName: '',
                    email: '',
                    password: '',
                    confrimPassword: '',
                    landlineNo: "",
                    mobileNo: ""
                })
                this.props.fectSignUpApiFunc(values)
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { companyName, email, password, confrimPassword, landlineNo, mobileNo } = this.state;
        return (
            <div >
                <div>
                    <div >
                        <div >
                            <div>
                                <Form onSubmit={this.handleSubmit} className="login-form">
                                    <div className="row">
                                        <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                                            <label style={{ marginBottom: '0px' }}>
                                                <span className="school10">
                                                    Company name:
                                                </span>
                                            </label>
                                            <Form.Item>
                                                {getFieldDecorator('companyName', {
                                                    initialValue: companyName,
                                                    rules: [{ required: true, message: 'Please enter your company name' }],
                                                })(
                                                    <Input
                                                        placeholder="Company name"
                                                        className="bid_Input"
                                                    />
                                                )}
                                            </Form.Item>
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                                            <label style={{ marginBottom: '0px' }}>
                                                <span className="school10">
                                                    Email:
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
                                                    },
                                                    { validator: this.onChangeEmail }],
                                                })(
                                                    <Input
                                                        type="text"
                                                        placeholder="Email"
                                                        className="bid_Input"
                                                        id={"usr"}
                                                        name="email"
                                                    />
                                                )}
                                            </Form.Item>
                                        </div>

                                    </div><br />
                                    <div className="row" style={{ marginTop: '-1.5vw' }}>
                                        <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                                            <label style={{ marginBottom: '0px' }}>
                                                <span className="school10">
                                                    Password:
                                                </span>
                                            </label>
                                            <Form.Item hasFeedback>
                                                {getFieldDecorator('password', {
                                                    initialValue: password,
                                                    rules: [
                                                        {
                                                            required: true,
                                                            message: 'Please input your password!',
                                                        },
                                                        {
                                                            validator: this.validateToNextPassword,
                                                        },
                                                    ],
                                                })(<Input.Password />)}
                                            </Form.Item>
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                                            <label style={{ marginBottom: '0px' }}>
                                                <span className="school10">
                                                    Confirm Password:
                                                </span>
                                            </label>
                                            <Form.Item hasFeedback>
                                                {getFieldDecorator('confirm', {
                                                    initialValue: confrimPassword,
                                                    rules: [
                                                        {
                                                            required: true,
                                                            message: 'Please confirm your password!',
                                                        },
                                                        {
                                                            validator: this.compareToFirstPassword,
                                                        },
                                                    ],
                                                })(<Input.Password onBlur={this.handleConfirmBlur} />)}
                                            </Form.Item>
                                        </div>
                                    </div><br />
                                    <div className="row" style={{ marginTop: '-1.5vw' }}>
                                        <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                                            <label style={{ marginBottom: '0px' }}>
                                                <span className="school10">
                                                    Landline no :
                                                </span>
                                            </label>
                                            <Form.Item>
                                                {getFieldDecorator('landlineNo', {
                                                    initialValue: landlineNo,
                                                    rules: [{
                                                        required: true,
                                                        message: 'Please input your lanline number!',
                                                        whitespace: true
                                                    },
                                                    { validator: this.validateNumber.bind(this) }]
                                                })(
                                                    <Input
                                                        placeholder="Landline no"
                                                        className="bid_Input"
                                                    />
                                                )}
                                            </Form.Item>
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                                            <label style={{ marginBottom: '0px' }}>
                                                <span className="school10">
                                                    Mobile no :
                                                </span>
                                            </label>
                                            <Form.Item>
                                                {getFieldDecorator('mobileNo', {
                                                    initialValue: mobileNo,
                                                    rules: [{
                                                        required: true,
                                                        message: 'Please input your mobile Number!',
                                                        whitespace: true
                                                    },
                                                    { validator: this.validateNumber.bind(this) }]
                                                })(
                                                    <Input
                                                        type="number"
                                                        placeholder="Mobile no"
                                                        className="bid_Input"
                                                    />
                                                )}
                                            </Form.Item>
                                        </div>
                                    </div><br />
                                    <div className="row" style={{ marginTop: '-0.5vw' }}>
                                        <div className="col-12 col-md-12 col-lg-12 col-xl-12">
                                            <button type="submit" className="btn btn-primary" disabled={this.state.registerBtn}><span className="school5">Sign Up</span></button>
                                            <p className="" style={{ margin: '1vw 0px 3vw' }}>
                                                <span className="alreadyAcontTextSignup">Already have an account ?</span><span className="SignInformText" onClick={this.props.alreadyHaveacount}>Sign In</span>
                                            </p>
                                        </div>
                                    </div>
                                    {this.props.isAlert ?
                                        <div class="alert alert-danger" role="alert">
                                            {this.props.mgs}
                                        </div>
                                        : null}
                                </Form>
                                {this.props.isLoader ? <div class="loading"> 	</div>
                                    : null
                                }
                            </div>
                        </div>
                        <div className="col-md-1">
                        </div>
                    </div>
                </div>


                {/* mobile screen */}
                <div className="d-block d-sm-none">
                    <div className="row school1">

                        <div>
                            <Form onSubmit={this.handleSubmit} className="login-form">
                                <div className="row">
                                    <div className="col-12 ">
                                        <label style={{ marginBottom: '0px' }}>
                                            <span className="school10">
                                                Company name:
                                                </span>
                                        </label>
                                        <Form.Item>
                                            {getFieldDecorator('companyName', {
                                                initialValue: companyName,
                                                rules: [{ required: true, message: 'Please enter your company name' }],
                                            })(
                                                <Input
                                                    placeholder="Company name"
                                                    className="bid_Input"
                                                />
                                            )}
                                        </Form.Item>
                                    </div>
                                    <div className="col-12 ">
                                        <label style={{ marginBottom: '0px' }}>
                                            <span className="school10">
                                                Email:
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
                                                    placeholder="Email"
                                                    className="bid_Input"
                                                />
                                            )}
                                        </Form.Item>
                                    </div>

                                </div><br />
                                <div className="row" style={{ marginTop: '-1.5vw' }}>
                                    <div className="col-12 ">
                                        <label style={{ marginBottom: '0px' }}>
                                            <span className="school10">
                                                Password:
                                                </span>
                                        </label>
                                        <Form.Item hasFeedback>
                                            {getFieldDecorator('password', {
                                                initialValue: password,
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: 'Please input your password!',
                                                    },
                                                    {
                                                        validator: this.validateToNextPassword,
                                                    },
                                                ],
                                            })(<Input.Password />)}
                                        </Form.Item>
                                    </div>
                                    <div className="col-12 ">
                                        <label style={{ marginBottom: '0px' }}>
                                            <span className="school10">
                                                Confirm Password:
                                                </span>
                                        </label>
                                        <Form.Item hasFeedback>
                                            {getFieldDecorator('confirm', {
                                                initialValue: confrimPassword,
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: 'Please confirm your password!',
                                                    },
                                                    {
                                                        validator: this.compareToFirstPassword,
                                                    },
                                                ],
                                            })(<Input.Password onBlur={this.handleConfirmBlur} />)}
                                        </Form.Item>
                                    </div>
                                </div><br />
                                <div className="row" style={{ marginTop: '-1.5vw' }}>
                                    <div className="col-12 ">
                                        <label style={{ marginBottom: '0px' }}>
                                            <span className="school10">
                                                Landline no :
                                                </span>
                                        </label>
                                        <Form.Item>
                                            {getFieldDecorator('landlineNo', {
                                                initialValue: landlineNo,
                                                rules: [{
                                                    required: true,
                                                    message: 'Please input your lanline number!',
                                                    whitespace: true
                                                },
                                                { validator: this.validateNumber.bind(this) }]
                                            })(
                                                <Input
                                                    placeholder="Landline no"
                                                    className="bid_Input"
                                                />
                                            )}
                                        </Form.Item>
                                    </div>
                                    <div className="col-12 ">
                                        <label style={{ marginBottom: '0px' }}>
                                            <span className="school10">
                                                Mobile no :
                                                </span>
                                        </label>
                                        <Form.Item>
                                            {getFieldDecorator('mobileNo', {
                                                initialValue: mobileNo,
                                                rules: [{
                                                    required: true,
                                                    message: 'Please input your mobile Number!',
                                                    whitespace: true
                                                },
                                                { validator: this.validateNumber.bind(this) }]
                                            })(
                                                <Input
                                                    type="number"
                                                    placeholder="Mobile no"
                                                    className="bid_Input"
                                                />
                                            )}
                                        </Form.Item>
                                    </div>
                                </div><br />
                                <div className="row">
                                    <div className="col-12">
                                        <button type="submit" className="btn btn-primary"><span className="school5">Sign Up</span></button>
                                        <p className="" style={{ margin: '1vw 0px 0px' }}>
                                            <span className="alreadyAcontText">Already have an account ?</span><span className="SignInformText" onClick={this.props.alreadyHaveacount}>Sign In</span>
                                        </p>
                                    </div>
                                </div>
                                {this.props.isAlert ?
                                    <div class="alert alert-danger" role="alert">
                                        {this.props.mgs}
                                    </div>
                                    : null}
                            </Form>
                        </div>

                    </div>

                    {this.props.isLoader ? <div class="loading1">   </div>
                        : null
                    }
                    <div className="col-md-1">
                    </div>
                </div>
                {/* </div> */}



            </div>
        );
    }
}

const WrappedNormalLoginForm = Form.create()(SingUpForm);
export default WrappedNormalLoginForm;
