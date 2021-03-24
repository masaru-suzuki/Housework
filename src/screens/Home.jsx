import React, { useState } from "react";
import firebase, { db } from "../firebase";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

const Home = () => {
	const [familyName, setFamilyName] = useState("");

	const handleLogout = () => {
		firebase.auth().signOut();
	};

	firebase.auth().onAuthStateChanged(function (user) {
		if (user) {
			// User is signed in.
			const uid = user.uid;
			const familyRef = db.collection("family").doc(uid);
			familyRef
				.get()
				.then((doc) => {
					if (doc.exists) {
						// console.log("Document data:", doc.data().name);
						setFamilyName(doc.data().name);
					} else {
						// doc.data() will be undefined in this case
						console.log("No such document!");
					}
				})
				.catch((error) => {
					console.log("Error getting document:", error);
				});
		} else {
			// No user is signed in.
			console.log("user is undefined...");
		}
	});
	console.log(familyName);
	return (
		<div className="container">
			<p>Home</p>
			<p>ようこそ{familyName}さん</p>
			<Link to="/profile">Profileへ</Link>
			<br />
			<br />
			<Button onClick={handleLogout}>ログアウト</Button>
		</div>
	);
};

export default Home;
