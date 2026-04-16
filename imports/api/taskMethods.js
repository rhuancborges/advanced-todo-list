import {Meteor} from "meteor/meteor";
import {TasksCollection, TasksSchema} from "./TasksCollection"

Meteor.methods({
    async "task.create"(doc){
        const user = await Meteor.users.findOneAsync({_id: this.userId}, {fields: {username: 1}});
        TasksSchema.validate({...doc, usuarioCriador: user.username});
        return TasksCollection.insertAsync({...doc, usuarioCriador: user.username});
    },
    "task.update"(_id, doc){
        const task = TasksCollection.findOneAsync(_id);
        const user = Meteor.userAsync();
        if(task.usuarioCriador !== user.username){
            throw new Meteor.Error("Você não pode editar essa tarefa");
        }
        return TasksCollection.updateAsync(_id, {$set: {...doc}});
    },
    "task.remove"(_id){
        return TasksCollection.removeAsync(_id);
    }
})