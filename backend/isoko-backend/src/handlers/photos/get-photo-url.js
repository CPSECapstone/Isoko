const { IMAGE_BUCKET } = require('../../constants');
const AWS = require('aws-sdk')
const s3 = new AWS.S3()
const _ = require('lodash');

const URL_EXPIRATION_SECONDS = 300
/**
 * HTTP get method to get business page with details and reviews for specific businessId.
 */
exports.getPhotoUrlHandler = async (event) => {
   if (event.httpMethod !== 'GET') {
    return {
        statusCode: 400,
        body: {
           error: `getPhotoUrlHandler only accept GET method, you tried: ${event.httpMethod}`,
        },
     };
   }

   console.info('received:', event);

   const photoId = _.get(event, ['pathParameters', 'photoId'], null); 

   if (!photoId) {
    return {
        statusCode: 400,
        body: {
           error: `Missing query parameter 'photoId'. Request URL format: GET/photos/{photoId}`,
        },
     };
   }

   // unique identifier will be provided by frontend in request param 
   const Key = `${photoId}.jpg`

   const params = {
       Bucket: IMAGE_BUCKET,
       Key, 
       Expires: URL_EXPIRATION_SECONDS,
       ContentType: 'image/jpeg', 
       ACL: 'public-read'
   }

   try {
    const uploadURL = await s3.getSignedUrlPromise('putObject', params); 
    response = {
        statusCode: 200,
        headers: {
            "Content-Type" : "json",
            "Access-Control-Allow-Origin" : "*" 
        },
        body: JSON.stringify({ uploadURL: uploadURL, Key }),
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
}