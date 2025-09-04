import mongoose from "mongoose";

// schema:
// blueprint of the document
// defines field data types validation rules

// model
// compiles version of schema
// used to create/read/update/delete documents

// schema
// blueprint of a house
// model
// contractor that build the house

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);
export default User;
