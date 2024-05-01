const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Not started", "In progress", "On hold", "Closed"],
    default: "Not started",
  },
  targetDate: {
    type: Date,
    // required :true
    // default : Date.now()
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  lastUpdated: {
    type: Date,
    default: Date.now(),
  },
  // folderId :[{
  //     type : mongoose.SchemaTypes.ObjectId,
  //     ref : 'folders',
  //     unique :true
  // }]
});

// taskSchema.index({name:1},{unique :true})

taskSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

taskSchema.set("toJSON", {
  virtuals: true,
});

exports.Tasks = mongoose.model("Tasks", taskSchema);
