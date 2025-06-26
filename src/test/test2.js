import joi from "joi";
const user = {
  name: "ahmed",
  age: 20,
  email: "ahmed@gmail.com",
  password: "123456",
  confirmPassword: "123456",
  isMarried: true,
  skills: [{ frontEnd: ["html", "css"] }],
};

// schema (expected, rules, guidelines)
const schema = joi
  .object({
    name: joi.string().min(3).max(20).required(),
    age: joi.number().min(18).max(80).required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword: joi
      .string()
      .valid(joi.ref("password"))
      .required(),
    isMarried: joi.boolean(),
    skills: joi
      .array()
      .items(
        joi.object({
          frontEnd: joi.array().items(joi.string().required()),
        }).required()
      )
      .required(),
  }).required();

  const { error, value } = schema.validate(user, { abortEarly: false });

  if (error) {
    console.error("Validation Error:", error.details);
  } else {
    console.log("Validation Success:", value);
  }
