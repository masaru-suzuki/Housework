import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
	btn: {
		marginBottom: 24,
	},
}));

const SubmitBtn = ({ value, updateFirestore }) => {
	const history = useHistory();
	const classes = useStyles();
	const btnAction = () => {
		updateFirestore();
		history.goBack();
	};
	return (
		<Button
			fullWidth
			variant="contained"
			color="primary"
			className={classes.btn}
			onClick={btnAction}
		>
			{value}
		</Button>
	);
};

export default SubmitBtn;
