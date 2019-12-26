const path = require("path");

module.exports = {
  presentPath: process.cwd(),
  key: "",
  // 图片压缩默认输入路径
  imgMinPath: path.join(process.cwd(), ""),
  // 图片压缩输出目录
  imgMinOutputPath: path.join(process.cwd(), "./imgMinOutput"),
  ignoreDir: ["node_modules", ".svn", ".git", "dist", "build"]
};
