const faker = require('faker') // npm install --save-dev faker
const cowsay = require('cowsay') // npm install --save-dev cowsay
const Password = require('../../helpers/Password')

exports.seed = function (knex) {
  const password = 'supersecret'
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all( // Promise.all accepts an array of Promises
        new Array(6).fill().map(() => {
          return Password.create(password) // Password.create() returns a Promise
        })
      )
    })
    .then(passwords => {
      console.log(cowsay.say({ text: 'Created 6 users' }))
      const firstPassword = passwords.shift()
      const usersArray = passwords.map((pass) => {
        return {
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          email: faker.internet.email(),
          password_digest: pass
        }
      })
      const johnSnow = {
        first_name: 'john',
        last_name: 'snow',
        email: 'jon@gov.ca',
        password_digest: firstPassword
      }
      usersArray.unshift(johnSnow)
      return knex('users').insert(usersArray)
    })
}
