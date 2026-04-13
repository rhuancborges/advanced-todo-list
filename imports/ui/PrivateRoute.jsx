import React from 'react';
import { useNavigate } from 'react-router';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

export const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useTracker(() => ({
    user: Meteor.user(),
    isLoading: Meteor.loggingIn(), // Verifica se o Meteor ainda está processando o login
  }));

  if (isLoading) return <div>Carregando...</div>;
  let navigate = useNavigate();
  // Se não houver usuário, manda para a rota de login
  return user ? children : navigate("/");
};