import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import firebase, { db, firebaseAuth } from "../firebase";
import {
	ListSubheader,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Container,
	Button,
	Divider,
} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";
import reactDom from "react-dom";

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: 600,
		width: "100%",
	},
	container: {
		flexGrow: 1,
		maxWidth: 600,
		backgroundColor: "#efefef",
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-around",
		padding: 40,
	},
	btn: {
		margin: 24,
	},
}));

const EditFamily = (props) => {
	const classes = useStyles();
	const memberInfo = props.location.state.memberInfo;
	console.log(memberInfo);
	return (
		<Container className={classes.container} maxWidth="sm">
			<List
				component="nav"
				aria-labelledby="nested-list-subheader"
				subheader={
					<ListSubheader component="div" id="nested-list-subheader">
						家族情報編集
					</ListSubheader>
				}
				className={classes.root}
			>
				{memberInfo.map((data, index) => {
					return (
						<React.Fragment>
							<ListItem button>
								<ListItemIcon>
									<PersonIcon />
								</ListItemIcon>
								<ListItemText
									primary={data.name}
									secondary={`${data.level} Lv`}
								/>
							</ListItem>
							<Divider />
						</React.Fragment>
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
