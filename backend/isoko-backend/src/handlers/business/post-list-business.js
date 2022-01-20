const dynamodb = require('aws-sdk/clients/dynamodb');
const _ = require('lodash');
const docClient = new dynamodb.DocumentClient();
const { BUSINESS_TABLE } = require('../../constants');

/**
 * HTTP post method to allow a user to list a new business.
 */
exports.postListBusinessHandler = async (event) => {
   if (event.httpMethod !== 'POST') {
      throw new Error(
         `postListBusiness only accept POST method, you tried: ${event.httpMethod}`
      );
   }

   console.info('received:', event);
   const requestBody = event.body && JSON.parse(event.body);
   
   // add defaultVal param for attributes that are optional/don't appear on non-owner list a business page
   const name = _.get(requestBody, 'name');
   const city = _.get(requestBody, 'city', "");
   const type = _.get(requestBody, 'type');
   const tags = _.get(requestBody, 'tags');
   const keywords = _.get(requestBody, 'keywords');
   const shortDesc = _.get(requestBody, 'shortDesc', "");
   const businessId = _.get(requestBody, 'businessId');
   const hours = _.get(requestBody, 'hours', {});
   const links = _.get(requestBody, 'links', {});
   const address = _.get(requestBody, 'address');
   const aboutOwner = _.get(requestBody, 'aboutOwner');
   const owner = _.get(aboutOwner, 'owner', "");
   const ownerName = _.get(aboutOwner, 'ownerName');  
   const ownerPhone = _.get(aboutOwner, 'ownerPhone');
   const ownerDesc = _.get(aboutOwner, 'ownerDesc', "");
   const photo = _.get(aboutOwner, 'photo', "");
   const lister = _.get(requestBody, 'lister');
   

   const params = {
      TableName: BUSINESS_TABLE,
      Item: {
         "name": name, 
         "city": city,
         "type": type, 
         "tags": tags, 
         "keywords": keywords,
         "shortDesc": shortDesc, 
         "businessId": businessId, 
         "hours": hours, 
         "links": links, 
         "address": address,
         "aboutOwner": {
            "owner": owner,
            "ownerName": ownerName, 
            "ownerPhone": ownerPhone, 
            "ownerDesc": ownerDesc,
            "photo": photo, 
         }, 
         "lister": lister
      }
   }
   
   const dynamoResult = await docClient
      .put(params) 
      .promise(); 
   
   let putResult = dynamoResult.Items; 

   const response = {
      statusCode: 200,
      body: { 
         results: putResult
       },
   };

   console.info(
      `response from: ${event.path} statusCode: ${
         response.statusCode
      } body: ${JSON.stringify(response.body)}`
   );
   return response;
};
