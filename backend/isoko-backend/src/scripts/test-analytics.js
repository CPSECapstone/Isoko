const { BetaAnalyticsDataClient } = require('@google-analytics/data');
// process.env.GOOGLE_APPLICATION_CREDENTIALS = './isoko-analytics-862851deac41.json';

const analyticsDataClient = new BetaAnalyticsDataClient({
   credentials: {
      client_email:
         'starting-account-585efi3ey7zs@isoko-analytics-1652295239381.iam.gserviceaccount.com',
      client_id: '105828697375770755794',
      private_key:
         '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDSljnhSluyYR1+\nUOZW3+35KhY8J1yfE/nm05tUpnpROX0C4ndPqZhSnkIBFKBaTxaG2HvtDvLC+Lj1\nly37QmKSSkhttTxFhGxIoWebBUx33MFh+kmMgXn6tac4+k1gC1XtvfoUL7AC6dqe\nyK07f3///jtVN5jDg/NgY3w+5ffXyEU/59JHo4I6eHGwGYqFQyptMBunhco5XwQn\noNoVVk8BBcp85uDl8ZoM1+rJWZe6mBsCv0sAgEyTC6eux4MP7y6VNWmFDFolkZic\nAux+Rv09rRGnjI2rlpou3hSq8qU0UbCmY/KGDlz6q9xRnJgAONo8JZQUAGAiONt0\ndyTdR9A/AgMBAAECggEANHLC7qgI54gFgvjeLYPvLq/7Qrcg++PLSWCpnq8p5sH1\nLzs9MQOR0v3kfYVoHKX2+9W+I8Al2UZ+NniVNK+Hglzq5hwN61h8aah9d+Add/rs\n1RyzpcF3omgMwoWgsMuR9rjqqI1p/ofE8egUMS3jsNveZi6HJybdfkO45ad8D2s3\ngAvZatzLbU0qP4CYywYRJBiC/1B8N2gvlCMNFqMQLb71Rj8h8YhL3u/DSGxrogIl\n4a0M2vmIndl+fjNH0JiDeunj59n0MW7g4mbiZ2PhMBEOZKPOh7Ur1V7r+Ws13cPh\nXl5TRHgnA5dNI3dHPIHGVEXwFFc6Yv/J4WBy0LNqyQKBgQDzNZ7kaVbSWmMBqXD0\n33UzU7OlKpu5/3T4m7V5icuuo50nUMJ/E8VpMp8mEAKx+gY8j39FkliMN5Q3MD0B\nMvVa+RMFPmL1H2C8FCxJaJ72iH8z/LjsUmlY+tC7q6jn12SwAvSvvZ1hgz68e0MZ\nmwib7X/OMWA2Z+FEINzBtXn59wKBgQDdqWZuXO2FRMHPd7PVRnboyRSWTC1Mtngg\nIml40BvotbDsjdaiWYVK3Eg2sBs2LCIbfp02241Rl36uFPHxMnSnVeFmi+B3xKeZ\nXCuZgVphyOnaePjsgVcLMfxXRkU13tLW9mQznK9BX6D+w3+2T8egbr+NPxXH117I\nuGfv6HYJ+QKBgQC2jI3J9gMz+qILsknVkxBeSTozA+tFTahXnlA1fKdEWwxvYR/L\n0GRBlLx+DlBnlDowJKkr6C/Mdz8puWxgxQYClaegLPaL9FRgd2fSZdPDSiroM439\n29G09vXLl4o9EqBBuMY+Tr2dXqytPnvb8VEh8L8YXllQHOKph10LjJKUewKBgAXM\n8AxFTEXnhbbbKA6VuHjhAjPorGrMf5o/rEjoEULmtkmKcKpw80cBOraLpzqkrwPP\nLWgJGMqgz0TY8XfhXSIf4jUfxfD8aXJe8hkjRG04p7362nC99bwqQ7M4+IivWw8b\nBYZAPGnWic0A6q+nqM6u9z5H/1bqcOWJxdaGW8hpAoGALbCyEQeiN/I0Offyn7qT\nyZpUYrFTEm+SUwaSeG3LgYrpiO0HxtsWaCo87oRoEWcPXl+eVcgQ3ZM1Yq5+nbYA\nsk8inwhzuRVK4wjR03VdMEibswEkpoU9NH/BcI/PUm04ZAeJvsBCOC4AUBngNGBb\nOGk0XJPG0pfqpY/zgp0MAz4=\n-----END PRIVATE KEY-----\n',
   },
});

propertyId = '310596210';

async function runReport() {
   const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
         {
            startDate: '2020-03-31',
            endDate: 'today',
         },
      ],
      dimensions: [
         {
            name: 'date',
         },
         {
            name: 'pagePath',
         },
      ],
      metrics: [
         {
            name: 'eventCount',
         },
         {
            name: 'eventCountPerUser',
         },
      ],
      dimensionFilter: {
         filter: {
            fieldName: 'pagePath',
            stringFilter: {
               matchType: 'ENDS_WITH',
               value: '-2128652088',
            },
         },
      },
   });

   console.log('Report result:');
   console.log(response);
   // console.log(response.rows[0].metricValues);
   // response.rows.forEach(row => {
   //   console.log(row.dimensionValues, row.metricValues[0]);
   // });

   console.log(response.rows.map((row) => row.metricValues[0].value));
}

runReport();
