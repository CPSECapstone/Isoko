const dynamodb = require('aws-sdk/clients/dynamodb');
const _ = require('lodash');
const docClient = new dynamodb.DocumentClient();
const { BUSINESS_TABLE } = require('../../constants');

const hash = (name, street) => {
   var combo = name + street;
   var h = 0;
   for (var i = 0; i < combo.length; i++) {
      var char = combo.charCodeAt(i);
      h = (h << 5) - h + char;
      h = h & h; // Convert to 32bit integer
   }
   return h.toString();
};

/**
 * HTTP post method to allow a user to list a new business.
 */
exports.postListBusinessHandler = async (event) => {
   if (event.httpMethod !== 'POST') {
      return {
         statusCode: 400,
         body: {
            error: `postListBusiness only accept POST method, you tried: ${event.httpMethod}`,
         },
      };
   }

   console.info('received:', event);
   const requestBody = event.body && JSON.parse(event.body);

   const type = _.get(requestBody, 'type');

   if (!type) {
      return {
         statusCode: 400,
         body: {
            error: 'type is a required field.',
         },
      };
   }

   let params;

   const name = _.get(requestBody, 'name');
   const street = _.get(requestBody, 'street');
   const onlineUrl = _.get(requestBody, ['links', 'BusinessURL']);

   // Check for required fields for hashing
   if (type == 'B&M') {
      if (name && street) {
         params = {
            TableName: BUSINESS_TABLE,
            Item: {
               pk: hash(name, street),
               sk: 'INFO',
               ...requestBody,
            },
         };
      } else {
         return {
            statusCode: 400,
            body: {
               error: 'name and street are required fields for Brick and Mortar Businesses.',
            },
         };
      }
   } else if (type == 'Online') {
      if (name && onlineUrl) {
         params = {
            TableName: BUSINESS_TABLE,
            Item: {
               pk: hash(name, onlineUrl),
               sk: 'INFO',
               ...requestBody,
            },
         };
      } else {
         return {
            statusCode: 400,
            body: {
               error: 'name and links.BusinessURL are required fields for Online businesses.',
            },
         };
      }
   }

   let response;

   try {
      console.info(params);
      await docClient.put(params).promise();

      response = {
         statusCode: 200,
         body: { ...requestBody },
      };
   } catch (e) {
      response = {
         statusCode: 400,
         body: { error: e.message },
      };
   }
   return response;
};
