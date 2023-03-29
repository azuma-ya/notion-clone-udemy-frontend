import { Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import React, { useState } from "react";
import memoApi from "../api/memoApi";
import { useNavigate } from "react-router-dom";

export default function Home() {
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const createMemo = async () => {
		try {
			setLoading(true);
			const res = await memoApi.create();
			navigate(`/memo/${res._id}`);
		} catch (err) {
			alert(err);
		} finally {
			setLoading(false);
		}
	};
	return (
		<Box
			sx={{
				height: "100%",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<LoadingButton
				variant="outlined"
				onClick={() => createMemo()}
				loading={loading}
			>
				最初のメモを作成
			</LoadingButton>
		</Box>
	);
}
