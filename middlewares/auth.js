const newLocal = "./catchAsyncErrors";
const catchErrors = require(newLocal);
const { query } = require('../database/database.js');
// check if user is authenticated or not
exports.isAuthenticatedUser = catchErrors(async (req, res, next) => {
    next();
});

// Handling users roles
exports.authorizeRoles = (...roles) =>
	catchErrors(async (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			return next(
				new ErrorHandler(
					"You are not authorized to access this resource.",
					403,
				),
			);
		}
		next();
	});
