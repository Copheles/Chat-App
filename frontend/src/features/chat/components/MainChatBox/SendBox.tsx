import SendSharpIcon from "@mui/icons-material/SendSharp";
import { Box, IconButton, TextField } from "@mui/material";
import Picker, { EmojiStyle, SkinTones, Theme } from "emoji-picker-react";
import { useState } from "react";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

type EmojiObject = {
  activeSkinTone: SkinTones;
  unified: string;
  unifiedWithoutSkinTone: string;
  emoji: string; // the emoji character, for example: '😀'. Emoji ID in custom emojis
  isCustom: boolean; // whether the emoji is a custom emoji or not
  names: string[];
  imageUrl: string; // the url of the emoji image with the current emoji style applied
  getImageUrl: (emojiStyle: EmojiStyle) => string; // a function that receives an emoji style and returns the url of the emoji image with the provided style applied
};

export default function SendBox() {
  const [message, setMessage] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  const handleEmojiClick = (emojiObject: EmojiObject) => {
    setMessage((prevMessage) => prevMessage + emojiObject.emoji);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      px={2}
      my={2}
      position="relative"
    >
      <Box display="flex" alignItems="center" sx={{ position: "relative" }}>
        <IconButton
          onClick={() => setShowPicker((prev) => !prev)}
          sx={{ alignSelf: "flex-end", marginBottom: "8px" }}
        >
          <EmojiEmotionsIcon />
        </IconButton>
        <TextField
          fullWidth
          placeholder="Type your message..."
          multiline
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onFocus={() => setShowPicker(false)}
          sx={{
            marginX: "5px",
            paddingRight: "40px", // Add padding to account for the send button
            "& .MuiOutlinedInput-root": {
              borderRadius: "20px", // Custom border radius
            },
          }}
        />
        <IconButton
          sx={{
            position: "absolute",
            right: "0px",
            bottom: "8px",
            backgroundColor: "primary.dark",
            color: "white",
            "&:hover": {
              backgroundColor: "#38ccdcbc", // Change background color on hover
              color: "white", // Change text/icon color on hover
            },
          }}
        >
          <SendSharpIcon />
        </IconButton>
      </Box>
      {showPicker && (
        <Box position="absolute" bottom="60px" left="30px" zIndex={10}>
          <Picker onEmojiClick={handleEmojiClick} theme={Theme.DARK} />
        </Box>
      )}
    </Box>
  );
}
