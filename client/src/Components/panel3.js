import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { HttpUtils } from './../Services/HttpUtils';
import './home.css';

class Panel3 extends Component {
	constructor(props) {
		super(props)
		this.state = {
			citiesArr: ["Abbottabad", "Ahmadpur East", " Ahmed Nager Chatha", " Ali Khan Abad", " Alipur", " Arifwala",
				" Attock", " Bhera", " Bhalwal", " Bahawalnagar", " Bahawalpur", " Bhakkar", " Burewala",
				" Chillianwala", " Choa Saidanshah", " Chakwal", " Chak Jhumra", " Chichawatni", " Chiniot",
				" Chishtian", " Chunian", " Dajkot", " Daska", " Davispur", " Darya Khan", " Dera Ghazi Khan", "Dera Ismail Khan",
				" Dhaular", " Dina", " Dinga", " Dhudial Chakwal", " Dipalpur", " Faisalabad", " Fateh Jang",
				" Ghakhar Mandi", " Gojra", " Gujranwala", " Gujrat", " Gujar Khan", " Harappa", " Hafizabad", "Hyderabad",
				" Ghakhar Mandi", " Gojra", " Gujranwala", " Gujrat", " Gujar Khan", " Harappa", " Hafizabad", "Hyderabad",
				" Haroonabad", " Hasilpur", " Haveli Lakha", " Jalalpur Jattan", " Jampur", " Jaranwala", " Jhang",
				" Jhelum", " Kallar Syedan", " Kalabagh", " Karor Lal Esan", 'Karachi', " Kasur", " Kamalia", " Kāmoke", " Khanewal",
				" Khanpur", " Khanqah Sharif", " Kharian", " Khushab", " Kot Adu", " Jauharabad", " Lahore", " Islamabad",
				" Lalamusa", " Layyah", " Lawa Chakwal", " Liaquat Pur", " Lodhran", " Malakwal", " Mamoori", " Mailsi",
				" Mandi Bahauddin", " Mian Channu", " Mianwali", " Miani", " Multan", " Murree", " Muridke", " Mianwali Bangla",
				" Muzaffargarh", " Narowal", " Nankana Sahib", " Okara", "Peshawar", " Renala Khurd", " Pakpattan", " Pattoki",
				" Pindi Bhattian", " Pind Dadan Khan", " Pir Mahal", " Qaimpur", " Qila Didar Singh", "Quetta", " Rabwah",
				" Raiwind", " Rajanpur", " Rahim Yar Khan", " Rawalpindi", " Sadiqabad", " Sagri", " Sahiwal", " Sambrial",
				" Samundri", " Sangla Hill", " Sarai Alamgir", " Sargodha", " Shakargarh", " Sheikhupura", " Shujaabad",
				" Sialkot", " Sohawa", " Soianwala", " Siranwali", " Tandlianwala", " Talagang", " Taxila", " Toba Tek Singh",
				" Vehari", " Wah Cantonment", " Wazirabad", " Yazman", " Zafarwal"],
			i: 0
		}
	}

	// componentDidMount() {
	// 	this.billData();
	// }

	// billData = async () => {
	// 	let response = await HttpUtils.get('getbillboard');
	// 	let data = response.content;
	// 	let arr = [];
	// 	for(var i = 0; i < data.length; i++){
	// 			arr.push(data[i]);

	// 	}
	// }
	async componentWillMount() {
		const { citiesArr } = this.state;

		let response = await HttpUtils.get('getbillboard');
		let data = response.content;
		let citiesData = [];
		let citiesArray = [];
		for (var i in data) {
			if (data[i].city != undefined) {
				citiesArray.push(data[i])
			}
		}


		for (var j = 0; j < citiesArr.length; j++) {
			console.log(citiesArr[j])
			// if(citiesArr[j] == )
		}
		// for (var i in data) {
		// 	// console.log(data[i].city, 'data')
		// 	if (data[i].city != undefined) {
		// 		// let arr = data[i]
		// 		// citiesData[citiesArr[j]] = arr
		// 		cities.push(data[i])
		// 		// citiesData.push(data[i])
		// 		// citiesData.push(data[i]);
		// 		// citiesArray[citiesArr[j]] = citiesData
		// 		// city =data[i];
		// 		// // city.push(data[i])
		// 		// // city[data[i].city] = data[i];
		// 		// citiesArray[j].push(data[i])
		// 	}
		// }

		// console.log(data, "data")
		// let abbottabad = [];
		// let ahmadpurEast = [];
		// let ahmedNagerChatha = [];
		// let AliKhanAbad = [];
		// let Alipur = [];
		// let Arifwala = [];

		// let citiesArray = {};
		// console.log(citiesArray, 'citiesArray')
		// for (var j = 0; j < citiesArr.length; j++) {
		// citiesData = `${citiesArr[j]}`;
		// citiesData = {}
		// citiesData[citiesArr[j]] = []
		// cities.push(citiesData)
		// for (var j=0; j<citiesArr.length; j++) {
		// 	// console.log(data[i].city, 'data')
		// 	if (cities[j].city == data[j].city) {
		// 		// let arr = data[i]
		// 		// citiesData[citiesArr[j]] = arr
		// 		citiesData.push(cities[j])
		// 		// citiesData.push(data[i])
		// 		// citiesData.push(data[i]);
		// 		// citiesArray[citiesArr[j]] = citiesData
		// 		// city =data[i];
		// 		// // city.push(data[i])
		// 		// // city[data[i].city] = data[i];
		// 		// citiesArray[j].push(data[i])
		// 	}
		// }
		// }
		// console.log(cities, 'cities')
		// console.log(data, 'data')

		// console.log(citiesName, 'citiesName')
		// // for (var j = 0; j < citiesArr.length; j++) {
		// // }
	}

	billCity = () => {
		this.setState({
			i: this.state.i + 12
		})
	}
	render() {
		const { citiesArr, i } = this.state;
		let slipCity = citiesArr.slice(0, i + 12);
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
							{slipCity && slipCity.map((elem, key) => {
								return <Link rel="noopener noreferrer" to={`/market_place`}>
									<div className="col-md-4 col-sm-3 col-12 panel3div citbox">
										<div className=''>
											<div className="col-md-2 col-sm-1 col-1 innerdiv">
												<i class="material-icons locate_icon">place</i>
											</div>
											<div className="col-md-10 col-sm-11 col-11 innerdiv cittxt">
												<h5 className='divFont'>{elem.slice(0, 12)}</h5>
												<h6 className="hani2">30 Ads available</h6>
											</div>
										</div>
									</div>
								</Link>
							})}
						</div>
					</div>
					<div className="row moon2">
						<div className="container moon5">
							<button type="button" onClick={this.billCity} class="btn btn-light yup"><span className="moon">SEE MORE</span></button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Panel3;
