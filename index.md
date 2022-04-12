# Welcome to Isoko!
Despite making up 32% of the population, ethnic minorities own only 18% of businesses in the United States, and 99% of these businesses are small businesses. Additionally, women make up more than half of the population and represent only 19% of business owners, and members of the LGBTQIA+ community represent less than 1% of business owners. In order to help these minority business owners gain more traction and create an easy and accessible way for people to invest in individuals and their communities, we are creating a web application that allows users to search for businesses in their area that offer specific products and are owned by members of specific minority groups.

You can access a deployed version of Isoko [here!](https://master.db75ilqlzlmt4.amplifyapp.com/)

# Table of Contents
1. [ Set-up/Onboarding Instructions ](#install)
2. [ Contact Us/Leave Feedback ](#contact)
3. [ Privacy Policy ](#priv)
4. [ EULA ](#eula)

<a name="install"></a>
## Set-up/Onboarding Instructions

### Prerequisites
1. Make sure to clone this repo by runnning ```git clone https://github.com/CPSECapstone/Isoko.git``` 
2. Have node installed. (Preferably version 14.0.1 or later)
3. Have docker installed.
4. Have the [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html) installed.
4. **OPTIONAL** If you are planning on deploying our AWS backend stack to your personal AWS account, make sure you have the [AWS CLI](https://aws.amazon.com/cli/)  installed and properly configured with your account details.

### Setting up the Frontend
1. From the root directory, navigate to our frontend directory ```cd frontend/isoko/```
2. Install all of our frontend dependicies ```npm i```
3. To start your server, run ```npm start```
4. Navigate to http://localhost:3000 to view the frontend

### Setting up the Backend
1. From the root directory, navigate to our backend directory ```cd backend/isoko-backend/```
2. Install all of our backend dependicies ```npm i```
3. To start your backend server, run the command ```sam local start-api```

### Setting up the Test Environment
1. To run our frontend tests, navigate to our frontend directory ```cd frontend/isoko/```
2. Then, run the command ```npm run cypress:open```, to run our cypress tests. 

3. To run our backend tests: From the root directory, navigate to our backend directory ```cd backend/isoko-backend/```
4. Then, run the command ```npm test```.

### Deploying the Backend
1. To deploy the AWS backend stack to an AWS account, first ensure that your AWS CLI is configured with the account details you wish to deploy your stack to. You can check this by running ```aws configure list```.
2. Then, navigate to our backend directory ```cd backend/isoko-backend/```.
3. Next, build the SAM template by running ```sam build```.
4. Finally, deploy the stack to your AWS account ```sam deploy```.

<a name="contact"></a>
## Contact Us/Leave Feedback

If you find any issues with Isoko or have any other feedback you'd like to give to the team, please do so [here!](https://forms.gle/3J7ACTKAhTTqVwLA8)

<a name="priv"></a>
## Privacy Policy

<a name="eula"></a>
## EULA

