const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();
const { BUSINESS_TABLE } = require('../../constants');

/**
 * HTTP get method that lists all of the reviews a user has authored.
 */
exports.getUserReviewsHandler = async (event) => {
   if (event.httpMethod !== 'GET') {
      throw new Error(
         `getUserReviews only accept GET method, you tried: ${event.httpMethod}`
      );
   }

   console.info('received:', event);
   const { userSub } = event.pathParameters;

   if (userSub == null) {
      throw new Error(
         `Missing query parameter 'userSub'. Request URL format: GET/user/{userSub}/reviews`
      );
   }

   const params = {
      TableName: BUSINESS_TABLE,
      IndexName: 'reviews-index',
      KeyConditionExpression: '#r = :user',
      ExpressionAttributeNames: {
         '#r': 'reviewAuthor',
      },
      ExpressionAttributeValues: {
         ':user': userSub,
      },
   };

   let response;

   try {
      const dynamoResult = await docClient.query(params).promise();
      let queryResults = dynamoResult.Items;

      // Remove DB specific fields from results
      let reviewResults = [];
      if (queryResults.reviews.length != 0) {
         reviewResults = queryResults.reviews.map((review) => {
            delete review.pk;
            delete review.sk;

            return review;
         });
      }

      response = {
         statusCode: 200,
         body: {
            results: reviewResults,
         },
      };
   } catch (e) {
      response = {
         statusCode: 400,
         body: { error: e },
      };
   }

   console.info(
      `response from: ${event.path} statusCode: ${
         response.statusCode
      } body: ${JSON.stringify(response.body)}`
   );
   return response;
};
