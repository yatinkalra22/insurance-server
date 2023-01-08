const express = require("express");
const router = express.Router();
const {
  autoInsuranceEligibility,
  disabilityInsuranceEligibility,
  homeInsuranceEligibility,
  lifeInsuranceEligibility,
} = require("../../../helper/eligibilityValidation");

router.post("/calculate", async (req, res, next) => {
  let response = {};
  let message = "Oops, Something went wrong!";
  try {
    const { risk_questions: riskQuestions } = req.body;
    const riskQuestionsSum = riskQuestions.reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      0
    );
    response.auto = autoInsuranceEligibility(riskQuestionsSum, req.body);
    response.disability = disabilityInsuranceEligibility(
      riskQuestionsSum,
      req.body
    );
    response.home = homeInsuranceEligibility(riskQuestionsSum, req.body);
    response.life = lifeInsuranceEligibility(riskQuestionsSum, req.body);
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
