# hackerTasks
hackerTasks is a checklist of the tasks you need to perform when pentesting a web application. The checklist is copied from https://github.com/1lastBr3ath/tasks & http://mdsec.net/wahh/tasks.html.

# Key Features
- Checklist is an instance of a website, you can have multiple websites and their own instance of checklist.
- The checklist stores checked task into a mysql database making the checklist persistent.
- The application is responsive, the app should look good in most screen sizes.
- The application supports login and registration
- Credentials feature to store credentials for a target
- Cross platform

# Installation
  The application should be installed and running quite easily in linux operating systems if you already have Docker and docker-compose installed.
  
  Commands to install and run hackerTasks
  
  1. git clone https://github.com/serialfuzzer/hackerTasks.git && cd hackerTasks
  2. sudo docker compose up --build

After running these two commands, hackerTasks should be up and running at port 31337. Go to your browser and open http://localhost:31337 and it will open. 
  
  
# Update

Due to recent peak in insights and continuous downloads of this project, I've decided to enhance it a little bit.
In the next few days or weeks I'll be dockerising this repository and I will be improving it a bit.

This project was created many years ago when I was just learning Javascript, so adding new features is like trying to update on top of inefficiently managed code base. However, I'll try my best to push frequent updates to it and try to improve it chunk by chunk.  

# Warning

Access control in features is not implemented in this project. I only recommend to use this for personal usage, quite like a personal note-keeping app.
Don't host it in public and run it in production.

# Todo Reference (Skipped for now)
1. Patch SQL Injections

# Screenshots
  ![screenshot1](https://res.cloudinary.com/dgmqiqh19/image/upload/v1693999531/login_vgtwde.jpg)
  ![screenshot2](https://res.cloudinary.com/dgmqiqh19/image/upload/v1693999383/dashboard_kpcwmu.jpg)
  ![screenshot3](https://res.cloudinary.com/dgmqiqh19/image/upload/v1693999534/list_z2sifr.jpg)
  ![screenshot4](https://res.cloudinary.com/dgmqiqh19/image/upload/v1693999536/Credentials_view_jwhjg4.jpg)

# Contributions
  You're always welcome to contribute to this app if you ever wish to. 

