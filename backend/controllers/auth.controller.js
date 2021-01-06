const User = require("../models/auth.model");
const expressJwt = require("express-jwt");
const _ = require("lodash");
const fetch = require("node-fetch");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
//Custom error handlers to get useful errors
const { errorHandler } = require("../helpers/dbErrorHandling");
const nodemailer = require("nodemailer");
const { OAuth2Client } = require("google-auth-library");

var smtpTransport = nodemailer.createTransport({
  service: "gmail",
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_ID,
    pass: process.env.MAIL_PASS,
  },
});

exports.registerController = (req, res) => {
  const { name, email, password } = req.body;
  const errors = validationResult(req);
  const token = jwt.sign(
      {
        name,
        email,
        password,
      },
      process.env.JWT_ACCOUNT_ACTIVATION,
      {
        expiresIn: "15m",
      }
    );

    const emailData = {
      from: process.env.MAIL_ID,
      to: email,
      subject: "Account activation Link",
      html: `
       <h1>Please Click to link to activate</h1>
       <p>${process.env.CLIENT_URL}/users/activate/${token}</p>
       <hr/>
       <p>This email contains sensitive info</p>
       <p>${process.env.CLIENT_URL}</p>
     `,
    };

  if (!errors.isEmpty()) {
    const firstError = errors.array().map((error) => error.msg)[0];
    return res.status(422).json({
      error: firstError,
    });
  } else {
    User.findOne({
      email,
    }).exec((err, user) => {
      //if user exists
      if (user) {
        res.status(400).json({
          error: "Email is taken",
        });
        return;
      } else {
        //Generate Token
    

        smtpTransport.sendMail(emailData, (err, info) => {
      if (err) {
        return res.status(400).json({
          err: err,
          success: false,
          errors: errorHandler(err),
        });
      } else {
        return res.json({
          message: `Email has been sent to ${email}`,
        });
      }
    });
      }
    });

    

    
  }
};

//Activation and save to database
exports.activationController = (req, res) => {
  const { token } = req.body;

  if (token) {
    //verify wheter token is valid or not or expired
    jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          error: "Expired Token. Signup again",
        });
      } else {
        const { name, email, password } = jwt.decode(token);
        const user = new User({
          name,
          email,
          password,
        });
        user.save((err, user) => {
          if (err) {
            return res.status(401).json({
              error: errorHandler(err),
            });
          } else {
            return res.json({
              success: true,
              message: "Signup Success",
            });
          }
        });
      }
    });
  } else {
    res.json({
      message: "error happening. Please Try again",
    });
  }
};

exports.loginController = (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const firstError = errors.array().map((error) => error.msg)[0];
    return res.status(422).json({
      errors: firstError,
    });
  } else {
    User.findOne({
      email,
    }).exec((err, user) => {
      if (err || !user) {
        return res.status(400).json({
          errors: "User with that email does not exist",
        });
      }

      if (!user.authenticate(password)) {
        return res.status(400).json({
          errors: "Email and password do not match",
        });
      }

      const token = jwt.sign(
        {
          _id: user._id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      const { _id, name, email, role, posts } = user;

      return res.json({
        token,
        user: {
          _id,
          name,
          email,
          role,
          posts
        },
      });
    });
  }
};

exports.forgetController = (req, res) => {
  const { email } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = error.array().map((error) => error.msg)[0];
    return res.status.json({
      error: firstError,
    });
  } else {
    User.findOne(
      {
        email,
      },
      (err, user) => {
        if (err || !user) {
          return res.status(400).json({
            error: "User does not exists",
          });
        }

        const token = jwt.sign(
          {
            _id: user._id,
          },
          process.env.JWT_RESET_PASSWORD,
          {
            expiresIn: "10m",
          }
        );

        //Send email with this token
        const emailData = {
          from: process.env.MAIL_ID,
          to: email,
          subject: "Password Reset Link",
          html: `
       <h1>Please Click to link to reset your password</h1>
       <p>${process.env.CLIENT_URL}/users/resetpassword/${token}</p>
       <hr/>
       <p>This email contains sensitive info</p>
       <p>${process.env.CLIENT_URL}</p>
     `,
        };

        user.updateOne({ resetPasswordLink: token }, (err, success) => {
          if (err) {
            return res.status(400).json({
              error: errorHandler(err),
            });
          } else {
            smtpTransport.sendMail(emailData, (err, info) => {
              if (err) {
                return res.status(400).json({
                  success: false,
                  errors: errorHandler(err),
                });
              } else {
                return res.json({
                  message: `Email has been sent to ${email}`,
                });
              }
            });
          }
        });
      }
    );
  }
};

