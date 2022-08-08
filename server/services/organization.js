const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Organization = require("../models/Organization");

const saveOrganization = async (organization) => {
  const { name, email, password } = organization;

  try {
    const org = await Organization.findOne({ email });
    if (org) {
      return new Error(`Organization ${email} already exists`);
    }

    const pwd = await bcrypt.hash(password, 12);
    const newOrg = await new Organization({
      name,
      email,
      password: pwd,
    }).save();

    const token = jwt.sign({ id: newOrg.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_SECRET_EXPIRATION_IN_SECONDS,
    });

    return {
      token,
      organization: newOrg,
    };
  } catch (error) {
    return error;
  }
};

const loginToOrganization = async (organization) => {
  const { email, password } = organization;

  try {
    const org = await Organization.findOne({ email });
    if (!org) {
      return new Error(`Organization ${email} not found!`);
    }

    const isMatched = await bcrypt.compare(password, org.password);
    if (!isMatched) {
      return new Error(`Invalid credentials!`);
    }

    const token = jwt.sign({ id: org.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_SECRET_EXPIRATION_IN_SECONDS,
    });

    return {
      token,
      organization: org,
    };
  } catch (error) {
    return error;
  }
};

const getCurrentUser = async () => {};

module.exports = {
  saveOrganization,
  loginToOrganization,
  getCurrentUser,
};
