import { Box, TextField } from "@mui/material";
import React from "react";

export default function Register() {
	return (
		<Box component="form">
			<TextField
				fullWidth
				id="username"
				label="お名前"
				margin="normal"
				name="username"
				required
			/>
			<TextField
				fullWidth
				id="password"
				label="パスワード"
				margin="normal"
				name="password"
				type="password"
				required
			/>
			<TextField
				fullWidth
				id="confirmPassword"
				label="確認用パスワード"
				margin="normal"
				name="confirmPassword"
				type="password"
				required
			/>
		</Box>
	);
}
