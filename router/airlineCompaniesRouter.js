const express = require('express')
const router = express.Router()
const { getAllAirlineCompaniesController,
    getAirlineCompaniesByIdController,
    addAirlineCompaniesController,
    updateAirlineCompaniesController,
    removeAirlineCompaniesController } = require('../controllers/airlineCompaniesControllers')

router.use(express.json())

router.get('/', async (req, res) => getAllAirlineCompaniesController(req, res))

router.get('/:id', async (req, res) => getAirlineCompaniesByIdController(req, res))
router.post('/:id', async (req, res) => addAirlineCompaniesController(req, res))
router.patch('/:id', async (req, res) => updateAirlineCompaniesController(req, res))
router.delete('/:id', async (req, res) => removeAirlineCompaniesController(req, res))

module.exports = router