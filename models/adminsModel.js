const { knex } = require('../connections/knexConnection')

const getAllAdmins = () => {
    const admins = knex.select('*').from('Adminstrators')
    return admins
}

const getAdminById = (id) => {
    const admin = knex.select('*').from('Adminstrators').where('id', id)
    return admin
}

const addAdmin = (admin) => {
    const newAdmin = knex('Adminstrators').insert(admin)
    return newAdmin
}

const updateAdmin = (id, admin) => {
    const updatedAdmin = knex(`Adminstrators`).where('id', "=", id).update(admin)
    return updatedAdmin
}

const removeAdmin = (id) => {
    return knex(`Adminstrators`).where('id', id).del()
}

module.exports = {
    getAllAdmins,
    getAdminById,
    addAdmin,
    updateAdmin,
    removeAdmin
}