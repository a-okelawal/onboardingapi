import StringUtil from '../shared/StringUtil';
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


    AuthenticationCtrl.findUser(body).then((user) => {
      if (!user) {
        res.status(404).send({ error: 'User with email does not exist.' });
      } else {
        if (StringUtil.comparePasswords(body.password, user.password)) {
          const jwt = TokenUtil.generateToken(user);
          const details = {
            id: user._id,
            name: user.name,
            email: user.email,
            recentHire: user.recentHire
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
  static signup(req, res) {
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

    AuthenticationCtrl.createUser(user).then((result) => {
      res.status(201).send({ message: `${result.name} was created successfully as a/an ${result.role}.` });
      //TODO: Send Email to employee with details
    }).catch((err) => {
      res.status(err.code).send({ error: err.error});
    });
  }

  static forgotPassword(req, res) {
    const body = req.body;

    AuthenticationCtrl.findUser(body).then((user) => {
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

  /**
   * Save User
   * @param {*} user 
   */
  static createUser(user) {
    return new Promise((resolve, reject) => {
      AuthenticationCtrl.findUser(user).then((result) => {
        if (result) {
          reject({ code: 409, error: 'User with email already exists.' });
        } else {
          user.save((err) => {
            if (err) {
              reject({ code: 500, error: err });
            } else {
              resolve(user);
            }
          });
        }
      }).catch((err) => {
        reject(err);
      });
    });
  }

  /**
   * Find User
   * @param {*} data 
   */
  static findUser(data) {
    return new Promise((resolve, reject) => {
      User.findOne({ email: data.email }, (err, user) => {
        if (err) {
          reject({ code: 500, error: err});
        } else {
          resolve(user);
        }
      });
    });
  }
}