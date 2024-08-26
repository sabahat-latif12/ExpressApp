const { response } = require("../app");
const {
  getallUsers,
  createUser,
  deleteUser,
  getUser,
  updateUserdata,
} = require("../models/userModel");
const { getRole } = require("../models/commonModel");
const responseHandler = require("../responseHandeler");
const student = [];

module.exports = {
  create: async (req, res) => {
    try {
      // //student.push(req.body);
      // let { username, password } = req.body;
      // let isExist = false;
      // student.map((user) => {
      //   if (user.username == username) {
      //     //return res.send("Student already Exist");
      //     isExist = true;
      //   }
      // });
      // if (!isExist) {
      //   password = await hash(password, 10);
      //   student.push({ username, password });
      //   return res.send({
      //     response: {
      //       username,
      //       password,
      //     },
      //   });
      // } else {
      //   return res.send("Student already Exist");
      // }
      const role = await getRole(req.body);
      // console.log(role);
      if (role.error) {
        return res.send({ error: role.error });
      }
      // const user = await createUser(req.body);
      console.log(role.response.dataValues);
      delete req.body.role;
      req.body.roleId = role.response.dataValues.roleId;

      const user = await createUser(req.body);
      responseHandler(user, res);
    } catch (error) {
      //console.log(error);
      return res.send({
        error: error.message,
      });
    }
  },
  getAll: async (req, res) => {
    try {
      req.query.offset = (req.query.pageNo - 1) * req.query.limit;
      const users = await getallUsers(req.query);
      responseHandler(users, res);
    } catch (error) {
      return res.send({
        error: error.message,
      });
    }
  },
  dell: async (req, res) => {
    //   try {
    //     const { username, password } = req.query;
    //     const index = student.findIndex((user) => user.username === username);

    //     if (index !== -1) {
    //       // const user = ;
    //       if (student[index].password === password)
    //         // Remove the user from the array
    //         student.splice(index, 1);
    //       return res.send({
    //         response: `User deleted with username: ${req.query.username}`,
    //       });
    //     } else {
    //       return res.send({
    //         response: "student does not exist",
    //       });
    //     }
    //   } catch (error) {
    //     return response.send({
    //       error: error,
    //     });
    //   }
    // },
    // getStudent: async (req, res) => {
    //   try {
    //     const { username, password } = req.query;
    //     for (let i = 0; i < student.length; i++) {
    //       if (student[i].username === username) {
    //         const isValidatePassword = await compare(
    //           password,
    //           student[i].password
    //         );
    //         if (isValidatePassword) {
    //           // console.log("error here ", error);
    //           return res.send({
    //             "user exist": student[i],
    //           });
    //         }
    //       }
    //     }
    //     return res.send("student does not exist");
    //   } catch (error) {
    //     return res.send({
    //       error: error.message,
    //     });
    //   }
    try {
      const user = await deleteUser(req.query);
      responseHandler(user, res);
    } catch (error) {
      return res.send({
        error: error.message,
      });
    }
  },
  update: async (req, res) => {
    try {
      const user = await updateUser(req.body);
      responseHandler(user, res);
    } catch (error) {
      return res.send({
        error: error.message,
      });
    }
  },
  get_User: async (req, res) => {
    /*try {
      const { username, password } = req.query;
  
      for (let i = 0; i < user.length; i++) {
        if (user[i].username === username) {
          const isValidatePassword = await compare(password, user[i].password);
          if (isValidatePassword) {
            return res.send({ "User exists": user[i] });
          }
        }
      }
      return res.send("No User exists with such credentials");
    } catch (error) {
      console.log("ERROR----> ", error.message);
    }*/
    try {
      const user = await getUser(req.query);
      responseHandler(user, res);
    } catch (error) {
      return res.send({
        error: error.message,
      });
    }
  },
};
