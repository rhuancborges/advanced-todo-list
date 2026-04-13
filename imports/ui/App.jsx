import {CssBaseline, ThemeProvider} from "@mui/material";

import {React, useState} from "react";
import {useTracker} from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import {LoginForm}  from "./LoginForm";
import { useNavigate, Outlet, Navigate } from 'react-router';
import {theme} from "./theme.js"


export const App = () => {
  const user = useTracker(() => Meteor.user()); // Para vigiar mudanças de usuário no banco de dados
  return user ? <Navigate to="/home"/> : <Navigate to="/login"/>;
};
