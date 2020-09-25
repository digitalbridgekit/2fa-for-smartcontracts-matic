const { Requester, Validator } = require('@chainlink/external-adapter')

const customError = (data) => {
  if (data.Response === 'Error') return true
  return false
}

const customParams = {
  customerid: ['customerid'],
  hashedpin: ['hashedpin']
}

const createRequest = (input, callback) => {
  const validator = new Validator(callback, input, customParams)
  const jobRunID = validator.validated.id
  const url = `http://localhost:3081`
  const customerid = validator.validated.data.customerid.toLowerCase()
  const hashedpin = validator.validated.data.hashedpin

  const params = {
    customerid,
    hashedpin
  }

  const config = {
    url,
    params
  }

  if (process.env.API_KEY) {
    config.headers = {
      authorization: `Apikey ${process.env.API_KEY}`
    }
  }

  Requester.request(config, customError)
    .then(response => {
      response.data.result = response.data.result
      callback(response.status, Requester.success(jobRunID, response))
    })
    .catch(error => {
      callback(500, Requester.errored(jobRunID, error))
    })
}

module.exports.createRequest = createRequest
