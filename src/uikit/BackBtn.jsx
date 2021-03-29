import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
const useStyles = makeStyles((theme) => ({
	btn_back: {
		marginTop: 8,
		width: 30,
		fontSize: 16,
	},
}));

const BackBtn = () => {
	const classes = useStyles();
	const history = useHistory();
	return (
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
	);
};

export default BackBtn;
