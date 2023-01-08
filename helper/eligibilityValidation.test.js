const {
  transformRisk,
  calculateAgeAndIncomeRange,
  autoInsuranceEligibility,
  disabilityInsuranceEligibility,
  homeInsuranceEligibility,
  lifeInsuranceEligibility,
} = require("./eligibilityValidation");
const { IStatus, IOwnershipStatus, IMaritalStatus } = require("../types/index");

describe("transformRisk Method", () => {
  it("should return default 'Economic' response when no paramter is passed", () => {
    expect(transformRisk()).toBe(IStatus.Economic);
  });
  it("should return default 'Economic' response when negative value is passed", () => {
    expect(transformRisk(-1)).toBe(IStatus.Economic);
  });
  it("should return 'Regular' response when 1 or 2 value is passed", () => {
    expect(transformRisk(1)).toBe(IStatus.Regular);
    expect(transformRisk(2)).toBe(IStatus.Regular);
  });
  it("should return 'Responsible' response when 3 or greater number value is passed", () => {
    expect(transformRisk(3)).toBe(IStatus.Responsible);
    expect(transformRisk(4)).toBe(IStatus.Responsible);
    expect(transformRisk(100)).toBe(IStatus.Responsible);
  });
});

describe("calculateAgeAndIncomeRange Method", () => {
  const range = 0;
  it("should return input range response when no age and income criteria is matched", () => {
    const riskCriteria = {
      age: 50,
      income: 200,
    };
    expect(calculateAgeAndIncomeRange(range, riskCriteria)).toBe(range);
  });
  it("should return -2 response when age is less then 20", () => {
    const riskCriteria = {
      age: 20,
      income: 200,
    };
    const expectedRespone = -2;
    expect(calculateAgeAndIncomeRange(range, riskCriteria)).toBe(
      expectedRespone
    );
    riskCriteria.age = 0;
    expect(calculateAgeAndIncomeRange(range, riskCriteria)).toBe(
      expectedRespone
    );
  });
  it("should return -1 response when age is less then 20", () => {
    const riskCriteria = {
      age: 30,
      income: 200,
    };
    const expectedRespone = -1;
    expect(calculateAgeAndIncomeRange(range, riskCriteria)).toBe(
      expectedRespone
    );
    riskCriteria.age = 40;
    expect(calculateAgeAndIncomeRange(range, riskCriteria)).toBe(
      expectedRespone
    );
    riskCriteria.age = 35;
    expect(calculateAgeAndIncomeRange(range, riskCriteria)).toBe(
      expectedRespone
    );
  });
  it("should return -1 response when income is more than 20k", () => {
    const riskCriteria = {
      age: 45,
      income: 200001,
    };
    const expectedRespone = -1;
    expect(calculateAgeAndIncomeRange(range, riskCriteria)).toBe(
      expectedRespone
    );
    riskCriteria.income = 300000;
    expect(calculateAgeAndIncomeRange(range, riskCriteria)).toBe(
      expectedRespone
    );
  });
  it("should return -2 response when income is more than 20k and age is between 30 and 40", () => {
    const riskCriteria = {
      age: 30,
      income: 200001,
    };
    const expectedRespone = -2;
    expect(calculateAgeAndIncomeRange(range, riskCriteria)).toBe(
      expectedRespone
    );
    riskCriteria.age = 40;
    riskCriteria.income = 300000;
    expect(calculateAgeAndIncomeRange(range, riskCriteria)).toBe(
      expectedRespone
    );
  });
  it("should return -3 response when income is more than 20k and age is less then 30", () => {
    const riskCriteria = {
      age: 29,
      income: 200001,
    };
    const expectedRespone = -3;
    expect(calculateAgeAndIncomeRange(range, riskCriteria)).toBe(
      expectedRespone
    );
    riskCriteria.age = -1;
    expect(calculateAgeAndIncomeRange(range, riskCriteria)).toBe(
      expectedRespone
    );
    riskCriteria.age = 1;
    expect(calculateAgeAndIncomeRange(range, riskCriteria)).toBe(
      expectedRespone
    );
  });
});

describe("autoInsuranceEligibility Method", () => {
  const range = 0;
  it("should return 'Ineligible' response when no vehicle is provided", () => {
    const riskCriteria = {};
    expect(autoInsuranceEligibility(range, riskCriteria)).toBe(
      IStatus.Ineligible
    );
    riskCriteria.vehicle = 0;
    expect(autoInsuranceEligibility(range, riskCriteria)).toBe(
      IStatus.Ineligible
    );
  });
  it("should return 'Economic' response when vehicle year is more than 5 years or year is invalid", () => {
    const riskCriteria = { vehicle: { year: 2015 } };
    expect(autoInsuranceEligibility(range, riskCriteria)).toBe(
      IStatus.Economic
    );
    riskCriteria.vehicle.year = 0;
    expect(autoInsuranceEligibility(range, riskCriteria)).toBe(
      IStatus.Economic
    );
  });
  it("should return 'Ineligible' response when vehicle year is less than 5 years", () => {
    const riskCriteria = { vehicle: { year: 2018 } };
    expect(autoInsuranceEligibility(range, riskCriteria)).toBe(IStatus.Regular);
    riskCriteria.vehicle.year = new Date().getFullYear();
    expect(autoInsuranceEligibility(range, riskCriteria)).toBe(IStatus.Regular);
  });
});

