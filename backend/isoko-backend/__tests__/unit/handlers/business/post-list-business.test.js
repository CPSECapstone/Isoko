const {
   postListBusinessHandler,
} = require('../../../../src/handlers/business/post-list-business.js');
const dynamodb = require('aws-sdk/clients/dynamodb');
const { BUSINESS_TABLE } = require('../../../../src/constants');

jest.mock('aws-sdk/clients/dynamodb');

describe('PostListBusinessHandler tests', () => {
   let putSpy;

   beforeAll(() => {
      putSpy = jest.spyOn(dynamodb.DocumentClient.prototype, 'put');
   });

   afterAll(() => {
      putSpy.mockRestore();
   });

   afterEach(() => {
      putSpy.mockReset();
   });

   describe('Invalid event tests', () => {
      it('Should throw an error when wrong HTTP method is used', async () => {
         // arrange
         const event = {
            httpMethod: 'GET',
         };

         // act
         const response = await postListBusinessHandler(event);

         // assert
         expect(response.statusCode).toBe(400);
         expect(response.body.error).toContain('GET');
      });

      it('Should return 400 response when type is ommitted', async () => {
         // arrange
         const event = {
            httpMethod: 'POST',
            body: JSON.stringify({}),
         };

         // act
         const response = await postListBusinessHandler(event);

         // assert
         expect(response.statusCode).toBe(400);
         expect(response.body.error).toBe('type is a required field.');
      });

      it('Should return 400 response when B&M required fields are ommitted', async () => {
         // arrange
         const event = {
            httpMethod: 'POST',
            body: JSON.stringify({
               type: 'B&M',
            }),
         };

         // act
         const response = await postListBusinessHandler(event);

         // assert
         expect(response.statusCode).toBe(400);
         expect(response.body.error).toBe(
            'name and street are required fields for Brick and Mortar Businesses.'
         );
      });

      it('Should return 400 response when online required fields are ommitted', async () => {
         // arrange
         const event = {
            httpMethod: 'POST',
            body: JSON.stringify({
               type: 'Online',
            }),
         };

         // act
         const response = await postListBusinessHandler(event);

         // assert
         expect(response.statusCode).toBe(400);
         expect(response.body.error).toBe(
            'name and links.BusinessURL are required fields for Online businesses.'
         );
      });
   });

   describe('Failed put test', () => {
      it('Should return a 400 response when put throws an error', async () => {
         // arrange
         putSpy.mockImplementation(() => {
            throw new Error('Put failed');
         });

         const event = {
            httpMethod: 'POST',
            body: JSON.stringify({
               name: "Bluth's Original Frozen Banana",
               street: '70 Newport Pier',
               type: 'B&M',
            }),
         };

         // act
         const response = await postListBusinessHandler(event);

         // assert
         expect(response.statusCode).toEqual(400);
         expect(response.body.error).toEqual('Put failed');
      });
   });

   describe('Valid input tests', () => {
      it('Should post business info with all optional params included and return details', async () => {
         // arrange
         putSpy.mockReturnValue({
            promise: () => Promise.resolve({}),
         });

         const postBusiness = {
            name: "Bluth's Original Frozen Banana",
            city: 'Newport Beach',
            state: 'CA',
            street: '70 Newport Pier',
            zip: '92663',
            type: 'B&M',
            tags: ['Women-Owned'],
            category: 'Desserts',
            shortDesc: "There's always money in the banana stand.",
            businessId: '-664125567',
            hours: {
               Mon: '11:00am - 11:00pm',
               Tue: '11:00am - 11:00pm',
               Wed: '11:00am - 11:00pm',
               Thu: '11:00am - 11:00pm',
               Fri: '11:00am - 11:00pm',
               Sat: '12:00pm - 8:00pm',
               Sun: 'closed',
            },
            links: {
               Menu: 'https://arresteddevelopment.fandom.com/wiki/Bluth%27s_Original_Frozen_Banana_Stand',
            },
            aboutOwner: {
               owner: '3bed9528-9d10-4f50-ab72-d19dad1b8698',
               ownerName: 'Maeby Funke',
               ownerPhone: '123-456-7890',
               ownerDesc: 'Marry me!',
               ownerPhoto:
                  'https://static.wikia.nocookie.net/arresteddevelopment/images/c/c2/Season_1_Character_Promos_-_Maeby_F%C3%BCnke_02.jpeg/revision/latest/scale-to-width-down/300?cb=20120429230807',
            },
            lister: 'George Michael Bluth',
            timestamp: 1644963553,
            verified: true,
         };

         const event = {
            httpMethod: 'POST',
            body: JSON.stringify(postBusiness),
         };

         // act
         const result = await postListBusinessHandler(event);

         // assert
         expect(result.body).toEqual(postBusiness);
         expect(putSpy).toHaveBeenCalledWith({
            TableName: BUSINESS_TABLE,
            Item: {
               pk: '-664125567',
               sk: 'INFO',
               ...postBusiness,
            },
         });
      });
   });
});
