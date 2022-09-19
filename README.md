需要调整的：
1. 样式
  a. 模式：pc h5 横竖屏(横屏其实就是pad，我们按pad做)
  b. 由于是form表单，不存在层级(画布)叠加
    - 组件宽度铺满
    - 组件不能重叠
    - 最好是可以拖拽组件自动换位置(参考 vueDragger)
2. interface 接口
3. 文件结构
  a. components/lib 字体文件 就不要了
  b. less 文件，根据我们的需要，删减整理到一个目录下
  c. 有些公用方法提取出来，例如 UseModel
  d. 自定义组件也都要写到 /components/ 每个组件至少包含一个 xx.vue 和 index.ts 入口
4. 一定要保留的
  a. 注册式组件，扩展性很强 visual.config.tsx (visualConf.registry 方法)
  b. command 命令，(撤销，重做思路很棒，可以理一下)
