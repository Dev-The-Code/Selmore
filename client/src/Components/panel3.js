import React, { Component } from 'react';
import { HttpUtils } from './../Services/HttpUtils';
import { Redirect } from 'react-router-dom';
import './home.scss';

class Panel3 extends Component {
	constructor(props) {
		super(props)
		this.state = {
			citiesArr: ["Abbottabad", "Ahmadpur East", " Ahmed Nager Chatha", " Ali Khan Abad", " Alipur", " Arifwala",
			" Attock", " Bhera", " Bhalwal", " Bahawalnagar", " Bahawalpur", " Bhakkar", 'Bhimber', " Burewala",
			" Chillianwala", " Choa Saidanshah", " Chakwal", " Chak Jhumra", " Chichawatni", " Chiniot",
			" Chishtian", " Chunian", " Dajkot", " Daska", " Davispur", " Darya Khan", " Dera Ghazi Khan", "Dera Ismail Khan",
			" Dhaular", " Dina", " Dinga", " Dhudial Chakwal", " Dipalpur", " Faisalabad", " Fateh Jang",
			" Ghakhar Mandi", " Gojra", " Gujranwala", " Gujrat", " Gujar Khan", " Harappa", 'Haripur', " Hafizabad", "Hyderabad",
			" Haroonabad", " Hasilpur", " Haveli Lakha", " Islamabad", " Jalalpur Jattan", " Jampur", " Jaranwala", " Jhang",
			" Jhelum", " Kallar Syedan", " Kalabagh", " Karor Lal Esan", 'Karachi', " Kasur", " Kamalia", " Kāmoke", " Khanewal",
			" Khanpur", " Khanqah Sharif", " Kharian", " Khushab", " Kot Adu", " Jauharabad", " Lahore",
			"Larkana", " Lalamusa", " Layyah", " Lawa Chakwal", " Liaquat Pur", " Lodhran", " Malakwal", " Mamoori", " Mailsi",
			" Mandi Bahauddin", " Mian Channu", " Mianwali", " Miani", 'Mirpur', 'Mangla Cantt', " Multan", " Murree", " Muridke",
			" Mianwali Bangla", " Muzaffargarh", " Narowal", " Nankana Sahib", " Okara", "Peshawar", " Pakpattan", " Pattoki", " Pindi Bhattian",
			" Pind Dadan Khan", " Pir Mahal", " Qaimpur", " Qila Didar Singh", "Quetta", " Renala Khurd", " Rabwah", " Raiwind", " Rajanpur",
			" Rahim Yar Khan", 'Rawalakot', " Rawalpindi", " Sadiqabad", " Sagri", " Sahiwal", " Sambrial",
			" Samundri", " Sangla Hill", " Sarai Alamgir", " Sargodha", " Shakargarh", " Sheikhupura", " Shujaabad",
			" Sialkot", " Sohawa", " Soianwala", " Siranwali", "Sukkur", " Tandlianwala", " Talagang", " Taxila", " Toba Tek Singh",
			" Vehari", " Wah Cantonment", " Wazirabad", " Yazman", " Zafarwal"],
			cities: [],
			i: 0,
			bilboardData: [],
			directMarket: false,
			cityName: '',
			sliceCities: []
		}
	}
	async componentWillMount() {
		const { citiesArr, i } = this.state;

		let response = await HttpUtils.get('getbillboard');
		let data = response.content;
		let cities = []
		let citiesData;
		for (var k = 0; k < citiesArr.length; k++) {
			let city = []
			citiesData = {}
			for (var j in data) {
				if (citiesArr[k] == data[j].city) {
					city.push(data[j])
					citiesData[citiesArr[k]] = city;
				}
			}
			if (city.length != 0) {
				cities.push(city)
			}
		}
		let sliceCities = cities.slice(0, i + 12);

		this.setState({
			cities: cities,
			sliceCities: sliceCities,
			i : 12
		})
	}

	billCity = () => {
		const { i, cities } = this.state;
		let addition = i + 12;
		let sliceCities = cities.slice(0, i + 12);

		this.setState({
			i: addition,
			sliceCities: sliceCities,
		})
	}

	redirectToMarketPlace = (e, city) => {
		this.setState({
			directMarket: true,
			bilboardData: e,
			cityName: city
		})
	}
	render() {
		const { bilboardData, directMarket, cityName, sliceCities } = this.state;
		if (directMarket) {
			return <Redirect to={{
				pathname: '/market_place',
				state: { bilboardData: bilboardData, showValueHead: cityName }
			}} />
		}
		return (
			<div>
				<div className="container animated animatedFadeInUp fadeInUp" style={{ "backgroundImage": "url('../images/dropdown2.png')" }}>
					<div className="row">
						<div className="col-md-12 line2"><h3 className="pakola1">Top Cities In Pakistan for Billboards</h3></div>
					</div>
					<div className="row">
						<div className="col-md-5 col-sm-5 col-4"></div>
						<div className="col-md-2 col-sm-2 col-4 hrline3"></div>
						<div className="col-md-5 col-sm-5 col-4"></div>
					</div><br />
					{/*first row*/}
					<div className="row">
						<div className="container funday">
							{/* show the cities of the Billboards */}
							{sliceCities && sliceCities.map((elem, key) => {
								return (
									<div className="col-md-4 col-sm-3 col-12 panel3div citbox divbordered"
										onClick={this.redirectToMarketPlace.bind(this, elem, elem[0].city)}>
										<div className=''>
											<div className="col-md-2 col-sm-1 col-1 innerdiv">
												<i class="material-icons locate_icon">place</i>
											</div>
											<div className="col-md-10 col-sm-11 col-11 innerdiv cittxt">
												<h5 className='divFont'>{elem[0].city}</h5>
												<h6 className="hani2">{` ${elem.length} Ads available`}</h6>
											</div>
										</div>
									</div>
								)
							})}
						</div>
					</div>
					<div className="row moon2">
						<div className="container moon5">
							<button type="button" onClick={this.billCity} class="btn btn-light yup"><span className="moon">SEE MORE</span></button>
						</div>
					</div>
				</div>
			</div >
		);
	}
}

export default Panel3;
