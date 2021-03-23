import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from "./auth/PrivateRoute";
import { AuthProvider } from "./auth/AuthProvider";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

// import { pushUser } from "./firebase.js";

function App() {
	return (
		<AuthProvider>
			<Router>
				<div>
					<PrivateRoute exact path="/" component={Home} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/signup" component={SignUp} />
				</div>
			</Router>
		</AuthProvider>
	);
}

export default App;
