import React, { Component } from 'react';
import './about.css';

class Panel1 extends Component {
  render() {
    return (
        <div>	
        		<div className="container" style={{marginTop:"45px"}}>
	        		<div className="row">
	        			<div className="col-md-8 olpad2">
	        				<h4 style={{marginBottom:"20px"}}><span className="tissue1">ABOUT SELMORE</span></h4>
	        				<p className="tissue2">Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
	        					Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
	        					when an unknown printer took a galley of type and scrambled it to make a type specimen book.
	        				  	It has survived not only five centuries, but also the leap into electronic typesetting,
	        				   remaining essentially unchanged. It was popularised in the 1960s with the 
	        				   release of Letraset sheets containing Lorem Ipsum passages, and more recently with 
	        				   desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p><br/>
	        				<p className="tissue2">Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
	        					Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
	        					when an unknown printer took a galley of type and scrambled it to make a type specimen book.
	        				  	It has survived not only five centuries, but also the leap into electronic typesetting,
	        				   remaining essentially unchanged. It was popularised in the 1960s </p>
	        				   <p className="tissue2" style={{marginBottom:'10%'}}>the 
	        				   release of Letraset sheets containing Lorem Ipsum passages, and more recently with 
	        				   desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>   
	        			</div>
	        			<div className="col-md-4"></div>
	    			</div>
        		</div>

  		</div> 
    );
  }
}

export default Panel1;