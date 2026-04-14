import {Meteor} from "meteor/meteor";
import {TasksCollection, TasksSchema} from "./TasksCollection"

Meteor.methods({
    "task.create"(doc){
        TasksSchema.validate(doc);
        const user = Meteor.users.find({_id: this.userId})
        return TasksCollection.insertAsync({...doc, usuarioCriador: user.username});
    },
    "task.update"(_id, doc){
        return TasksCollection.updateAsync(_id, {$set: {...doc}});
    },
    "task.remove"(_id){
        return TasksCollection.removeAsync(_id);
    }
})