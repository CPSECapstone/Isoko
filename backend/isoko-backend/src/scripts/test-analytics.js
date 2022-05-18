const {BetaAnalyticsDataClient} = require('@google-analytics/data');
process.env.GOOGLE_APPLICATION_CREDENTIALS = './isoko-analytics-862851deac41.json'; 

const analyticsDataClient = new BetaAnalyticsDataClient();

propertyId = "310596210"

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
      dimensionFilter: {
        filter: {
          fieldName: "pagePath",
          stringFilter: {
            matchType: 'ENDS_WITH',
            value: '-2128652088',
          }
        }
      },
    });

    console.log('Report result:');
    console.log(response); 
    // console.log(response.rows[0].metricValues); 
    response.rows.forEach(row => {
      console.log(row.dimensionValues[0], row.metricValues[0]);
    });
  }

  runReport();