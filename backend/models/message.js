const mongoose = require("mongoose");
const validator = require("validator");

const messageSchema = mongoose.Schema({
    name: { type: String, required: true, minLength: 2, maxLength: 150 },
    email: { type: String, required: true, 
        validate: {
            validator: function(v) {
                return validator.isEmail(v);
            },
            message: "Not a valid email"
        } 
    },
    subject: { type: String, required: true, minLength: 2, maxLength: 150 },
    message: { type: String, required: true, minLength: 10, maxLength: 500 },
    date: { type: Date, required: true, default: Date.now() }
});

module.exports = mongoose.model("Message", messageSchema);