# Code Challenge Project

#### Backend
![badge-branches.svg](packages%2Fbackend%2Fbadges%2Fbadge-branches.svg)
![badge-functions.svg](packages%2Fbackend%2Fbadges%2Fbadge-functions.svg)
![badge-lines.svg](packages%2Fbackend%2Fbadges%2Fbadge-lines.svg)
![badge-statements.svg](packages%2Fbackend%2Fbadges%2Fbadge-statements.svg)

#### Frontend
![badge-branches.svg](packages%2Ffrontend%2Fbadges%2Fbadge-branches.svg)
![badge-functions.svg](packages%2Ffrontend%2Fbadges%2Fbadge-functions.svg)
![badge-lines.svg](packages%2Ffrontend%2Fbadges%2Fbadge-lines.svg)
![badge-statements.svg](packages%2Ffrontend%2Fbadges%2Fbadge-statements.svg)

## Requirements

The following are required to get up and running with this project:

* Node 18
* Docker
* Yarn 4.x

## Setup
### 1. Install dependencies.
   
   From the root directory, run:
   ```
   yarn install
   ```

### 2. Set up the MySQL Docker container.
   
   From the root directory, run:
   ```
   yarn start:docker
   ```
   
   This will pull the MySQL docker dependency and get the container set up for use.

   Run the following command to view recent logs:
   ```
   docker logs sw-code-challenge-mysql
   ```

   When you see this message at the end, you are ready to rock:
   ```
   [System] [MY-010931] [Server] /usr/sbin/mysqld: ready for connections. Version: '8.2.0'  socket: '/var/run/mysqld/mysqld.sock'  port: 3306  MySQL Community Server - GPL.
   ```

   If you don't see it right away, check again after a few seconds.

### 3. Start the project.

   From the root directory, run:
   ```
   yarn start
   ```

### 4. Teardown

   From the root directory, run:
   ```
   yarn stop:docker
   ```
 
   This will shut down the docker image so it doesn't continue to run in the background.
   Remember to remove the volume when you are through testing!

## What We're Working With

* **Lerna**: this allows us to run the backend and frontend together with one quick command.
* **Express**: this node backend lets us get started quickly and easily
* **Sequelize**: this ORM is simple to configure and run
* **Umzug**: this migrations runner plugs into many different ORMs to keep our data up to date
* **React**: we've used [Create React App](https://create-react-app.dev/) to spin up a quick 
             React project and created simple components to show our input and output
* **MaterialUI**: this component library contains a plethora of useful items for getting a UI
                  created quickly and looking decent out of the box
* **Jest**: what good is a code base without some testing?