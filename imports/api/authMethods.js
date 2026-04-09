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

        try {
            const user = Accounts.createUser({ username, password });
            return user;
        } catch (error) {
            throw new Meteor.Error("Failed to create user", error.message);
        }
    },

    "users.login"(username, password) {
        if (!username || !password) {
            throw new Meteor.Error("Invalid input", "Username and password are required");
        }

        try {
            const user = Accounts.findUserByUsername(username);
            if (!user) {
                throw new Meteor.Error("User not found", "No user found with the provided username");
            };

             // Valida a senha usando bcrypt
            const passwordHash = bcrypt.hashSync(password, 10);
            const isPasswordValid = bcrypt.compareSync(password, passwordHash);
            
            if (!isPasswordValid) {
                throw new Meteor.Error("Invalid credentials", "Incorrect password");
            }
           
            // Define a sessão do usuário logado
            return user;
        } catch (error) {
            throw new Meteor.Error("Failed to login", error.message);
        }
    },
    "users.logout"() {
        try {
            return {success: true, userId: null};
        } catch (error) {
            throw new Meteor.Error("Failed to logout", error.message);
        }
    }
});