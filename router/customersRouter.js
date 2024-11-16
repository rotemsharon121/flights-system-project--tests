const express = require('express')
const router = express.Router()
const { getAllCustomersController, getCustomerByIdController, addCustomerController, updateCustomerController, removeCustomerController } = require('../controllers/customersControllers')
const bodyParser = require('body-parser')

router.use(bodyParser.json())

router.get('/', async (req, res) => getAllCustomersController(req, res))
router.post('/', async (req, res) => addCustomerController(req, res))

router.get('/:id', async (req, res) => getCustomerByIdController(req, res))
router.put('/:id', async (req, res) => updateCustomerController(req, res))
router.delete('/:id', async (req, res) => removeCustomerController(req, res))

module.exports = router