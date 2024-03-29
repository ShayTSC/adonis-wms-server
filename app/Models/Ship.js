'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Ship extends Model {
  order(){
      return this.belongsTo(
          'App/Models/Order'
      )
  }

  cargo(){
    return this.hasMany(
      'App/Models/Cargo'
    )
  }
}

module.exports = Ship
