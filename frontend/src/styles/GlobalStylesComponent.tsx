import GlobalStyles from "@mui/material/GlobalStyles";

export default function GlobalStylesComponent() {
  return (
    <GlobalStyles
      styles={{
        "*": {
          scrollbarWidth: "thin", // Firefox: Thin scrollbar
          scrollbarColor: "#babfc19f #1d1b1b", // Thumb and track color in Firefox
        },
        "&::-webkit-scrollbar": {
          width: "2px", // Width of the scrollbar
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "#f0f0f0", // Track color
          borderRadius: "4px", // Rounded corners for the track
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#afa8a8", // Thumb color
          borderRadius: "4px", // Rounded corners for the thumb
          "&:hover": {
            backgroundColor: "#555", // Thumb color on hover
          },
        },
      }}
    />
  );
}
