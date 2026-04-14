import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import "../imports/api/authMethods.js";
import "../imports/api/authPublications.js";
import "../imports/api/taskMethods.js";
import "../imports/api/tasksPublication.js";
import {TasksCollection} from "../imports/api/TasksCollection.js";

/* Permite que as mensagens de erro sejam mais específicas
- loginWithPassword() pode voltar "User not found" ou "Incorrect password" ao invés de
"Something went wrong. Please check your credentials"*/
Accounts.config({
    ambiguousErrorMessages: false
});

const insertTask = (nome, username) => 
  TasksCollection.insertAsync({
    nome: nome,
    descricao: "tarefa teste",
    situacao: "Cadastrada",
    data: new Date(),
    usuarioCriador: username,
    createdAt: new Date(),
    updatedAt: new Date(),
    tarefaPessoal: false
  });


Meteor.startup(async () => {
   if (await Meteor.users.findOneAsync() === undefined) {
    const defaultUser = {
    username: "admin",
    password: "admin123"
  };

  Accounts.createUser(defaultUser);
  
  if (await TasksCollection.find().countAsync() === 0) {
    [
      'Fazer tutorial Meteor',
      'Criar TO-DO app com Meteor e React',
      'Criar TO-DO app com Borderplate e Typescript',
      'Criar prototipação',
      'Documentar repositórios',
      'Criar arquivos README',
    ].forEach((nome) => insertTask(nome, defaultUser.username));
  }
}});
