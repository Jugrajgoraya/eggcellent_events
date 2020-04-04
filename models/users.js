const bookshelf = require('../db/orm')
const Password = require('../helpers/Password')

const User = bookshelf.model('User', {
  // this object represents a instance of a User
  // any methods you provide to this object are "instance" methods

  tableName: 'users',
  // initalize is a method that gets invoked everytime a instance of this model is created
  initialize () {
    // this.on() is a function used to register event listeners.
    // Events occur at different lifecycles of a instance
    // Documentation for all bookshelf events https://bookshelfjs.org/api.html#Model-subsection-events
    // when the "saving" event gets triggered this callback will be invoked
    this.on('saving', (model, attrs, options) => {
      // attrs represents the instance's attributes
      console.log('saving event triggered')
      console.dir({
        model,
        attrs,
        options
      })
      this.validate() // a custom instance method used to validate attributes of our model

      // makes email lowercase
      attrs.email = attrs.email.toLowerCase()
      // asynchronous function to hash passwords. If you are doing anything asynchronous inside of a event handler you must return a promise
      return Password.create(attrs.password)
        .then(hash => {
          attrs.password_digest = hash
          delete attrs.password
          delete attrs.passwordConfirmation
        })
    })
  },
  validate () {
    const errors = []
    if (!this.attributes.first_name) {
      errors.push(new Error('Must provide first name'))
    }
    if (!this.attributes.last_name) {
      errors.push(new Error('Must provide last name'))
    }
    if (this.attributes.first_name.length < 5) {
      errors.push(new Error('First Name must be greater than 5 characters'))
    }
    if (this.attributes.password !== this.attributes.passwordConfirmation) {
      errors.push(new Error('Passwords do not match'))
    }
    if (errors.length) {
      throw errors
    }
    return this
  }
})

module.exports = User
