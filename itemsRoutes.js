const express = require('express')
const ExpressError = require('./expressError')
const router = express.Router()
const items = require('./fakeDb')

router.get('/', (req, res) => {
    res.json({items})
})

router.post('/', (req, res) => {
    if (!req.body.name) throw new ExpressError ('Name is required', 400)
    items.push(req.body)
    res.json({ "added":req.body })
})

router.get('/:name', (req, res) => {

    const item = items.find(i => i.name === req.params.name)
    if (!item) throw new ExpressError (`${req.params.name} not found in the database`, 400)
    res.json({ item })
})

router.patch('/:name', (req, res) => {
    const item = items.find(i => i.name === req.params.name)
    if (!item) throw new ExpressError (`${req.params.name} not found in the database`, 400)
    item.name = req.body.name
    res.json({ item })
})

router.delete('/:name', (req, res) => {
    const item = items.find(i => i.name === req.params.name)
    if (!item) throw new ExpressError (`${req.params.name} not found in the database`, 400)
    
    const idx = items.findIndex(i => i.name === req.params.name)
    items.splice(idx, 1)
    res.json({ msg: "Deleted" })
})


module.exports = router;