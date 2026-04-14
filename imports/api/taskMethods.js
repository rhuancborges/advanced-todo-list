import {Meteor} from "meteor/meteor";
import {TasksCollection, TasksSchema} from "./TasksCollection"

Meteor.methods({
    "task.create"(doc){
        TasksSchema.validate(doc);
        return TasksCollection.insertAsync({...doc, usuarioCriador: this.user._id});
    },
    "task.update"(_id, doc){
        return TasksCollection.updateAsync(_id, {$set: {...doc}});
    },
    "task.remove"(_id){
        return TasksCollection.removeAsync(_id);
    }
})