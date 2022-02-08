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

   describe('Invalid query param tests', () => {
      it('Should throw an error when wrong HTTP method is used', async () => {
         // arrange
         const event = {
            httpMethod: 'GET',
         };

         // act

         // assert
         await expect(async () => {
            await postListBusinessHandler(event);
         }).rejects.toThrowError();
      });
   });

   describe('Valid input tests', () => {
      it('Should post business info with all optional params included and return details', async () => {
         // arrange
         mockPutResults = {
            pk: '-664125567',
            sk: 'INFO',
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
            photos: [],
            reviews: [],
            lister: 'George Michael Bluth',
         };
         putSpy.mockReturnValue({
            promise: () => Promise.resolve({ Items: mockPutResults }),
         });
         const event = {
            httpMethod: 'POST',
            body: JSON.stringify({
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
               photos: [],
               reviews: [],
               lister: 'George Michael Bluth',
            }),
         };

         const expectedItems = {
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
            photos: [],
            reviews: [],
            lister: 'George Michael Bluth',
         };

         // act
         const result = await postListBusinessHandler(event);

         // assert
         expect(result.body.results).toEqual(expectedItems);
         expect(putSpy).toHaveBeenCalledWith({
            TableName: BUSINESS_TABLE,
            Item: {
               pk: '-664125567',
               sk: 'INFO',
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
               photos: [],
               reviews: [],
               lister: 'George Michael Bluth',
            },
         });
      });

      it('Should post business info from non-owner "List a Business" page and return details', async () => {
         // arrange
         mockPutResults = {
            pk: '-664125567',
            sk: 'INFO',
            name: "Bluth's Original Frozen Banana",
            city: 'Newport Beach',
            state: 'CA',
            street: '70 Newport Pier',
            zip: '92663',
            type: 'B&M',
            tags: ['Women-Owned'],
            category: 'Desserts',
            shortDesc: '',
            businessId: '-664125567',
            hours: {},
            links: {},
            aboutOwner: {
               ownerName: 'Maeby Funke',
               ownerPhone: '123-456-7890',
            },
            photos: [],
            reviews: [],
            lister: 'George Michael Bluth',
         };
         putSpy.mockReturnValue({
            promise: () => Promise.resolve({ Items: mockPutResults }),
         });
         const event = {
            httpMethod: 'POST',
            body: JSON.stringify({
               name: "Bluth's Original Frozen Banana",
               city: 'Newport Beach',
               state: 'CA',
               street: '70 Newport Pier',
               zip: '92663',
               type: 'B&M',
               tags: ['Women-Owned'],
               category: 'Desserts',
               businessId: '-664125567',
               aboutOwner: {
                  ownerName: 'Maeby Funke',
                  ownerPhone: '123-456-7890',
               },
               photos: [],
               reviews: [],
               lister: 'George Michael Bluth',
            }),
         };

         const expectedItems = {
            name: "Bluth's Original Frozen Banana",
            city: 'Newport Beach',
            state: 'CA',
            street: '70 Newport Pier',
            zip: '92663',
            type: 'B&M',
            tags: ['Women-Owned'],
            category: 'Desserts',
            shortDesc: '',
            businessId: '-664125567',
            hours: {},
            links: {},
            aboutOwner: {
               ownerName: 'Maeby Funke',
               ownerPhone: '123-456-7890',
            },
            photos: [],
            reviews: [],
            lister: 'George Michael Bluth',
         };

         // act
         const result = await postListBusinessHandler(event);

         // assert
         expect(result.body.results).toEqual(expectedItems);
         expect(putSpy).toHaveBeenCalledWith({
            TableName: BUSINESS_TABLE,
            Item: {
               pk: '-664125567',
               sk: 'INFO',
               name: "Bluth's Original Frozen Banana",
               city: 'Newport Beach',
               state: 'CA',
               street: '70 Newport Pier',
               zip: '92663',
               type: 'B&M',
               tags: ['Women-Owned'],
               category: 'Desserts',
               shortDesc: '',
               businessId: '-664125567',
               hours: {},
               links: {},
               aboutOwner: {
                  owner: '',
                  ownerDesc: '',
                  ownerName: 'Maeby Funke',
                  ownerPhone: '123-456-7890',
                  ownerPhoto: '',
               },
               photos: [],
               reviews: [],
               lister: 'George Michael Bluth',
            },
         });
      });
   });
});
