import React, { useState } from "react";
import firebase, { db, firebaseAuth } from "../firebase";

const EditFamily = (props) => {
	const memberInfo = props.location.state.memberInfo;
	console.log(memberInfo);
	return (
		<div>
			{memberInfo.map((data, index) => {
				return (
					<div>
						<p>EditFamily</p>
						<p>{data.name}</p>
						<br />
					</div>
				);
			})}
		</div>
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
