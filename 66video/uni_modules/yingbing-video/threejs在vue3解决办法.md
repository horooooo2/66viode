#标题
* 关于uni-app 在vue3版本下在renderjs引入three.min.js使用renderer.render(scene, camera);报错TypeError: ‘get‘ on proxy: property ‘modelViewMatrix‘ is a read-only and non-configurable data property的解决方法

#问题描述
* 我在uni-app vue3版本下在renderjs中引入three.min.js，实现360全景视频播放，播放功能是封装好的，在vue2版本下是能正常使用的，但在vue3版本下会报错TypeError: ‘get‘ on proxy: property ‘modelViewMatrix‘ is a read-only and non-configurable data property........
* 在网上搜索，发现是vue3的proxy的锅，因为three.js内部一些变量使用Object.defineProperty来定义的，这样就被vue3抓到了，给处理成成了响应式，但three.js内部自有一套变量响应，导致冲突，大概原因就是这样[具体看这里](https://www.cnblogs.com/never404/p/17927788.html)
#网上传的解决办法
* 都说是不要在data函数或者用reactive定义变量来存储three实例化后的对象，直接用全局变量接收，比如：

```javascript
//这样是错误的，会导致报错
let data = reactive({
  scene: null
})
```
```javascript
//正确的定义方法
let scene = null
```
* 这种方法行不行，我也不清楚，因为renderjs是不支持组合api语法的，而且我是使用封装的类来调用three.js的，根本没用vue的变量接收实例化对象，所以这种方式对我没用

# 尝试解决办法
* 我在找资料时，无意间看到一篇文章[Bpmn.js 使用【问题?解决】](https://juejin.cn/post/7257441472457752631)，虽然和three.js无关，但好像和我的问题有点类似，他的解决方法为：
```javascript
// 我的解决是：引入Modeler的文件，importXML时 modeler使用toRaw包一下。并且在使用modeling.updateProperties更新元素属性时，将this.element也使用toRaw包一下：toRaw(this.element)
updateProperties(properties) {
     const modeling = toRaw(this.modeler).get("modeling");
     modeling.updateProperties(toRaw(this.element), properties);
}
```
* 于是我也尝试引入vue3的toRaw在render的时候包裹一下：
```javascript
//在renderjs下引入toRaw 
import { toRaw } from 'vue'
export default {
  mounted () {
   window.toRaw = toRaw//需要挂载到window对象上，不然类里面调用不到
  }
}
```
```javascript
//在我的类里面，调用toRaw
const scene = window.toRaw ? window.toRaw(this.secne) : this.scene
this.renderer.render(scene, this.camera);
```
* 该方式确实可以解决我的问题，但只支持h5,因为在app vue3 renderjs下使用import { toRaw } from 'vue'，会报错could not resolve ‘vue’，这下就卡住了。

#最终解决办法
* 既然toRaw在app当中引入不了，那我自己实现一个toRaw行不行？说干就干，定位到toRaw的源码，发现结构为：
```javascript
function toRaw (observed) {
   const raw = observed && observed["__v_raw"]  ? observed["__v_raw"] : observed
   return raw ? toRaw(raw) : observed 
}
```
* 意外是个很简单的代码，判断传入的值有没有__v_raw属性，如果有返回该属性值，如果没有返回传入的值
* 这样解决起来就很简单了：
```javascript
const scene = this.scene["__v_raw"] ? this.scene["__v_raw"] : this.scene
this.renderer.render(scene, this.camera);
```
* 这样app和h5都没问题了
