import React, { useState, useEffect } from "react";
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
	const [familyId, setFamilyId] = useState("");
	const [memberInfo, setMemberInfo] = useState({});
	const classes = useStyles();
	let isDataGet = false;
	const memberInfoArr = [];
	//firebaseからfamily 情報を取得 一度だけ
	useEffect(() => {
		firebaseAuth.onAuthStateChanged(function (user) {
			if (user) {
				// Sign in 状態
				const uid = user.uid;
				// console.log(uid);
				setFamilyId(uid);
				const familyRef = db.collection("family").doc(uid).collection("member");
				familyRef
					.get()
					.then((querySnapshot) => {
						// 一旦memberInfoArrに代入しているけどスマートな方法はないのか？
						querySnapshot.forEach((doc) => {
							// console.log(doc.data());
							memberInfoArr.push(doc.data());
						});
					})
					.catch((error) => {
						console.log("Error getting documents: ", error);
					});
			} else {
				// No user is signed in.
				console.log("user is undefined...");
			}
		});
		setMemberInfo(memberInfoArr);
	}, []);
	// console.log(memberInfo);

	//firebase のmember にデータを追加するテスト
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
			.doc(familyId)
			.collection("member")
			.add(data);

	return (
		<Container className={classes.root} maxWidth="sm">
			<DrawerNav
				//member 情報のstateを渡す
				info={memberInfo}
			/>
			<button onClick={addMemberInfo}></button>
			<p>Home</p>

			<Grid container spacing={3}>
				<Grid item xs={12} sm={6}>
					<MemberCard uid={familyId} />
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
