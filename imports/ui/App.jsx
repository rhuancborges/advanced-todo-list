import {CssBaseline, ThemeProvider} from "@mui/material";
import {Box, Typography, Button, Chip} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import {React, useState} from "react";
import { Meteor } from "meteor/meteor";


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

export const App = () => {
  const [userId, setUserId] = useState(null);

  const handleClick = () => {
     Meteor.call("users.login", "admin", "admin123", (error, result) => {
      if (error) {
        alert("Login failed:" + error);
      } else {
        alert("Login successful, user ID:" + result.username);
        setUserId(result.username);
      }
    });
  };

  const handleLogout =  () => {
    Meteor.call("users.logout", (error, result) => {
      if (error) {
        alert("Falha no logout")
      } else {
        alert("Logout com sucesso")
        setUserId(null);
      }
    });
  }
  
  return(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Box sx={{p: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: 2}}>
      <Button variant="outlined" color="secondary" onClick={handleClick}>
        Testando estilos
      </Button>
      <Chip label="Teste de Chip" color="primary" onClick={handleLogout}/>
      <Typography variant="h2">{userId}</Typography>
    </Box>
  </ThemeProvider>);
};
