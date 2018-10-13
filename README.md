# hackerTasks
hackerTasks is a checklist of the tasks you need to perform when attacking a web application. The checklist is copied from https://github.com/1lastBr3ath/tasks & http://mdsec.net/wahh/tasks.html.

# Key Features
- Checklist is an instance of a website, you can have multiple websites and their own instance of checklist.
- The checklist stores checked task into a mysql database making the checklist persistent.
- The application is responsive, the app should look good in most screen sizes.
- The application supports login and registration

# Installation
  The application should be installed quite easily in linux operating systems if you already have Node.js  and npm installed. However, if you don't have Node.js and npm already installed, you can [download](https://nodejs.org/en/download/) and install it.
  
  Commands to install all the required dependencies
  ```
  git clone https://github.com/TheN008/hackerTasks.git && cd hackerTasks
  npm install
  ```
  
# Running
  After `npm install` is done, it is quite easy to get the app running. Make sure that mariadb is installed and running in your system. Just follow the steps below and get the app running:
  1. Go to the hackerTasks folder
  2. Go to the model/credentials.json and edit it to your mysql database username and password
  3. Run `node app.js` in the terminal
  4. Launch http://localhost:8009 or http://0.0.0.0:8009 in your web browser


# Screenshots
  ![screenshot1](https://user-images.githubusercontent.com/22111782/46867219-da920980-ce41-11e8-8ecc-cd336712ee97.png)
  ![screenshot2](https://user-images.githubusercontent.com/22111782/46867252-f72e4180-ce41-11e8-9a48-39af0e739d66.png)
  ![screenshot3](https://user-images.githubusercontent.com/22111782/46867262-01e8d680-ce42-11e8-8226-7b1aff1b17d0.png)

# Contributions
  You're always welcome to contribute to this app if you ever wish to. 
