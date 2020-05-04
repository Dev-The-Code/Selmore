import React, { Component } from 'react';
import './newestBillboards.scss';
import Select from 'react-select';
import { HttpUtils } from '../../../Services/HttpUtils';
import { Link } from "react-router-dom";


class NewestBillboards extends Component {
    constructor(props) {
        super(props)
        this.state = {
            billboardFilterdData: [],
            filterValue: '',
            from: 0,
            to: 2,
            inputValue: 1,
            value: 0,
            rangeValzForDropdown: [],
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
            statesArr: ['Sindh', 'Punjab', 'KPK', 'Balochistan', 'Gilgit', 'Azad Kashmir'],
            cities: [],
            states: [],
            billboardData: [],
            i: 0,
        }
    }
    componentDidMount() {
        //fetching billboard data
        this.billBoradDetails();
       
    }
    billBoradDetails = async () => {
        const { citiesArr, statesArr } = this.state;

        // rededring the billboard data
        let response = await HttpUtils.get('getbillboard');
        let data = response.content;
        localStorage.setItem('billboardData', JSON.stringify(data))

        //slice for render some data and click on more button then show some next data
        // var billboard = this.state.billboardData.slice(this.state.from, this.state.to)

        //create a range array value of width height daily visitor cities & states
        let rangeNumArr = [];
        for (var i = 0; i <= 5000; i = i + 5) {
            rangeNumArr.push(i)
        }
        let rangeValues = rangeNumArr.map((elem, i) => {
            return { label: elem, value: elem, id: i }
        })
        let city = citiesArr.map((elem, i) => {
            return { label: elem, value: elem, id: i }
        })
        let state = statesArr.map((elem, i) => {
            return { label: elem, value: elem, id: i }
        })
        await this.setState({
            billboardData: data,
            rangeValzForDropdown: rangeValues,
            cities: city,
            states: state
        })
    }

    //filtration the data with given values
    filterBillBoard(filter) {
        var arr = []
        if (Array.isArray(filter)) {
            for (var i = 0; i < filter.length; i++) {
                arr.push(filter[i])
            }
        }
        else {
            arr.push(filter)
        }
        this.handleFiltration(arr)
    }
    handleFiltration = (value) => {
        //filter data with given values array
        const { billboardData } = this.state;
        var filteredData = [];
        if (value.length >= 1) {
            //if user has filter values the run the code
            for (var i = 0; i < value.length; i++) {
                for (var j in billboardData) {
                    let data = billboardData[j]
                    for (var k in data) {
                        if (data[k] === value[i]) {
                            filteredData.push(data)
                            break;
                        }
                    }
                }
            }
            this.setState({
                billboardFilterdData: filteredData
            })
        }
        else {
            // if user have not filter data then render orignal data in the page
            let notFilterd = []
            var billboardDataFromLocalStorage = JSON.parse(localStorage.getItem("billboardData"));
            this.setState({
                billboardData: billboardDataFromLocalStorage,
                billboardFilterdData: notFilterd
            })
        }
    }

    //for load more data
    onMoreData = () => {
        const { to } = this.state;
        let total = to + 2
        this.setState({
            form: 0,
            to: total
        })
        this.billBoradDetails();
    }
    //filtration for drop down data
    handleChange = (data) => {
        this.filterBillBoard(data.value)
    }
    onFlipData = () => {
        this.setState({
            i: this.state.i + 9
        })
    }
    render() {
        const { billboardData, billboardFilterdData, cities, states, rangeValzForDropdown, i } = this.state;
        let flexxData = billboardData.slice(0, i + 8);
        return (
            <div className="animated animatedFadeInUp fadeInUp">
                <div className="row mainRwNewestBill">
                    <div className="col-12 col-md-1 col-lg-1 col-xl-1"></div>
                    <div className="col-12 col-md-2 col-lg-3 col-xl-3"></div>
                    <div className="col-12 col-md-6 col-lg-4 col-xl-4">
                        <h3 className="newestBillHead">Newest Billboards</h3>
                    </div>
                    <div className="col-12 col-md-2 col-lg-3 col-xl-3">
                        <Link to={`/market_place`}><p className="seeAllnewestBill">See All ></p></Link>
                    </div>
                    <div className="col-12 col-md-1 col-lg-1 col-xl-1"></div>
                </div>
                <div className="row mainRwBilboards">
                    <div className="col-1 col-md-1 col-lg-1 col-xl-1"></div>
                    <div className="col-10 col-md-10 col-lg-10 col-xl-10">
                        <div className="row">
                            {/* <div className="col-12 col-md-4 col-lg-3 col-xl-3">
                                <div className="mainNewestBillCardDiv">
                                    <img src="https://res.cloudinary.com/dxk0bmtei/image/upload/v1586885904/Picture20_nql7cc_n15zrl.jpg" alt="card" className="newestBillCardImgs" />
                                    <div className="newestBillDetailCardDiv">
                                        <p className="newestBillCardName">Hafiz Brother</p>
                                        <p className="newestBillCardCity">Lahore</p>
                                    </div>
                                </div>
                            </div> */}
                            {/* <div className="col-md-4 seth1">
                                <div className="key1">
                                    <Link to={{ pathname: `/billborad_Militry`, state: elem }}>
                                        <img src={elem.images[0]} className='imgsizee' alt={key} /></Link>
                                </div>
                                <div className="init2">
                                    <div style={{ color: 'white' }}>
                                        <p className="fanta1">{elem.companyName.substr(0, 13)}...<br />{elem.city}</p>
                                        <p className="fanta2"><button type="button"
                                            className="btn btn-primary fanta3"><Link rel="noopener noreferrer" to={{ pathname: `/billborad_Militry`, state: elem }}
                                                style={{ color: "white" }}>Details..</Link></button></p>
                                    </div>
                                </div>
                            </div> */}
                            {flexxData && flexxData.map((elem, key) => {
                                return (
                                    <div className="col-12 col-md-4 col-lg-3 col-xl-3">
                                        <Link rel="noopener noreferrer" to={{ pathname: `/billborad_Militry`, state: elem }}>
                                            <div className="mainNewestBillCardDiv">
                                                <img src={elem.images[0]} alt={key} className="newestBillCardImgs" />
                                                <div className="newestBillDetailCardDiv">
                                                    <p className="newestBillCardName">{elem.companyName.substr(0, 13)}...</p>
                                                    <p className="newestBillCardCity">{elem.city}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })}

                        </div>
                    </div>
                    <div className="col-1 col-md-1 col-lg-1 col-xl-1"></div>
                </div>
            </div>
        );
    }
}

export default NewestBillboards;