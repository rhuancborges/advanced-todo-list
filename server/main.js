import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import "../imports/api/authMethods.js";
import "../imports/api/authPublications.js";
import "../imports/api/authCollection.js"
import "../imports/api/taskMethods.js";
import "../imports/api/tasksPublication.js";
import {TasksCollection} from "../imports/api/TasksCollection.js";

/* Permite que as mensagens de erro sejam mais específicas
- loginWithPassword() pode voltar "User not found" ou "Incorrect password" ao invés de
"Something went wrong. Please check your credentials"*/
Accounts.config({
    ambiguousErrorMessages: false
});

Accounts.onCreateUser((options, user) => {
    const extra = options.extra || {};

    return {
      ...user,
      nome: extra.nome,
      dataNascimento: extra.dataNascimento ? new Date(extra.dataNascimento) : null,
      sexo: extra.sexo,
      empresa: extra.empresa || '',
      foto: extra.foto || '',
    }
});

async function assetImagemParaDataUrl(assetPath, mimeType = 'image/png') {
  const binario = await Assets.getBinaryAsync(assetPath);
  const base64 = Buffer.from(binario).toString('base64');
  return `data:${mimeType};base64,${base64}`;
}

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
  }
);


Meteor.startup(async () => {
   if (await Meteor.users.findOneAsync() === undefined) {
    const defaultUser = {
    username: "admin",
    password: "admin123"
  };

  Accounts.createUser({
    ...defaultUser,
    email: "rhucambor@gmail.com",
    extra: {
      nome: "Rhuan",
      dataNascimento: new Date("2003-09-29T00:00:00"),
      sexo: "Masculino",
      empresa: "Synergia",
      foto: await assetImagemParaDataUrl("img/profile_Admin.jpg", "image/jpg")
    }
  });
  
  
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
