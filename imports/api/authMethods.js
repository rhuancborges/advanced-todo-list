import { Meteor} from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import bcrypt from "bcrypt";

Meteor.methods({
    "users.create"(username, email, password) {

        if (!username || !password) {
            throw new Meteor.Error("Invalid input", "Username and password are required");
        }
        
        if (password.length < 6) {
            throw new Meteor.Error("Invalid input", "Password must be at least 6 characters long");
        }

        if (Accounts.findUserByUsername(username)) {
            throw new Meteor.Error("User already exists");
        }
        
        const userId = Accounts.createUser({
            username,
            email,
            password,
            extra: {
                dataNascimento: new Date()
            }
        });
        return userId;
    },
    "users.find"(username) {
        return Accounts.findUserByUsername(username);
    },
    "users.update"(doc){
        return Meteor.users.updateAsync(this.userId, {$set: {...doc}});
    }

});