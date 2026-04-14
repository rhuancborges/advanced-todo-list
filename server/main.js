import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import "../imports/api/authMethods.js";
import "../imports/api/authPublications.js";
import "../imports/api/taskMethods.js"
import "../imports/api/tasksPublication.js"

/* Permite que as mensagens de erro sejam mais específicas
- loginWithPassword() pode voltar "User not found" ou "Incorrect password" ao invés de
"Something went wrong. Please check your credentials"*/
Accounts.config({
    ambiguousErrorMessages: false
});

Meteor.startup(async () => {
   if (await Meteor.users.findOneAsync() === undefined) {
    const defaultUser = {
    username: "admin",
    password: "admin123"
  };

  Accounts.createUser(defaultUser);
 

}});
