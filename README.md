# Isoko
2021 Software Engineering Capstone - AWS Minority Owned Business Team

# Table of Contents
1. [ Overview. ](#over)
2. [ Vision Statements. ](#vision)
3. [ Meet The Team. ](#meet)
4. [ Onboarding Instructions ](#onboard)
5. [ Project Architecture ](#arch)

<a name="over"></a>
## Overview
Despite making up 32% of the population, ethnic minorities own only 18% of businesses in the United States, and 99% of these businesses are small businesses. Additionally, women make up more than half of the population and represent only 19% of business owners, and members of the LGBTQIA+ community represent less than 1% of business owners. In order to help these minority business owners gain more traction and create an easy and accessible way for people to invest in individuals and their communities, we are creating a web application that allows users to search for businesses in their area that offer specific products and are owned by members of specific minority groups. 

<a name="vision"></a>
## Vision Statements
### For Business Owners
For business owners who are minorities the Minority Markets (Application)  is a web application that displays various minority owned businesses unlike Yelp/Google, our product strives to increase traction for minority owned businesses specifically .

### For Consumers
For minority and socially conscious consumers who are looking to support minority owned businesses the Minority Markets is a web application that displays various minority owned businesses unlike Yelp/Google, our product is not oversaturated and serves a specific need to find a variety of minority group owned businesses.

<a name="meet"></a>
## Meet the Team
<p float="left">
  <a href="https://github.com/jpoist97" target="_blank"><img src="https://avatars3.githubusercontent.com/u/42504462?s=460&u=fbe279fd5e77ba14a01b2679da9970e49f5a989e&v=4" width="150" /></a>
  <a href="https://github.com/ctperry0301" target="_blank"><img src="https://avatars3.githubusercontent.com/u/15805074?s=400&u=c2a0e7ef773958b28ce01ae19dcdbb1eefcce015&v=4" width="150" /></a>
  <a href="https://github.com/reillynski" target="_blank"><img src="https://avatars.githubusercontent.com/u/43476619?v=4" width="150" /></a>
  <a href="https://github.com/rohithdara" target="_blank"><img src="https://avatars.githubusercontent.com/u/46057294?s=400&u=b6b073d48f688032d641f2c2d4db922c3a9f62d8&v=4" width="150" /></a>
  <a href="https://github.com/shriyan44" target="_blank"><img src="https://avatars.githubusercontent.com/u/29551904?s=400&u=6021a76d56832083a025c11878c9ae65dbf8389c&v=4" width="150" /></a>
</p>

(From left to right)
- Justin Poist
- Cole Perry
- Reilly Salkowski
- Rohith Dara
- Shriya Nimmagadda

<a name="onboard"></a>
## Set-up/Onboarding Instructions

### Prerequisites
1. Make sure to clone this repo by runnning ```git clone https://github.com/CPSECapstone/Isoko.git```
2. Make sure that you have your AWS IAM credentials. Message one of the team members if you still need these. 
3. Have node installed. (Preferably version 14.0.1 or later)
4. Have docker installed.

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

<a name="arch"></a>
## Project Architecture
![Project Architecture Image](frontend/isoko/public/ArchitectureDiagram.png?raw=true "Title")
