const dynamodb = require('aws-sdk/clients/dynamodb');
const _ = require('lodash');
const docClient = new dynamodb.DocumentClient();
const { BUSINESS_TABLE } = require('../../constants');

const processLocationParam = (locationParam) => {
   const splitLocationParam = locationParam.split('/');

   if (splitLocationParam.length != 2) {
      throw new Error(
         `Invalid location query parameter "${locationParam}", must be in the format of State/City`
      );
   }

   return `${splitLocationParam[0]}#${splitLocationParam[1]}`;
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
exports.getSearchResultsHandler = async (event) => {
   if (event.httpMethod !== 'GET') {
      throw new Error(
         `getSearchResults only accept GET method, you tried: ${event.httpMethod}`
      );
   }

   console.info('received:', event);
   const requestBody = event.body && JSON.parse(event.body);

   const location = processLocationParam(_.get(requestBody, 'location'));
   const category = _.get(requestBody, 'category');
   const keyword = _.get(requestBody, 'keyword');
   const tags = _.get(requestBody, 'tags');

   const dyanmoResult = await docClient
      .query(buildQueryParams(location, category))
      .promise();
   let queryResults = dyanmoResult.Items;

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

   const response = {
      statusCode: 200,
      body: {
         results: searchResults,
      },
   };

   console.info(
      `response from: ${event.path} statusCode: ${
         response.statusCode
      } body: ${JSON.stringify(response.body)}`
   );
   return response;
};
