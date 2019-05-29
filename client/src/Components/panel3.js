import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import './home.css';

class Panel3 extends Component {
  render() {
    return (
      <div>

      		<div className="container"  style={{"backgroundImage":"url('../images/dropdown2.png')"}}>
      			<div className="row">
      				<div className="col-md-12 line2"><h3 className="pakola1">Top Cities In Pakistan for Billboards</h3></div>
      			</div>
      			<div className="row">
      					<div className="col-md-5 col-4"></div>
      					<div className="col-md-2 col-4 hrline3"></div>
      					<div className="col-md-5 col-4"></div>
  				  </div><br/>

  				{/*first row*/}
  				<div className="row">
  					<div className="container funday">
            <Link  rel="noopener noreferrer" to={`/billboard`}>
            <div className="col-md-3 panel3div">
   							<div className="col-md-2 innerdiv">
   							</div>
   							<div className="col-md-8 innerdiv">
     								<h5>Karachi</h5>
     								<h6 className="hani2">30 Ads available</h6>
   							</div>
   							<div className="col-md-2 innerdiv">
   								 <i class="material-icons locate_icon">place</i>
  							</div>
 						</div>
            </Link>
            <Link  rel="noopener noreferrer" to={`/billboard`}>
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
            <Link  rel="noopener noreferrer" to={`/billboard`}>
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
            <Link  rel="noopener noreferrer" to={`/billboard`}>
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
            </Link>
  					</div>
  				</div>
  				{/*Second Row*/}
  				<div className="row">
  					<div className="container funday">
            <Link  rel="noopener noreferrer" to={`/billboard`}>
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
            <Link  rel="noopener noreferrer" to={`/billboard`}>
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
            <Link  rel="noopener noreferrer" to={`/billboard`}>
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
            <Link  rel="noopener noreferrer" to={`/billboard`}>
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
				{/*Third panel*/}
  				<div className="row">
  					<div className="container funday">
            <Link  rel="noopener noreferrer" to={`/billboard`}>
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
            <Link  rel="noopener noreferrer" to={`/billboard`}>
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
            <Link  rel="noopener noreferrer" to={`/billboard`}>
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
            <Link  rel="noopener noreferrer" to={`/billboard`}>
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
  			{/*Fourth panel*/}
  				<div className="row">
  					<div className="container funday">
            <Link  rel="noopener noreferrer" to={`/billboard`}>
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
            <Link  rel="noopener noreferrer" to={`/billboard`}>
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
              <Link  rel="noopener noreferrer" to={`/billboard`}>
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
              <Link  rel="noopener noreferrer" to={`/billboard`}>
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
  				</div>

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
