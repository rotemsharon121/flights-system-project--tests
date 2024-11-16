const express = require('express')
const router = express.Router()
const { getAllFlightsController,
    getFlightByIdController,
    addFlightController,
    updateFlightController,
    removeFlightController } = require('../controllers/flightsControllers')

router.use(express.json())

router.get('/', async (req, res) => getAllFlightsController(req, res))

router.get('/:id', async (req, res) => getFlightByIdController(req, res))
    .post('/:id', async (req, res) => addFlightController(req, res))
    .patch('/:id', async (req, res) => updateFlightController(req, res))
    .delete('/:id', async (req, res) => removeFlightController(req, res))

module.exports = router