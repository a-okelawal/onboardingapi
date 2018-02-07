import mongoose, { Promise } from 'mongoose';

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  onboardingList: [{
    type: String,
    required: true
  }]
});

const Department = mongoose.model('Department', departmentSchema);

Department.create = function(body) {
  return new Promise((resolve, reject) => {
    this.findByName(body.name).then((err, department) => {
      if (err) {
        reject({ code: 500, error: err });
      } else if (department) {
        reject({ code: 409, error: 'Department already exists.' });
      } else {
        department = new Department({
          name: body.name,
          onboardingList: body.onboardingList
        });

        department.save((err) => {
          if (err) {
            reject({ code: 500, error: err });
          } else {
            resolve(department);
          }
        });
      }
    })
  });
};

Department.findDeptById = function(id) {
  return new Promise((resolve, reject) => {
    this.findById(id, (err, department) => {
      if (err) {
        reject({ code: 500, error: err });
      } else if (!department) {
        reject({ code: 404, error: 'Department does not exist.' });
      } else {
        resolve(department);
      }
    });
  });
};

Department.findByName = function(name) {
  return new Promise((resolve, reject) => {
    this.findOne({ name: name }, (err, department) => {
      if (err) {
        reject({ code: 500, error: err });
      } else {
        resolve(department);
      }
    });
  });
};

export default Department;