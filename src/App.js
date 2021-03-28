import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Auth from "./auth/Auth";
//screens
import Home from "./screens/Home";
import EditFamily from "./screens/EditFamily";
import EditHousework from "./screens/EditHousework";
import Profile from "./screens/Member";
import SignInOrUp from "./screens/SignInOrUp";
import SignUp from "./screens/SignUp";
import Member from "./screens/Member";
import EditMember from "./screens/EditMember";

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path="/signin" component={SignInOrUp} />
				<Route exact path="/signup" component={SignUp} />
				{/* 以下認証のみ */}
				<Auth>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/profile" component={Profile} />
						<Route exact path="/editFamily" component={EditFamily} />
						<Route exact path="/EditHousework" component={EditHousework} />
						<Route exact path="/Member" component={Member} />
						<Route exact path="/EditMember" component={EditMember} />
						<Route render={() => <p>not found.</p>} />
					</Switch>
				</Auth>
			</Switch>
		</Router>
	);
}

export default App;
