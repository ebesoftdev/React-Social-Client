# Project 3 - Reverb

## Project Description

Reverb (styled as ReverB) is an upcoming social media app designed for Revature employees that emphasizes personal connectivity by echoing professional growth. Users can create profiles where they can post images and create messages that resonate with their experience and insight. Users can also view and comment on posts from other profiles, and “reverb” (like) on posts that personally reverberate with them.

## Technologies Used

- Java
- Spring Boot
- Spring Data
- Spring Framework
- Firebase Authentication
- React Typescript
- React Redux
- React Bootstrap
- HTML/CSS
- Jenkins
- Docker
- Git
- Maven
- 
## Features
- Profanity filter 
- Sessions are managed using Firebase

- Users can:
- Register and log in
- Edit their profile including a picture and bio
- Post images and text to their profile
- View feed of posts from other profiles
- View list of followers 
- Comment on and bookmark posts
- Like comments and posts
- Receive notifications
- Search for groups
- Reset password

## Getting Started

- Install JDK 8, Maven, Git, and NPM.
- Create a firebase account, and a new firebase project, with no Google Analytics.
- Enable email/password as sign in provider.
- Add a web app to the firebase project.
- Clone the frontend and backend using the following commands:
- - git clone https://github.com/Revature-Reverb-2/React-Social-Client
- - git clone https://github.com/Revature-Reverb-2/React-Social-Server
- - DEVIATION: At this point, you need to checkout to the dev branch to run locally. Otherwise, you'll need to launch to an elastic beanstalk
- Enter the your firebase project’s web app’s settings and copy the configuration properties into the front end’s firebase.ts file.
- In the same settings, on the Service Provider tab, click on Generate new private key. Copy the contents of that key into the backend’s firebase_config.json file.
- In backend/src/main/resources, edit the applications.property file to have the correct spring.datasource parameters to the desired database.
- Run Maven Update either within an IDE (having imported the backend as a Maven project) or using the following command in the backend directory:
- - mvn clean install -U
- Start the backend as a Spring Boot Application within an IDE or using the following command in the backend directory:
- - mvn spring-boot:run
- Install frontend dependencies using the command:
- - npm install --legacy-peer-deps
- Setup an s3 bucket for profile picture uploads.
- - Create a user with the Add user feature of IAM
- - Check the user's Access type 'Programatic access'
- - Add permissions to the user
- - Press 'Attach existing policy directly'
- - Search for 's3' and choose AmazonS3FullAccess
- - Presss next and 'Create User'
- - Click on Download.csv to get the keys for this user.
- - Place these into a 'application-s3.yml' in the resources directory with the...
- - endpointURL , accessKey , secretKey , and bucketName
- Follow either Local or AWS Deployment instructions.

# Local

- Switch to the dev branch of the client and server using the following command:
- - git checkout dev
- Run the following comamnd in the directory of the server to install your dependencies.
- - mvn clean install -U
- Start the server using the following command in the server directory.
- - mvn spring-boot:run
- Launch the client using the following command inside of the client's directory.
- - npm start

# AWS Deployment

- Backend
- Setup an Elastic Beanstalk that uses Coretto 8 that will take our jar file and deploy it to an EC2 automatically.
- Source stage for the API needs to take a source from the Reverb Server github repo at main.
- In the build stage, use the following build setup. This build setup will give us an artifact that can be deployed in our deploy stage.
- - version: 0.2
- -
- - phases:
- - install:
- -     runtime-versions:
- -
- -       # Correto is basically Amazon's in-house version of Java that they mainta, it is
- -       # compatible with project's built using native Java (match versions).
- -       java: corretto8
- -
- - pre_build:
- -     commands:
- -
- -       # Grab properties file from S3 bucket prior to project build
- -       - aws s3 cp s3://reverb-resources-bucket/application-dev.yml ./src/main/resources/application-dev.yml
- -       - aws s3 cp s3://reverb-resources-bucket/firebase_config.json ./src/main/resources/firebase_config.json
- -
- - build:
- -     commands:
- -
- -       # Build the project
- -       - mvn clean package -Dspring.profiles.active=test
- -
- - post_build:
- -     commands:
- -
- -       - mv target/*.jar ./reverbAPI.jar
- -
- - #Declare build artifacts to be passed to the next stage of the pipeline
- - artifacts:
- - files:
- -     - reverbAPI.jar
- - name: artifact
- In our deploy stage, that jar file we just created is deployed to our elastic beanstalk using Coretto 8.
- Note the url that we have here.

- Frontend
- Setup an S3 bucket for the UI side with static webhosting enabled.
- Use a find and replace functionality to find any mention of 'localhost' or 'elasticbeanstalk' and replace those full url's with the appropriate new url for the API you just made.
- Source stage for the UI needs to take a source from the Reverb Client github repository at main.
- In the build stage, use the following build setup which should install node js, and then uses the command nmp install to install the dependencies needed for the UI side. It then runs npm run-script build which gives us a build folder that gives us an index.html artifact that we will deploy in the deploy stage.
- - version: 0.2
- -
- - phases:
- - install:
- -     runtime-versions:
- -       nodejs: 12
- -
- -     commands:
- -        # install npm
- -         - npm install
- -
- - build:
- -     commands:
- -         # run build script
- -         - npm run-script build
- -         - mkdir ./views
- -         - cp -rf ./build/* ./views
- - artifacts:
- - files:
- - - '\*_/_'
- - base-directory: 'views'\*
- In the deploy stage, that index.html file is deployed to the s3 bucket with static webhosting enabled.
- You should now be able to connect to the UI at the url of your s3 bucket.

## Usage

Using the social media app should be intuitive and easy.
