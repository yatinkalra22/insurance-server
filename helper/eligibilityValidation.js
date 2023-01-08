const { IStatus, IOwnershipStatus, IMaritalStatus } = require("../types/index");

const transformRisk = (range = 0) => {
  const regularRange = [1, 2];
  if (regularRange.includes(range)) {
    return IStatus.Regular;
  }
  if (range >= 3) {
    return IStatus.Responsible;
  }
  return IStatus.Economic;
};

const calculateAgeAndIncomeRange = (range = 0, body) => {
  const { income, age } = body;
  if (age < 30) {
    range -= 2;
  } else if (age >= 30 && age <= 40) {
    range -= 1;
  }
  if (income > 200000) {
    range -= 1;
  }
  return range;
};

const autoInsuranceEligibility = (range = 0, body) => {
  const { vehicle } = body;
  const currentYear = new Date().getFullYear();

  if (!vehicle) {
    return IStatus.Ineligible;
  }
  const yearDifference = Math.abs(currentYear - vehicle.year);

  if (yearDifference <= 5) {
    range += 1;
  }

  range = calculateAgeAndIncomeRange(range, body);
  return transformRisk(range);
};

const disabilityInsuranceEligibility = (range = 0, body) => {
  const {
    house,
    income,
    age,
    marital_status: maritalStatus,
    dependents,
  } = body;
  if (!income || age > 60) {
    return IStatus.Ineligible;
  }
  if (house.ownership_status === IOwnershipStatus.Mortgaged) {
    range += 1;
  }
  if (dependents) {
    range += 1;
  }
  if (maritalStatus === IMaritalStatus.Married) {
    range -= 1;
  }

  range = calculateAgeAndIncomeRange(range, body);
  return transformRisk(range);
};

const homeInsuranceEligibility = (range = 0, body) => {
  const { house } = body;
  if (!house) {
    return IStatus.Ineligible;
  }
  if (house.ownership_status === IOwnershipStatus.Mortgaged) {
    range += 1;
  }

  range = calculateAgeAndIncomeRange(range, body);
  return transformRisk(range);
};

const lifeInsuranceEligibility = (range = 0, body) => {
  const {
    house,
    income,
    vehicle,
    marital_status: maritalStatus,
    age,
    dependents,
  } = body;
  if (dependents) {
    range += 1;
  }

  if (maritalStatus === IMaritalStatus.Married) {
    range += 1;
  }

  range = calculateAgeAndIncomeRange(range, body);
  return transformRisk(range);
};

module.exports = {
  autoInsuranceEligibility,
  disabilityInsuranceEligibility,
  homeInsuranceEligibility,
  lifeInsuranceEligibility,
};
