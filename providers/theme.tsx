import { createTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import { PaletteMode } from "@mui/material";

export const createCustomTheme = (mode: PaletteMode) => {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: mode === "dark" ? "#fff" : grey[900],
      },
      secondary: {
        main: grey[500],
      },
      background: {
        default: mode === "dark" ? "#000" : "#fff",
      },
      text: {
        primary: mode === "dark" ? "#fff" : "#000",
        secondary: grey[500],
      },
    },
  });
};
