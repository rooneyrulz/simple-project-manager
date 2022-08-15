const Organization = require("../models/Organization");
const {
  bcryptPassword,
  comparePassword,
  generateToken,
} = require("../config/config");

const getOrganization = async (id) => {
  try {
    const org = await Organization.findById(id);
    return org;
  } catch (error) {
    return error;
  }
};

const saveOrganization = async (organization) => {
  const { name, email, password } = organization;

  try {
    const org = await Organization.findOne({ email });
    if (org) {
      return new Error(`Organization ${email} already exists`);
    }

    const pwd = await bcryptPassword(password, 12);
    const newOrg = await new Organization({
      name,
      email,
      password: pwd,
    }).save();

    const token = generateToken({ id: newOrg.id });

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

    const isMatched = await comparePassword(password, org.password);
    if (!isMatched) {
      return new Error(`Invalid credentials!`);
    }

    const token = generateToken({ id: newOrg.id });

    return {
      token,
      organization: org,
    };
  } catch (error) {
    return error;
  }
};

const getCurrentOrganization = async (options) => {
  const { isAuth, org } = options;
  if (!isAuth || !org) {
    return new Error("Unauthorized!");
  }

  try {
    const isOrg = await Organization.findById(org.id);
    if (!isOrg) {
      return new Error("Unauthorized!");
    }

    return isOrg;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getOrganization,
  saveOrganization,
  loginToOrganization,
  getCurrentOrganization,
};
