const bcrypt = require('bcrypt')
const SALT_ROUNDS = 10 // 10 salt rounds is recommended by bcrypt
// if you wanted a more secure password you can increase the salt rounds BUT this increases the time it takes
// to hash a value exponentially

// salt is a random string used as a seed to help hash a value
// salt could be = "$ab8248Deif"
module.exports = class Password {
  static create (password) {
    return bcrypt.hash(password, SALT_ROUNDS)
      .then(hash => {
        return hash
      })
  }

  static compare (password, hash) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, hash, (err, same) => {
        if (err) {
          reject(err)
        }
        resolve(same)
      })
    })
  }
}

// Password.create(args)
// const pass = new Password()
// pass.create() // this throws an error. create does not exist
