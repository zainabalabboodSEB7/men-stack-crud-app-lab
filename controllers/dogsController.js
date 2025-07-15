const express = require('express')
const router = express.Router()
const Dogs = require('../models/dogs')
// everything in this file has /businesses front

// INDEX OF ALL BUSINESSES
router.get('/', async (req, res) => {
    const allDogs = await Dogs.find()
    console.log('allDogs: ', allDogs)
    res.render('doges/index.ejs', { allDogs: allDogs })
})

// RENDER NEW BUSINESS FORM
router.get('/new', (req, res) => {
    res.render('doges/new.ejs')
})

// POST FORM DATA TO DATABASE
router.post('/', async (req, res) => {
    if (req.body.isVaccinated === 'on') {
        req.body.isVaccinated = true
    } else {
        req.body.isVaccinated = false
    }
    console.log(req.body)
    await Dogs.create(req.body)
    res.redirect('/doges/')
})

// SHOW ONE dogs
router.get('/:dogsId', async (req, res) => {
    const foundDogs = await Dogs.findById(req.params.dogsId)
    res.render('doges/show.ejs', { foundDogs: foundDogs })
})

router.delete('/:dogsId', async (req, res) => {
    await Dogs.findByIdAndDelete(req.params.dogsId)
    res.redirect('/doges')
})

// GET /doges/:id/edit
router.get('/:dogsId/edit', async (req, res) => {
	const foundDogs = await Dogs.findById(req.params.dogsId);
	res.render('doges/edit.ejs', { dogs: foundDogs });
});

// PUT /doges/:id
router.put('/:dogsId', async (req, res) => {
	if (req.body.isVaccinated === 'on') {
		req.body.isVaccinated = true
	} else {
		req.body.isVaccinated = false
	}
	await Dogs.findByIdAndUpdate(req.params.dogsId, req.body)
	res.redirect(`/doges/${req.params.dogsId}`)
})

module.exports = router