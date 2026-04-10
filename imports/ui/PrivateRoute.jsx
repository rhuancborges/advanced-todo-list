import React from 'react';
import { Navigate } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

export const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useTracker(() => ({
    user: Meteor.user(),
    isLoading: Meteor.loggingIn(), // Verifica se o Meteor ainda está processando o login
  }));

  if (isLoading) return <div>Carregando...</div>;

  // Se não houver usuário, manda para a rota de login
  return user ? children : <Navigate to="/" />;
};