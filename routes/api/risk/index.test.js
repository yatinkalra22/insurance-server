const request = require("supertest");
const app = require("../../../index");

describe("risk API", () => {
  it("should respond with expected risk", async () => {
    const payload = {
      age: 35,
      dependents: 2,
      house: { ownership_status: "owned" },
      income: 0,
      marital_status: "married",
      risk_questions: [0, 1, 0],
      vehicle: { year: 2018 },
    };
    const expectedResponse = {
      auto: "regular",
      disability: "ineligible",
      home: "economic",
      life: "regular",
    };
    const response = await request(app)
      .post("/api/risk/calculate")
      .send(payload)
      .set("Content-type", "application/json");

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expect.any(Object));
    expect(response.body.data).toEqual(expectedResponse);
    expect(response.body.message).toBe(
      "Insurance Eligibility Checked Successfully"
    );
  });
  it("should respond with ineligibale risk response", async () => {
    const payload = {
      age: 60,
      dependents: 0,
      house: 0,
      income: 0,
      marital_status: "single",
      risk_questions: [0, 1, 0],
      vehicle: 0,
    };
    const expectedResponse = {
      auto: "ineligible",
      disability: "ineligible",
      home: "ineligible",
      life: "regular",
    };
    const response = await request(app)
      .post("/api/risk/calculate")
      .send(payload)
      .set("Content-type", "application/json");

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expect.any(Object));
    expect(response.body.data).toEqual(expectedResponse);
    expect(response.body.message).toBe(
      "Insurance Eligibility Checked Successfully"
    );
  });
});
