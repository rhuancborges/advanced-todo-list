import {Meteor} from 'meteor/meteor';
import {TasksCollection} from './TasksCollection';

Meteor.publish('tasks', async function (mostraConcluidas){
    if (!this.userId) {
        return this.ready();
    }
    const user = await Meteor.users.findOneAsync({_id: this.userId},{fields: {username: 1}})
    const filtro = {
        $or: [
            { tarefaPessoal: false },
            { tarefaPessoal: true, usuarioCriador: user.username }
        ]
    };

    if (!mostraConcluidas) {
        filtro.situacao = { $ne: "Concluída" };
    }
    return TasksCollection.find(filtro);
});