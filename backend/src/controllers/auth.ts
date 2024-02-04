import { Request, Response } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";

import userDatabase from "../database/user";
import refreshTokenDatabase from "../database/refreshToken";

export const login = (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = userDatabase.find((item) => item.email === email);

  if (!user) {
    return res.status(401).json("저장된 이메일 정보가 없습니다.");
  }

  if (user.password !== password) {
    return res.status(401).json("비밀번호가 틀렸습니다.");
  }

  try {
    // accessToken 발급 & 쿠키에 전달
    const accessToken = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      process.env.ACCESS_SECRET!,
      { expiresIn: "10s" }
    );
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
    });

    // refreshToken 발급 & DB에 저장
    const refreshToken = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      process.env.REFRESH_SECRET!,
      { expiresIn: "30s" }
    );
    refreshTokenDatabase.token = refreshToken;

    res.status(200).json();
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const accessToken = (req: Request, res: Response) => {
  try {
    const token = req.cookies.accessToken;

    // accessToken 검증
    const { id } = jwt.verify(token, process.env.ACCESS_SECRET!) as {
      id: string;
    };

    // accessToken 유효
    const user = userDatabase.find((item) => item.id === id)!;
    const { password, ...restUser } = user;
    res.status(200).json(restUser);
  } catch (error) {
    // accessToken 만료
    if (error instanceof TokenExpiredError) {
      try {
        const token = refreshTokenDatabase.token;
        // refreshToken 검증
        const { id } = jwt.verify(token, process.env.REFRESH_SECRET!) as {
          id: string;
        };
        // refreshToken 유효
        const user = userDatabase.find((item) => item.id === id)!;
        // accessToken 갱신 & 쿠키에 새로 전달
        const accessToken = jwt.sign(
          { id: user.id, name: user.name, email: user.email },
          process.env.ACCESS_SECRET!,
          { expiresIn: "10s" }
        );
        res.cookie("accessToken", accessToken, {
          httpOnly: true,
          secure: false,
        });
        const { password, ...restUser } = user;
        res.status(200).json(restUser);
      } catch (error) {
        // refreshToken 만료
        console.log(error);
        res.status(401).json("다시 로그인 해주세요.");
      }
    } else {
      console.log(error);
      res.status(500).json(error);
    }
  }
};
