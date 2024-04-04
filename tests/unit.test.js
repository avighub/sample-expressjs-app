const request = require("supertest");
const app = require("../index");

describe("POST /login", () => {
  it("should return 200 for valid credentials", async () => {
    const response = await request(app)
      .post("/login")
      .send({ email: "user1@example.com", password: "password1" });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Authenticated");
  });

  it("should return 401 for invalid credentials", async () => {
    const response = await request(app)
      .post("/login")
      .send({ email: "invalid@example.com", password: "invalidpassword" });
    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Invalid Credentials");
  });
});