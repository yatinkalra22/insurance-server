const express = require("express");
const router = express.Router();
const {
  autoInsuranceEligibility,
  disabilityInsuranceEligibility,
  homeInsuranceEligibility,
  lifeInsuranceEligibility,
  calculateAgeAndIncomeRange,
} = require("../../../helper/eligibilityValidation");
const { riskCalculateBodySchema } = require("../../../middleware/validatePayload");

router.post("/calculate", async (req, res, next) => {
  let response = {};
  let message = "Oops, Something went wrong!";
  try {
    const { age, dependents, income, risk_questions: riskQuestions } = req.body;
    const validateBody = riskCalculateBodySchema.validate(req.body);
    if (validateBody.error) throw new Error(validateBody.error);
    const riskQuestionsSum = riskQuestions.reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      0
    );
    const ageAndHomeRange = calculateAgeAndIncomeRange(
      riskQuestionsSum,
      req.body
    );
    response.auto = autoInsuranceEligibility(ageAndHomeRange, req.body);
    response.disability = disabilityInsuranceEligibility(
      ageAndHomeRange,
      req.body
    );
    response.home = homeInsuranceEligibility(ageAndHomeRange, req.body);
    response.life = lifeInsuranceEligibility(ageAndHomeRange, req.body);
    message = "Insurance Eligibility Checked Successfully";
    res.status(200).json({
      message,
      data: response,
    });
  } catch (error) {
    console.log("error: ", error);
    next(error);
  }
});

module.exports = router;
