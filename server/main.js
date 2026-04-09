import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import "../imports/api/authMethods.js";
import "../imports/api/authPublications.js";

Meteor.startup(async () => {
   if (await Meteor.users.findOneAsync() === undefined) {
    const defaultUser = {
    username: "admin",
    password: "admin123"
  };

  try {
    Accounts.createUser(defaultUser);
  } catch (error) {
    console.error("Error creating default user:", error);
  }
  };

});
