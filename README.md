# repair-quoter

## Description
**repair-quoter a complete cellphone and electronics repair industry leads generating widget.**

It is capable of collecting, storing, replying to, and tracking website leads via quoting for device repairs.

Project development begain in November of 2022 and is ongoing.

## Features
- Automatic email responses with templates.
- Includes frontend example to use on an existing website.
- Includes employee followup tracking with user management.
- Automatically removes users not verified via email.
- Customizable to suit your brand.
- Lightweight and can run on anything javascript can run on.

## Prerequisites

- An [SMTP](https://kinsta.com/blog/gmail-smtp-server/) mail host to send quote emails.
- A [MongoDB](https://www.mongodb.com/atlas/database) database to store the repair pricelist and leads.
- Properly configured environment variables. [*see below](#setup)

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
PORT = 4200 // this is the port for the development server
TESTEMAIL = "test@test.test" /* this is the email address test emails are sent to */
MONGO_URI = "mongodb+srv://<user>:<password>@cluster0.exampleURI.mongodb.net/?retryWrites=true&w=majority"
EMAIL_HOST = "smtp.emailhost.com"
EMAIL_PORT = 587
EMAIL_USER = "user@emailhost.com"
EMAIL_PASS = "userPassword"
JWT_SECRET = < secret string for JSON web tokens >
```

## Usage

Start API
 ```
 npm run serve:api
 ```

Start Client 
```
npm run serve:client
```

## Client
`client/widget.html` contains a simple working frontend for the api. This file MUST be served via an http server. Otherwise, you will experience a [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors) error.
repair-quoter uses [serve](https://www.npmjs.com/package/serve) to run a simple client serving the quote form.

## API Endpoints

*Any errors will be returned as `{error:< err >}`*

### **/**
Request: <span style="font-size:1.5rem;color:green">**ANY**</span>

Response:
```
OK
```
### **/login**
Request: <span style="font-size:1.5rem;color:green">**POST**</span>
```
{
  username: < username >,
  password: < password >
}
```
Response:
```
{id:< user._id >,token:< JSON web token >}
```
### **/register**
Request: <span style="font-size:1.5rem;color:green">**POST**</span>
```
{
  username: < username >,
  password: < password >,
  password2: < verified password >
}
```
Response:
```
{id:< user._id >,registered:true}
```
### **/devices**
Request: <span style="font-size:1.5rem;color:green">**GET**</span>
```
/devices?id=< id > 
or 
/devices?page=< page number or pageless > *default page:1
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
/leads?page=< page number or pageless >  * default page:1
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

