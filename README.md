### Intro
A simple express+nodejs service that validates the STRUCTURE of an IBAN. The service itself listens on port 3000 locally. To run the service - 

```
yarn build:image
yarn start:image
```

Use curl (or postman or insomnia or whatever tool floats your boat) to make a request to the service - 

```
curl -X POST -H 'Content-Type: application/json' -d '{"iban":"AL35202111090000000001234567"}' localhost:3000/iban/validate
```

### List of supported countries
At the moment, this service only supports 15 countries - 
* AL - Albania
* AD - Andorra
* AT - Austria
* AZ - Azerbaijan
* BH - Bahrain
* BY - Belarus
* BE - Belgium
* BA - Bosia & Herzegovina
* BR - Brazil
* BG - Bulgaria
* CR - Costa Rica
* HR - Croatia
* CY - Cyprus
* CZ - Czech Republic
* DK - Denmark 

### Supporting additional countries
Navigate to `src/iban-validation/country-codes.ts` and add whatever country you want to support to the map. After adding it to the list of countries, do not forget to add an additional test fixture for the new country at `src/iban-validation/specs/iban-fixtures.ts`. You should be able to find sample IBANs for countries over [here](https://www.iban.com/structure)


### Tests
Use `yarn test:unit` to run unit tests after any changes have been made to the core iban validation logic

Use `yarn test:integration` to run integration tests after any changes have been made to the endpoint