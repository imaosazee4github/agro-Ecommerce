const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((error) => {
    if (res.headersSent) {
      return next(error);
    }

    const status = error.statusCode || 500;
    res.status(status).json({
      message: error.message || 'Something went wrong',
    });
  });
};

export default asyncHandler;



