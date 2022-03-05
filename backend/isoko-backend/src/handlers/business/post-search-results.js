const dynamodb = require('aws-sdk/clients/dynamodb');
const _ = require('lodash');
const docClient = new dynamodb.DocumentClient();
const { BUSINESS_TABLE } = require('../../constants');

const validateLocationParam = (locationParam) => {
   const splitLocationParam = locationParam && locationParam.split('#');
   return splitLocationParam && splitLocationParam.length === 2;
};

const buildQueryParams = (location, category) => {
   // ...(category) && {...} is just syntatic sugar to say if category
   // is defined, then add the object property that follows
   return {
      TableName: BUSINESS_TABLE,
      KeyConditionExpression: `#pk = :location${
         category ? ' AND begins_with(#sk, :cat)' : ''
      }`,
      ExpressionAttributeNames: {
         '#pk': 'pk',
         ...(category && { '#sk': 'sk' }),
      },
      ExpressionAttributeValues: {
         ':location': location,
         ...(category && { ':cat': category }),
      },
   };
};

/**
 * HTTP get method to get all businesses that match search criteria.
 */
exports.postSearchResultsHandler = async (event) => {
   if (event.httpMethod !== 'POST') {
      return {
         statusCode: 400,
         body: {
            error: `postSearchResults only accept POST method, you tried: ${event.httpMethod}`,
         },
      };
   }

   console.info('received:', event);
   const requestBody = event.body && JSON.parse(event.body);

   const location = _.get(requestBody, 'location');

   if (!validateLocationParam(location)) {
      return {
         statusCode: 400,
         body: {
            error: `Invalid location parameter: ${location}, must be in the format State#City`,
         },
      };
   }

   const category = _.get(requestBody, 'category');
   const keyword = _.get(requestBody, 'keyword');
   const tags = _.get(requestBody, 'tags');

   let response;

   try {
      const dynamoResult = await docClient
         .query(buildQueryParams(location, category))
         .promise();
      let queryResults = dynamoResult.Items;

      if (tags && tags.length && keyword) {
         queryResults = queryResults.filter(
            (busPreview) =>
               busPreview.tags.some((tag) => _.includes(tags, tag)) &&
               _.includes(busPreview.keywords, keyword)
         );
      } else if (tags && tags.length) {
         queryResults = queryResults.filter((busPreview) =>
            busPreview.tags.some((tag) => _.includes(tags, tag))
         );
      } else if (keyword) {
         queryResults = queryResults.filter((busPreview) =>
            _.includes(busPreview.keywords, keyword)
         );
      }

      // Remove DB specific fields from results
      const searchResults = queryResults.map((busPreview) => {
         delete busPreview.pk;
         delete busPreview.sk;

         return busPreview;
      });

      response = {
         statusCode: 200,
         body: JSON.stringify({ results: searchResults }),
         headers: {"content-type": "json", "access-control-allow-origin": "*"},
      };
   } catch (e) {
      response = {
         statusCode: 400,
         body: { error: e.message },
      };
   }

   console.info(
      `response from: ${event.path} statusCode: ${
         response.statusCode
      } body: ${JSON.stringify(response.body)}`
   );
   return response;
};
