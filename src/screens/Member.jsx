import React, { useState } from "react";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import EditIcon from "@material-ui/icons/Edit";
import ListIcon from "@material-ui/icons/List";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
	root: {
		width: 500,
	},
});

const Member = () => {
	const [value, setValue] = useState(0);
	const classes = useStyles();

	return (
		<div>
			<p>member画面</p>
			<BottomNavigation
				value={value}
				onChange={(event, newValue) => {
					setValue(newValue);
				}}
				showLabels
				className={classes.root}
			>
				<BottomNavigationAction label="家事の編集" icon={<ListIcon />} />
				<BottomNavigationAction label="家族の編集" icon={<EditIcon />} />
			</BottomNavigation>
		</div>
	);
};

export default Member;
