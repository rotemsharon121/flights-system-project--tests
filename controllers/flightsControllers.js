const { getAllFlights,
    getFlightById,
    addFlight,
    updateFlight,
    removeFlight } = require('../models/flightsModel')

const getAllFlightsController = (req, res) => {
    getAllFlights()
        .then((allFlights) => {
            console.log("user get all flights")
            res.json({ messege: "show all flights", allFlights })
        })
        .catch(error => { console.log(`ERROR ${error}`); res.status(500); res.json("an error occurred, can't show all Flights") })
}

const getFlightByIdController = (req, res) => {
    const id = req.params.id
    getFlightById(id)
        .then((flight) => {
            if (!flight.length) {
                console.log(`ERROR There is no flight with this id- ${id}`);
                res.status(404)
                res.send(`There is no flight with this id- ${id}`)
            } else {
                console.log(`user get flight`, flight)
                res.json({ messege: "sucsses", flight: flight })
            }
        })
        .catch(error => { console.log(`ERROR ${error}`); res.status(500); res.json("an error occurred, can't get the flight") })
}

const addFlightController = (req, res) => {
    const id = req.params.id
    const flight = req.body
    flight.id = id
    addFlight(flight)
        .then(async (data) => {
            const newflight = await getFlightById(data[0])
            console.log(`user add flight`, newflight)
            res.json({ messege: "sucsses", newflight: newflight })
        })
        .catch(error => { console.log(`ERROR ${error}`); res.status(500); res.json("an error occurred, can't add the flight") })
}

const updateFlightController = async (req, res) => {
    try {
        const id = req.params.id
        const flight = req.body
        const changes = []
        for (const changekey in flight) {
            const changeValue = flight[changekey]
            changes.push(changekey, changeValue)
        }
        console.log('user try to update flight with id ', id)
        const flightBeforeChanges = await getFlightById(id)
        if (!flightBeforeChanges.length) {
            console.log(`ERROR There is no flight with this id- ${id}`)
            res.status(404)
            return res.json({ NotFound: "There is no flight with this id", id })
        }
        updateFlight(id, flight)
            .then(async () => {
                const flightAfterChanges = await getFlightById(id)
                console.log('user updated flight ', flightBeforeChanges, ' to ', flightAfterChanges, `changes: ${changes}`)
                res.json({ messege: "sucsses", flightBeforeChanges, flightAfterChanges, changes })
            })
            .catch((error) => {
                console.log(`ERROR ${error}`); res.status(500); res.json("an error occurred, can't update the flight")
            })
    } catch (error) {
        console.log(`ERROR ${error}`); res.status(500); res.json("an error occurred, can't update the flight")
    }
}

const removeFlightController = async (req, res) => {
    try {
        const id = req.params.id
        const flight = await getFlightById(id)
        removeFlight(id)
            .then(data => {
                if (data === 0) {
                    console.log(`user try to deleted flight with id ${id} but it not exist`)
                    res.status(404)
                    return res.json({ messege: `flight with id ${id} not exist` })
                }
                console.log(`flight with id ${id} has deleted`, flight)
                res.json({ messege: `flight with id ${id} deleted`, flight })
            })
            .catch(error => { console.log(`ERROR ${error}`); res.status(500); res.json("an error occurred, can't delete the flight") })
    } catch (error) {
        console.log(`ERROR ${error}`); res.status(500); res.json("an error occurred, can't delete the flight")
    }
}

module.exports = {
    getAllFlightsController,
    getFlightByIdController,
    addFlightController,
    updateFlightController,
    removeFlightController
}