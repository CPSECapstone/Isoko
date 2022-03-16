const dynamodb = require('aws-sdk/clients/dynamodb');
const _ = require('lodash');
const docClient = new dynamodb.DocumentClient();
const {
   BUSINESS_TABLE,
   SEARCH_RESULTS_TABLE,
   BRICK_AND_MORTAR,
   ONLINE,
} = require('../../constants');

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

const get400Response = (message) => ({
   statusCode: 400,
   body: {
      error: message,
   },
});

/**
 * HTTP post method to allow a user to list a new business.
 */
exports.postListBusinessHandler = async (event) => {
   if (event.httpMethod !== 'POST') {
      return get400Response(
         `postListBusiness only accept POST method, you tried: ${event.httpMethod}`
      );
   }

   console.info('received:', event);
   const requestBody = event.body && JSON.parse(event.body);

   const type = _.get(requestBody, 'type');
   const category = _.get(requestBody, 'category');

   if (!type || !category) {
      return get400Response('Required field type or category is missing');
   }

   let businessId;

   // Required fields
   const name = _.get(requestBody, 'name');
   const street = _.get(requestBody, 'street');
   const onlineUrl = _.get(requestBody, ['links', 'BusinessURL']);
   const state = _.get(requestBody, 'state');
   const city = _.get(requestBody, 'city');

   // Check for required fields for hashing
   if (type == BRICK_AND_MORTAR) {
      if (name && street && state && city) {
         businessId = hash(name, street);
      } else {
         return get400Response(
            'Required field not present, ensure name, street, state, and city are present for Brick and Mortar Businesses.'
         );
      }
   } else if (type == ONLINE) {
      if (name && onlineUrl) {
         businessId = hash(name, onlineUrl);
      } else {
         return get400Response(
            'Required field not present, ensure name and links.BusinessURL are present for Online businesses.'
         );
      }
   } else {
      return get400Response(`Invalid business type: ${type}`);
   }

   let response;

   try {
      const searchResultsParams = {
         TableName: SEARCH_RESULTS_TABLE,
         Item: {
            pk: type == BRICK_AND_MORTAR ? `${state}#${city}` : ONLINE,
            sk: `${category}#${businessId}`,
            name,
            city,
            type,
            category,
            tags: _.get(requestBody, 'tags', []),
            keywords: _.get(requestBody, 'keywords', []),
            stars: 0,
            numReviews: 0,
            shortDesc: _.get(requestBody, 'shortDesc'),
            verified: _.get(requestBody, 'verified', false),
            businessId,
            photo: _.get(requestBody, 'photoLink'),
            hours: _.get(requestBody, 'hours', {}),
            timestamp: _.get(requestBody, 'timestamp'),
         },
      };

      const businessParams = {
         TableName: BUSINESS_TABLE,
         Item: {
            pk: businessId,
            sk: 'INFO',
            ...requestBody,
         },
      };

      // Put to DynamoDB in parallel.
      await Promise.all([
         docClient.put(searchResultsParams).promise(),
         docClient.put(businessParams).promise(),
      ]);

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
