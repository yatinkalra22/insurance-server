const Joi = require("joi");
const { IMaritalStatus } = require("../types/index");

const riskCalculateBodySchema = Joi.object({
  age: Joi.number().min(0).required(),
  dependents: Joi.number().min(0).required(),
  house: Joi.required(),
  income: Joi.number().min(0).required(),
  risk_questions: Joi.array().items(Joi.number().min(0).max(1)).length(3),
  marital_status: Joi.string().valid(
    IMaritalStatus.Married,
    IMaritalStatus.Single
  ),
  vehicle: Joi.required(),
});

module.exports = { riskCalculateBodySchema };
