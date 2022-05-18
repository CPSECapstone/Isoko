const { get400Response } = require('../util/response-utils');
const { BetaAnalyticsDataClient } = require('@google-analytics/data');
const {
   GA_CREDENTIALS,
   GA_METRICS_START_DATE,
   GA_PROPERTY_ID,
} = require('../../constants');
const analyticsDataClient = new BetaAnalyticsDataClient({
   credentials: GA_CREDENTIALS,
});

/**
 * HTTP get method to get page views for a specified businessId. Returns a list
 * of date strings each representing a single page view for the business on a
 * given date. Date is in format of YYYYMMDD.
 */
exports.getBusinessPageViewsHandler = async (event) => {
   if (event.httpMethod !== 'GET') {
      return get400Response(
         `getBusinessPage only accept GET method, you tried: ${event.httpMethod}`
      );
   }

   console.info('received:', event);
   const { businessId } = event.pathParameters;

   if (businessId == null) {
      return get400Response(
         `Missing query parameter 'businessId'. Request URL format: GET/business/{businessId}`
      );
   }

   let response;

   try {
      const [pageViewsReport] = await analyticsDataClient.runReport({
         property: `properties/${GA_PROPERTY_ID}`,
         dateRanges: [
            {
               startDate: GA_METRICS_START_DATE,
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
         // Filter by all events for viewing a pagePath that ends in businessId
         // i.e. business/{businessId}
         dimensionFilter: {
            filter: {
               fieldName: 'pagePath',
               stringFilter: {
                  matchType: 'ENDS_WITH',
                  value: businessId,
               },
            },
         },
      });

      // Only grab dimensionValues[0] b/c we only care about the date of the event
      const pageViewEventDates = pageViewsReport.rows.map(
         (row) => row.dimensionValues[0].value
      );

      response = {
         statusCode: 200,
         body: JSON.stringify(pageViewEventDates),
         headers: {
            'content-type': 'json',
            'access-control-allow-origin': '*',
         },
      };
   } catch (err) {
      response = get400Response(err.message);
   }

   console.info(
      `response from: ${event.path} statusCode: ${
         response.statusCode
      } body: ${JSON.stringify(response.body)}`
   );
   return response;
};
