import React from 'react';
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Add_Data from './Add_Data';
import View_all_data from './View_all_data';


function Route_1() {
	return (
	<Router>

		<div className="App">
		<Link to="/">Home page </Link><br />
		<Link to="/api/add_data">Add_data</Link> <br></br>
		<Link to="/api/view_data">View Data</Link> 
		<Routes>
		<Route exact path="/" element={<Home />} />
		<Route exact path="/api/add_data" element={<Add_Data />} />
		<Route exact path='/api/view_data' element={<View_all_data />} />
		</Routes>
		<p>Copy & Rights</p>
		</div>
	</Router>
);

}

export default Route_1;