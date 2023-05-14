const { UserRepository } = require("../repository/index");

const { JWT_KEY } = require("../config/serverConfig");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(data) {
    try {
      const user = await this.userRepository.create(data);
      return user;
    } catch (error) {
      console.log("Something wrong in service layer");
      throw { error };
    }
  }

  async destroy(userId) {
    try {
      const response = await this.userRepository.destroy(userId);
      return response;
    } catch (error) {
      console.log("Something wrong in service layer");
      throw { error };
    }
  }

  async signIn(data) {
    try {
      // step 1 - check if the user is in database or not
      const user = await this.userRepository.getByUsername(data.username);
      if (!user) {
        throw { error: "There is no user with current username signed Up" };
      }
      // step 2 - if user is in databse check if the password matched
      const matched = this.comparePassword(data.password, user.password);
      if (!matched) {
        console.log("password doesnt match");
        throw { error: "Incorrect password" };
      }

      const newJWT = this.createToken({
        username: user.username,
        email: user.email,
        id: user.id,
      });
      // setTimeout(() => {
      //   console.log(this.verifyToken(newJWT));
      // }, 5000);

      return newJWT;
      // step 3 - create the token if the password is already in the database
    } catch (error) {
      console.log("Something wrong in service layer");
      throw { error };
    }
  }

  async isAuthenticated(token) {
    try {
      const response = this.verifyToken(token);
      if (!response) {
        throw { error: "Invalid token" };
      }
      const user = await this.userRepository.getById(response.id);
      if (!user) {
        throw { error: "No such user found in database" };
      }
      return user.id;
    } catch (error) {
      console.log("something went wrong in auth process");
      throw { error };
    }
  }

  // function usefull , create token , compare password
  createToken(user) {
    try {
      const token = jwt.sign(user, JWT_KEY, { expiresIn: 40 });
      return token;
    } catch (error) {
      console.log("Error in creating the token");
      throw { error };
    }
  }

  comparePassword(plainPassword, encryptedPassword) {
    try {
      return bcrypt.compareSync(plainPassword, encryptedPassword);
    } catch (error) {
      console.log("Error in comparing password");
      throw { error };
    }
  }

  verifyToken(token) {
    try {
      const response = jwt.verify(token, JWT_KEY);
      return response;
    } catch (error) {
      console.log("Error in verifying token");
      throw { error };
    }
  }
}

module.exports = UserService;
