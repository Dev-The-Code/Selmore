import React, { Component } from 'react';
import './advertising.css';

let agency = [
	{
	name:'Shafiq',
	listing:'7',
	image:'./images/demo1.png',
},
{
	name:'Daniyal',
	listing:'15',
	image:'./images/demo1.png',
},
{
	name:'Shayan',
	listing:'17',
	image:'./images/demo1.png',
},
{
	name:'Farzan',
	listing:'11',
	image:'./images/demo1.png',
},
{
	name:'Awais',
	listing:'5',
	image:'./images/demo1.png',
},
{
	name:'Waqas',
	listing:'20',
	image:'./images/demo1.png',
},{
	name:'Shafiq',
	listing:'7',
	image:'./images/demo1.png',
},
{
	name:'Daniyal',
	listing:'15',
	image:'./images/demo1.png',
},
{
	name:'Shayan',
	listing:'17',
	image:'./images/demo1.png',
},
{
	name:'Farzan',
	listing:'11',
	image:'./images/demo1.png',
},
{
	name:'Awais',
	listing:'5',
	image:'./images/demo1.png',
},
{
	name:'Waqas',
	listing:'20',
	image:'./images/demo1.png',
},{
	name:'Shafiq',
	listing:'7',
	image:'./images/demo1.png',
},
{
	name:'Daniyal',
	listing:'15',
	image:'./images/demo1.png',
},
{
	name:'Shayan',
	listing:'17',
	image:'./images/demo1.png',
},
{
	name:'Farzan',
	listing:'11',
	image:'./images/demo1.png',
},
{
	name:'Awais',
	listing:'5',
	image:'./images/demo1.png',
},
{
	name:'Waqas',
	listing:'20',
	image:'./images/demo1.png',
},{
	name:'Shafiq',
	listing:'7',
	image:'./images/demo1.png',
},
{
	name:'Daniyal',
	listing:'15',
	image:'./images/demo1.png',
},
{
	name:'Shayan',
	listing:'17',
	image:'./images/demo1.png',
},
{
	name:'Farzan',
	listing:'11',
	image:'./images/demo1.png',
},
{
	name:'Awais',
	listing:'5',
	image:'./images/demo1.png',
},
{
	name:'Waqas',
	listing:'20',
	image:'./images/demo1.png',
}]


class Panel2 extends Component {
	state = {
		mapUpto:4 
	}

  render() {
	const { mapUpto } = this.state;
    return (
        <div className="wood3">
        		<div className="container">
					<div className="row wood5">
					{agency.map((elem, key) => {
						console.log(elem, key, 'lksdjfhlkasjlskjdhflk')
						if(key <= mapUpto){
							return (
								<div key={key} className="col-md-4 free5">
									<div className="row wood4">
										<div className="col-md-3 col-4">
											<img src={elem.image} className="nokia"/>
										</div>
										<div className="col-md-6 col-4">
											<h4 className="free1"><span className="wood8">{elem.name}</span></h4>
											<p className="free2"><span className="wood9">{elem.listing} listings</span></p>
										</div>
										<div className="col-md-3 col-4">
											<div className="free3"><span className="free4"> > </span></div>
										</div>
									</div>		
								</div>
							)
						}						
					})}       
					<div className="col-md-4 free5">
							<div className="row">	        					
	        					<div className="col-md-3 col-2">
	        					</div>
	        					<div className="col-md-5 col-2">
	        					</div>
	        					<div className="col-md-4 col-8 text-left">
	        						<button className="btn nokia2" onClick={() => this.setState({mapUpto: mapUpto+6})}><span className="nokia3">See More</span></button>
	        					</div>
        				    </div>	
        				</div> 				
        			</div>
        		</div>        	
        		{/*<div className="container">
        			<div className="row wood5">
        				<div className="col-md-4 free5">
        				    <div className="row wood4">
	        					<div className="col-md-3 col-4">
	        						<img src="./images/demo1.png" className="nokia"/>
	        					</div>
	        					<div className="col-md-6 col-4">
	        						<h4 className="free1"><span className="wood8">Adam</span></h4>
	        						<p className="free2"><span className="wood9">28 listings</span></p>
	        					</div>
	        					<div className="col-md-3 col-4">
	        						<div className="free3"><span className="free4"> > </span></div>
	        					</div>
        				    </div>		
        				</div>
        				<div className="col-md-4 free5">
        					<div className="row wood4">
	        					<div className="col-md-3 col-4">
	        						<img src="./images/demo1.png" className="nokia"/>
	        					</div>
	        					<div className="col-md-6 col-4">
	        						<h4 className="free1"><span className="wood8">Adam</span></h4>
	        						<p className="free2"><span className="wood9">28 listings</span></p>
	        					</div>
	        					<div className="col-md-3 col-4">
	        						<div className="free3"><span className="free4"> > </span></div>
	        					</div>
        				    </div>	
        				</div>
        				<div className="col-md-4 free5">
							<div className="row">	        					
	        					<div className="col-md-3 col-2">
	        					</div>
	        					<div className="col-md-5 col-2">
	        					</div>
	        					<div className="col-md-4 col-8 text-left">
	        						<button className="btn nokia2"><span className="nokia3">See More</span></button>
	        					</div>
        				    </div>	
        				</div>
        			</div>
        		</div>*/}<br/>
        		
        </div>
    );
  }
}
export default Panel2;