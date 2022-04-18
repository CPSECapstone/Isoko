const dynamodb = require('aws-sdk/clients/dynamodb');
const _ = require('lodash');
const docClient = new dynamodb.DocumentClient();
const { SEARCH_RESULTS_TABLE, ONLINE } = require('../../constants');

const validateLocationParam = (locationParam) => {
   if (locationParam === ONLINE) {
      return ONLINE;
   }

   const splitLocationParam = locationParam && locationParam.split('#');
   return splitLocationParam && splitLocationParam.length === 2;
};

const buildQueryParams = (location, category) => {
   // ...(category) && {...} is just syntatic sugar to say if category
   // is defined, then add the object property that follows
   return {
      TableName: SEARCH_RESULTS_TABLE,
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

const filterQueryResults = (queryResults, tags, keyword) => {
   let filteredResults = queryResults;
   if (tags && tags.length && keyword) {
      filteredResults = queryResults.filter(
         (busPreview) =>
            busPreview.tags.some((tag) => _.includes(tags, tag)) &&
            _.includes(busPreview.keywords, keyword)
      );
   } else if (tags && tags.length) {
      filteredResults = queryResults.filter((busPreview) =>
         busPreview.tags.some((tag) => _.includes(tags, tag))
      );
   } else if (keyword) {
      filteredResults = queryResults.filter((busPreview) =>
         _.includes(busPreview.keywords, keyword)
      );
   }

   // Remove db specific fields from results
   return filteredResults.map((busPreview) => {
      delete busPreview.pk;
      delete busPreview.sk;

      return busPreview;
   });
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
      let onlineSearchResults = [];
      let brickMortarSearchResults = [];

      // We always want to send the online request, but only send the brick
      // and mortar request when the location param is not ONLINE
      if (location === ONLINE) {
         console.info('Online only flow');

         const onlineParams = buildQueryParams(location, category);
         console.info(`Dynamo request with onlineParams: ${onlineParams}`);

         const onlineResults = await docClient.query(onlineParams).promise();
         onlineSearchResults = filterQueryResults(
            onlineResults.Items,
            tags,
            keyword
         );
      } else {
         console.info('Both flow');

         const onlineParams = buildQueryParams(ONLINE, category);
         const brickMortarParams = buildQueryParams(location, category);
         console.info(`Dynamo request with onlineParams: ${onlineParams}`);
         console.info(
            `Dynamo request with brickMortarParams: ${brickMortarParams}`
         );

         // fetch both online and B&M results in parallel
         const [onlineResults, brickMortarResults] = await Promise.all([
            docClient.query(onlineParams).promise(),
            docClient.query(brickMortarParams).promise(),
         ]);

         onlineSearchResults = filterQueryResults(
            onlineResults.Items,
            tags,
            keyword
         );
         brickMortarSearchResults = filterQueryResults(
            brickMortarResults.Items,
            tags,
            keyword
         );
      }

      response = {
         statusCode: 200,
         body: JSON.stringify({
            results: brickMortarSearchResults,
            online: onlineSearchResults,
            brickMortar: brickMortarSearchResults,
         }),
         headers: {
            'content-type': 'json',
            'access-control-allow-origin': '*',
         },
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
