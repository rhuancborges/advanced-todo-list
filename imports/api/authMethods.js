import { Meteor} from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import bcrypt from "bcrypt";

Meteor.methods({
    "users.create"(username, password) {
        if (!username || !password) {
            throw new Meteor.Error("Invalid input", "Username and password are required");
        }
        
        if (password.length < 6) {
            throw new Meteor.Error("Invalid input", "Password must be at least 6 characters long");
        }
        Accounts.createUser({ username, password });
    },
    "users.find"(username) {
        return Accounts.findUserByUsername(username);
    },
    "users.update"(doc){
        return Meteor.users.updateAsync(this.userId, {$set: {...doc}});
    }

});