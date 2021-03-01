# ![RealWorld Example App](logo.png)

> ### [Vue3](https://v3.vuejs.org/) codebase containing real world examples (CRUD, auth, advanced patterns, etc) that adheres to the [RealWorld](https://github.com/gothinkster/realworld) spec and API.

This codebase was created to demonstrate a fully fledged fullstack application built with **Vue3** including CRUD operations, authentication, routing, pagination, and more.

For more information on how to this works with other frontends/backends, head over to the [RealWorld](https://github.com/gothinkster/realworld) repo.

# Getting started

## Dependencies

* Node.js v14
* [Cypress](https://www.cypress.io/)

## Installation

```shell script
yarn install

# Run unit tests
yarn test:unit

# Run E2E tests
yarn cypress open # with GUI
yarn test:e2e # headless

# Development server
yarn dev

# Build dist
yarn build
```

# Assignment

_Try to limit the time spent on the assignment to four hours._

1. Run the app locally and make sure end-to-end tests are passing.
2. Research how the app works.
3. Review the existing integration tests.
4. Prepare a test plan and add it to the source code as `TEST_PLAN.md`.
5. Automate as many cases from your plan as you can.

## Bonus points

1. Automate the entire test plan.
2. Refactor the existing tests and write a well-organized test rig.
