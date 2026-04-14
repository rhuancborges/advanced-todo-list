import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const TASK_STATUS = {
  CADASTRADA: 'Cadastrada',
  EM_ANDAMENTO: 'Em Andamento',
  CONCLUIDA: 'Concluída',
};

export const TasksCollection = new Mongo.Collection('tasks');

export const TasksSchema = new SimpleSchema({
  nome: {
    type: String,
    label: 'Nome',
  },

  descricao: {
    type: String,
    label: 'Descrição',
    optional: true,
  },

  situacao: {
    type: String,
    label: 'Situação',
    allowedValues: [
      TASK_STATUS.CADASTRADA,
      TASK_STATUS.EM_ANDAMENTO,
      TASK_STATUS.CONCLUIDA,
    ],
    defaultValue: TASK_STATUS.CADASTRADA,
  },

  data: {
    type: Date,
    label: 'Data',
  },

  usuarioCriador: {
    type: String,
    label: 'Usuário criador',
  },

  tarefaPessoal: {
    type: Boolean,
    label: 'Indicador de tarefa pessoal',
    defaultValue: false,
  },

  createdAt: {
    type: Date,
    label: 'Data de criação',
    optional: true,
  },

  updatedAt: {
    type: Date,
    label: 'Data de atualização',
    optional: true,
  }
});
