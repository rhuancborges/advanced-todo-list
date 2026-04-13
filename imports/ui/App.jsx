import {CssBaseline, ThemeProvider} from "@mui/material";

import {React, useState} from "react";
import {useTracker} from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import {LoginForm}  from "./LoginForm";
import { Navigate } from 'react-router-dom';



export const App = () => {
  const user = useTracker(() => Meteor.user()); // Para vigiar mudanças de usuário no banco de dados
  
  return user ? <Navigate to = "/home" /> : <Navigate to="/login"/>;
};
