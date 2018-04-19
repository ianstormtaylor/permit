<p align="center">
  <a href="#"><img src="./docs/images/banner.png" /></a>
</p>

<p align="center">
  A simple, powerful authentication library <br/>
  for building Node.js APIs.
</p>
<br/>
<br/>

<p align="center">
  <a href="#usage">Usage</a> •
  <a href="#why">Why?</a> •
  <a href="#principles">Principles</a> •
  <a href="#demo">Demo</a> •
  <a href="#examples">Examples</a> •
  <a href="#documentation">Documentation</a>
</p>

<p align="center">
  <a href="https://travis-ci.org/ianstormtaylor/permit">
    <img src="https://travis-ci.org/ianstormtaylor/permit.svg?branch=master">
  </a>
  <a href="https://unpkg.com/permit/umd/permit.min.js">
    <img src="http://img.badgesize.io/https://unpkg.com/permit/umd/permit.min.js?compression=gzip&amp;label=size&amp;maxAge=300">
  </a>
  <a href="./package.json">
    <img src="https://img.shields.io/npm/v/permit.svg?maxAge=300&label=version&colorB=007ec6&maxAge=300">
  </a>
  <a href="./License.md">
    <img src="https://img.shields.io/npm/l/slate.svg?maxAge=300">
  </a>
</p>

<br/>
<br/>

Permit makes it easy to add an authentication layer to a Node.js API. It can be used with any of the popular server frameworks (eg. Express, Koa, Hapi, Fastly) and it can be used for any type of API (eg. REST, GraphQL, etc.) because it is unopinionated.


<br/>

### Usage

Permit exports a set of classes that define your validation layer. The most common ways to validate an API are either by using a single secret string, or by using a combined username and password string. 

```js
import { BearerPermit } from 'permit'

const permit = new BearerPermit({
  basic: 'username', // Also allow a Basic Authorization username.
  query: 'access_token', // Also allow an `?access_token=` query parameter.
})

app.use((req, res, next) => {
  // Try to find the bearer token in the request.
  const token = permit.parse(req)

  if (!token) {
    // Add the proper failure context to the response.
    permit.fail(res)
    return next(new Error(`Authentication required!`))
  }

  // Perform your authentication logic however you'd like...
  db.users.findByToken(token, (err, user) {
    if (err) return next(err)
    if (!user) {
      // Add the proper failure context to the response.
      permit.fail(res)
      return next(new Error(`Authentication invalid!`))
    }

    // Authentication succeeded, save the context and proceed...
    req.user = user
    next()
  })
})
```

That's with Express, but it can just as easily be used in Koa for example:

```js
app.use(async (ctx, next) => {
  const token = permit.parse(req)

  if (!token) {
    permit.fail(res)
    throw new Error(`Authentication required!`))
  }

  const user = await db.users.findByToken(token)

  if (!user) {
    permit.fail(res)
    throw new Error(`Authentication invalid!`)
  }

  ctx.user = user
  await next()
})
```

Since Permit isn't packaged as a framework-specific middleware, it gives you complete control over your authentication logic. No more passing confusing options down strategies, or not having access to some context of the request.


<br/>

### Why?

Before Permit, the only real choice for authentication libraries in Node.js was [Passport.js](http://www.passportjs.org/). But it has a bunch of issues that complicate your codebase...

* **It isn't focused on authenciating APIs.** Passport.js is primarly focused on making OAuth authentication with services like Facebook, Twitter and GitHub easy. APIs don't need that type of authentication, so all those extra abstractions result in lots of complexity with no gains.

* **It is tightly-coupled to Express.** If you use Koa, Hapi, Fastly, or some other framework, the complexity is even greater because Passport.js was designed to be tightly coupled to Express.

* **Other middleware are tightly-coupled to it.** Because of how Passport.js stores state on the `req` object, all of your other code (and even third-parties) end up being tightly coupled to its implementation.

* **It results in lots of hard to debug indirection.**

* **It's not very actively maintained.** This is unfortunate, but Passport.js's architecture and goals mean that is covers a _huge_ amount of scope, across a lot of repositories. Which has ended up with too much to maintain.

If you've run into any of these problems before while building an API, you might like Permit. Which brings me to how Permit solves these issues...

<br/>

### Principles

1. **API first.**

2. **Framework agnostic.**

3. **Unopinionated interface.**


<br/>

### Examples

Permit's API is very flexible, allowing it to be used for a variety of use cases depending on your server framework, ORM framework, etc. Here are a few examples of common patterns...

* [Express](./examples/custom-types.js)
* [Koa](./examples/default-values.js)
* [Generic](./examples/basic-validation.js)


<br/>

### Documentation

Read the getting started guide to familiarize yourself with how Permit works. After that, check out the full API reference for more detailed information about structs, types and errors...

* [**Guide**](./docs/guide.md)
  * [Installing Permit](./docs/guide.md#installing-permit)
  * [Creating Structs](./docs/guide.md#creating-structs)
  * [Defining Custom Data Types](./docs/guide.md#defining-custom-data-types)
  * [Setting Default Values](./docs/guide.md#setting-default-values)
  * [Throwing Customized Errors](./docs/guide.md#throwing-customized-errors)
  * [Validating Complex Shapes](./docs/guide.md#validating-complex-shapes)
  * [Composing Structs](./docs/guide.md#composing-structs)
* [**Reference**](./docs/reference.md)
  * [Permit](./docs/reference.md#api)
  * [BasicPermit](./docs/reference.md#structs)
  * [BearerPermit](./docs/reference.md#types)


<br/>

### License

This package is [MIT-licensed](./License.md).
