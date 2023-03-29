import { Box, IconButton, TextField } from "@mui/material";
import StarBorderOutlineIcon from "@mui/icons-material/StarBorderOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import memoApi from "../api/memoApi";
import { useDispatch, useSelector } from "react-redux";
import { setMemo } from "../redux/features/memoSlice";
import EmojiPicker from "../components/common/EmojiPicker";

export default function Memo() {
	const { memoId } = useParams();
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [icon, setIcon] = useState("");
	const memos = useSelector((state) => state.memo.value);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const updateTitle = (e) => {
		const newTitle = e.target.value;
		setTitle(newTitle);
	};

	const updateDesc = (e) => {
		const newDesc = e.target.value;
		setDescription(newDesc);
	};

	const save = async () => {
		try {
			await memoApi.update(memoId, { title, description });
		} catch (err) {
			alert(err);
		}
	};

	const deleteMemo = async () => {
		try {
			await memoApi.delete(memoId);
			const newMemos = memos.filter((e) => e._id !== memoId);
			if (newMemos.length === 0) {
				navigate("/memo");
			} else {
				navigate(`/memo/${newMemos[0]._id}`);
			}
			dispatch(setMemo(newMemos));
		} catch (err) {
			alert(err);
		}
	};

	const onIconChange = async (newIcon) => {
		let temp = [...memos];
		const index = temp.findIndex((e) => e._id === memoId);
		temp[index] = { ...temp[index], icon: newIcon };
		setIcon(newIcon);
		dispatch(setMemo(temp));
		try {
			await memoApi.update(memoId, { icon: newIcon });
		} catch (err) {
			alert(err);
		}
	};

	useEffect(() => {
		const getMemo = async () => {
			try {
				const res = await memoApi.getOne(memoId);
				setTitle(res.title);
				setDescription(res.description);
				setIcon(res.icon);
			} catch (err) {
				alert(err);
			}
		};
		getMemo();
	}, [memoId]);
	return (
		<>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					width: "100%",
				}}
			>
				<IconButton>
					<StarBorderOutlineIcon />
				</IconButton>
				<IconButton onClick={deleteMemo}>
					<DeleteOutlineIcon />
				</IconButton>
			</Box>
			<Box sx={{ padding: "10px 50px" }}>
				<Box>
					<EmojiPicker icon={icon} onChange={onIconChange} />
					<TextField
						onChange={updateTitle}
						onBlur={save}
						onKeyDown={(e) => (e.key === "Enter" ? save() : null)}
						value={title}
						placeholder="無題"
						variant="outlined"
						fullWidth
						sx={{
							".MuiOutlinedInput-input": { padding: 0 },
							".MuiOutlinedInput-notchedOutline": { border: "none" },
							".MuiOutlinedInput-root": { fontSize: "2rem" },
						}}
					></TextField>
					<TextField
						onChange={updateDesc}
						onBlur={save}
						onKeyDown={(e) => (e.key === "Enter" ? save() : null)}
						value={description}
						placeholder="追加"
						variant="outlined"
						fullWidth
						sx={{
							".MuiOutlinedInput-input": { padding: 0 },
							".MuiOutlinedInput-notchedOutline": { border: "none" },
						}}
					></TextField>
				</Box>
			</Box>
		</>
	);
}
