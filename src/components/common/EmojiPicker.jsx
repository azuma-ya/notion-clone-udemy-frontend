import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Picker from "@emoji-mart/react";

export default function EmojiPicker(props) {
	const [selectedEmoji, setSelectedEmoji] = useState();
	const [isShowPicker, setIsShowPicker] = useState(false);

	const selectEmoji = (e) => {
		const emojiCode = e.unified.split("-");
		let codesArray = [];
		emojiCode.forEach((elm) => codesArray.push("0x" + elm));
		const emoji = String.fromCodePoint(...codesArray);
		setIsShowPicker(false);
		props.onChange(emoji);
	};

	useEffect(() => {
		setSelectedEmoji(props.icon);
	}, [props.icon]);
	return (
		<Box>
			<Typography
				variant="h3"
				fontWeight="700"
				sx={{ cursor: "pointer" }}
				onClick={() => setIsShowPicker(!isShowPicker)}
			>
				{selectedEmoji}
			</Typography>
			<Box
				sx={{
					display: isShowPicker ? "block" : "none",
					position: "absolute",
					zIndex: "100",
				}}
			>
				<Picker onEmojiSelect={selectEmoji} />
			</Box>
		</Box>
	);
}
