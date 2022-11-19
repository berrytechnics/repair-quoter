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

the `api/constants.js` file contains a simple template to configure the api for your company.

<span style="color:red">
*You should **never** place any sensitive or private information in this file, as it could be leaked to the frontend* !
</span>

&nbsp;

### Environment Variables

repair-quoter uses [dotenv](https://www.npmjs.com/package/dotenv) as a dev-dependency.

repair-quoter uses the following [environment variables](https://devcenter.heroku.com/articles/node-best-practices) to connect to your database and to send emails through your smtp host.

> Your Environment variables _could_ look something like this:

```
MONGO_URI = "mongodb+srv://<user>:<password>@cluster0.exampleURI.mongodb.net/?retryWrites=true&w=majority"
EMAIL_HOST = "smtp.emailhost.com"
EMAIL_PORT = 587
EMAIL_USER = "user@emailhost.com"
EMAIL_PASS = "userPassword"
```

## Run

```
npm run server
```

## API Endpoints

### /requestquote

Request: <span style="color:green">**POST**</span>

sample request body

```
{
    firstName:"John",
    lastName:"Doe",
    location:"Store 1",
    email:"jDoe@email.com",
    phone:"9188675309",
    make:"Apple",
    model:"iPhone X",
    issue:"Battery"
}
```

### /getQuote?id=< id >

Request: <span style="color:green">**GET**</span>

requesting `/getQuote` without an ID will return an array containing all quotes

sample request:

```
http://localhost:3000/getQuote?id=a987f7g87687d87f676fg
```

sample response:

```
{
    _id:ObjectId("a987f7g87687d87f676fg")
    firstname:"John",
    lastname:"Doe",
    location:"Store 1",
    email:"jDoe@email.com",
    phone:"9188675309",
    make:"Apple",
    model:"iPhone X",
    issue:"battery",
    price:59.99,
    respondedDate:"",
    convertedDate:"",
    convertedUser:"",
    respondedUser:"",
    date:"2022-11-19T19:20:15.906Z",
    modified:"2022-11-19T19:20:15.906Z",
    emailed:true,
    responded:false,
    converted:false,
    duplicate:false,
    hidden:false
}

```

### /updateQuote

Request: <span style="color:green">**POST**</span>

sample request body

```
{
    id:"a987f7g87687d87f676fg",
    responded:true,
    price:59.99
}
```

sample response

```
{
    _id:ObjectId("a987f7g87687d87f676fg"),
    firstName:"John",
    lastName:"Doe",
    location:"Store 1",
    email:"jDoe@email.com",
    phone:"9188675309",
    make:"Apple",
    model:"iPhone X",
    issue:"Battery",
    price:59.99,
    responded:true,
    respondedDate:'2022-11-19T19:33:03.688Z',
    respondedUser:"berrytechnics"
}
```

### /deleteQuote?id=< id >

Request: <span style="color:green">**DELETE**</span>

sample response

```
false
```

## License

[GNU GPLv3](./LICENSE.md)
