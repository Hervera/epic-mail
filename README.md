# EPIC Mail - Andela Developer Challenge

[![Build Status](https://travis-ci.org/Hervera/epic-mail.svg?branch=develop)](https://travis-ci.org/Hervera/epic-mail)  [![Coverage Status](https://coveralls.io/repos/github/Hervera/epic-mail/badge.svg)](https://coveralls.io/github/Hervera/epic-mail) [![Maintainability](https://api.codeclimate.com/v1/badges/8f441dac47faa702f4b2/maintainability)](https://codeclimate.com/github/Hervera/epic-mail/maintainability)

# Description

<p>EPIC mail is a web app that facilitates people to exchange messages over the internet. The app has authentication and functionalites where each user has to register and then login. In order have access for messaging pages. A user can be able to make CRUD operations for messaging.</p>

<p>Below, you can see all EPIC mail features listed.</p>

## Features

1. Users can sign up.
2. Users can login.
3. Users can create groups.
4. Users can send a message to individuals.
5. Users can view their inbox and read messages.
6. Users can retract sent messages.
7. Users can save an email as draft and send it later or delete it

# Setup
- You need to have `git`, `NodeJS` and `nmp` installed on your local environment.
- Clone the application with `git clone` command.
- `npm install` to install all the dependencies in local environment
- `npm update` to update the dependencies if new version available.

# Dependencies
* `NodeJs` Runtime environment that helps to run JavaScript not only in the browser even on the server.
* `Express` NodeJS framework used for making the back-end.
* `Joi` and `Morgan` API request body error validation and HTTP Request logger respectively.

# Getting Started
Starting application run the following npm scripts
* `npm start` for starting the server.

# Testing
When you need to test the application and view test coverate run:
* `npm test` for running the tests, and getting coverage summary.

# APIs

* POST `/api/v1/auth/signup` Create a user account.
* POST `/api/v1/auth/login` Login a user.

* POST `/api/v1/messages` Create or send an email.
* GET `/api/v1/messages` Fetch all received emails. 
* GET `/api/v1/messages/unread` Fetch all unread received emails. 
* GET `/api/v1/messages/read` Fetch all read received emails. 
* GET `/api/v1/messages/sent` Fetch all sent emails. 
* GET `/api/v1/messages/draft` Fetch all draft emails. 
* GET `/api/v1/messages/<message-id>` Fetch a specific email record.
* DELETE `/api/v1/messages/<message-id>` Delete a specific email record.
