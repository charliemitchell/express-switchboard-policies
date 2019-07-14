module.exports = function buildErrorMessage (err, req) {
  if (err.message && err.message.match && err.message.match(/then is not a function/)) {
    err.message = [
      'There was an error implementing a switchboard policy.',
      `URL: ${req.originalUrl}.`,
      'Error Detection: Your policy must return a promise. Did you return a promise?',
      '',
      'Original Error:',
      err.message
    ].join('\n');
  } else {
    err.message = [
      'There was an error implementing a switchboard policy.',
      `URL: ${req.originalUrl}.`,
      'Error Detection: N/A',
      '',
      'Original Error:',
      err.message
    ].join('\n');
  }
}