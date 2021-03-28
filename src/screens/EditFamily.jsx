import React from "react";
import { useHistory } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
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
	Divider,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const useStyles = makeStyles((theme) => ({
	card: {
		display: "flex",
		maxWidth: 600,
		width: "100%",
		height: "10%",
		margin: 10,
	},
	content_area: {
		display: "flex",
		alignItems: "center",
		width: "100%",
		padding: 0,
		"&:last-child": {
			paddingBottom: 0,
		},
	},
	container: {
		flexGrow: 1,
		maxWidth: 600,
		backgroundColor: "#efefef",
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-around",
		padding: "0 5%",
	},
	img: {
		marginRight: 16,
	},
	img_sp: {
		marginRight: 8,
		width: 20,
		height: 20,
	},
	txtbox: {
		width: "100%",
		display: "flex",
	},
	card_txt: {
		lineHeight: 3,
		verticalAlign: "middle",
		paddingLeft: 16,
	},
	divider: {
		margin: "0 4px",
	},
	btn_back: {
		marginTop: 8,
		width: 30,
		fontSize: 3,
	},
	btn_icon: {
		margin: 0,
	},
	btn: {
		margin: 24,
	},
}));

const EditFamily = (props) => {
	const classes = useStyles();
	const history = useHistory();
	const membersInfo = props.location.state.membersInfo;
	// console.log(membersInfo);

	//media query
	const isTablet = useMediaQuery({ query: "(min-device-width: 768px)" });
	const isSmartPhone = useMediaQuery({ query: "(max-device-width: 767px)" });
	const handleBackHome = () => {
		history.push({ pathname: "/" });
	};
	const handleEditMember = (memberInfo) => {
		history.push({
			pathname: "/EditMember",
			state: { memberInfo },
		});
	};

	return (
		<Container className={classes.container} maxWidth="sm">
			<Button
				variant="text"
				color="inherit"
				size="small"
				className={classes.btn_back}
				onClick={() => handleBackHome()}
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
				{membersInfo.map((data, index) => {
					const memberInfo = membersInfo[index];
					// console.log(memberInfo);
					return (
						<Card className={classes.card} key={index}>
							<CardContent className={classes.txtbox}>
								{isSmartPhone && (
									<CardContent className={classes.content_area}>
										<Avatar className={classes.img_sp} variant="circular" />
										<Typography
											align="left"
											display="inline"
											// gutterBottom
											variant="subtitle2"
										>
											{data.name}
										</Typography>
									</CardContent>
								)}

								{isTablet && (
									<CardContent className={classes.content_area}>
										<Avatar className={classes.img} variant="circular" />
										<Typography
											align="left"
											display="inline"
											// gutterBottom
											variant="h5"
											component="p"
										>
											{data.name}
										</Typography>
										<Typography
											className={classes.card_txt}
											display="inline"
											variant="body1"
											color="textSecondary"
											component="p"
										>
											30 lv
										</Typography>
										<Typography
											className={classes.card_txt}
											display="inline"
											variant="body1"
											color="textSecondary"
											component="p"
										>
											2800 point
										</Typography>
									</CardContent>
								)}
							</CardContent>
							<Divider
								className={classes.divider}
								orientation="vertical"
								flexItem
							/>
							<IconButton
								aria-label="delete"
								onClick={() => handleEditMember(memberInfo)}
							>
								<EditIcon />
							</IconButton>
							<Divider
								className={classes.divider}
								orientation="vertical"
								flexItem
							/>
							<IconButton aria-label="delete">
								<DeleteIcon />
							</IconButton>
						</Card>
					);
				})}
			</List>
			<Button
				variant="contained"
				color="primary"
				className={classes.btn}
				startIcon={<AddIcon />}
			>
				家族を追加する
			</Button>
		</Container>
	);
};

export default EditFamily;
