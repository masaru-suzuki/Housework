import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import {
	Card,
	Avatar,
	CardActionArea,
	CardContent,
	Typography,
} from "@material-ui/core";

const useStyles = makeStyles({
	root: {
		maxWidth: 345,
		minHeight: 300,
		margin: "0 auto",
	},
	img: {
		textAlign: "center",
		width: "100%",
		height: 100,
		margin: "0 auto",
	},
	txtbox: {
		padding: "48px 24px",
	},
});

// const data = {
// 	name: "memberName",
// 	birth: "memberBirth",
// 	level: "memberLevel",
// 	experiencePoint: "memberExperiencePoint",
// 	requiredExpreriencePoint: "memberRequiredExpreriencePointa",
// 	point: "memberPoint",
// };

const MemberCard = ({ memberInfo }) => {
	const classes = useStyles();
	const history = useHistory();
	console.log(memberInfo);
	return (
		<Card className={classes.root} onClick={() => history.push("/Member")}>
			<CardActionArea>
				<Avatar className={classes.img} variant="square" />
				<CardContent className={classes.txtbox}>
					<Typography gutterBottom variant="h5" component="h2">
						{/* {memberInfo.name} */}
					</Typography>
					<Typography variant="body2" color="textSecondary" component="p">
						30 lv
					</Typography>
					<Typography variant="body2" color="textSecondary" component="p">
						2800 point
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default MemberCard;
