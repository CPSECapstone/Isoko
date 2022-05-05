const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();
const _ = require('lodash');
const { BUSINESS_TABLE, SEARCH_RESULTS_TABLE } = require('../../constants');

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
   const state = _.get(requestBody, 'state', ''); 
   const city = _.get(requestBody, 'city', ''); 
   const category = _.get(requestBody, 'category'); 

   let pkString; 

   if (state === '') {
      pkString = 'ONLINE'
   }
   else {
      pkString = `${state}#${city}`
   }

    
   // post review to Businesses 
   const reviewParams = {
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
         state: state,  
         city: city, 
         category: category  
      },
      ReturnValues: 'ALL_OLD',
   };

   // update stars in Businesses 
   const businessStarsParams = {
      TableName: BUSINESS_TABLE, 
      Key: {
         pk: `${businessId}`,
         sk: 'INFO',
      },
      ExpressionAttributeValues: {
         ":s": stars, 
         ":initial": 0
      },
      UpdateExpression: "SET stars = if_not_exists(stars, :initial) + :s"
   }

   // total reviews in Businesses 
   const businessReviewsParams = {
      TableName: BUSINESS_TABLE, 
      Key: {
         pk: `${businessId}`,
         sk: 'INFO',
      },
      ExpressionAttributeValues: {
         ":inc": 1, 
         ":initial": 0
      },
      UpdateExpression: "SET numReviews = if_not_exists(numReviews, :initial) + :inc"
   }

   //console.info(`update expression: ${businessParams.UpdateExpression}`)
   // update stars in SearchResults
   const searchStarsParams = {
      TableName: SEARCH_RESULTS_TABLE, 
      Key: {
         pk: pkString,
         sk: `${category}#${businessId}`,
      },
      ExpressionAttributeValues: {
         ":s": stars, 
         ":initial": 0
      },
      UpdateExpression: "SET stars = if_not_exists(stars, :initial) + :s"
   }

   // total reviews in Businesses 
   const searchReviewsParams = {
      TableName: SEARCH_RESULTS_TABLE, 
      Key: {
         pk: pkString,
         sk: `${category}#${businessId}`,
      },
      ExpressionAttributeValues: {
         ":inc": 1,
         ":initial": 0
      },
      UpdateExpression: "SET numReviews = if_not_exists(numReviews, :initial) + :inc"
   }

   let response;

   try {
      
      await Promise.all([
         docClient.put(reviewParams).promise(),
         docClient.update(businessStarsParams).promise(),
         docClient.update(businessReviewsParams).promise(),
         docClient.update(searchStarsParams).promise(),
         docClient.update(searchReviewsParams).promise()
      ]);

      response = {
         statusCode: 200,
         body: JSON.stringify(requestBody),
         headers: {
            'content-type': 'json',
            'access-control-allow-origin': '*',
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
