const faker = require('faker')
const cowsay = require('cowsay')

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      const usersArray = new Array(5).fill().map(() => {
        return {
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          email: faker.internet.email(),
          password_digest: faker.internet.password()
        }
      })
      // our test user
      usersArray.unshift({
        first_name: 'john',
        last_name: 'snow',
        email: 'js@gov.ca',
        password_digest: 'supersecret'
      })
      console.log(cowsay.say({ text: 'Created 6 users' }))
      console.log(cowsay.say({ text: JSON.stringify(usersArray[0]) }))
      return knex('users').insert(usersArray)
    })
}
