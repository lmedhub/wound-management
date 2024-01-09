import { createTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import { PaletteMode } from "@mui/material";

export const createCustomTheme = (mode: PaletteMode) => {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: mode === "dark" ? "#fff !important" : "#212121 !important",
      },
      secondary: {
        main: "#9e9e9e !important",
      },
      background: {
        default: mode === "dark" ? "#000 !important" : "#fff !important",
      },
      text: {
        primary: mode === "dark" ? "#fff !important" : "#000 !important",
        secondary: "#9e9e9e !important",
      },
    },
  });
};
