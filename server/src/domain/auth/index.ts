import { Router } from "express";
import { users, generateUserId } from "../../utils/datas";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const authRouter = Router();

if (users.length === 0) {
  users.push({
    id: generateUserId(),
    name: "drian",
    email: "drian@example.com",
    password: bcrypt.hashSync("12345678", 8),
  });
}

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ status: false, message: "Email and password are required" });
  }

  try {
    const checkUser = users.find((user) => user.email === email);

    if (!checkUser || !bcrypt.compareSync(password, checkUser.password)) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: checkUser.id }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    res.status(200).json({
      status: true,
      message: "Login successful",
      data: {
        token,
        user: {
          id: checkUser.id,
          name: checkUser.name,
          email: checkUser.email,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error logging in",
    });
  }
});

export default authRouter;
