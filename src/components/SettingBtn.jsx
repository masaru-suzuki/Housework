import React from "react";
import SettingsIcon from "@material-ui/icons/Settings";
import { Button } from "@material-ui/core";

const SettingBtn = ({ style, onClick }) => {
	return (
		<Button className={style} onClick={onClick}>
			<SettingsIcon />
		</Button>
	);
};

export default SettingBtn;
