import { createRoot } from "react-dom/client";
import { Meteor } from "meteor/meteor";
import { App } from "/imports/ui/App";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import "./main.css";
import { PrivateRoute } from "../imports/ui/PrivateRoute";
import {DrawerLayout} from "../imports/ui/DrawerLayout";

import { LoginForm } from "../imports/ui/LoginForm";

/* Esquema de rotas:

- [1] Tela de login 
  Se autenticado, vai para [4]
  Se clicar em "Criar conta", vai para [2]

- [2] Tela de cadastro
  Se clicar em "Já tenho conta", vai para [1]
  Se criado (e autenticado), vai para [4]

- [3] Popup de restaurar senha
  Executa suas ações e volta para [1]

- [4] Dashboard com Drawer
  Se clicar em "Visualizar tarefas", vai para [5]
  Se abrir o Drawer e clicar em "Perfil", vai para [9]
  Se abrir o Drawer e clicar em "Home", vai para [4]
    OBS: O drawer fica disponível para as telas [4]-[10]
  Se clicar em "Logout", vai para [1]

- [5] Tela de visualizar tarefas
  Se clicar no "+", vai para [6]
  Se clicar em "Editar tarefa", vai para [7]
  Se clicar em "Remover tarefa", vai para [8]

- [6] Tela de cadastrar tarefa
  Faz as ações e volta para [5]

  - [7] Popup de editar tarefa
  Faz as ações e volta para [5]

- [8] Popup de remover tarefa
  Faz as ações e volta para [5]

- [9] Ver perfil
- [10] Editar perfil

[1]
|- [3]
[2]
[0.4] Tela genérica + Drawer
|- [4]
|- [5]
    |- [7]
    |- [8]
    |- [6]
|- [9]
    |- [10]
*/

Meteor.startup(() => {
  const container = document.getElementById("react-target");
  const root = createRoot(container);
  root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App/>} >
        <Route path="login" element={<LoginForm/>} >
          <Route path="forgot" />
        </Route>
        <Route path="cadastro" />
      </Route>
      <Route path="home" element={<DrawerLayout/>}>
        <Route path="dashboard"/>
        <Route path="view">
          <Route path="edit"/>
          <Route path="remove"/>
          <Route path="add"/>
        </Route>
        <Route path="profile">
          <Route path="edit"/>
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);
});
