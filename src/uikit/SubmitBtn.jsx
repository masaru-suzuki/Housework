import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
	btn: {
		marginBottom: 24,
	},
}));

const SubmitBtn = ({ value, updateFireStore }) => {
	const classes = useStyles();
	return (
		<Button
			fullWidth
			variant="contained"
			color="primary"
			className={classes.btn}
			onClick={updateFireStore}
		>
			{value}
		</Button>
	);
};

export default SubmitBtn;
