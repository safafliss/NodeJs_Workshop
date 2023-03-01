const yup = require("yup");
const validate = async (req, res, next) => {
  console.log("validation");
  try {
    const schema = yup.object().shape({
      name: yup.String().required(),
      pwd: yup.Number().required(),
    });
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (err) {
    res.status(400).json({ error: err.error });
  }
};
module.exports = validate;
