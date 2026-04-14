import {Meteor} from "meteor/meteor";
import {TaskCollection} from "./TasksCollection"

Meteor.methods({
    "task.create"(doc){
        return TaskCollection.insertAsync({...doc, usuarioCriador: this.user._id});
    },
    "task.update"(_id, doc){
        return TaskCollection.updateAsync(_id, {$set: {...doc}});
    },
    "task.remove"(_id){
        return TaskCollection.removeAsync(_id);
    }
})