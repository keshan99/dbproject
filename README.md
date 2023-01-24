
# Uni Buddy
## Project Title: Student Money Management and Task Organizer

<!-- content -->
## Table of Contents
- [Description](#description)
- [Setup](#setup)
- [Usage](#usage)
- [Screenshots](#screenshots)

## Description

University students often have problems with managing their money and prioritizing their tasks. This system aims to address those problems by providing a money management tool, a task list application, and a note-taking feature.

The primary success criteria for this system is to assist students in managing their money effectively. The money management feature includes tools for reducing expenses on less important activities, saving notes on expenses, and predicting expenses for the next month. Additionally, the system also helps students manage their income.

The task list feature allows students to add tasks with multiple sub-tasks and track the progress of completion. The note-taking feature allows students to save notes on lectures, topics, reference books, and websites. This feature will help students to organize their workload and focus on the most important activities.

This system has 3 main components: 
- Money Management
- Task List
- Note

## Setup
1. Install MySQL on your local machine, if it is not already installed.
2. Create a new database using the database_file file located in the folder. You can do this using a MySQL client such as MySQL Workbench or the command-line interface.
3. Create a new file named `.env` in the root directory of the project and copy the following code block into the file. Make sure to replace the placeholder values with the appropriate values for your local MySQL setup.
<!-- DATABASE = student-helper
DATABASE_HOST = localhost
DATABASE_USER = root
DATABASE_PORT = 3306
DATABASE_PASSWORD =
JWT_SECRET = mysupersecretpassword
JWT_EXPIRES_IN = 90d
JWT_COOKIE_EXPIRES = 90 -->
```
DATABASE = student-helper
DATABASE_HOST = localhost
DATABASE_USER = root
DATABASE_PORT = 3306
DATABASE_PASSWORD =
JWT_SECRET = mysupersecretpassword
JWT_EXPIRES_IN = 90d
JWT_COOKIE_EXPIRES = 90
```

4. Run `npm install` in the root directory of the project to install the required dependencies.
5. Start the project by running `npm start`

## Usage
1. Open the project in your browser by navigating to `http://localhost:5000/`
2. Register a new account by clicking on the `Register` button on the top right corner of the page.
3. Login to the system using the credentials you used to register.
4. You can now use the system.

## Screenshots
![1](screenshots/1.jpg)
![2](screenshots/2.jpg)
![3](screenshots/3.jpg)
![4](screenshots/4.jpg)
![5](screenshots/5.jpg)
![6](screenshots/6.jpg)
![7](screenshots/7.jpg)
![8](screenshots/8.jpg)
![9](screenshots/9.jpg)
![10](screenshots/10.jpg)
![11](screenshots/11.jpg)



