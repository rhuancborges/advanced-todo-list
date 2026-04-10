import {CssBaseline, ThemeProvider} from "@mui/material";
import {Box, Typography, Button, Chip, Alert} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import {React, useState} from "react";
import {useTracker} from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";

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
  "spacing": 9
});

export const App = () => {
  const user = useTracker(() => Meteor.user()); // Para vigiar mudanças de usuário no banco de dados

  // Use states para as mensagens de erro
  const [errorMessage, setErrorMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  const handleClick = () => {
    setErrorMessage(null);
    setIsError(false);
    Meteor.loginWithPassword("admin", "admin123", (error) =>{
      if (error){
        setErrorMessage(error.reason);
        setIsError(true);
      }
    });
  };

  const handleLogout =  () => {
    Meteor.logout();
  }
  
  return(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Box sx={{p: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: 2}}>s
      {/*Se há um erro (controlado pelo use state isError) mostra um componente Alert 
      com a mensagem do erro (controlada pelo use state errorMessage) */}
      {isError ? (
        <Alert severity="error" onClose={() => setErrorMessage(null)} sx={{width: "100%", maxWidth: 400}}>
          {errorMessage}
        </Alert>
      ): <div></div>}
      <Button variant="outlined" color="secondary" onClick={handleClick}>
        Testando estilos
      </Button>
      <Chip label="Teste de Chip" color="primary" onClick={handleLogout}/>
      <Typography variant="h2">{user ? user.username : "Não há usuário logado"}</Typography>
    </Box>
  </ThemeProvider>);
};
