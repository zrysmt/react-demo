# Redux Todos Example

> 例子源码地址 https://github.com/reactjs/redux/tree/master/examples/todos

例子教程： [http://cn.redux.js.org/docs/basics/index.html](http://cn.redux.js.org/docs/basics/index.html)
概念教程：[阮一峰的日志](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html)

整体的概念逻辑可以看阮老师的三篇文章，这里贴出来文章中的[一张图](http://www.ruanyifeng.com/blogimg/asset/2016/bg2016091802.jpg)

## 文件夹说明
- src
  + actions      Actions Creators有关
  + components   一般的UI组件，不负责逻辑
  + containers   处理逻辑的组件，使用connect方法从一般UI组件转化而来
  + reducers     Reducers
- index.js  入口 Store在此创建
- public
  + index.html 存放入口网页html


