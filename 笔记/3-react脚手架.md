

### 4. es6模块导入导出

```jsx
// es6Module.js
export const name = 'react'
export const list = [1,2,3]
export function foo() {
	console.log('bar')
}

export default {
	status: 200,
	data: {
		msg: 'hello'
	}
}

// 原生js方式 在浏览器 使用 需要设置 type="module"
// 要在服务器环境运行  不能直接打开html
<script type="module" >
    import obj,{name,list,foo}  from './es6Module.js'

    console.log(obj)
    console.log(name,list,foo)
</script>
```



### 5. 组件模块化

- 模块化更好的复用
- 组件有自身独立的状态，接收props渲染视图
- 练习
    - todomvc-app-template
- 属性

```css
jsx允许 在模板里面 插入 js变量
用插值符号 {}
{} -> 数字 布尔 字符串 表达式 即时函数 数组

有些关键字是不能使用
class -> className={'string'}
style -> style={{}}
value -> defaultValue
单标签要闭合
for -> htmlFor
focus -> autoFocus
```



## 三、  脚手架

- 做项目过程会经常报错 自己学会分析 写什么代码 做了什么操作 导致报错或项目失败
- 检查代码 根据报错信息 排查

### 1. 初始化前置

- yarn -v
    - 查看yarn的版本
- yarn config list
    - 查看配置列表
- yarn global add create-react-app
    - 全局安装后，在任意目录下都能运行create-react-app命令初始化项目
- create-react-app -v 
    - 查看脚手架的版本
    - 新手，`会提示不是内部命令`，别慌
    - 要配置环境变量
- npm root -g
    - 查看全局安装位置目录
- yarn global dir
    - 查看全局安装位置目录
- 配置环境变量
    - 完整路径 
        - C:\Users\你的用户名知道没?\AppData\Local\Yarn\bin
    - 把完整路径加到path中
        - win7，path后面用`英文分号`隔开`;`



### 2. 初始化

- create-react-app my-app

### 3. 目录结构

- node_modules
    - 整个项目所需要用的依赖(包->模块->插件)
- public
    - 项目访问目录
    - index.html
        - 项目访问入口
- src
    - 项目源码目录
    - index.js
        - 项目程序入口
    - App.js
        - 根组件
- package.json
    - 包文件
        - 记录着项目的信息、依赖、运行方式
- README.md
    - 告诉别人项目的信息
- yarn.lock
    - 锁文件
        - 记录项目依赖及下载地址，下次下载速度会更快

### 4. 框架运行

- yarn start
    - 在项目目录运行命令

### 5. todo-mvc组件改造

- 作业就是 用原生react改造 todomvc 和 用脚手架改造 实现出来
    - 目标理解组件化模块化的思想