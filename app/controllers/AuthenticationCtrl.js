import StringUtil from '../shared/StringUtil';
import Task from '../models/Task';
import TokenUtil from '../shared/TokenUtil';
import User from '../models/User';

export default class AuthenticationCtrl {
  /**
   * Logic for login
   * @param {*} req 
   * @param {*} res 
   */
  static login(req, res) {
    const body = req.body;


    User.findUserByEmail(body.email).then((user) => {
      if (!user) {
        res.status(404).send({ error: 'User with email does not exist.' });
      } else {
        if (StringUtil.comparePasswords(body.password, user.password)) {
          const jwt = TokenUtil.generateToken(user);
          const details = {
            id: user._id,
            name: user.name,
            email: user.email,
            recentHire: user.recentHire,
            role: user.role
          };
          res.status(200).send({user: details, jwt});
        } else {
          res.status(401).send({ error: 'Invalid password.' });
        }
      }
    }).catch((err) => {
      res.status(err.code).send({ error: err.error});
    });
  }

  /**
   * Logic for creating a user
   * @param {*} req 
   * @param {*} res 
   */
  static signup(req, res, next) {
    const body = req.body;

    let user = new User({
      name: body.name,
      email: body.email,
      password: StringUtil.hashPassword(body.password),
      phone: body.phone,
      department: body.department,
      recentHire: body.recentHire,
      secret: body.secret
    });

    User.createUser(user).then((result) => {
      if (!body.recentHire) {
        res.status(201).send({ message: `${result.name} was created successfully as a/an ${result.role}.` });
      } else {
        body.onboardingList = req.department.onboardingList;
        body.assignee = user.name;

        Task.createMultiple(body, req.user.name)
        .then((result) => {
            res.status(201).send({ message: `${result.name} was created and onboarded successfully as a/an ${result.role}.` });
          })
          .catch((err) => {
            res.status(201).send({ error: `${result.name} was created successfully as a/an ${result.role} but onboarding was unsuccessful.` });
          });
      }
      //TODO: Send Email to employee with details
    }).catch((err) => {
      res.status(err.code).send({ error: err.error});
    });
  }

  /**
   * Logic for forgot password
   * @param {*} req 
   * @param {*} res 
   */
  static forgotPassword(req, res) {
    const body = req.body;

    User.findUserByEmail(body.email).then((user) => {
      if (!user) {
        res.status(404).send({ error: 'User does not exist.' });
      } else if (body.secret !== user.secret) {
        res.status(401).send({ error: 'Invalid Secret.' });
      } else {
        user.password = StringUtil.hashPassword(body.password);
        
        user.save((err) => {
          if (err) {
            res.status(500).send(err);
          } else {
            res.status(200).send({ message: 'Password change successful.' });
          }
        });
      }
    })
    .catch((err) => {
      res.status(err.code).send({ error: err.error });
    });
  }
}