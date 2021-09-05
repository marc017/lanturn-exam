# student-management-backend-boilerplate
## Set up local environtment

### Install dependencies
Run command on console to install dependencies
`npm install`

### Configure environment
Modify __.env.sample__ to your local setup and rename to __.env__ after finishing

### Create database using sequlize migration
Run command on console to create database.
`npx sequelize-cli db:migrate`
*Note: make sure that you properly configured the environment to make this work*

### Creating Test Data
You must create an entry on the tutors table to start doing actions

## Running Server
With the previous steps done you should be able to run your server now using:
`npm run dev`

