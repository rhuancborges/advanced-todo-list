import {Meteor} from 'meteor/meteor';
import {TasksCollection} from './TasksCollection';

Meteor.publish('tasks', function (){
    if (!this.userId) {
        return this.ready();
    }
    return TasksCollection.find({$or: 
        [{tarefaPessoal: false},{tarefaPessoal: true, usuarioCriador: this.userId}]});
});