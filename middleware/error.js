module.exports = (err, req, res, next) => {
  res.status(err.statusCode ? err.statusCode : 500).json({
    message: err.customMessage ? err.customMessage : "Please contact the ADMIN",
  });
};
