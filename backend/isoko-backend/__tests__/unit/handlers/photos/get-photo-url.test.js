const {
   getPhotoUrlHandler,
} = require('../../../../src/handlers/photos/get-photo-url.js');
const AWS = require('aws-sdk/');

jest.mock('aws-sdk', () => {
   let instance = {
      getSignedUrlPromise: jest.fn(),
   };
   return { S3: jest.fn(() => instance) };
});

describe('GetPhotoUrlHandler tests', () => {
   let mockS3;

   beforeEach(() => {
      mockS3 = new AWS.S3();
   });

   describe('Invalid event tests', () => {
      it('Should throw an error when wrong HTTP method is used', async () => {
         // arrange
         const event = {
            httpMethod: 'POST',
            pathParameters: {
               photoId: '9AA67D6D6EBAE28B97F9B9417',
            },
         };

         // act
         const response = await getPhotoUrlHandler(event);

         // assert
         expect(response.statusCode).toBe(400);
         expect(response.body.error).toContain('POST');
      });

      it('Should throw an error when path parameter is missing', async () => {
         // arrange
         const event = {
            httpMethod: 'GET',
         };

         // act
         const response = await getPhotoUrlHandler(event);

         // assert
         expect(response.statusCode).toBe(400);
         expect(response.body.error).toEqual(
            `Missing query parameter 'photoId'. Request URL format: GET/photos/{photoId}`
         );
      });
   });

   describe('Valid input tests', () => {
      it('Should return url for S3 photo associated with given randomId', async () => {
         mockGetResults = {
            uploadURL:
               'https://image-bucket-isoko.s3.us-west-2.amazonaws.com/9AA67D6D6EBAE28B97F9B9417.png',
         };

         mockS3.getSignedUrlPromise.mockReturnValueOnce(mockGetResults);

         const event = {
            httpMethod: 'GET',
            pathParameters: {
               photoId: '9AA67D6D6EBAE28B97F9B9417',
            },
         };

         const result = await mockS3.getSignedUrlPromise(event);

         expect(result).toEqual(mockGetResults);
      });
   });
});
