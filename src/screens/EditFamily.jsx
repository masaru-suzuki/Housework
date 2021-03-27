import React, { useState } from "react";
import MediaQuery, { useMediaQuery } from "react-responsive";
import { makeStyles } from "@material-ui/core/styles";
import firebase, { db, firebaseAuth } from "../firebase";
import {
	Card,
	Grid,
	ListSubheader,
	CardActionArea,
	Avatar,
	CardContent,
	Typography,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	IconButton,
	Container,
	Button,
	Divider,
} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import reactDom from "react-dom";
import EditIcon from "@material-ui/icons/Edit";

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
		padding: "5%",
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
		// padding: 0,
		// marginLeft: 12,
	},
	card_txt: {
		lineHeight: 3,
		verticalAlign: "middle",
		paddingLeft: 16,
	},
	divider: {
		margin: "0 4px",
	},
	btn: {
		margin: 24,
	},
}));

const EditFamily = (props) => {
	const classes = useStyles();
	const memberInfo = props.location.state.memberInfo;
	console.log(memberInfo);
	//media query
	const isTablet = useMediaQuery({ query: "(min-device-width: 768px)" });
	const isSmartPhone = useMediaQuery({ query: "(max-device-width: 767px)" });

	return (
		<Container className={classes.container} maxWidth="sm">
			{memberInfo.map((data, index) => {
				return (
					<Card className={classes.card} key={index}>
						<CardContent className={classes.txtbox}>
							{isSmartPhone && (
								<CardContent className={classes.content_area}>
									<Avatar className={classes.img_sp} variant="circle" />
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
									<Avatar className={classes.img} variant="circle" />
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
						<IconButton aria-label="delete">
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
						{/* <button onClick={}></button> */}
					</Card>
					// <ListItem button>
					// 	<ListItemIcon>
					// 		<PersonIcon />
					// 	</ListItemIcon>
					// 	<ListItemText
					// 		primary={data.name}
					// 		secondary={`${data.level} Lv`}
					// 	/>
					// </ListItem>
				);
			})}
			{/* </List> */}
			<Button
				variant="contained"
				color="primary"
				className={classes.btn}
				startIcon={<AddIcon />}
			>
				家族を追加する
			</Button>
		</Container>
		// <div>
		// 	{memberInfo.map((data, index) => {
		// 		return (
		// 			<div>
		// 				<p>EditFamily</p>
		// 				<p>{data.name}</p>
		// 				<br />
		// 			</div>
		// 		);
		// 	})}
		// </div>
	);

	// return (
	// 	<div>
	// 		<p>EditFamily</p>
	// 		<p>{memberInfo.name}</p>
	// 		<br />
	// 	</div>
	// );
};

export default EditFamily;
