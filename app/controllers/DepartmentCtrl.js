import Department from '../models/Department';

export default class DepartmentCtrl {
  /**
   * Function to create a department
   * @param {*} req 
   * @param {*} res 
   */
  static create(req, res) {
    const body = req.body;

    Department.create(body)
      .then((department) => {
        res.status(201).send({ message: `${department.name} created successfully.`, department });
      })
      .catch((err) => {
        res.status(err.code).send({error: err.error});
      });
  }

  /**
   * Function to get all departments
   * @param {*} req 
   * @param {*} res 
   */
  static read(req, res) {
    const body = req.body;

    Department.find({}, (err, departments) => {
      if (err) {
        res.status(500).send({ error: err });
      } else {
        res.status(200).send(departments);
      }
    });
  }

  /**
   * Update a department
   * @param {*} req 
   * @param {*} res 
   */
  static update(req, res) {
    const body = req.body;
    const id = req.params.id;

    Department.findDeptById(id).then((result) => {
      ['name', 'onboardingList'].forEach((key) => {
        if (body[key]) {
          result[key] = body[key];
        }
      });

      result.save((err) => {
        if (err) {
          res.status(500).send({ error: err });
        } else {
          res.status(200).send({ message: `${result.name} was updated successfully.` });
        }
      });
    }).catch((err) => {
      res.status(err.code).send({ error: err.error});
    });
  }
}