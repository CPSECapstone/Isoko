/**
 * Returns a properly formatted 400 response with message in the body.
 * @param {string} message
 */
const get400Response = (message) => ({
   statusCode: 400,
   body: {
      error: message,
   },
});

module.exports = {
   get400Response,
};
