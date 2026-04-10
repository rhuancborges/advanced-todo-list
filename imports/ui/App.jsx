import {CssBaseline, ThemeProvider} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import {React, useState} from "react";
import {useTracker} from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import {LoginForm}  from "./LoginForm";

// Tema global
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
  "spacing": 9,
  "components": {
    "MuiCssBaseline": {
      "styleOverrides": {
        "body":{
          "backgroundColor": "#1d1c1c",
          "backgroundImage": 'radial-gradient(circle, #243d69, #091733 100%)'
        }
      }
    }
  }
});

export const App = () => {
  const user = useTracker(() => Meteor.user()); // Para vigiar mudanças de usuário no banco de dados
  
  return(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <LoginForm user={user}/>
  </ThemeProvider>);
};
