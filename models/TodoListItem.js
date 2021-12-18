const { Schema, model } = require('mongoose');

const TodoListItemSchema = new Schema({
    description : {
        type: String,
        required: true,

    },
    date: {
        type: Date,
        default: Date.now,
    }
})

const TodoListItem = model('todoListItem', TodoListItemSchema);

module.exports = TodoListItem;