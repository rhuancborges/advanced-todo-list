import {Meteor} from "meteor/meteor";

Meteor.publish("currentUser", function () {
    return Meteor.users.find({ _id: this.userId }, { fields: { email: 1 } });
});