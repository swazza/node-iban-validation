import request from 'supertest'
import { app } from './app'

describe('POST /iban/validate', () => {
  describe('when a valid request body is provided', () => {
    describe('and the iban is a valid iban', () => {
      it('returns a 200 with is_valid set to true and an empty error', async () => {
        const payload = { "iban": "AL35202111090000000001234567" }
        const res = await request(app)
          .post('/iban/validate')
          .set('Content-Type', 'application/json')
          .send(payload)          

        expect(res.status).toEqual(200)
        const { is_valid, error } = res.body
        expect(is_valid).toBe(true)
        expect(error).toBe('')
      })
    })

    describe('and the iban is an invalid iban', () => {
      it('returns a 200 with is_valid set to false and an error message', async () => {
        const payload = { "iban": "AL35202090000000001234567" } // invalid iban
        const res = await request(app)
          .post('/iban/validate')
          .set('Content-Type', 'application/json')
          .send(payload)          

        expect(res.status).toEqual(200)
        const { is_valid, error } = res.body
        expect(is_valid).toBe(false)
        expect(error).not.toBe('')
      })
    })
  })

  describe('when an invalid request body is provided', () => {
    describe('when iban is present in the request body but an empty value is provided', () => {
      it('returns a 422 response code', async () => {
        const payload = { "iban": "" }
        const res = await request(app)
            .post('/iban/validate')
            .set('Content-Type', 'application/json')
            .send(payload)          

        expect(res.status).toEqual(422)
      })     
    })

    describe('when iban is not present in the request body', () => {
      it('returns a 400 response code', async () => {
        const payload = {}
        const res = await request(app)
            .post('/iban/validate')
            .set('Content-Type', 'application/json')
            .send(payload)          

        expect(res.status).toEqual(400)
      })
    })
  })
})