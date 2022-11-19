# repair-quoter
repair-quoter is a planned replacement of the Phone Doctors 2021 repair quote implementation. 

This project will include a backend api to connect to a database and SMTP server, as well as a frontend widget to embed in an existing website or app.

Project development begain in November of 2022 and is ongoing.

## Prerequisites
---
repair-quoter requires access to an [SMTP](https://kinsta.com/blog/gmail-smtp-server/) mail host to send quote emails, as well as a [MongoDB](https://www.mongodb.com/atlas/database) database to store the repair pricelist and leads.
## Install
---
``` 
npm install repair-quoter
```
## Setup
---
### Constants

the ` api/constants.js ` file contains a simple template to configure the api for your company.

### Environment Variables

repair-quoter uses [dotenv](https://www.npmjs.com/package/dotenv) as a dev-dependency.

repair-quoter uses the following [environment variables](https://devcenter.heroku.com/articles/node-best-practices) to connect to your database and to send emails through your smtp host.


>Your Environment variables *could* look something like this:
```
MONGO_URI = "mongodb+srv://<user>:<password>@cluster0.exampleURI.mongodb.net/?retryWrites=true&w=majority"
EMAIL_HOST = "smtp.emailhost.com"
EMAIL_PORT = 587
EMAIL_USER = "user@emailhost.com"
EMAIL_PASS = "userPassword"
```
## Run
---
```
npm run server
```
## API Endpoints
---
### /requestquote
Request: <span style="color:green">**POST**</span>

sample request
```

```
sample response
```

```

### /getQuote
Request: <span style="color:green">**GET**</span>

sample response
```

```

### /updateQuote
Request: <span style="color:green">**POST**</span>

sample request
```

```
sample response
```

```

### /deleteQuote
Request: <span style="color:green">**DELETE**</span>

sample response
```
false
```
## License
---
[GNU GPLv3](./LICENSE.md)
