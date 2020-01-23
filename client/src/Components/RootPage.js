import React, { Component } from 'react';
import {
    Form, Input,
} from 'antd';

class RootPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    componentWillMount() {
        window.scrollTo(0, 0);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({
                    email: '',
                    password: ''
                })
            }
        });
    }

    render() {
        const { email, password } = this.state;
        const { getFieldDecorator } = this.props.form;

        return (
            <div>
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
                    <button type="submit" className="btn btn-primary"><span className="school5">Login</span></button>
                    <br />

                </Form>

            </div>
        );
    }
}

const WrappedNormalLoginForm = Form.create()(RootPage);
export default WrappedNormalLoginForm;
