const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();
const _ = require('lodash');
const { BUSINESS_TABLE } = require('../../constants');

/**
 * HTTP post method that creates a review for the specified business.
 */
exports.postReviewHandler = async (event) => {
   if (event.httpMethod !== 'POST') {
      throw new Error(
         `postReviewHandler only accept POST method, you tried: ${event.httpMethod}`
      );
   }

   console.info('received:', event);

   const { businessId } = event.pathParameters;

   if (!businessId) {
      throw new Error(
         `Missing query parameter 'businessId'. Request URL format: POST/business/:businessId/review`
      );
   }

   const requestBody = event.body && JSON.parse(event.body);

   const reviewAuthor = _.get(requestBody, 'reviewAuthor');
   const authorUserName = _.get(requestBody, 'authorUserName');
   const authorProfilePicture = _.get(requestBody, 'authorProfilePicture', '');
   const stars = _.get(requestBody, 'stars');
   const reviewTitle = _.get(requestBody, 'reviewTitle', '');
   const description = _.get(requestBody, 'description', '');
   const pictures = _.get(requestBody, 'pictures', []);
   const ts = _.get(requestBody, 'ts');

   const params = {
      TableName: BUSINESS_TABLE,
      Item: {
         pk: businessId,
         sk: `REVIEW#${ts}#${authorUserName}`,
         reviewAuthor: reviewAuthor,
         authorUserName: authorUserName,
         authorProfilePicture: authorProfilePicture,
         stars: stars,
         reviewTitle: reviewTitle,
         description: description,
         pictures: pictures,
         ts: ts,
      },
   };

   let dynamoResult;
   let response;

   try {
      dynamoResult = await docClient.put(params).promise();
      let putResult = dynamoResult.Items
      response = {
         statusCode: 200,
         body: { results: putResult },
      };
   } catch (e) {
      response = {
         statusCode: 400,
         body: { error: e},
      };
   };

   console.info(
      `response from: ${event.path} statusCode: ${
         response.statusCode
      } body: ${JSON.stringify(response.body)}`
   );
   return response;
};
