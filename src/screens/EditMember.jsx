import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
	Card,
	ListSubheader,
	Avatar,
	CardContent,
	Typography,
	List,
	IconButton,
	Container,
	Button,
	TextField,
	Divider,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

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
	// btn_back: {
	// 	marginTop: 8,
	// 	width: 30,
	// 	fontSize: 3,
	// },
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
	const memberInfo = props.location.state.memberInfo;
	// console.log(memberInfo);

	return (
		<Container>
			<Button
				variant="text"
				color="inherit"
				size="small"
				className={classes.btn_back}
				onClick={() => history.goBack()}
				startIcon={<ArrowBackIosIcon className={classes.btn_icon} />}
			>
				back
			</Button>
			<List
				component="nav"
				aria-labelledby="nested-list-subheader"
				subheader={
					<ListSubheader
						disableSticky
						component="div"
						id="nested-list-subheader"
					>
						家族編集
					</ListSubheader>
				}
				className={classes.root}
			>
				<TextField
					className={classes.text_field}
					fullWidth
					size="small"
					variant="filled"
					required
					label="名前"
					value={memberInfo.name}
				/>
				<TextField
					className={classes.text_field}
					fullWidth
					size="small"
					variant="filled"
					required
					label="生年月日"
					value={memberInfo.birth}
				/>
				<Button
					fullWidth
					variant="contained"
					color="primary"
					className={classes.btn}
				>
					変更する
				</Button>
			</List>
		</Container>
	);
};

export default EditMember;
