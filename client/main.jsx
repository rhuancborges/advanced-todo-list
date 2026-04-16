import { createRoot } from "react-dom/client";
import { Meteor } from "meteor/meteor";
import { App } from "/imports/ui/App";
import { BrowserRouter, Routes, Route} from "react-router-dom";
//import "./main.css";
import { PrivateRoute } from "../imports/ui/PrivateRoute";
import {DrawerLayout} from "../imports/ui/DrawerLayout";
import { Dashboard } from "../imports/ui/Dashboard";
import { LoginForm } from "../imports/ui/LoginForm";
import {View} from "../imports/ui/View"
import { CadastroForm } from "../imports/ui/CadastroForm";
import { TaskAdd } from "../imports/ui/TaskAdd";
import {TaskDetail} from "../imports/ui/TaskDetail"

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
        <Route index element={<LoginForm/>} />
        <Route path="/login" element={<LoginForm/>} >
          <Route path="forgot" />
        </Route>
        <Route path="cadastro" element={<CadastroForm/>} />
      </Route>
      <Route path="home" element={
          <PrivateRoute>
            <DrawerLayout/>
          </PrivateRoute>}>
        <Route index element={<PrivateRoute><Dashboard/></PrivateRoute>
      }/>
        <Route path="view" element={<PrivateRoute><View/></PrivateRoute>}>
          <Route path="edit"/>
          <Route path="task-detail" element={<PrivateRoute><TaskDetail/></PrivateRoute>}/>
          <Route path="remove"/>
          <Route path="add" element={<PrivateRoute><TaskAdd/></PrivateRoute>}/>
        </Route>
        <Route path="profile">
          <Route path="edit"/>
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);
});
