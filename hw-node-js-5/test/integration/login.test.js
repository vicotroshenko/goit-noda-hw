require("dotenv").config();
const jwt = require("jsonwebtoken");

const supertest = require("supertest");
const mongoose = require("mongoose");
const app  = require("../../app");
const { User } = require("../../models/user");

mongoose.set("strictQuery", false);

const {DB_TEST_URI, SECRET_KEY} = process.env;

describe("login", () => {
  beforeAll(async () => {
    await mongoose.connect(DB_TEST_URI);

		await User.deleteMany();
  });

  afterAll(async () => {
    await mongoose.disconnect(DB_TEST_URI);
  });

	it("should register new user", async () => {
    const response = await supertest(app).post("/api/user/register").send({
      email: "testUser1@gmail.com",
      password: "123456",
    });

    expect(response.statusCode).toBe(201);
    expect(response._body.email).toBe("testUser1@gmail.com");
  });

  it("should login new user", async () => {
		const userData = {
			email: "testUser1@gmail.com",
      password: "123456",
		}

		const user = await User.findOne({email:userData.email}).exec();
    const response = await supertest(app).post("/api/user/login").send(userData);
		const payload = {
			id: user._id,
		};
	
		const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
		const userWithToken = await User.findByIdAndUpdate(user._id, { token }, {
			new: true,
		}).exec();

    expect(response.statusCode).toBe(200);
		expect(userWithToken.token).toBe(token);
		expect(userWithToken.email).toBe("testUser1@gmail.com");
		expect(userWithToken.subscription).toBe("starter" || "pro" || "business");
  });
});
