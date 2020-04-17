import React, { Component } from 'react';
import './megaSalePanel.scss';
import { Link, Redirect } from 'react-router-dom';
import { HttpUtils } from '../../../Services/HttpUtils';
import moment from 'moment';


class MegaSaleHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            megaSaleBiilboards: [],
            days: undefined,
            hours: undefined,
            minutes: undefined,
            seconds: undefined,
            goForDetail: false,
            billboardData: '',
            megaSaleId: '',
            i: 0
        }
    }
    componentDidMount() {
        this.megaSalebillBoardData()
    }

    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    megaSalebillBoardData = async () => {
        let response = await HttpUtils.get('getallmegabillboard');
        let MegaSaleBillboards = [];
        if (response.code == 200) {
            this.interval = setInterval(() => {
                let data = response.content;
                data.map((elem, key) => {
                    let elemObj = elem;
                    let timeTillDateStart = `${`${elemObj.saleEndDate}, ${elemObj.saleEndTime}`}`;
                    const now = moment();
                    const then = moment(timeTillDateStart);
                    // const countdown = moment(then - now);
                    // const days = countdown.format('D');
                    // const hours = countdown.format('HH');
                    // const minutes = countdown.format('mm');
                    // const seconds = countdown.format('ss');
                    // elemObj.minutes = minutes;
                    // elemObj.seconds = seconds;

                    var totalSec = then.diff(now, 'seconds');
                    var hours = parseInt(totalSec / 3600);
                    var minutes = parseInt(totalSec / 60) % 60;
                    var seconds = totalSec % 60;
                    var calculateTime = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
                    elemObj.calculateTime = calculateTime;
                    MegaSaleBillboards.push(elemObj)
                })
                this.setState({
                    megaSaleBiilboards: MegaSaleBillboards
                })
                MegaSaleBillboards = [];
            }, 1000);
        }
    }


    billboardData = async (data) => {
        let obj = {
            id: data.billboardId
        }
        let response = await HttpUtils.post('getspecificbiddingbillboard', obj);
        let dataOfBillboard = {
            megasaleDetail: data,
            bilboardDetail: response.content[0]
        }
        if (response.code == 200) {
            this.setState({
                billboardData: dataOfBillboard,
                goForDetail: true,
                megaSaleId: data._id
            })

        }

    }
    render() {
        const { megaSaleBiilboards, goForDetail, megaSaleId, billboardData ,i} = this.state;
        if (goForDetail) {
            return (
                <Redirect to={{ pathname: `/megaDetail/${megaSaleId}`, state: billboardData }} />
            )
        }
        let megaData = megaSaleBiilboards.slice(0, i + 4);
        console.log('mega bill board data',megaData)
        return (
            <div className="animated animatedFadeInUp fadeInUp">

                {/*mobile deskstop*/}
                <div className="d-md-none d-lg-block">
                    <div className="row mainRwPanel">
                        <div className="col-12 col-sm-1 col-lg-1 col-xl-1"></div>
                        <div className="col-12 col-sm-2 col-lg-2 col-xl-2">
                            <h3 className="megaSalHeading">Mega Sale</h3>
                            <Link to={`/megaSale`}><p className="seeAllMega">See All ></p></Link>
                        </div>
                        {megaData && megaData.map((elem, key) => {
                            return (
                                <div className="col-12 col-sm-2 col-lg-2 col-xl-2">
                                    <div className="mainMegaCardDiv"  onClick={this.billboardData.bind(this, elem)}>
                                        <img src={elem.images[0]} alt="card" className="megaCardImgs" />
                                        {/* <p className="discountTag">{elem.percantageOffDisscount.round()}% off</p> */}
                                        <p className="discountTag">40% off</p>
                                        <div className="megaDetailCardDiv">
                                            <p className="megaCardName">{elem.billboardAddress.slice(0, 12)}...</p>
                                            <p className="megaCardCity">{elem.billboardCity}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                        {/* <div className="col-12 col-sm-2 col-lg-2 col-xl-2">
                            <div className="mainMegaCardDiv">
                                <img src="https://res.cloudinary.com/dxk0bmtei/image/upload/v1586885904/Picture20_nql7cc_n15zrl.jpg" alt="card" className="megaCardImgs" />
                                <p className="discountTag">10% off</p>
                                <div className="megaDetailCardDiv">
                                    <p className="megaCardName">Hafiz Brother</p>
                                    <p className="megaCardCity">Lahore</p>
                                </div>
                            </div>
                        </div> */}
                        <div className="col-12 col-sm-1 col-lg-1 col-xl-1"></div>
                    </div>
                </div>

                {/*tablet*/}
                <div className="d-none d-md-block d-lg-none">
                    <div className="row mainRwPanel">
                        <div className="col-md-1"></div>
                        <div className="col-md-2">
                            <h3 className="megaSalHeading">Mega Sale</h3>
                            <Link><p className="seeAllMega">See All ></p></Link>
                        </div>
                        <div className="col-md-8">
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="mainMegaCardDiv">
                                        <img src="https://res.cloudinary.com/dxk0bmtei/image/upload/v1586885904/Picture20_nql7cc_n15zrl.jpg" alt="card" className="megaCardImgs" />
                                        <p className="discountTag">10% off</p>
                                        <div className="megaDetailCardDiv">
                                            <p className="megaCardName">Hafiz Brother</p>
                                            <p className="megaCardCity">Lahore</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="mainMegaCardDiv">
                                        <img src="https://res.cloudinary.com/dxk0bmtei/image/upload/v1586885904/Picture20_nql7cc_n15zrl.jpg" alt="card" className="megaCardImgs" />
                                        <p className="discountTag">10% off</p>
                                        <div className="megaDetailCardDiv">
                                            <p className="megaCardName">Hafiz Brother</p>
                                            <p className="megaCardCity">Lahore</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="mainMegaCardDiv">
                                        <img src="https://res.cloudinary.com/dxk0bmtei/image/upload/v1586885904/Picture20_nql7cc_n15zrl.jpg" alt="card" className="megaCardImgs" />
                                        <p className="discountTag">10% off</p>
                                        <div className="megaDetailCardDiv">
                                            <p className="megaCardName">Hafiz Brother</p>
                                            <p className="megaCardCity">Lahore</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="mainMegaCardDiv">
                                        <img src="https://res.cloudinary.com/dxk0bmtei/image/upload/v1586885904/Picture20_nql7cc_n15zrl.jpg" alt="card" className="megaCardImgs" />
                                        <p className="discountTag">10% off</p>
                                        <div className="megaDetailCardDiv">
                                            <p className="megaCardName">Hafiz Brother</p>
                                            <p className="megaCardCity">Lahore</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-1"></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MegaSaleHome;