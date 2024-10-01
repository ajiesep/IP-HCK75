module.exports = (error, req, res, next) => {
  let status = error.status || 500,
    message = error.message || "Internal Server Error";
  console.log(error.name, error.message, error.status, "ini error handler");

  switch (error.name) {
    case "emailorpasswordempty":
      status = 400;
      message = "Email and password is required";
      break;
    case "InvalidUser":
      status = 400;
      message = "Invalid email or password";
      break;
    case "SequelizeUniqueConstraintError":
    case "SequelizeValidationError":
      status = 400;
      message = error.errors[0].message;
      break;
    case "InvalidToken":
    case "JsonWebTokenError":
      status = 401;
      message = "Unauthenticated";
      break;
    case "Forbidden":
      status = 403;
      message = "You are not authorized";
      break;
    case "NotFound":
      status = 404;
      message = "Data not found";
      break;
    default:
      status = 500;
      message = "Internal Server Error";
      break;
  }
  res.status(status).json({ message });
  // if (!res.headersSent) {
  //   res.status(status).json({ message });
  // } else {
  //   console.warn("Headers already sent, cannot modify the response");
  // }
};

// module.exports = (error, req, res, next) => {
//   let status = error.status || 500;
//   let message = error.message || "Internal Server Error";

//   // Log the full error details for debugging purposes
//   console.error(`[Error Handler] ${error.name}: ${error.message}`, error.stack);

//   // Custom error handling based on error name
//   switch (error.name) {
//     case "emailorpasswordempty":
//       status = 400;
//       message = "Email and password are required";
//       break;
//     case "InvalidUser":
//       status = 400;
//       message = "Invalid email or password";
//       break;
//     case "SequelizeUniqueConstraintError":
//     case "SequelizeValidationError":
//       status = 400;
//       message = error.errors ? error.errors[0].message : "Validation error";
//       break;
//     case "InvalidToken":
//     case "JsonWebTokenError":
//       status = 401;
//       message = "Unauthenticated";
//       break;
//     case "Forbidden":
//       status = 403;
//       message = "You are not authorized";
//       break;
//     case "NotFound":
//       status = 404;
//       message = "Data not found";
//       break;
//     default:
//       status = 500;
//       message = "Internal Server Error";
//       break;
//   }

//   // Send the error response and ensure no further response is sent
//   if (!res.headersSent) {
//     res.status(status).json({ message });
//   } else {
//     console.warn("Headers already sent, cannot modify the response");
//   }
// };
