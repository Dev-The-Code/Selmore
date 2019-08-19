import React, { Component } from 'react';
import './faq.css';
import SelmoreCom from './selmoreCom.js';
import ItWork from './itWork.js';
import Charges from './charges.js';
import Space from './space';


let SelmoreComObject = {

	col1 : 'WHAT IS SELMORE.COM?',

	col2 : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's",

	col3 : ' standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make ',

	col4 : 'a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining ',

	col5 : 'essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum  passages, an	more recently with ',

	col6 : 'desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. remaining essentially unchanged. It '
	
}
let ItWorkObject = {

	col1 : 'HOW DOES IT WORK?',

	col2 : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard ",

	col3 : 'dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen ',

	col4 : 'book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It ',

	col5 : 'was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, an more recently with ',

	col6 : 'desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. remaining essentially unchanged. It ',

	col7 : 'was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, an more recently with ',

	col8 : 'desktop publishing software like Aldus PageMaker including versions of',
	
}

let ChargesObject = {

	col1 : 'ARE THERE ANY FEES AND CHARGES TO USE SELMORE.COM?',

	col2 : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard ",

	col3 : 'dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen ',

	col4 : 'book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It ',

	col5 : 'was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.',
	
}

let SpaceObject = {

	col1 : 'HOW DO I BUY ADVERTISING SPACE ON SELMORE.COM',

	col2 : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard ",

	col3 : 'dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen ',

	col4 : 'book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It ',

	col5 : 'was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.',
	
}





class Faqbannerfoot extends Component {
	render() {
		console.log(SelmoreComObject,'selmoreCom');
		console.log(ItWorkObject,'itWork');
		console.log(ChargesObject,'charges');
		console.log(SelmoreComObject,'space');
		return (
			<div><br />
				<div className="container superp1">
					<div>
						<span className="water4">FREQUENTLY ASKED QUESTIONS</span>
					</div>
					<div className="row" style={{ marginRight: '-10px !important' }}>
						<div className="col-md-1 col-4 water5"></div>
						<div className="col-md-11 col-8"></div>
					</div><br />
					<SelmoreCom selmoreCom={SelmoreComObject} />
					<ItWork itWork= {ItWorkObject} />
					<Charges charges= {ItWorkObject} />
					<Space space= {SpaceObject} />
					
					
					{/*<div className="row">
						<span className="water6">WHAT IS SELMORE.COM?</span>
					</div>
					<div className="row">
						<div className="col-md-9">
							<p className="text-justify"><span className="">Lorem Ipsum is simply dummy text of the printing and typesetting
							industry. Lorem Ipsum has been the industry's standard dummy text ever
							since the 1500s, when an unknown printer took a galley of type and scrambled
							it to make a type specimen book. It has survived not only five centuries,
							but also the leap into electronic typesetting, remaining essentially unchanged.
							It was popularised in the 1960s with the release of Letraset sheets
							containing Lorem Ipsum passages, an	more recently with desktop
        				publishing software like Aldus PageMaker including versions of Lorem Ipsum.</span></p>
						</div>
						<div className="col-md-3">
						</div>
					</div>
					<div className="row">
						<span className="water6">HOW DOES IT WORK?</span>
					</div>
					<div className="row">
						<div className="col-md-9">
							<p className="text-justify"><span className="water7">Lorem Ipsum is simply dummy text of the printing and typesetting
							industry. Lorem Ipsum has been the industry's standard dummy text ever
							since the 1500s, when an unknown printer took a galley of type and scrambled
							it to make a type specimen book. It has survived not only five centuries,
							but also the leap into electronic typesetting, remaining essentially unchanged.
							It was popularised in the 1960s with the release of Letraset sheets
							containing Lorem Ipsum passages, an	more recently with desktop
							publishing software like Aldus PageMaker including versions of Lorem Ipsum.
							 remaining essentially unchanged.
							It was popularised in the 1960s with the release of Letraset sheets
							containing Lorem Ipsum passages, an	more recently with desktop
        				publishing software like Aldus PageMaker including versions of</span></p>
						</div>
						<div className="col-md-3">
						</div>
					</div>
					<div className="row">
						<span className="water6">ARE THERE ANY FEES AND CHARGES TO USE SELMORE.COM?</span>
					</div>
					<div className="row">
						<div className="col-md-9">
							<p className="text-justify"><span className="water7">Lorem Ipsum is simply dummy text of the printing and typesetting
							industry. Lorem Ipsum has been the industry's standard dummy text ever
							since the 1500s, when an unknown printer took a galley of type and scrambled
							it to make a type specimen book. It has survived not only five centuries,
							but also the leap into electronic typesetting, remaining essentially unchanged.
							It was popularised in the 1960s with the release of Letraset sheets
        				containing Lorem Ipsum passages.</span></p>
						</div>
						<div className="col-md-3">
						</div>
					</div>
					<div className="row">
						<span className="water6">HOW DO I BUY ADVERTISING SPACE ON SELMORE.COM</span>
					</div>
					<div className="row">
						<div className="col-md-9">
							<p className="text-justify"><span className="water7">Lorem Ipsum is simply dummy text of the printing and typesetting
							industry. Lorem Ipsum has been the industry's standard dummy text ever
							since the 1500s, when an unknown printer took a galley of type and scrambled
							it to make a type specimen book. It has survived not only five centuries,
							but also the leap into electronic typesetting, remaining essentially unchanged.
							It was popularised in the 1960s with the release of Letraset sheets
        				containing Lorem Ipsum passages.</span></p>
						</div>
						<div className="col-md-3">
						</div>
					</div>*/}
				</div>
				<div className="col-md-12">
					<div className="row water8"></div>
					.
        	</div>
			</div>
		);
	}
}

export default Faqbannerfoot;