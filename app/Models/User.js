'use strict'

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class User extends Model {
  static boot () {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', 'UserHook.hashPassword')
    this.addHook('beforeSave', 'UserHook.saveGender')
    this.addHook('afterFind', 'UserHook.readGender')
    this.addHook('afterPaginate', 'UserHook.readGenders')
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens () {
    return this.hasMany('App/Models/Token')
  }

  warehouse() {
    return this.belongsTo('App/Models/Warehouse')
  }
}

module.exports = User
