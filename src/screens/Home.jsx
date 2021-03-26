import React, { useState } from "react";
import firebase, { db, firebaseAuth } from "../firebase";
import DrawerNav from "../components/DrawerNav";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid } from "@material-ui/core";
import MemberCard from "../components/MemberCard";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		backgroundColor: "#efefef",
	},
}));

const Home = () => {
	const [familyName, setFamilyName] = useState("");
	const classes = useStyles();
	let uid = "";
	//firebaseからfamily 情報を取得
	firebaseAuth.onAuthStateChanged(function (user) {
		if (user) {
			// User is signed in.
			uid = user.uid;
			console.log(uid);
			const familyRef = db
				.collection("family")
				.doc(uid)
				.collection("member")
				.doc("mo3eozbhASvDtah5PTbf");
			familyRef
				.get()
				.then((doc) => {
					if (doc.exists) {
						console.log("Document data:", doc.data());
						// setFamilyName(doc.data());
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
	console.log(uid);
	// console.log();
	const data = {
		name: "memberName",
		birth: "memberBirth",
		level: "memberLevel",
		experiencePoint: "memberExperiencePoint",
		requiredExpreriencePoint: "memberRequiredExpreriencePointa",
		point: "memberPoint",
	};
	const addMemberInfo = () =>
		firebase
			.firestore()
			.collection("family")
			.doc(uid)
			.collection("member")
			.add(data);
	return (
		<Container className={classes.root} maxWidth="sm">
			<DrawerNav />
			<button onClick={addMemberInfo}></button>
			<p>Home</p>

			<Grid container spacing={3}>
				<Grid item xs={12} sm={6}>
					<MemberCard uid={uid} />
				</Grid>
				<Grid item xs={12} sm={6}>
					<MemberCard />
				</Grid>
				<Grid item xs={12} sm={6}>
					<MemberCard />
				</Grid>
				<Grid item xs={12} sm={6}>
					<MemberCard />
				</Grid>
			</Grid>
		</Container>
	);
};

export default Home;
