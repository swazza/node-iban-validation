import express from 'express'
import body_parser from 'body-parser'
import { validate_iban } from './iban-validation'

export const app = express() // initialise express app
app.use(body_parser.json()) // register body parser middleware

app.post('/iban/validate', function(req, res) {
  const { iban } = req.body
  if(iban === undefined) {
    // request payload is not well formed. return bad request
    res.status(400).send('Expected iban to be provided in the request body.')
    return
  }

  if(iban === '') {
    // request payload is correctly structured but no value provided. return unprocessable entity.
    res.status(422).send('Expected iban to be provided with a non-empty value in the request body.')
    return
  }

  let is_valid = false
  let error = ''
  try {
    is_valid = validate_iban(iban)
  } catch(err) {
    error = err.message
  }

  res.status(200).send({
    is_valid,
    error
  })
})