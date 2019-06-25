import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './home.css';

class Panel3 extends Component {
	constructor(props) {
		super(props)
		this.state = {
			citiesArr: ["Ahmadpur", "Ahmed Nager", "Alipur", "Arifwala",
				"Attock", "Bhera", "Bhalwal", "Bahawalnagar", "Bahawalpur", "Bhakkar", "Burewala",
				"Chillianwala", "Saidanshah", "Chakwal", "Chak Jhumra", "Chichawatni", "Chiniot",
				"Chishtian", "Chunian", "Dajkot", "Daska", "Davispur", "Darya Khan", "Dera Ghazi Khan",
				"Dhaular", "Dina", "Dinga", " Dipalpur", "Faisalabad", "Fateh Jang",
				"Ghakhar Mandi", "Gojra", "Gujranwala", "Gujrat", "Gujar Khan", "Harappa", "Hafizabad",
				"Haroonabad", "Hasilpur", "Haveli Lakha", "Jalalpur Jattan", "Jampur", "Jaranwala", "Jhang",
				"Jhelum", "Kallar Syedan", "Kalabagh", "Karor Lal Esan", 'karachi', "Kasur", "Kamalia", "Kāmoke", "Khanewal",
				"Khanpur", "Khanqah Sharif", "Kharian", "Khushab", "Kot Adu", "Jauharabad", "Lahore", "Islamabad",
				"Lalamusa", "Layyah", "Lawa Chakwal", "Liaquat Pur", "Lodhran", "Malakwal", "Mamoori", "Mailsi",
				"Mandi Bahauddin", "Mian Channu", "Mianwali", "Miani", "Multan", "Murree", "Muridke", "Mianwali Bangla",
				"Muzaffargarh", "Narowal", "Nankana Sahib", "Okara", "Renala Khurd", "Pakpattan", "Pattoki",
				"Pindi Bhattian", "Pir Mahal", "Qaimpur", "Rabwah",
				"Raiwind", "Rajanpur", "Rahim Yar Khan", "Rawalpindi", "Sadiqabad", "Sagri", "Sahiwal", "Sambrial",
				"Samundri", "Sangla Hill", "Sarai Alamgir", "Sargodha", "Shakargarh", "Sheikhupura", "Shujaabad",
				"Sialkot", "Sohawa", "Soianwala", "Siranwali", "Tandlianwala", "Talagang", "Taxila", "Toba Tek Singh",
				"Vehari", "Wah Cantonment", "Wazirabad", "Yazman", "Zafarwal"],
		}
	}
	render() {
		const { citiesArr } = this.state;
		return (
			<div>
				<div className="container" style={{ "backgroundImage": "url('../images/dropdown2.png')" }}>
					<div className="row">
						<div className="col-md-12 line2"><h3 className="pakola1">Top Cities In Pakistan for Billboards</h3></div>
					</div>
					<div className="row">
						<div className="col-md-5 col-4"></div>
						<div className="col-md-2 col-4 hrline3"></div>
						<div className="col-md-5 col-4"></div>
					</div><br />
					{/*first row*/}
					<div className="row">
						<div className="container funday">
							{citiesArr && citiesArr.map((elem, key) => {
								// console.log(elem, 'elem')
								return <Link rel="noopener noreferrer" to={`/market_place`}>
									<div className="col-md-3 panel3div divFont">
										<div className=''>
											<div className="col-md-2 innerdiv">
											</div>
											<div className="col-md-8 innerdiv">
												<h5>{elem}</h5>
												<h6 className="hani2">30 Ads available</h6>
											</div>
											<div className="col-md-2 innerdiv">
												<i class="material-icons locate_icon">place</i>
											</div>
										</div>
									</div>
								</Link>
							})}

							{/* <Link rel="noopener noreferrer" to={`/billboard`}>
								<div className="col-md-3 panel3div">
									<div className="col-md-2 innerdiv"></div>
									<div className="col-md-8 innerdiv">
										<h5>Islamabad</h5>
										<h6 className="hani2">30 Ads available</h6>
									</div>
									<div className="col-md-2 innerdiv">
										<i class="material-icons locate_icon">place</i>
									</div>
								</div>
							</Link>
							<Link rel="noopener noreferrer" to={`/billboard`}>
								<div className="col-md-3 panel3div">
									<div className="col-md-2 innerdiv"></div>
									<div className="col-md-8 innerdiv">
										<h5>lahore</h5>
										<h6 className="hani2">30 Ads available</h6>
									</div>
									<div className="col-md-2 innerdiv">
										<i class="material-icons locate_icon">place</i>
									</div>
								</div>
							</Link>
							<Link rel="noopener noreferrer" to={`/billboard`}>
								<div className="col-md-3 panel3div">
									<div className="col-md-2 innerdiv"></div>
									<div className="col-md-8 innerdiv">
										<h5>Simbi</h5>
										<h6 className="hani2">30 Ads available</h6>
									</div>
									<div className="col-md-2 innerdiv">
										<i class="material-icons locate_icon">place</i>
									</div>
								</div>
							</Link> */}
						</div>
					</div>
					{/*Second Row*/}
					{/* <div className="row">
						<div className="container funday">
							<Link rel="noopener noreferrer" to={`/billboard`}>
								<div className="col-md-3 panel3div">
									<div className="col-md-2 innerdiv">

									</div>
									<div className="col-md-8 innerdiv">
										<h5>Faisalabad</h5>
										<h6 className="hani2">30 Ads available</h6>
									</div>
									<div className="col-md-2 innerdiv">
										<i class="material-icons locate_icon">place</i>
									</div>
								</div>
							</Link>
							<Link rel="noopener noreferrer" to={`/billboard`}>
								<div className="col-md-3 panel3div">
									<div className="col-md-2 innerdiv"></div>
									<div className="col-md-8 innerdiv">
										<h5>Rawalpindi</h5>
										<h6 className="hani2">30 Ads available</h6>
									</div>
									<div className="col-md-2 innerdiv">
										<i class="material-icons locate_icon">place</i>
									</div>
								</div>
							</Link>
							<Link rel="noopener noreferrer" to={`/billboard`}>
								<div className="col-md-3 panel3div">
									<div className="col-md-2 innerdiv"></div>
									<div className="col-md-8 innerdiv">
										<h5>Multan</h5>
										<h6 className="hani2">30 Ads available</h6>
									</div>
									<div className="col-md-2 innerdiv">
										<i class="material-icons locate_icon">place</i>
									</div>
								</div>
							</Link>
							<Link rel="noopener noreferrer" to={`/billboard`}>
								<div className="col-md-3 panel3div">
									<div className="col-md-2 innerdiv"></div>
									<div className="col-md-8 innerdiv">
										<h5>Peshawar</h5>
										<h6 className="hani2">30 Ads available</h6>
									</div>
									<div className="col-md-2 innerdiv">
										<i class="material-icons locate_icon">place</i>
									</div>
								</div>
							</Link>
						</div>
					</div>
					<div className="row">
						<div className="container funday">
							<Link rel="noopener noreferrer" to={`/billboard`}>
								<div className="col-md-3 panel3div">
									<div className="col-md-2 innerdiv">

									</div>
									<div className="col-md-8 innerdiv">
										<h5>Hydrabad</h5>
										<h6 className="hani2">30 Ads available</h6>
									</div>
									<div className="col-md-2 innerdiv">
										<i class="material-icons locate_icon">place</i>
									</div>
								</div>
							</Link>
							<Link rel="noopener noreferrer" to={`/billboard`}>
								<div className="col-md-3 panel3div">
									<div className="col-md-2 innerdiv"></div>
									<div className="col-md-8 innerdiv">
										<h5>Sialkot</h5>
										<h6 className="hani2">30 Ads available</h6>
									</div>
									<div className="col-md-2 innerdiv">
										<i class="material-icons locate_icon">place</i>
									</div>
								</div>
							</Link>
							<Link rel="noopener noreferrer" to={`/billboard`}>
								<div className="col-md-3 panel3div">
									<div className="col-md-2 innerdiv"></div>
									<div className="col-md-8 innerdiv">
										<h5>Larkana</h5>
										<h6 className="hani2">30 Ads available</h6>
									</div>
									<div className="col-md-2 innerdiv">
										<i class="material-icons locate_icon">place</i>
									</div>
								</div>
							</Link>
							<Link rel="noopener noreferrer" to={`/billboard`}>
								<div className="col-md-3 panel3div">
									<div className="col-md-2 innerdiv"></div>
									<div className="col-md-8 innerdiv">
										<h5>Sahiwal</h5>
										<h6 className="hani2">30 Ads available</h6>
									</div>
									<div className="col-md-2 innerdiv">
										<i class="material-icons locate_icon">place</i>
									</div>
								</div>
							</Link>
						</div>
					</div>
					<div className="row">
						<div className="container funday">
							<Link rel="noopener noreferrer" to={`/billboard`}>
								<div className="col-md-3 panel3div">
									<div className="col-md-2 innerdiv">
									</div>
									<div className="col-md-8 innerdiv">
										<h5>Nawabshah</h5>
										<h6 className="hani2">30 Ads available</h6>
									</div>
									<div className="col-md-2 innerdiv">
										<i class="material-icons locate_icon">place</i>
									</div>
								</div>
							</Link>
							<Link rel="noopener noreferrer" to={`/billboard`}>
								<div className="col-md-3 panel3div">
									<div className="col-md-2 innerdiv"></div>
									<div className="col-md-8 innerdiv">
										<h5>Mirpur</h5>
										<h6 className="hani2">30 Ads available</h6>
									</div>
									<div className="col-md-2 innerdiv">
										<i class="material-icons locate_icon">place</i>
									</div>
								</div>
							</Link>
							<Link rel="noopener noreferrer" to={`/billboard`}>
								<div className="col-md-3 panel3div">
									<div className="col-md-2 innerdiv"></div>
									<div className="col-md-8 innerdiv">
										<h5>Dadu</h5>
										<h6 className="hani2">30 Ads available</h6>
									</div>
									<div className="col-md-2 innerdiv">
										<i class="material-icons locate_icon">place</i>
									</div>
								</div>
							</Link>
							<Link rel="noopener noreferrer" to={`/billboard`}>
								<div className="col-md-3 panel3div">
									<div className="col-md-2 innerdiv"></div>
									<div className="col-md-8 innerdiv">
										<h5>Hub</h5>
										<h6 className="hani2">30 Ads available</h6>
									</div>
									<div className="col-md-2 innerdiv">
										<i class="material-icons locate_icon">place</i>
									</div>
								</div>
							</Link>
						</div> 
					 </div> */}

					<div className="row moon2">
						<div className="container moon5">
							<button type="button" class="btn btn-light yup"><span className="moon">SEE MORE</span></button>
						</div>
					</div>



				</div>


			</div>
		);
	}
}

export default Panel3;
