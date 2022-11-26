# repair-quoter

repair-quoter is a planned replacement of the Phone Doctors 2021 repair quote implementation.

This project will include a backend api to connect to a database and SMTP server, as well as a frontend widget to embed in an existing website or app.

Project development begain in November of 2022 and is ongoing.

## Prerequisites

repair-quoter requires access to an [SMTP](https://kinsta.com/blog/gmail-smtp-server/) mail host to send quote emails, as well as a [MongoDB](https://www.mongodb.com/atlas/database) database to store the repair pricelist and leads.

## Install

[repair-quoter is hosted on NPMJS.org](https://www.npmjs.com/package/repair-quoter)

```
npm install repair-quoter
```
## Setup

### Constants

The `api/constants.js` file contains a simple template to configure the api for your company.

>*You should **never** place any sensitive or private information in this file!*


### Environment Variables

repair-quoter uses [dotenv](https://www.npmjs.com/package/dotenv) as a dev-dependency.

repair-quoter uses the following [environment variables](https://devcenter.heroku.com/articles/node-best-practices) to connect to your database and to send emails through your smtp host.

> Your Environment variables _could_ look something like this:

```
PORT = 3000 // this is the port for the development server
TESTEMAIL = "test@test.test" /* this is the email address test emails are sent to */
MONGO_URI = "mongodb+srv://<user>:<password>@cluster0.exampleURI.mongodb.net/?retryWrites=true&w=majority"
EMAIL_HOST = "smtp.emailhost.com"
EMAIL_PORT = 587
EMAIL_USER = "user@emailhost.com"
EMAIL_PASS = "userPassword"
```

## Usage

Test

```
npm run test
```

Start
```
npm start
```

## API Endpoints

### **/**
Request: <span style="font-size:1.5rem;color:green">**ANY**</span>

Response:
```
OK
```
### **/devices**
Request: <span style="font-size:1.5rem;color:green">**GET**</span>
```
/devices?id=< id > 
or 
/devices?page=< page number or pageless >
```
Response: 
```
{
    docs: < deviceObjectArray >,
    totalDocs: < totalDevices >,
    offset: 0,
    limit: 10,
    totalPages: < totalPages >,
    page: < currentPage >,
    pagingCounter: 1,
    hasPrevPage: < true/false >,
    hasNextPage: < true/false >,
    prevPage: < # >,
    nextPage: < # >             
  }
  or if ?page=pageless
  {
    docs:[
      {
        "_id":"63827fadb4ea5cdf313f8cf7",
          "type":"phone",
          "make":"Apple",
          "model":"iPhone X",
          "fusedDisplay":false,
          "__v":0,
        "repairs":{
          "screenGlass":0,
          "lcd":0,
          "battery":59.99,
          "chargePort":0,
          "frontCamera":0,
          "rearCamera":0,
          "earSpeaker":0,
          "loudSpeaker":0,
          "rearGlass":0,
          "liquidDamage":0
        },
        {< another device >},
        {< another device >},
        {< another device >},
        ...
      }
    ]
  }
```
Request: <span style="font-size:1.5rem;color:green">**POST**</span>
```
{
  type:'phone',
  make:'Apple',
  model:'iPhone X'
}
```
Response: 
```
{
  _id: new ObjectId("637c128d2359c98abccc6bc3"),
    type: 'phone',
    make: 'Apple',
    model: 'iPhone X',
    fusedDisplay: false,
    __v: 0
}
```
Request: <span style="font-size:1.5rem;color:green">**PUT**</span>
```
 {
  repairs: {
    screenGlass: < updates >,
    lcd: < updates >,
    battery: < updates >,
    chargePort: < updates >,
    frontCamera: < updates >,
    rearCamera: < updates >,
    earSpeaker: < updates >,
    loudSpeaker: < updates >,
    rearGlass: < updates >,
    liquidDamage: < updates >
  },
  _id: new ObjectId("637c128d2359c98abccc6bc3"),
  type: < updates >,
  make: < updates >,
  model: < updates >,
  fusedDisplay: < updates >,
  __v: 0
}
```
Response: 
```
 {
  repairs: {
    screenGlass: < updates >,
    lcd: < updates >,
    battery: < updates >,
    chargePort: < updates >,
    frontCamera: < updates >,
    rearCamera: < updates >,
    earSpeaker: < updates >,
    loudSpeaker: < updates >,
    rearGlass: < updates >,
    liquidDamage: < updates >
  },
  _id: new ObjectId("637c128d2359c98abccc6bc3"),
  type: < updates >,
  make: < updates >,
  model: < updates >,
  fusedDisplay: < updates >,
  __v: 0
}
```
Request: <span style="font-size:1.5rem;color:green">**DELETE**</span>
```
/devices?id=< id >
```
Response: 
```
 false
```

---

### **/leads**
Request: <span style="font-size:1.5rem;color:green">**GET**</span>
```
/leads?id=< id >
or
/leads?page=< page number or pageless >
```
Response: 
```
{
  docs: < leadsObjectArray >,
  totalDocs: < totalLeads >,
  offset: 0,
  limit: 10,
  totalPages: < totalPages >,
  page: < currentPage >,
  pagingCounter: 1,
  hasPrevPage: < true/false >,
  hasNextPage: < true/false >,
  prevPage: < # >,
  nextPage: < # >             
  }
```
  *or if ?page=pageless*
```
  {
    docs:[
      {
        "_id":"63827fadb4ea5cdf313f8cfb",
        "firstName":"Test",
        "lastName":"Test",
        "location":"71st",
        "email":"test@email.com",
        "phone":"0000000000",
        "make":"Apple",
        "model":"iPhone X",
        "issue":"battery",
        "price":59.99,
        "convertedUser":"",
        "respondedUser":"","date":"2022-11-26T21:05:48.231Z",
        "modified":"2022-11-26T21:05:48.231Z",
        "emailed":true,
        "responded":false,
        "converted":false,
        "hidden":false,
        "__v":0
        },
        {< another lead >},
        {< another lead >},
        {< another lead >},
        {< another lead >},
        ...
    ]
  }
```
Request: <span style="font-size:1.5rem;color:green">**POST**</span>
```
{
  firstName: 'Testy',
  lastName: 'McTesterson',
  location: 'Test',
  email: 'test@mail.com',
  phone: '918',
  make: 'Apple',
  model: 'iPhone X',
  issue: 'rearGlass'
}
```
Response: 
```
{
  firstName: 'Testy',
  lastName: 'McTesterson',
  location: 'Test',
  email: 'test@mail.com',
  phone: '918',
  make: 'Apple',
  model: 'iPhone X',
  issue: 'rearGlass',
  convertedUser: '',
  respondedUser: '',
  date: 2022-11-22T00:06:37.467Z,
  modified: 2022-11-22T00:06:37.467Z,
  emailed: true,
  responded: false,
  converted: false,
  duplicate: false,
  hidden: false,
  _id: new ObjectId("637c128f2359c98abccc6bc8"),
  __v: 0
}
```
Request: <span style="font-size:1.5rem;color:green">**PUT**</span>
```
{
  price: < updates >,
  responded: < updates >,
  converted: < updates >,
  duplicate: < updates >,
  hidden: < updates >,
  _id: new ObjectId("637c128f2359c98abccc6bc8"),
  __v: 0
}
```
Response: 
```
{
  firstName: 'Testy',
  lastName: 'McTesterson',
  location: 'Test',
  email: 'test@mail.com',
  phone: '918',
  make: 'Apple',
  model: 'iPhone X',
  issue: 'rearGlass',
  price: < updates >,
  convertedUser: '',
  respondedUser: '',
  date: 2022-11-22T00:06:37.467Z,
  modified: 2022-11-22T00:06:37.467Z,
  emailed: true,
  responded: < updates >,
  converted: < updates >,
  duplicate: < updates >,
  hidden: < updates >,
  _id: new ObjectId("637c128f2359c98abccc6bc8"),
  __v: 0
}
```
Request: <span style="font-size:1.5rem;color:green">**DELETE**</span>
```
/leads?id=< id >
```
Response: 
```
 false
```

## License

[GNU GPLv3](./LICENSE.md)

