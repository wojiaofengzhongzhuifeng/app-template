export const jwtConstants = {
  secret: 'secretpasswordforencryption',  // 用于 JWT 签名和验证的秘钥
  expiresIn: '60s',  // 可选，设置 JWT 的过期时间
};

export const saltRounds = 10; // 这个参数表示生成哈希的复杂度，你可以根据需要调整

