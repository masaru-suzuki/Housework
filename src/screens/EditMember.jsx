import React, { useState, useEffect } from "react";
import firebase, { db, firebaseAuth } from "../firebase";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { ListSubheader, List, Container } from "@material-ui/core";
import InputField from "../uikit/InputField";
import BackBtn from "../uikit/BackBtn";
import SubmitBtn from "../uikit/SubmitBtn";

const useStyles = makeStyles((theme) => ({
	text_field: {
		marginBottom: 16,
	},
	// content_area: {
	// 	display: "flex",
	// 	alignItems: "center",
	// 	width: "100%",
	// 	padding: 0,
	// 	"&:last-child": {
	// 		paddingBottom: 0,
	// 	},
	// },
	// container: {
	// 	flexGrow: 1,
	// 	maxWidth: 600,
	// 	backgroundColor: "#efefef",
	// 	display: "flex",
	// 	flexDirection: "column",
	// 	justifyContent: "space-around",
	// 	padding: "0 5%",
	// },
	// img: {
	// 	marginRight: 16,
	// },
	// img_sp: {
	// 	marginRight: 8,
	// 	width: 20,
	// 	height: 20,
	// },
	// txtbox: {
	// 	width: "100%",
	// 	display: "flex",
	// },
	// card_txt: {
	// 	lineHeight: 3,
	// 	verticalAlign: "middle",
	// 	paddingLeft: 16,
	// },
	// divider: {
	// 	margin: "0 4px",
	// },
	btn_back: {
		marginTop: 8,
		width: 30,
		fontSize: 16,
	},
	// btn_icon: {
	// 	margin: 0,
	// },
	// btn: {
	// 	margin: 24,
	// },
}));

const EditMember = (props) => {
	const classes = useStyles();
	const history = useHistory();
	// const memberInfo = props.location.state.memberInfo;
	// const updateFireStore = props.location.state.updateFireStore;
	// const member = props.location.state.member;
	// console.log(member);
	// const birth = props.location.state.birth;
	const [member, setMember] = useState([]);
	const updateFirestore = () => {
		firebase
			.firestore()
			.collection("family")
			.doc(member.familyId)
			.collection("member")
			.doc("JVc1oKtURY7cSOixOnpP")
			.update({
				name: "masaru",
			})
			.then(() => {
				console.log("updated!");
			})
			.catch((error) => {
				console.error("Error updating document: ", error);
			});
	};
	// console.log(updateFireStore);
	// console.log(props.location.state);
	// console.log(props.location.state.name);
	// console.log(props.location.state.memberInfo);
	// console.log(updateFireStore);
	// const handleOnChange =
	useEffect(() => {
		console.log("render");
		setMember(props.location.state.member);
		console.log(props.location.state.member);
	}, []);
	// console.log(member.name);
	//onChangeの設定
	console.log(member);
	//
	return (
		<Container>
			<BackBtn />
			<button onClick={() => updateFirestore()}>更新</button>
			<List
				component="nav"
				aria-labelledby="nested-list-subheader"
				subheader={
					<ListSubheader disableSticky component="div">
						家族編集
					</ListSubheader>
				}
				className={classes.root}
			></List>
			<InputField required={true} label="名前" value={member.name} />
			<InputField required={true} label="生年月日" value={member.birth} />
			<SubmitBtn value="変更する" updateFirestore={updateFirestore} />
		</Container>
	);
};

export default EditMember;
