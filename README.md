# bello 自动打tag工具
因为Github Actions 线上版本构建部署是通过Tag来触发的，并且Tag要按照一定的规则来，以完成线上版本的控制。为了减少人工打Tag带来的失误，因此开发一个CLI命令行工具辅助上线前的打Tag工作。

打tag规则：[分支名]-[版本号]-[日期]

前端私有化项目打tag的同时会自动生成一份Dockerfile文件，以适配腾讯云容器构建。

## bello-version
### 使用
```bash
// 全局安装
npm install -g @belloai/bello-version

// 使用命令 查看帮助
belloVersion
// 打tag
belloVersion tag
```
![image.png](https://cdn.nlark.com/yuque/0/2021/png/2777249/1638863697823-6a8e42c7-7ca1-4ae5-90e4-5b38140f7e36.png#clientId=u313c52d6-646c-4&from=paste&height=197&id=u628ff362&margin=%5Bobject%20Object%5D&name=image.png&originHeight=394&originWidth=630&originalType=binary&ratio=1&size=42569&status=done&style=none&taskId=u4a71abbc-08d8-48b2-8cc0-6222853cb19&width=315)
![image.png](https://cdn.nlark.com/yuque/0/2021/png/2777249/1638864455145-c030ab87-189c-46fb-a987-726925b2f0d6.png#clientId=u313c52d6-646c-4&from=paste&height=168&id=u845109d5&margin=%5Bobject%20Object%5D&name=image.png&originHeight=336&originWidth=705&originalType=binary&ratio=1&size=83054&status=done&style=none&taskId=u4e0f5d48-344b-42d8-b41f-19f58158d0e&width=352.5)

## Tag标签
### 为什么打Tag
> 我们可以创建一个tag来指向软件开发中的一个关键时期，比如版本号更新的时候可以建一个“v2.0”、“v3.1”之类的标签，这样在以后回顾的时候会比较方便。
tag的使用很简单，主要操作有：查看tag、创建tag、验证tag以及共享tag。

同时为了触发腾讯云容器服务的docker构建，以便docker从COS对象存储中拉取前端源码，加快部署时间。因此Tag的命名规则为：`release/sass-v1.4.2-2021-11-16` 

- `release`：为前缀，意为发布版本。
- `sass`: 为分支名，意为需要把代码更新到sass分支，并触发腾讯云容器服务构建。
- `v1.4.2`：为版本，意为当前项目的版本号，会根据功能自增minor，patch版本。
- 最后的后缀很明显了，就是当前打Tag的日期。
### Tag基本操作
#### 创建
`git tag v1.4.2`：创建tag
`git tag -a v1.4.2 -m 'first version'`：带信息的tag：-m后面带的就是注释信息，这样在日后查看的时候会很有用 
#### 查看
`git tag`: 查看tag，列出所有tag，列出的tag是按字母排序的，和创建时间没关系
`git show v1.4.2`: 显示指定tag的信息
#### push推送
`git push origin v1.4.2`：推送tag到gitHub仓库
`git push origin --tags`：将所有tag 一次全部push到github上
#### 删除
`git tag -d v1.4.2`: 删除本地tag
`git push origin :refs/tags/v1.4.2`: 删除github远端的指定tag
#### 基于tag创建分支
`git checkout -b new-branch v1.4.2`：创建一个基于指定tag的分支 
### 使用到的npm包
`cac` `chalk` `inquirer` `semver` `simple-git`，简单介绍下
#### `[cac](https://www.npmjs.com/package/cac)`
专门用于构建CLI应用程序的JavaScript库，对用户的输入进行提示，纠正以及解析，比如 `version --help `就会显示CLI可用的命令行参数都有些啥。
![image.png](https://cdn.nlark.com/yuque/0/2021/png/2777249/1637551768220-52462020-e79d-4b59-be17-b0bd74cfad6a.png#clientId=u6b7f8493-08f0-4&from=paste&height=103&id=uf1151f38&margin=%5Bobject%20Object%5D&name=image.png&originHeight=410&originWidth=1146&originalType=binary&ratio=1&size=46183&status=done&style=none&taskId=u0d6dd02f-5631-477f-b664-9091c173dcc&width=287)
用法十分简单：
```bash
// 当用户只输入version时，显示其他command的友好提示
cli.command("").action(() => {
  cli.outputHelp();
});
// version tag时执行，支持传入option参数，来控制流程
cli
  .command("tag", "Generate Tag for Current Version")
  .allowUnknownOptions()
  .action(() => {
    handleVersionTag();
  });
```
#### `[chalk](https://www.npmjs.com/package/chalk)` 
用于美化Terminal中的字符，可以显得花里胡哨点。
#### `[inquirer](https://www.npmjs.com/package/inquirer)`
基本是CLI工具与用户进行交互必用的包了，可以收集用户输入，进行交互以执行不同的操作。
#### ​`[semver](https://www.npmjs.com/package/semver)`
易用，更语义化的版本管理库，`semver`会按`[semantic versioner](https://semver.org/)`规则去做版本管理。
#### ​`[simple-git](https://www.npmjs.com/package/simple-git)`
吹爆的git操作库，在node中可以自在的使用git操作，包括`add,commit,push,pull,fetch`等等，如获取本地分支:`git.branchLocal()`，打tag:`git.addTag('tag')`，基本git能做的都能在node中调用来实现。


