import React, { Component } from 'react';
import './contact.scss';
import {
	Form, Input, Radio,
} from 'antd';
import { HttpUtils } from '../../Services/HttpUtils';
import { Redirect } from 'react-router';
const RadioGroup = Radio.Group;

class Formpanel extends Component {
	constructor(props) {
		super(props)
		//Initilize states
		this.state = {
			selectedOption: '',
			confirmDirty: false,
			autoCompleteResult: [],
			value: 1,
			isLoader: false,
			isAlert: false,
			radioVal: false,
			emailsArr: [],
			registerBtn: false,
			username: '',
			buyer: false,
			loggedIn: false,
			role: ''
		}
		//bind funtions
		this.handleOptionChange = this.handleOptionChange.bind(this);
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

	onChangeEmail(rule, value, callback) {
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

	//radio button state function
	handleOptionChange(changeEvent) {
		this.setState({
			selectedOption: changeEvent.target.value,
			radioVal: true,
			role: changeEvent.target.value
		});
	}

	//form validation funcs
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				this.setState({ isLoader: true })
				this.fectSignUpApiFunc(values)
				this.props.form.resetFields()
				setTimeout(() => {
					this.setState({
						isAlert: false,
					});
				}, 3000);
			}
		});
	}

	fectSignUpApiFunc = async (values) => {
		//concat Frist Name & Mobile No for Password
		let password = values.firstName.concat(values.mobileNo)
		values.password = password;
		values.role = this.state.role;
		let response = await HttpUtils.post('signup', values);
		//fetch signUp api
		if (response.code === 200) {
			this.setState({ isData: true, isLoader: false, isAlert: true, username: response.username });
			//if user has as a buyer contact us
			if (this.state.selectedOption === 'Buyer') {
				await this.setState({
					buyer: true,
					loggedIn: true
				})
				localStorage.setItem('userName', JSON.stringify(response.username));
				localStorage.setItem('loggedIn', JSON.stringify(this.state.loggedIn));
				localStorage.setItem('userData', JSON.stringify(response));
				this.props.showDropDown();
			}
		} else {
			this.setState({ isData: false })
		}
	}

	handleConfirmBlur = (e) => {
		const value = e.target.value;
		this.setState({ confirmDirty: this.state.confirmDirty || !!value });
	}

	validateNumber(rule, value, callback) {
		if (isNaN(value)) {
			callback('Please type Numbers');
		} else {
			callback()
		}
	}
	hasErrors = (fieldsError) => {
		return Object.keys(fieldsError).some(field => fieldsError[field]);
	}

	render() {
		const { selectedOption, buyer, loggedIn } = this.state
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 10 }
			}
		};
		if (buyer) {
			return <Redirect to={{ pathname: '/', state: loggedIn }} />
		}

		return (
			<div>
				<Form onSubmit={this.handleSubmit}>
					<div className="container proroute2">
						<div className="row ball4">
							<div className="col-md-4 col-6">
								<div className="form-group">
									<label for="usr"></label>
									<Form.Item>
										{getFieldDecorator('firstName', {
											rules: [{
												required: true,
												message: 'Please input your First Name!',
												whitespace: true
											}],
										})(
											<Input
												type="text"
												className={'form-control backcolor'}
												id={"usr"}
												name="firstName"
												placeholder="First Name:*"
											/>
										)}
									</Form.Item>
								</div>
							</div>
							<div className="col-md-4 col-6">
								<div className="form-group">
									<label for="usr"></label>
									<Form.Item>
										{getFieldDecorator('lastName', {
											rules: [{
												required: true,
												message: 'Please input your Last Name!',
												whitespace: true
											}],
										})(
											<Input
												type="text"
												className={'form-control backcolor'}
												id={"usr"}
												name="username"
												placeholder="Last Name:*"
											/>
										)}
									</Form.Item>
								</div>
							</div>
							<div className="col-md-4"></div>
						</div>
						<div className="row ball4">
							<div className="col-md-8 col-12">
								<div className="form-group">
									<label for="usr"></label>
									<Form.Item  {...formItemLayout}>
										{getFieldDecorator('email', {
											rules: [{
												type: 'email',
												message: 'The input is not valid E-mail!',
											}, {
												required: true,
												message: 'Please input your E-mail!',
											},
											{ validator: this.onChangeEmail.bind(this) }],
										})(
											<Input
												type="text"
												className={"form-control backcolor"}
												id={"usr"}
												name="username"
												placeholder="Email:*"
											/>
										)}
									</Form.Item>
								</div>
							</div>
							<div className="col-md-4"></div>
						</div>
						<div className="row ball4">
							<div className="col-md-4 col-6">
								<div className="form-group">
									<label for="usr"></label>
									<Form.Item>
										{getFieldDecorator('mobileNo', {
											initialValue: this.state.dataBnumber,
											rules: [{
												required: true,
												message: 'Please input your mobile Number!',
												whitespace: true
											},
											{ validator: this.validateNumber.bind(this) }]
										})(
											<Input
												className={"form-control backcolor"}
												id={"usr"}
												name="username"
												placeholder="Mobile No:*"
											/>
										)}
									</Form.Item>
								</div>
							</div>
							<div className="col-md-4 col-6">
								<div className="form-group">
									<label for="usr"></label>
									<Form.Item>
										{getFieldDecorator('landlineNo', {
											initialValue: this.state.dataBnumber,
											rules: [{
												required: false,
												message: 'Please input your landline Number!',
												whitespace: true
											},
											{ validator: this.validateNumber.bind(this) }]
										})(
											<Input
												className={"form-control backcolor"}
												id={"usr"}
												name="username"
												placeholder="Landline No: (optional)"
											/>
										)}
									</Form.Item>
								</div>
							</div>
							<div className="col-md-4"></div>
						</div>
						<div className="row ball67">
							<div className="col-12 col-md-8 col-lg-8 col-xl-8">
								<form action="/action_page.php">
									<RadioGroup name="radiogroup" defaultValue={1}>
										<div className="form-check-inline ">
											<label className="form-check-label" for='Buyer'>
												<Radio 
													className={"form-check-input"}
													id={"Buyer"}
													name="Buyer"
													value="Buyer"
													checked={this.state.selectedOption === 'Buyer'}
													onChange={this.handleOptionChange}
												>Buyer
													</Radio>
											</label>
										</div>
										<div className="form-check-inline checkmargin">
											<label className="form-check-label" for='Seller'>
												<Radio 
													className={"form-check-input"}
													id={"Seller"}
													name="Seller"
													value="Seller"
													checked={this.state.selectedOption === 'Seller'}
													onChange={this.handleOptionChange}
												>Seller
													</Radio>
											</label>
										</div>
									</RadioGroup>
								</form>
							</div>
							{this.state.radioVal ?
								<div className="col-md-8">
									<div className="form-group">
										<label for="company"></label>
										<Form.Item>
											{getFieldDecorator('CompanyName', {
												rules: [{
													required: true,
													message: 'Please enter your company name',
													whitespace: true
												}],
											})(
												<Input
													type="text"
													className={'form-control backcolor'}
													id={"company"}
													name="company name"
													placeholder="Company name"
												/>
											)}
										</Form.Item>
									</div>
								</div>
								:
								null
							}
							<div className="col-0 col-md-4 col-lg-4 col-xl-4"></div>
						</div>
						<div className="row ball4">
							<div className="col-md-2 col-4">
								<button className="btn btn-primary btnapple" disabled={this.state.registerBtn}
								>Request</button>
							</div>
							{this.state.isLoader ? <div class="loading"> 	</div>
								:
								null
							}
							{this.state.isAlert ?
								selectedOption === 'Seller' ?
									<div class="alert alert-success message" role="alert">
										<strong>Request Submiting </strong>
										Your request has been submited and
										one of our support member will call & email you shortly.
									</div>
									:
									<div class="alert alert-success message" role="alert">
										<strong>Request Submiting </strong>
										Thank you for contact us.
							</div>
								:
								null
							}
							<div className="col-md-4"></div>
						</div>
						<div className="row" style={{ margin: '0px' }}>
							<div className="col-md-8 ball1" style={{ marginLeft: '1%' }}></div>
							<div className="col-md-4"></div>
						</div><br />
					</div>
				</Form>
			</div >
		);
	}
}

const WrappedRegistrationForm = Form.create()(Formpanel);
export default WrappedRegistrationForm;
