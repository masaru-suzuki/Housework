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
	const [membersInfo, setMembersInfo] = useState({});
	const classes = useStyles();
	let isDataGet = false;
	const membersInfoArr = [];
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
						// 一旦membersInfoArrに代入しているけどスマートな方法はないのか？membersInfoArrに格納しなくてもいい方法を検討
						querySnapshot.forEach((doc) => {
							// console.log(doc.data());
							membersInfoArr.push(doc.data());
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
		setMembersInfo(membersInfoArr);
	}, []);
	// console.log(membersInfo);

	//firebase のmember にデータを追加するテスト
	const data = {
		name: "nozomi",
		birth: "20200618",
		level: "12",
		experiencePoint: "49",
		requiredExpreriencePoint: "10",
		point: "4600000000",
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
				membersInfo={membersInfo}
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
