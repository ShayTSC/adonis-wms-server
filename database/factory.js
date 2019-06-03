'use strict'
const fakerjs = require('faker')
/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */

const Factory = use('Factory')
const Hash = use('Hash')

const User = use('App/Models/User')
const Cargo = use('App/Models/Cargo')
const Finance = use('App/Models/Finance')
const Merchant = use('App/Models/Merchant')
const Order = use('App/Models/Order')
const Rfid = use('App/Models/Rfid')
const Shelf = use('App/Models/Shelf')
const Ship = use('App/Models/Ship')
const Token = use('App/Models/Token')
const Warehouse = use('App/Models/Warehouse')

Factory.blueprint('App/Models/User', async (faker) => {
  return {
    username: faker.username(),
    password: await Hash.make(faker.password()),
    email: faker.email(),
    birth: faker.date(),
    gender: faker.bool(),
    isdel: faker.bool(),
    last_login: faker.date(),
    level: faker.integer({min:1,max:3}),
  }
})

Factory.blueprint('App/Models/Rfid', async (faker) => {
  return {
    tagid: faker.string({pool:'1234567890ABCDEF', length:8}),
    status: faker.integer({min:0, max:1})
  }
})

Factory.blueprint('App/Models/Merchant', async (faker) => {
  return {
    name: fakerjs.commerce.productName(),
    attr: faker.integer({min:0, max:2}),
    fragile: faker.bool(),
    size: fakerjs.commerce.productMaterial(),
    barcode: faker.string({pool:"1234567890", length:13}),
    price: fakerjs.commerce.price(),
    cost: faker.commerce.price()*0.85,
    amount: faker.integer({min:1, max:64}),
    arrived: 4,
    checked: 0,
    departured: 0
  }
})

Factory.blueprint('App/Models/Warehouse', async (faker) => {
  return {
    alias: faker.word(),
    balance: faker.integer()
  }
})
Factory.blueprint('App/Models/Shelf', async (faker) => {
  return {
    size: faker.integer({min:0, max:2}),
    alias: faker.string({
      pool:"ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      length:6
    }),
    capacity: faker.integer({min:1, max:4})*10,
    existing: Math.round(capacity * faker.floating({min:0, max:1})),
    type: faker.integer({min: 0, max: 1}),
    
  }
})
Factory.blueprint('App/Models/Rfid', async (faker) => {
  return {
    
  }
})
Factory.blueprint('App/Models/Rfid', async (faker) => {
  return {
    
  }
})
Factory.blueprint('App/Models/Rfid', async (faker) => {
  return {
    
  }
})
Factory.blueprint('App/Models/Rfid', async (faker) => {
  return {
    
  }
})
// async function makebrew() {
//   try {
//     await Factory
//       .model(User)
//       .createMany(5)
//     await Factory
//       .model(Token)
//       .createMany(5)
//     await Factory
//       .model(Rfid)
//       .createMany(5)
//     await Factory
//       .model(Merchant)
//       .createMany(5)
//     await Factory
//       .model(Warehouse)
//       .createMany(5)
//     await Factory
//       .model(Shelf)
//       .createMany(5)
//     await Factory
//       .model(Order)
//       .createMany(5)
//     await Factory
//       .model(Ship)
//       .createMany(5)
//     await Factory
//       .model(Cargo)
//       .createMany(5)
//     await Factory
//       .model(Finance)
//       .createMany(5)
//   } catch (error) {
//     console.log(error)
//   }
// }

// makebrew()
