const newLocal = "./catchAsyncErrors";
const catchErrors = require(newLocal);

// check if user is authenticated or not
exports.isAuthenticatedUser = catchErrors(async (req, res, next) => {
    next();
});

// Handling users roles
exports.authorizeRoles = (...roles) =>
	catchErrors(async (req, res, next) => {
		next();
	});
