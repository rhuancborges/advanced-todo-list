import {Meteor} from 'meteor/meteor';
import {TasksCollection} from './TasksCollection';

Meteor.publish('tasks', function (){
    if (!this.user._id) {
        return this.ready();
    }
    return TasksCollection.find({$or: 
        [{tarefaPessoal: false},{tarefaPessoal: true, usuarioCriador: this.user._id}]});
});