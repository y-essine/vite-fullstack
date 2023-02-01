const { Router } = require('express');
const TodoListItem = require('../../models/TodoListItem');

const router = Router();


router.get('/all', async (req, res) => {
    reqLimit = req.query.limit;
    const limit = reqLimit && parseInt(reqLimit) <= 40 ? parseInt(req.query.limit) : 10;
    try {
        const todoListItems = await TodoListItem.find({}).sort({ 'date': -1 }).limit(limit);
        if (!todoListItems) throw new Error('No items');
        res.status(200).json(todoListItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

})

router.post('/', async (req, res) => {
    const newTodoListItem = new TodoListItem(req.body)

    try {
        const todoListItem = await newTodoListItem.save();
        if (!todoListItem) throw new Error('Something went wrong saving todolist');
        res.status(200).json(todoListItem);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await TodoListItem.findByIdAndUpdate(id, req.body);
        if (!response) throw Error('Something went wrong ');
        const updated = { ...response._doc, ...req.body };
        res.status(200).json(updated)


    } catch (error) {
        res.status(500).json({ message: error.message })

    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const removed = await TodoListItem.findByIdAndDelete(id);
        if (!removed) throw Error('Something went wrong in delete');
        res.status(200).json(removed)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router;