<p align="center">
  <a href="#"><img src="./docs/images/banner.png" /></a>
</p>

<p align="center">
  A simple, _unopinionated_ authentication library <br/>
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

Permit makes it easy to add an authentication layer to a Node.js API. It can be used with any of the popular server frameworks (eg. Express, Koa, Hapi, Fastly) and it can be used for any type of API (eg. REST, GraphQL, etc.) due to its unopinionated design.

<br/>

### Usage

Permit exports a set of classes that define your validation layer. The most common ways to validate an API are either by using a single secret string, or by using a combined username and password string.

```js
import { BearerPermit } from 'permit'

const permit = new BearerPermit({
  basic: 'username', // Also allow a Basic Auth username as a token.
  query: 'access_token', // Also allow an `?access_token=` query parameter.
})

async function handler({ req, res }) {
  // Try to find the bearer token in the request.
  const token = permit.parse(req)

  // No credentials found!
  if (!token) {
    permit.fail(res)
    throw new Error(`Authentication required!`)
  }

  // Perform your authentication logic however you'd like...
  const user = await db.users.findByToken(token)

  // No user found, so their credentials were invalid!
  if (!user) {
    permit.fail(res)
    throw new Error(`Authentication invalid!`)
  }

  // They were authenticated, so continue with your business logic...
  ...
}
```

Since Permit isn't packaged as a framework-specific middleware, it gives you complete control over your authentication logic. No more passing confusing options down strategies, or not having access to some context of the request.

<br/>

### Why?

Before Permit, the only real choice for authentication libraries in Node.js was [Passport.js](http://www.passportjs.org/). But it has a bunch of issues that complicate your codebase...

* **It isn't focused on authenciating APIs.** Passport is primarly focused on authenticating web apps with services like Facebook, Twitter and GitHub. APIs don't need that type of authentication, so all those extra abstractions result in _lots_ of complexity for no gain.

* **It is tightly-coupled to Express.** If you use Koa, Hapi, Fastly, or some other framework you have to go to great lengths to get it to play nicely. Even if you just want to tweak the opinionated defaults you're often out of luck.

* **Other middleware are tightly-coupled to it.** Passport stores state on the `req` object, so all of your other code (and even other third-party middleware) end up tightly coupling to its implementation, which makes your codebase very brittle.

* **It results in lots of hard to debug indirection.** Because of Passport's black-box design, whenever you need to debug an issue it's causing you have to trace it's logic across many layers of indirection, which is complicated and error prone.

* **It's not very actively maintained.** Passport's focus on OAuth providers means that it covers a _huge_ amount of scope, across a lot of repositories. Which has resulted in much of the codebase becoming unmaintained.

If you've run into any of these problems before while building authentication for an API, you might like Permit. Which brings me to how Permit solves these issues...

<br/>

### Principles

1. **API first.** Permit was designed with authenticating APIs in mind, so it's able to be much, _much_ leaner, since it doesn't need to handle authenticating with Facebook, Google, etc.

2. **Framework agnostic.** Permit doesn't lock you into using any specific server framework, because it's implemented as simple utility functions that do the heavy-lifting for you.

3. **Unopinionated interface.** Due to it's simple interface, Permit makes it much easier to write your actual authentication logic, because it's exactly like writing any other route handler in your API.

<br/>

### Examples

Permit's API is very flexible, allowing it to be used for a variety of use cases depending on your server framework, ORM framework, etc. Here are a few examples of common patterns...

* [Express](./examples/express.js)
* [Koa](./examples/koa.js)
* [Generic](./examples/generic.js)

<br/>

### Documentation

Read the getting started guide to familiarize yourself with how Permit works. After that, check out the full API reference for more detailed information about structs, types and errors...

* [**Guide**](./docs/guide.md)
  * [Installing Permit](./docs/guide.md#installing-permit)
  * [Creating Permits](./docs/guide.md#creating-permits)
  * [Writing Authentication Logic](./docs/guide.md#writing-authentication-logic)
  * [Failing Authentication](./docs/guide.md#failing-authentication)
* [**Reference**](./docs/reference.md)
  * [Permit](./docs/reference.md#permit)
    * [`permit.check`](./docs/reference.md#permit-check)
    * [`permit.fail`](./docs/reference.md#permit-fail)
  * [Types](./docs/reference.md#types)
    * [`BasicPermit`](./docs/reference.md#basicpermit)
    * [`BearerPermit`](./docs/reference.md#bearerpermit)
    * [`Permit`](./docs/reference.md#permit2)

<br/>

### License

This package is [MIT-licensed](./License.md).
