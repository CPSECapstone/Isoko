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
   
   const name = _.get(requestBody, 'name');
   // add defaultVal param bc city is optional 
   const city = _.get(requestBody, 'city', "");
   const type = _.get(requestBody, 'type');
   const tags = _.get(requestBody, 'tags');
   const keywords = _.get(requestBody, 'keywords');
   const shortDesc = _.get(requestBody, 'shortDesc');
   const businessId = _.get(requestBody, 'businessId');
   const hours = _.get(requestBody, 'hours');
   const links = _.get(requestBody, 'links');
   const address = _.get(requestBody, 'address');
   const owner = _.get(requestBody, 'owner', "");
   const ownerName = _.get(requestBody, 'ownerName', ""); 
   const ownerPhone = _.get(requestBody, 'ownerPhone', "");
   const ownerDesc = _.get(requestBody, 'ownerDesc', "");
   const photo = _.get(requestBody, 'photo', "");
   const lister = _.get(requestBody, 'lister');
   

   const queryParams = {
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
         "owner": owner,
         "ownerName": ownerName, 
         "ownerPhone": ownerPhone, 
         "ownerDesc": ownerDesc,
         "photo": photo, 
         "lister": lister
      }
   }

   // remove optional params if not present
   if (city == "") {
      delete queryParams.Item.city; 
   }
   
   // if request is coming from non-owner list a business page, following params will not be included 
   if (owner == "") {
         delete queryParams.Item.owner; 
         delete queryParams.Item.ownerName;
         delete queryParams.Item.ownerPhone; 
         delete queryParams.Item.ownerDesc; 
         delete queryParams.Item.photo; 
         delete queryParams.Item.shortDesc; 
         delete queryParams.Item.hours; 
         delete queryParams.Item.links; 
   }

   
   const dynamoResult = await docClient
      .put(queryParams) 
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
