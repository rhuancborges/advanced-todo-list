import {CssBaseline, ThemeProvider} from "@mui/material";
import {Box, Typography, Button, Chip} from "@mui/material";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  "palette": {
    "primary": {
      "main": "#9dc0e6"
    },
    "mode": "dark",
    "background": {
      "default": "#1d1c1c",
      "paper": "#00020d"
    },
    "secondary": {
      "main": "#e6cf00"
    },
    "error": {
      "main": "#830b00"
    },
    "warning": {
      "main": "#ffa753"
    },
    "info": {
      "main": "#c5ffeb"
    },
    "success": {
      "main": "#51ff5b"
    }
  },
  "typography": {
    "fontSize": 13,
    "fontFamily": "Roboto, Helvetica, Arial, sans-serif"
  },
  "shape": {
    "borderRadius": 8
  },
  "spacing": 9
});

export const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Box sx={{p: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: 2}}>
      <Button variant="outlined" color="secondary">
        Testando estilos
      </Button>
      <Typography variant="h2">Princípio do Projeto</Typography>
      <Chip label="Teste" color="error" onClick={() => {}} />
    </Box>
  </ThemeProvider>
);
