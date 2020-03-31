import React, { Component } from 'react';
import './loginform.scss';
import {
    Form, Input,
} from 'antd';
import { logUser } from '../../action';
import store from '../../store';

class Login extends Component {
    constructor() {
        super()
        //initilize states
        this.state = {
            email: '',
            password: ''
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                store.dispatch(logUser(this.state));
                this.setState({
                    email: '',
                    password: ''
                })
                this.props.fectSignInApiFunc(values)
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { email, password } = this.state;
        return (
            <div >
                <div >
                    <div className="row school1">
                        <div >
                            <Form onSubmit={this.handleSubmit} className="login-form">
                                <div>
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
                                    <p style={{ marginTop: '-4%' }}><span className="school8">Forget Password!?</span></p>
                                    <button type="submit" className="btn btn-primary"><span className="school5">Login</span></button>
                                    <p onClick={this.props.CreateUserForm} className="" style={{ margin: '1vw 0px 3vw' }}>
                                        <span className="alreadyAcontText">Create Account ?</span>
                                    </p>
                                    <br />
                                </div>
                                {this.props.isAlert ?
                                    <div class="alert alert-danger" role="alert">
                                        {this.props.mgs}
                                    </div>
                                    : null}

                            </Form>
                        </div>
                        {this.props.isLoader ? <div class="loading1">   </div>
                            : null
                        }
                        <div className="col-md-1">
                        </div>
                    </div>
                </div>


                {/* mobile screen */}
                <div className="d-block d-sm-none">
                    <div className="row school1">
                        <div className="col-md-4 school7">
                            <img src="../images/log-in.png" alt='img' style={{ width: '100%', height: '257px' }} />
                        </div>
                        <div className="col-md-4 school6">
                            <Form onSubmit={this.handleSubmit} className="login-form">
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
                                <p style={{ marginTop: '-4%' }}><span className="school8">Forget Password!?</span></p>
                                <button type="submit" className="btn btn-primary"><span className="school5">Login</span></button>
                                <p onClick={this.props.CreateUserForm} className="" style={{ margin: '1vw 0px 0px' }}>
                                    <span className="alreadyAcontText">Create an account ?</span>
                                </p>
                                <br />
                                {this.props.isAlert ?
                                    <div class="alert alert-danger" role="alert">
                                        {this.props.mgs}
                                    </div>
                                    : null}
                            </Form>

                        </div>
                        {this.props.isLoader ? <div class="loading1">   </div>
                            : null
                        }
                        <div className="col-md-1">
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const WrappedNormalLoginForm = Form.create()(Login);
export default WrappedNormalLoginForm;
