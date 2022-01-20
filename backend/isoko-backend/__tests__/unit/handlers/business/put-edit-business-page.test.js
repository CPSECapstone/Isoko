const {
    putEditBusinessPageHandler,
 } = require('../../../../src/handlers/business/put-edit-business-page.js');
 const dynamodb = require('aws-sdk/clients/dynamodb');
 const { BUSINESS_TABLE } = require('../../../../src/constants');
 
 jest.mock('aws-sdk/clients/dynamodb');
 
 describe('PutEditBusinessPageHandler tests', () => {
    let updateSpy;
 
    beforeAll(() => {
       updateSpy = jest.spyOn(dynamodb.DocumentClient.prototype, 'update');
    });
 
    afterAll(() => {
       updateSpy.mockRestore();
    });

    describe('Invalid query param tests', () => {
        it('Should throw an error when wrong HTTP method is used', async () => {
            // arrange
            const event = {
                httpMethod: 'GET',
                pathParameters: {
                    'businessId': 'BUS6'
                }
            };

            // act

            // assert
            await expect(async () => {
            await putEditBusinessPageHandler(event);
            }).rejects.toThrowError();
        });

        it('Should throw an error when path parameter is missing', async () => {
            // arrange
            const event = {
                httpMethod: 'PUT',
            };

            // act

            // assert
            await expect(async () => {
            await putEditBusinessPageHandler(event);
            }).rejects.toThrowError();
        });

        it('Should throw an error when target field is restricted', async () => {
            // arrange
            const event = {
                httpMethod: 'PUT',
                pathParameters: {
                    'businessId': 'BUSID4'
                }, 
                body: JSON.stringify({
                    'pk': 'BUSID2'
                })
            };

            // act

            // assert
            await expect(async () => {
            await putEditBusinessPageHandler(event);
            }).rejects.toThrowError();
        });

        it('Should throw an error when one of target fields is restricted', async () => {
            // arrange
            const event = {
                httpMethod: 'PUT',
                pathParameters: {
                    'businessId': 'BUSID3'
                }, 
                body: JSON.stringify({
                    'city': 'Venice Beach', 
                    'rating': 5
                })
            };

            // act

            // assert
            await expect(async () => {
            await putEditBusinessPageHandler(event);
            }).rejects.toThrowError();
        });
    });
    describe('Valid input tests', () => {
        it('Should update value of one target field', async () => {
            // arrange
            mockUpdateResults = 
            {
                name: "Bluth's Original Frozen Banana",
                city: 'Venice Beach', 
                type: 'B&M',
                tags: ['Women-Owned'],
                keywords:['Desserts'],
                shortDesc: '', 
                businessId: 'BUSID7',
                hours: {},
                links: {}, 
                address: '70 Newport Pier, Newport Beach, CA 92663',
                aboutOwner: {
                    owner: '', 
                    ownerName: 'Maeby Funke', 
                    ownerPhone: '123-456-7890', 
                    ownerDesc: '', 
                    photo: ''
                },
                lister: 'George Michael Bluth'
            }; 

            updateSpy.mockReturnValue({
                promise: () => Promise.resolve({ Items: mockUpdateResults }),
             });

            const event = {
                httpMethod: 'PUT',
                pathParameters: {
                    'businessId': 'BUSID7'
                }, 
                body: JSON.stringify({
                    'city': 'Venice Beach'
                })
            };

            const expectedItems = {
                name: "Bluth's Original Frozen Banana",
                city: 'Venice Beach', 
                type: 'B&M',
                tags: ['Women-Owned'],
                keywords:['Desserts'],
                shortDesc: '', 
                businessId: 'BUSID7',
                hours: {}, 
                links: {}, 
                address: '70 Newport Pier, Newport Beach, CA 92663',
                aboutOwner: {
                    owner: '', 
                    ownerName: 'Maeby Funke', 
                    ownerPhone: '123-456-7890',
                    ownerDesc: '', 
                    photo: ''
                },
                lister: 'George Michael Bluth'
            }; 

            // act
            const result = await putEditBusinessPageHandler(event);

            // assert
            expect(result.body.results).toEqual(expectedItems);
            expect(updateSpy).toHaveBeenCalledWith({
               TableName: BUSINESS_TABLE,
               Key: {
                "businessId": 'BUSID7'
                }, 
               UpdateExpression: `set city = :a`,
               ExpressionAttributeValues: { 
                ":a": 'Venice Beach'
               },
               ReturnValues: "UPDATED_NEW"
            });
        }); 

        it('Should update value of complex target field', async () => {
            // arrange
            mockUpdateResults = 
            {
                name: "Bluth's Original Frozen Banana",
                city: 'Venice Beach', 
                type: 'B&M',
                tags: ['Women-Owned'],
                keywords:['Desserts'],
                shortDesc: '', 
                businessId: 'BUSID8',
                hours: {}, 
                links: {}, 
                address: '70 Newport Pier, Newport Beach, CA 92663',
                aboutOwner: {
                    owner: '', 
                    ownerName: 'Lindsay Bluth', 
                    ownerPhone: '123-456-7890', 
                    ownerDesc: '', 
                    photo: ''
                },
                lister: 'George Michael Bluth'
            }; 

            updateSpy.mockReturnValue({
                promise: () => Promise.resolve({ Items: mockUpdateResults }),
             });

            const event = {
                httpMethod: 'PUT',
                pathParameters: {
                    'businessId': 'BUSID8'
                }, 
                body: JSON.stringify({
                    'aboutOwner' : {
                        'ownerName': 'Lindsay Bluth'
                    }
                })
            };

            const expectedItems = {
                name: "Bluth's Original Frozen Banana",
                city: 'Venice Beach', 
                type: 'B&M',
                tags: ['Women-Owned'],
                keywords:['Desserts'],
                shortDesc: '', 
                businessId: 'BUSID8',
                hours: {}, 
                links: {}, 
                address: '70 Newport Pier, Newport Beach, CA 92663',
                aboutOwner: {
                    owner: '',
                    ownerName: 'Lindsay Bluth', 
                    ownerPhone: '123-456-7890',
                    ownerDesc: '',
                    photo: ''
                },
                lister: 'George Michael Bluth'
            }; 

            // act
            const result = await putEditBusinessPageHandler(event);

            // assert
            expect(result.body.results).toEqual(expectedItems);
            expect(updateSpy).toHaveBeenCalledWith({
               TableName: BUSINESS_TABLE,
               Key: {
                "businessId": 'BUSID8'
                }, 
               UpdateExpression: `set aboutOwner.ownerName = :a`,
               ExpressionAttributeValues: { 
                ":a": 'Lindsay Bluth'
               },
               ReturnValues: "UPDATED_NEW"
            });
        }); 

        // it('Should update value of multiple target fields', async () => {
        //     // arrange
        //     mockUpdateResults = 
        //     {
        //         name: "Lindsay Bluth's Original Frozen Banana",
        //         city: 'Venice Beach', 
        //         type: 'B&M',
        //         tags: ['Women-Owned'],
        //         keywords:['Desserts'],
        //         shortDesc: '', 
        //         businessId: 'BUSID9',
        //         hours: {}, 
        //         links: {}, 
        //         address: '70 Newport Pier, Newport Beach, CA 92663',
        //         aboutOwner: {
        //             owner: '', 
        //             ownerName: 'Lindsay Bluth', 
        //             ownerPhone: '123-456-7890', 
        //             ownerDesc: '', 
        //             photo: ''
        //         },
        //         lister: 'George Michael Bluth'
        //     }; 

        //     updateSpy.mockReturnValue({
        //         promise: () => Promise.resolve({ Items: mockUpdateResults }),
        //      });

        //     const event = {
        //         httpMethod: 'PUT',
        //         pathParameters: {
        //             'businessId': 'BUSID9'
        //         }, 
        //         body: JSON.stringify({
        //             'name' : "Lindsay Bluth's Original Frozen Banana", 
        //             'aboutOwner' : {
        //                 'ownerName': 'Lindsay Bluth'
        //             }
        //         })
        //     };

        //     const expectedItems = {
        //         name: "Lindsay Bluth's Original Frozen Banana",
        //         city: 'Venice Beach', 
        //         type: 'B&M',
        //         tags: ['Women-Owned'],
        //         keywords:['Desserts'],
        //         shortDesc: '', 
        //         businessId: 'BUSID9',
        //         hours: {}, 
        //         links: {}, 
        //         address: '70 Newport Pier, Newport Beach, CA 92663',
        //         aboutOwner: {
        //             owner: '',
        //             ownerName: 'Lindsay Bluth', 
        //             ownerPhone: '123-456-7890',
        //             ownerDesc: '',
        //             photo: ''
        //         },
        //         lister: 'George Michael Bluth'
        //     }; 

        //     // act
        //     const result = await putEditBusinessPageHandler(event);

        //     // assert
        //     expect(result.body.results).toEqual(expectedItems);
        //     expect(updateSpy).toHaveBeenCalledWith({
        //        TableName: BUSINESS_TABLE,
        //        Key: {
        //         "businessId": 'BUSID9'
        //         }, 
        //        UpdateExpression: `set name =:a, aboutOwner.ownerName = :b`,
        //        ExpressionAttributeValues: { 
        //         ":a": "Lindsay Bluth's Original Frozen Banana", 
        //         ":b": "Lindsay Bluth"
        //        },
        //        ReturnValues: "UPDATED_NEW"
        //     });
        // }); 

        // it('Should update value of multiple simple target fields', async () => {
        //     // arrange
        //     mockUpdateResults = 
        //     {
        //         name: "Lindsay Bluth's Original Frozen Banana",
        //         city: 'Venice Beach', 
        //         type: 'Online',
        //         tags: ['Women-Owned'],
        //         keywords:['Desserts'],
        //         shortDesc: '', 
        //         businessId: 'BUSID11',
        //         hours: {}, 
        //         links: {}, 
        //         address: '70 Newport Pier, Newport Beach, CA 92663',
        //         aboutOwner: {
        //             owner: '', 
        //             ownerName: 'Lindsay Bluth', 
        //             ownerPhone: '123-456-7890', 
        //             ownerDesc: '', 
        //             photo: ''
        //         },
        //         lister: 'George Michael Bluth'
        //     }; 

        //     updateSpy.mockReturnValue({
        //         promise: () => Promise.resolve({ Items: mockUpdateResults }),
        //      });

        //     const event = {
        //         httpMethod: 'PUT',
        //         pathParameters: {
        //             'businessId': 'BUSID11'
        //         }, 
        //         body: JSON.stringify({
        //             'name' : "Lindsay Bluth's Original Frozen Banana", 
        //             'type': "Online"
        //         })
        //     };

        //     const expectedItems = {
        //         name: "Lindsay Bluth's Original Frozen Banana",
        //         city: 'Venice Beach', 
        //         type: 'Online',
        //         tags: ['Women-Owned'],
        //         keywords:['Desserts'],
        //         shortDesc: '', 
        //         businessId: 'BUSID11',
        //         hours: {}, 
        //         links: {}, 
        //         address: '70 Newport Pier, Newport Beach, CA 92663',
        //         aboutOwner: {
        //             owner: '',
        //             ownerName: 'Lindsay Bluth', 
        //             ownerPhone: '123-456-7890',
        //             ownerDesc: '',
        //             photo: ''
        //         },
        //         lister: 'George Michael Bluth'
        //     }; 

        //     // act
        //     const result = await putEditBusinessPageHandler(event);

        //     // assert
        //     expect(result.body.results).toEqual(expectedItems);
        //     expect(updateSpy).toHaveBeenCalledWith({
        //        TableName: BUSINESS_TABLE,
        //        Key: {
        //         "businessId": 'BUSID11'
        //         }, 
        //        UpdateExpression: `set name =:a, type = :b`,
        //        ExpressionAttributeValues: { 
        //         ":a": "Lindsay Bluth's Original Frozen Banana", 
        //         ":b": "Online"
        //        },
        //        ReturnValues: "UPDATED_NEW"
        //     });
        // }); 
    }); 
 }); 