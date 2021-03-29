import React, { useState, useEffect } from "react";
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
	const name = props.location.state.name;
	// const birth = props.location.state.birth;
	const [member, setMember] = useState([]);
	// console.log(updateFireStore);
	// console.log(props.location.state);
	// console.log(props.location.state.name);
	// console.log(props.location.state.memberInfo);
	// console.log(updateFireStore);
	useEffect(() => {
		console.log("render");
		// setMember(memberInfo.name);
	}, []);
	// console.log(memberInfo);
	// console.log(member.name);
	//onChangeの設定
	//
	return (
		<Container>
			<BackBtn />
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
			{/* <InputField required={true} label="名前" value={name} />
			<InputField required={true} label="生年月日" value={birth} />
			<SubmitBtn value="変更する" updateFireStore={updateFireStore} /> */}
		</Container>
	);
};

export default EditMember;
