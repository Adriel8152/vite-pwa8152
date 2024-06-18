import { createTheme } from "@mui/material";

export const theme = createTheme({
	palette: {
		mode: 'dark',
    primary: {
      main: '#009688',
    },
    secondary: {
      main: '#7e57c2',
    },
    background: {
      default: '#242424',
    },
    info: {
      main: '#42a5f5',
    },
    error: {
      main: '#ef5350',
    },
    warning: {
      main: '#ffa726',
    },
    success: {
      main: '#66bb6a',
    },
    divider: 'rgba(255,255,255,0.12)',
  },
});