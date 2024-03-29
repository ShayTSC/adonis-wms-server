'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const User = use('App/Models/User')
const { validate } = use('Validator')
/**
 * Resourceful controller for interacting with users
 */
class UserController {
  /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const page = request.input('page')
    const perPage = 15
    const users = await User
      .query()
      .where('isdel', false)
      .paginate(page, perPage)

    return view.render('user.index', {...users.toJSON()})
  }

  /**
   * Render a form to be used for creating a new user.
   * GET users/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {

    return view.render('user.create')
  }

  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
   async store({ request, response ,session }) {
      const rules = {
         username: 'required|min:2|max:20',
         password: 'required|min:8|max:20',
         email: 'required|email|unique:users',
         gender: 'required|integer',
         birth: 'required|date'
      }

      const validation = await validate(request.all(), rules)

      if (validation.fails()){
         session
            .withErrors(validation.messages())
            .flashAll()
         return response.redirect('back')
      }
      const newUser = request.only(
         [
            'username',
            'email',
            'birth',
            'gender',
            'password',
            'warehouse_id'
         ])
      console.log(newUser)
      const user = await User.create(newUser)

      return response.redirect('/')
   }

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
   
   const user = await User.find(params.id)
   console.log(user)
     return user
  }

  /**
   * Render a form to update an existing user.
   * GET users/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
    
  }

  async profile({ request, view }) {
    const id = request.input('id')
    const user = await User.findOrFail(id)
    const warehouse = await user.warehouse().select('alias').fetch()
    const warehouse_alias = warehouse.alias
    console.log(warehouse_alias)
    return view.render('user.profile', {id, user, warehouse_alias})
  }

  async update_level({request, view}){
    const id = request.input('id')
    const user = await User.findOrFail(id)
    const page = request.input('page')  
    return view.render('user.level', {user, page})
  }

  async level({request, response}){
    const page = request.input('page')
    const id = request.input('id')
    const level = request.input('level')
    const update = {"level":level}
    const users = await User.findOrFail(id)
    users.merge(update)
    users.save()
    return response.redirect('/users?page='+page)
  }
  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ session, request, response }) {
    const id = request.input('id')
    const password = request.input('password')
    const rules = {
      password: 'required|min:8|max:20',
   }

   const validation = await validate(request.all(), rules)

   if (validation.fails()){
      session
         .withErrors(validation.messages())
         .flashAll()
      return response.redirect('back')
   }
    const user = await User.findOrFail(id)
    user.merge({"password":password})
    user.save()
    return response.redirect('/')
  }

  async change_password({request, session, view}){
    const id = request.input('id')
    const user = await User.findOrFail(id)
    return view.render('user.change_password', {user})
  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const id = request.input('id')
    const page = request.input('page')
    const user = await User.findOrFail(id)
    user.merge({'isdel': true})
    user.save()
    return response.redirect('/users?page=' + page)
  }
}

module.exports = UserController
