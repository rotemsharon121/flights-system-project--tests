const { knex } = require('../connections/knexConnection')

const getAllFlights = () => {
    const flights = knex.select('*').from('flights')
    return flights
}

const getFlightById = (id) => {
    const flight = knex.select('*').from('flights').where('id', id)
    return flight
}

const addFlight = (flight) => {
    const newflight = knex('flights').insert(flight)
    return newflight
}

const updateFlight = (id, flight) => {
    const updatedflight = knex(`flights`).where('id', "=", id).update(flight)
    return updatedflight
}

const removeFlight = (id) => {
    return knex(`flights`).where('id', id).del()
}

module.exports = {
    getAllFlights,
    getFlightById,
    addFlight,
    updateFlight,
    removeFlight
}