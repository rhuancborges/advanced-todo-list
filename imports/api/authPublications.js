import {Meteor} from "meteor/meteor";

Meteor.publish("currentUser", function () {
    return Meteor.users.find({ _id: this.userId }, { fields: { 
        username: 1,
        nome: 1,
        dataNascimento: 1,
        sexo: 1,
        empresa: 1,
        foto: 1    } });
});