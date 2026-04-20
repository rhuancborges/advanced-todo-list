import {Meteor} from "meteor/meteor"
import SimpleSchema from "simpl-schema";
import 'meteor/aldeed:collection2/static';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const UserSchema = new SimpleSchema({
    username: {
        type: String
    },
    emails: {
        type: Array
    },
    "emails.$": {
        type: Object
    },
    "emails.$.address": {
        type: String,
        regEx: emailRegex
    },
    "emails.$.verified": {
        type: Boolean
    },
    createdAt: {
        type: Date,
    },

    services: {
        type: Object,
        optional: true,
        blackbox: true,
    },

    nome: {
        type: String,
        optional: true
    },
    dataNascimento: {
        type: Date,
        optional: true
    },
    sexo: {
        type: String,
        allowedValues: ["Masculino", "Feminino", "Outro", "Prefiro não dizer"],
        optional: true
    },
    empresa: {
        type: String,
        optional: true
    },
    foto: {
        type: String,
        optional: true
    }

});


Meteor.users.attachSchema(UserSchema);