const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");
const tinify = require("tinify");
const chalk = require("chalk");
const { promisify } = require("util");
const readFile = promisify(fs.readFile);
const { imgMinOutputPath } = require("../config/default");

function setKey(key) {
  tinify.key = key;
}

async function validate(key) {
  console.log(chalk.green("正在认证tinyPng的key..."));
  setKey(key);
  return new Promise(resolve => {
    tinify.validate(err => {
      if (err) {
        console.log(err);
        return resolve(false);
      }
      console.log(chalk.green("认证成功！"));
      const left = leftCount();
      if (left <= 0) {
        console.log(chalk.red("当前key的剩余可用数已用尽，请更换key重试！"));
        return resolve(false);
      }
      console.log(chalk.green(`当前key剩余可用数为 ${left}`));
      resolve(true);
    });
  });
}

function compressionCount() {
  return tinify.compressionCount;
}

function leftCount() {
  const total = 500;
  return total - Number(compressionCount());
}

function mkdirOutput(file) {
  const { dir } = path.parse(file);
  return new Promise((resolve, reject) => {
    mkdirp(dir, function(err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(true);
    });
  });
}

function writeFilePromise(file, content, cb) {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, content, err => {
      if (err) {
        return reject(err);
      }
      cb && cb();
      resolve();
    });
  });
}

function toBufferPromise(sourceData) {
  return new Promise((resolve, reject) => {
    tinify.fromBuffer(sourceData).toBuffer((err, resultData) => {
      if (err) {
        return reject(err);
      }
      resolve(resultData);
    });
  });
}

async function imgMin(img, conf) {
  try {
    console.log(chalk.blue(`开始压缩图片 ${img}`));
    const sourceData = await readFile(img);
    const resultData = await toBufferPromise(sourceData);
    // 获取图片和压缩目录之间的相对路径
    const relativePath = path.relative(conf.imgMinPath, img);
    // const outputPath = path.resolve(imgMinOutputPath, relativePath);

    // await mkdirOutput(outputPath);
    await writeFilePromise(img, resultData, () =>
      console.log(chalk.green(`图片压缩成功 ${img}`))
    );
  } catch (error) {
    console.log(chalk.red(`压缩图片 ${img} 失败： ${error}`));
  }
}

module.exports = { validate, compressionCount, leftCount, imgMin };