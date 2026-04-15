import {Meteor} from 'meteor/meteor';
import {TasksCollection} from './TasksCollection';

Meteor.publish('tasks', async function (){
    if (!this.userId) {
        return this.ready();
    }
    const user = await Meteor.users.findOneAsync({_id: this.userId},{fields: {username: 1}})
    
    return TasksCollection.find({$or: 
        [{tarefaPessoal: false},{tarefaPessoal: true, usuarioCriador: user.username}]});
});