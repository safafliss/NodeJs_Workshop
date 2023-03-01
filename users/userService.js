var user = require("./userModel");

function add(req, res, next) {
  console.log(req.params);
  new user({
    name: req.params.name,
    pwd: req.params.pwd,
  }).save((err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
      res.json(data);
    }
  });
}

list = async (req, res, next) => {
  try {
    await user.find().then((data) => {
      console.log(data);
      res.status(200).json(data);
    });
  } catch {
    (err) => res.status(500).json(err);
  }
};

addUser = async (req, res, next) => {
  console.log(req.body);
  await new user({
    name: req.body.name,
    pwd: req.body.pwd,
  }).save((err, data) => {
    if (err) {
      res.status(500).json(err);
    } else {
      console.log(data);
      res.status(200).json(data);
    }
  });
};

modifUser = async (req, res, next) => {
  try {
    await user.findByIdAndUpdate(req.params.id, { $set: req.body });
    res.status(200).json(itemToUpdate);
  } catch (error) {
    res.json(error);
  }
};
// const updateUser = async (req, res, next) => {
//     try {
//         const { id } = req.params;
//         const { name, pwd } = req.body;
//         const useru = await user.findById(id);
//         console.log("update user");
//         console.log(useru);
//         if (name && pwd) {
//             useru.name = name;
//             useru.pwd = pwd;
//         }
//         let u = await useru.save();
//         return res.status(201).json(u);
//     } catch (error) {
//         return res.status(500).json({ msg: 'error' + error})
//     }
// }

deleteUser = async (req, res, next) => {
  try {
    await user.findByIdAndDelete(req.params.id);
    res.status(200).json("user deleted !");
  } catch (error) {
    res.json(error);
  }
};

module.exports = { add, list, addUser, deleteUser, modifUser};
