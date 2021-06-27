const jwt = require("jsonwebtoken");

let generateToken = (user, secretSignature, tokenLife) => {
  return new Promise((resolve, reject) => {
    const userData = {
      MaNguoiDung: user.MaNguoiDung,
      Avatar: user.Avatar,
      TenDangNhap: user.TenDangNhap,
      TenNguoiDung: user.TenNguoiDung,
      MaChucVu: user.MaChucVu,
      SDT: user.SDT,
      Email: user.Email,
    };
    //sign and generateToken
    jwt.sign(
      { data: userData },
      secretSignature,
      {
        algorithm: "HS256",
        expiresIn: tokenLife,
      },
      (error, token) => {
        if (error) {
          reject(error);
        } else {
          resolve(token);
        }
      }
    );
  });
};

let verifyToken = (token, secretKey) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (error, decoded) => {
      if (error) {
        return reject(error);
      }
      resolve(decoded);
    });
  });
};

module.exports = { generateToken, verifyToken };