describe("disabilityInsuranceEligibility Method", () => {
  const range = 0;
  it("should return 'Ineligible' response when no income or age is more than 60", () => {
    const riskCriteria = {};
    expect(disabilityInsuranceEligibility(range, riskCriteria)).toBe(
      IStatus.Ineligible
    );
    riskCriteria.income = 0;
    expect(disabilityInsuranceEligibility(range, riskCriteria)).toBe(
      IStatus.Ineligible
    );
    riskCriteria.income = 100;
    riskCriteria.age = 65;
    expect(disabilityInsuranceEligibility(range, riskCriteria)).toBe(
      IStatus.Ineligible
    );
  });
  it("should return 'Regular' response when ownership_status is mortgaged", () => {
    const riskCriteria = {
      income: 100,
      age: 55,
      house: { ownership_status: IOwnershipStatus.Mortgaged },
    };
    expect(disabilityInsuranceEligibility(range, riskCriteria)).toBe(
      IStatus.Regular
    );
  });
  it("should return 'Regular' response when dependents provided", () => {
    const riskCriteria = {
      income: 100,
      age: 55,
      house: 0,
      dependents: 1,
    };
    expect(disabilityInsuranceEligibility(range, riskCriteria)).toBe(
      IStatus.Regular
    );
  });
  it("should return 'Responsible' response when range results to 3 or more", () => {
    const riskCriteria = {
      income: 20000001,
      age: 45,
      house: { ownership_status: IOwnershipStatus.Mortgaged },
      dependents: 1,
    };
    expect(disabilityInsuranceEligibility(2, riskCriteria)).toBe(
      IStatus.Responsible
    );
  });
  it("should return 'Economic' response when maritalStatus is Married or some other combination", () => {
    const riskCriteria = {
      income: 100,
      age: 55,
      house: 0,
      dependents: 0,
      marital_status: IMaritalStatus.Married,
    };
    expect(disabilityInsuranceEligibility(range, riskCriteria)).toBe(
      IStatus.Economic
    );
    riskCriteria.house.ownership_status = IOwnershipStatus.Mortgaged;
    expect(disabilityInsuranceEligibility(range, riskCriteria)).toBe(
      IStatus.Economic
    );
    riskCriteria.dependents = 1;
    expect(disabilityInsuranceEligibility(range, riskCriteria)).toBe(
      IStatus.Economic
    );
  });
});
describe("homeInsuranceEligibility Method", () => {
  const range = 0;
  it("should return 'Ineligible' response when no house detail is provided", () => {
    const riskCriteria = {};
    expect(homeInsuranceEligibility(range, riskCriteria)).toBe(
      IStatus.Ineligible
    );
    riskCriteria.house = 0;
    expect(homeInsuranceEligibility(range, riskCriteria)).toBe(
      IStatus.Ineligible
    );
    riskCriteria.house.ownership_status = 0;
    expect(homeInsuranceEligibility(range, riskCriteria)).toBe(
      IStatus.Ineligible
    );
  });
  it("should return 'Regular' response when ownership_status is Mortgaged", () => {
    const riskCriteria = {
      house: { ownership_status: IOwnershipStatus.Mortgaged },
    };
    expect(homeInsuranceEligibility(range, riskCriteria)).toBe(IStatus.Regular);
  });
  it("should return 'Economic' response range is 0 or less", () => {
    const riskCriteria = {
      house: { ownership_status: IOwnershipStatus.Owned },
    };
    expect(homeInsuranceEligibility(range, riskCriteria)).toBe(
      IStatus.Economic
    );
  });
  it("should return 'Responsible' response when range results to 3 or more", () => {
    const riskCriteria = {
      income: 100,
      age: 45,
      house: { ownership_status: IOwnershipStatus.Mortgaged },
    };
    expect(homeInsuranceEligibility(2, riskCriteria)).toBe(IStatus.Responsible);
  });
});
describe("lifeInsuranceEligibility Method", () => {
  const range = 0;
  it("should return 'Economic' response when no criteria is provided", () => {
    const riskCriteria = {};
    expect(lifeInsuranceEligibility(range, riskCriteria)).toBe(
      IStatus.Economic
    );
    riskCriteria.age = 30;
    expect(lifeInsuranceEligibility(range, riskCriteria)).toBe(
      IStatus.Economic
    );
  });
  it("should return 'Regular' response when dependents or marital_status is Married or range is 1 or 2 ", () => {
    const riskCriteria = { dependents: 1 };
    expect(lifeInsuranceEligibility(range, riskCriteria)).toBe(IStatus.Regular);
    riskCriteria.marital_status = IMaritalStatus.Married;
    expect(lifeInsuranceEligibility(range, riskCriteria)).toBe(IStatus.Regular);
    riskCriteria.dependents = 0;
    expect(lifeInsuranceEligibility(range, riskCriteria)).toBe(IStatus.Regular);
  });
  it("should return '' response when dependents or marital_status is Married or range is 1 or 2 ", () => {
    const riskCriteria = {
      dependents: 1,
      marital_status: IMaritalStatus.Married,
    };
    expect(lifeInsuranceEligibility(1, riskCriteria)).toBe(IStatus.Responsible);
  });
});
