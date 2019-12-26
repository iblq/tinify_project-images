## 安装

npm install tinify_images -g

## 使用说明

```
    tp -v|--version 查看版本
    tp -h|--help 查看帮助
    tp s|start 启动程序
    tp c|clean 清空输出目录中的图片
    tp p|imgMin 压缩目录中的图片

    // 压缩图片说明
    tp p --help 查看帮助
    tp p -k|--key [key] tinypng官网申请的key，第一次必填，填写后会保存在本地。下次可以不填，从历史记录里选取。
    tp p -p|--path [path] 自定义检索路径，请填写绝对路径，默认取当前命令行目录下的/images路径
```

> 基于 (1eeing/get_picture)[https://github.com/1eeing/get_picture] 修改，默认递归读取当前目录文件，压缩后图片输出地址为原地址，覆盖图片。

## 常见问题

- Q: 没有权限导致报错 `EACCES: permission denied ……` ？
  A：with sudo and try again.
- Q: node 版本过低导致报错？
  A: 请将 node 升级至 7.6 以上版本，以确保支持 `async/await`.
- Q: tinypng 压缩图片有什么限制？
  A: tinypng 压缩图片一个 key 每个月只能压缩 500 张，如有需要，可用多个邮箱重复申请
- Q: tinypng 获得 key 步骤？
  A:
  1. 进入官网 [https://tinypng.com/developers](https://tinypng.com/developers)
  2. 输入邮箱
  3. 进入邮箱打开验证链接，即可查看 key 及每月剩余数

## 查看历史

点击[这里](https://github.com/1eeing/get_picture/blob/master/history.md)
