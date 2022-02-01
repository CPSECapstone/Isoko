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
      throw new Error(
         `postListBusiness only accept POST method, you tried: ${event.httpMethod}`
      );
   }

   console.info('received:', event);
   const requestBody = event.body && JSON.parse(event.body);

   // add defaultVal param for attributes that are optional/don't appear on non-owner list a business page
   const name = _.get(requestBody, 'name');
   const city = _.get(requestBody, 'city', '');
   const state = _.get(requestBody, 'state');
   const street = _.get(requestBody, 'street');
   const zip = _.get(requestBody, 'zip');
   const type = _.get(requestBody, 'type');
   const tags = _.get(requestBody, 'tags');
   const keywords = _.get(requestBody, 'keywords');
   const shortDesc = _.get(requestBody, 'shortDesc', '');
   const hours = _.get(requestBody, 'hours', {});
   const links = _.get(requestBody, 'links', {});
   const aboutOwner = _.get(requestBody, 'aboutOwner');
   const owner = _.get(aboutOwner, 'owner', '');
   const ownerName = _.get(aboutOwner, 'ownerName');
   const ownerPhone = _.get(aboutOwner, 'ownerPhone');
   const ownerDesc = _.get(aboutOwner, 'ownerDesc', '');
   const ownerPhoto = _.get(aboutOwner, 'ownerPhoto', '');
   const photos = _.get(requestBody, 'photos', []);
   const reviews = _.get(requestBody, 'reviews', []);
   const lister = _.get(requestBody, 'lister');

   const params = {
      TableName: BUSINESS_TABLE,
      Item: {
         pk: hash(name, street),
         sk: 'INFO',
         name: name,
         city: city,
         street: street,
         state: state,
         zip: zip,
         type: type,
         tags: tags,
         keywords: keywords,
         shortDesc: shortDesc,
         businessId: hash(name, street),
         hours: hours,
         links: links,
         aboutOwner: {
            owner: owner,
            ownerName: ownerName,
            ownerPhone: ownerPhone,
            ownerDesc: ownerDesc,
            ownerPhoto: ownerPhoto,
         },
         photos: photos,
         reviews: reviews,
         lister: lister,
      },
   };

   const dynamoResult = await docClient.put(params).promise();

   let putResult = dynamoResult.Items;

   // delete DynamoDB specific items
   delete putResult.pk;
   delete putResult.sk;

   const response = {
      statusCode: 200,
      body: {
         results: putResult,
      },
   };

   console.info(
      `response from: ${event.path} statusCode: ${
         response.statusCode
      } body: ${JSON.stringify(response.body)}`
   );
   return response;
};
