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
         ":s": stars
      },
      UpdateExpression: "SET stars = stars + :s"
   }

   // total reviews in Businesses 
   const businessReviewsParams = {
      TableName: BUSINESS_TABLE, 
      Key: {
         pk: `${businessId}`,
         sk: 'INFO',
      },
      ExpressionAttributeValues: {
         ":inc": 1
      },
      UpdateExpression: "SET numReviews = numReviews + :inc"
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
         ":s": stars
      },
      UpdateExpression: "SET stars = stars + :s"
   }

   // total reviews in Businesses 
   const searchReviewsParams = {
      TableName: SEARCH_RESULTS_TABLE, 
      Key: {
         pk: pkString,
         sk: `${category}#${businessId}`,
      },
      ExpressionAttributeValues: {
         ":inc": 1
      },
      UpdateExpression: "SET numReviews = numReviews + :inc"
   }

   let response;

   try {
      // const dynamoResult = await docClient.put(reviewParams).promise();
      
      // let putResults = dynamoResult.Attributes;
      
      // delete putResults.pk;
      // delete putResults.sk;

      // const updateResult = await docClient.updateItem(businessParams).promise(); 
      // console.info(`updated ${updateResult.Attributes}`)

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