exports.resetController = (req, res) => {
  const { resetPasswordLink, newPassword } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map((error) => error.msg)[0];
    return res.status(422).json({
      error: firstError,
    });
  } else {
    if (resetPasswordLink) {
      jwt.verify(resetPasswordLink, process.env.JWT_RESET_PASSWORD, function (
        err,
        decoded
      ) {
        if (err) {
          return res.status(400).json({
            error: "Expired Link. Try again",
          });
        }

        User.findOne({ resetPasswordLink }, (err, user) => {
          if (err || !user) {
            return res.status(400).json({
              error: "Something went wrong. Try again",
            });
          }

          const updatedFields = {
            password: newPassword,
            resetPasswordLink: "",
          };

          user = _.extend(user, updatedFields);

          user.save((err, result) => {
            if (err) {
              return res.status(400).json({
                error: "Error reseting user password",
              });
            }

            res.json({
              message: "Great! Now you can login with new password",
            });
          });
        });
      });
    }
  }
};

const client = new OAuth2Client(process.env.GOOGLE_CLIENT);
exports.googleController = (req, res) => {
  const { idToken } = req.body;
  //Get token from request

  //Verify token
  client
    .verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT })
    .then((response) => {
      const { email_verified, name, email } = response.payload;

      //Check if email is verified
      if (email_verified) {
        User.findOne({ email }).exec((err, user) => {
          //Find if email already exists

          //if exists
          if (user) {
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
              expiresIn: "7d",
            });

            const { _id, email, name, role } = user;
            //Send response to client
            return res.json({
              token,
              user: { _id, email, name, role },
            });
          } else {
            //If user not exists , save it to the database with generated password
            let password = email + process.env.JWT_SECRET;
            user = new User({ name, email, password });
            user.save((err, data) => {
              if (err) {
                return res.status(400).json({
                  error: "User sign up failed with Google",
                });
              }

              const token = jwt.sign(
                {
                  _id: data._id,
                },
                process.env.JWT_SECRET,
                { expiresIn: "7d" }
              );

              const { _id, email, name, role } = data;

              return res.json({
                token,
                user: {
                  _id,
                  email,
                  name,
                  role,
                },
              });
            });
          }
        });
      } else {
        //if error
        return res.status(400).json({
          error: "Google login failed. Try again",
        });
      }
    })
    .catch((err) =>
      res.status(400).json({
        error: "Gogle login closed",
      })
    );
};

exports.facebookController = (req, res) => {
  const { userID, accessToken } = req.body;
  const url = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`;

  //Get from facebook
  return fetch(url, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((response) => {
      const { email, name } = response;
      User.findOne({ email }).exec((err, user) => {
        if (user) {
          const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
          });

          const { _id, email, name, role } = user;
          //Send response to client
          return res.json({
            token,
            user: { _id, email, name, role },
          });
        } else {
          let password = email + process.env.JWT_SECRET;
          user = new User({ name, email, password });
          user.save((err, data) => {
            if (err) {
              return res.status(400).json({
                error: "User signin failed with facebook",
              });
            }

            const token = jwt.sign(
              {
                _id: data._id,
              },
              process.env.JWT_SECRET,
              {
                expiresIn: "7d",
              }
            );
            const { _id, email, name, role } = data;

            return res.json({
              token,
              user: {
                _id,
                email,
                name,
                role,
              },
            });
          });
        }
      });
    })
    .catch((err) => res.json({ error: "Facebook login failed. Try later" }));
};

//Check whether signed in
exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  userProperty: "auth",
  algorithms: ["HS256"],
});

exports.requireAuthentication = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "ACCESS DENIED",
    });
  }
  next();
};

exports.adminMiddleware = (req, res, next) => {
  User.findOne({
    _id: req.profile._id,
  }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }

    if (user.role !== "Admin") {
      return res.status(400).json({
        error: "Admin resource. Access Denied",
      });
    }

    req.profile = user;
    next();
  });
};
