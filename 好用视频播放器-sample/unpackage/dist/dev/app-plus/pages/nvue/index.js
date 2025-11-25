"use weex:vue";

if (typeof Promise !== 'undefined' && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor
    return this.then(
      value => promise.resolve(callback()).then(() => value),
      reason => promise.resolve(callback()).then(() => {
        throw reason
      })
    )
  }
};

if (typeof uni !== 'undefined' && uni && uni.requireGlobal) {
  const global = uni.requireGlobal()
  ArrayBuffer = global.ArrayBuffer
  Int8Array = global.Int8Array
  Uint8Array = global.Uint8Array
  Uint8ClampedArray = global.Uint8ClampedArray
  Int16Array = global.Int16Array
  Uint16Array = global.Uint16Array
  Int32Array = global.Int32Array
  Uint32Array = global.Uint32Array
  Float32Array = global.Float32Array
  Float64Array = global.Float64Array
  BigInt64Array = global.BigInt64Array
  BigUint64Array = global.BigUint64Array
};


(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // vue-ns:vue
  var require_vue = __commonJS({
    "vue-ns:vue"(exports, module) {
      module.exports = Vue;
    }
  });

  // E:/work/QF/66video/好用视频播放器-sample/unpackage/dist/dev/.nvue/pages/nvue/index.js
  var import_vue = __toESM(require_vue());
  var _style_0$1 = { "yingbing-video-full": { "": { "position": "fixed", "top": 0, "left": 0, "right": 0, "bottom": 0, "!width": 100, "!height": 100, "zIndex": 9999999 } } };
  var _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  var _sfc_main$1 = {
    props: {
      //iframe或者webview访问的自定义src
      webSrc: {
        type: String,
        default: () => {
          const path = "/uni_modules/yingbing-video/static/html/video.html";
          return path;
        }
      },
      //播放链接
      src: {
        type: String,
        default: ""
      },
      //切片列表
      segments: {
        type: Array,
        default: () => []
      },
      //封面
      poster: {
        type: String,
        default: ""
      },
      //标题
      title: {
        type: String,
        default: ""
      },
      //解码类型 auto-自动判断 hls-使用hls.js加载 flv-使用flv.js加载 video-使用video加载
      type: {
        type: String,
        default: "auto"
      },
      //初始化时间
      initialTime: {
        type: Number,
        default: 0
      },
      //自定义最大播放时长
      duration: {
        type: Number,
        default: 0
      },
      //3D模式 none-关闭3D 360-360全景
      three: {
        type: String,
        default: "none"
      },
      //自动播放（不保证能执行）
      autoplay: {
        type: Boolean,
        default: false
      },
      //预加载 auto-浏览器尽可能地预加载整个视频文件 metadata-仅预加载视频的元数据 none-不预加载视频
      preload: {
        type: String,
        default: "auto"
      },
      //静音
      muted: {
        type: Boolean,
        default: false
      },
      //播放倍速
      playbackRate: {
        type: Number,
        default: 1
      },
      //循环播放
      loop: {
        type: Boolean,
        default: false
      },
      //直播流
      isLive: {
        type: Boolean,
        default: false
      },
      //非全屏时是否显示头部控制栏
      header: {
        type: Boolean,
        default: false
      },
      //是否显示底部控制栏
      controls: {
        type: Boolean,
        default: false
      },
      //视频组件高度 auto-自适应高度 百分比-根据屏幕高度计算 px/rpx-像素高度
      height: {
        type: String,
        default: "auto"
      },
      //当视频宽高超出容器时的表现形式 fill-内容拉伸填充 contain-保持比例内容缩放 cover-保持比例内容可能被剪切 none-内容不重置 scale-down-保持比例从none或contain选一个 initial-默认值
      objectFit: {
        type: String,
        default: "contain"
      },
      //跨域属性 anonymous-它有一个默认值。它定义了将在不传递凭据信息的情况下发送CORS请求 use-credentials-将发送带有凭据、cookie 和证书的 cross-origin 请求
      crossOrigin: {
        type: String,
        default: ""
      },
      //开启全屏时的屏幕方向
      openDirection: {
        type: String,
        default: ""
      },
      //退出全屏时的屏幕方向
      exitDirection: {
        type: String,
        default: ""
      },
      //弹幕列表
      danmu: {
        type: Array,
        default: () => []
      },
      //画质列表
      quality: {
        type: Array,
        default: () => []
      },
      //分p列表
      works: {
        type: Array,
        default: () => []
      },
      //分P默认索引
      workIndex: {
        type: Number,
        default: -1
      },
      //字幕列表
      subtitles: {
        type: Array,
        default: () => []
      },
      //字幕默认索引
      subtitleIndex: {
        type: Number,
        default: -1
      },
      //自定义配置
      custom: {
        type: Object,
        default: () => ({})
      },
      //hls配置
      hlsConfig: {
        type: Object,
        default: () => ({})
      },
      //flv配置
      flvConfig: {
        type: Object,
        default: () => ({})
      },
      //jsmpeg配置
      jsmpegConfig: {
        type: Object,
        default: () => ({})
      },
      //渲染类型 APP-NVUE只能使用web网页加载得方式渲染
      renderType: {
        type: String,
        default: "web"
      }
      //渲染类型
    },
    computed: {
      boxStyle() {
        return this.height == "inherit" ? {
          height: this.boxHeight,
          flex: 1
        } : {
          height: this.boxHeight
        };
      }
    },
    data() {
      return {
        ready: false,
        boxHeight: "",
        videoWidth: 0,
        videoHeight: 0,
        fullscreen: false,
        customHandles: {},
        //自定义处理方法
        slotHandles: {},
        //存储插槽中的点击函数
        toolHandles: {}
        //存储工具栏中的点击函数
      };
    },
    beforeDestroy() {
      this._removeBackbuttonListener();
    },
    created() {
      this.updateHeight();
    },
    methods: {
      //接收消息
      handleMessage(e) {
        e.detail.data.forEach((item) => {
          this.parseMessage(item);
        });
      },
      //处理返回的消息
      parseMessage(data) {
        return __async(this, null, function* () {
          if (data.ready) {
            this.ready = true;
            if (this.src || this.segments && this.segments.length) {
              this.reloadVideo();
            }
          }
          if (data.destroyed) {
            if (this.renderType != "renderjs")
              this.$refs.web && this.$refs.web.destroy && this.$refs.web.destroy();
          }
          if (data.loadeddata) {
            this.videoWidth = data.loadeddata.videoWidth;
            this.videoHeight = data.loadeddata.videoHeight;
            this.updateHeight();
          }
          if (data.slotclick) {
            this.slotHandles[data.slotclick] && this.slotHandles[data.slotclick]();
          }
          if (data.toolclick) {
            this.toolHandles[data.toolclick] && this.toolHandles[data.toolclick]();
          }
          if (data.capturesaved) {
            if (data.capturesaved.code != 200) {
              this.saveBase64ImageToAlbum(data.capturesaved.data.base64, data.capturesaved.fileName).then((path) => {
                this.showToast("\u4FDD\u5B58\u5230\u76F8\u518C\u6210\u529F");
              }).catch(() => {
                this.showToast("\u4FDD\u5B58\u5230\u76F8\u518C\u5931\u8D25");
              });
            }
          }
          if (data.seeklight >= 0) {
            if (this.customHandles.setLight) {
              this.customHandles.setLight(data.seeklight);
            } else {
              uni.setScreenBrightness({
                value: data.seeklight
              });
            }
          }
          if (data.seekvolume >= 0) {
            if (this.customHandles.setVolume) {
              this.customHandles.setVolume(data.seekvolume);
            } else {
              plus.device.setVolume(data.seekvolume);
            }
          }
          if (data.directionchange) {
            if (data.directionchange.code != 200) {
              var direction = data.directionchange.to;
              if (direction)
                plus.screen.lockOrientation(direction);
              else
                plus.screen.unlockOrientation();
            }
          }
          if (data.fullscreenchange) {
            if (data.fullscreenchange.type == "css") {
              this.fullscreen = data.fullscreenchange.fullscreen;
              if (this.fullscreen) {
                plus.navigator.setFullscreen(true);
                plus.navigator.hideSystemNavigation();
              } else {
                plus.navigator.setFullscreen(false);
                setTimeout(function() {
                  plus.navigator.showSystemNavigation();
                }, 200);
              }
              if (this.fullscreen) {
                this._bindbackbutton = this.exitFullscreen.bind(this);
                plus.key.addEventListener("backbutton", this._bindbackbutton);
              } else {
                this._removeBackbuttonListener();
              }
            }
            if (!data.fullscreenchange.fullscreen)
              this.updateHeight();
          }
          Object.keys(data).forEach((key) => {
            if (key != "destroyed")
              this.$emit(key, data[key]);
          });
        });
      },
      //移除返回键监听
      _removeBackbuttonListener() {
        if (this._bindbackbutton) {
          plus.key.removeEventListener("backbutton", this._bindbackbutton);
          this._bindbackbutton = null;
        }
      },
      //处理custom中的函数
      _traverseObject(obj, handleName) {
        if (typeof obj !== "object" || obj === null) {
          return;
        }
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            if (typeof value === "function") {
              const id = (/* @__PURE__ */ new Date()).getTime().toString() + Math.round(Math.random() * 1e4);
              this[handleName][id] = value;
              obj[key] = id;
            } else if (typeof value === "object" && value !== null) {
              this._traverseObject(value, handleName);
            }
          }
        }
      },
      //深度克隆数据，避免数据污染
      _deepClone(obj) {
        if (typeof obj !== "object" && typeof obj !== "function") {
          return obj;
        }
        var o = Object.prototype.toString.call(obj) === "[object Array]" ? [] : {};
        for (let i in obj) {
          if (obj.hasOwnProperty(i)) {
            o[i] = i === "loader" ? "" : typeof obj[i] === "object" ? this._deepClone(obj[i]) : obj[i];
          }
        }
        return o;
      },
      //更新高度
      updateHeight() {
        if (this.updateTimer) {
          clearTimeout(this.updateTimer);
          this.updateTimer = null;
        }
        this.updateTimer = setTimeout(() => {
          if (this.height == "auto" && this.videoWidth) {
            const windowWidth = uni.getSystemInfoSync().windowWidth;
            const rate = windowWidth / this.videoWidth;
            this.boxHeight = this.videoHeight * rate + "px";
          }
          if (this.height == "inherit") {
            this.boxHeight = "100%";
          }
          if (this.height.includes("px")) {
            this.boxHeight = this.height;
          }
          if (this.height.includes("%")) {
            const windowHeight = uni.getSystemInfoSync().windowHeight;
            this.boxHeight = windowHeight * (this.height.replace("%", "") / 100) + "px";
          }
          this.$nextTick(() => {
            this.evalJS("updateSize");
          });
        }, 100);
      },
      //处理自定义配置
      parseCustom() {
        return __async(this, null, function* () {
          const custom = this._deepClone(this.custom);
          const initialLight = yield this.getLight();
          const initialVolume = yield this.getVolume();
          const gesture = custom.gesture || {};
          gesture.initialLight = gesture.initialLight || initialLight;
          gesture.initialVolume = gesture.initialVolume || initialVolume;
          custom.gesture = gesture;
          this.customHandles.setLight = gesture.setLight;
          this.customHandles.setVolume = gesture.setVolume;
          this.customHandles.getLight = gesture.getLight;
          this.customHandles.getVolume = gesture.getVolume;
          gesture.setLight = null;
          gesture.setVolume = null;
          gesture.getLight = null;
          gesture.getVolume = null;
          this.slotHandles = {};
          this._traverseObject(custom, "slotHandles");
          return custom;
        });
      },
      //处理文件链接（针对本地链接）
      parseSrc(src) {
        if (src.startsWith("/static")) {
          return plus.io.convertLocalFileSystemURL(src);
        }
        return src;
      },
      //处理工具栏配置
      parseTool(data) {
        this.toolHandles = {};
        this._traverseObject(data, "toolHandles");
        return data;
      },
      //处理字幕|画质的链接
      parseList(data) {
        return data.map((item) => {
          return __spreadProps(__spreadValues({}, item), { src: this.parseSrc(item.src) });
        });
      },
      //处理切片列表链接
      parseSegments(data) {
        return data.map((item) => {
          return __spreadProps(__spreadValues({}, item), { url: this.parseSrc(item.url) });
        });
      },
      //处理通信参数
      parseArg(arg) {
        return encodeURIComponent(encodeURIComponent(JSON.stringify(arg)));
      },
      //重加载视频
      reloadVideo() {
        return __async(this, null, function* () {
          const arg = {
            src: this.parseSrc(this.src),
            segments: this.parseSegments(this.segments),
            title: this.title,
            poster: this.poster,
            type: this.type,
            three: this.three,
            initialTime: this.initialTime,
            duration: this.duration,
            autoplay: this.autoplay,
            preload: this.preload,
            muted: this.muted,
            loop: this.loop,
            playbackRate: this.playbackRate,
            isLive: this.isLive,
            header: this.header,
            controls: this.controls,
            objectFit: this.objectFit,
            crossOrigin: this.crossOrigin,
            openDirection: this.openDirection,
            exitDirection: this.exitDirection,
            quality: this.parseList(this.quality),
            works: this.works,
            workIndex: this.workIndex,
            subtitles: this.parseList(this.subtitles),
            subtitleIndex: this.subtitleIndex,
            custom: yield this.parseCustom(),
            flvConfig: this.flvConfig,
            hlsConfig: this.hlsConfig,
            jsmpegConfig: this.jsmpegConfig
          };
          this.evalJS("reloadVideo", arg);
        });
      },
      //卸载视频
      unload() {
        this.evalJS("destroy");
      },
      //加载弹幕
      loadDanmu() {
        const size = 100;
        const list = this.danmu || [];
        const len = Math.ceil(list.length / size);
        for (let i = 0; i < len; i++) {
          const arr = list.slice(i * size, (i + 1) * size);
          const arg = { code: i < len - 1 ? 0 : 1, data: arr };
          this.evalJS("setDanmuData", arg);
        }
      },
      //卸载弹幕
      unloadDanmu() {
        this.evalJS("unloadDanmu");
      },
      //发送弹幕
      sendDanmu(danmu, border) {
        this.evalJS("sendDanmu", danmu, border);
      },
      //插入弹幕
      insertDanmu(danmu) {
        this.evalJS("insertDanmu", danmu);
      },
      //动态修改video属性
      setVideo(key, value) {
        this.evalJS("setVideo", key, value);
      },
      //重加载自定义配置
      reloadCustom() {
        if (this.customTimer) {
          clearTimeout(this.customTimer);
          this.this.customTimer = null;
        }
        this.customTimer = setTimeout(() => __async(this, null, function* () {
          const custom = yield this.parseCustom();
          this.evalJS("reloadCustom", custom);
        }), 200);
      },
      //更新配置
      updateConfig() {
        if (this.updateTimer) {
          clearTimeout(this.updateTimer);
          this.updateTimer = null;
        }
        this.updateTimer = setTimeout(() => {
          const arg = {
            header: this.header,
            controls: this.controls
          };
          this.evalJS("updateConfig", arg);
        }, 200);
      },
      //播放视频
      play() {
        this.evalJS("play");
      },
      //暂停视频
      pause() {
        this.evalJS("pause");
      },
      //播放和暂停视频
      toggle() {
        this.evalJS("toggle");
      },
      /**
       * 跳转视频
       * @param {Number} time 跳转位置（单位秒）
      */
      seek(time) {
        this.evalJS("seek", time);
      },
      /**
       * 开启视频全屏
       * @param {String} direction 屏幕方向 auto-自动计算 landscape-横屏 portrait-竖屏
      */
      openFullscreen(direction) {
        this.evalJS("openFullscreen", direction);
      },
      //退出全屏
      exitFullscreen() {
        this.evalJS("exitFullscreen");
      },
      /**
       * 截图
       * @param {String} type video-使用video标签截图 3D-3D模式下截图渲染的canvas
       * @param {String} show 是否展示截图弹窗
      */
      capture(type, show = true) {
        this.evalJS("capture", { type, show });
      },
      //消息提示
      showToast(data) {
        this.evalJS("showToast", data);
      },
      //展示工具栏
      showToolbar(data) {
        if (typeof data == "object")
          data = this.parseTool(data);
        this.evalJS("showToolbar", data);
      },
      //禁用手势事件
      disableGesture() {
        this.evalJS("disableGesture");
      },
      //启用手势事件
      enableGesture() {
        this.evalJS("enableGesture");
      },
      //获取屏幕亮度
      getLight() {
        return __async(this, null, function* () {
          if (this.customHandles.getLight) {
            return yield this.customHandles.getLight();
          } else {
            return new Promise((resolve) => {
              uni.getScreenBrightness({
                success: (res) => {
                  resolve(res.value);
                }
              });
            });
          }
        });
      },
      //获取设备音量
      getVolume() {
        if (this.customHandles.getVolume) {
          return this.customHandles.getVolume();
        } else {
          return plus.device.getVolume();
        }
      },
      //监听组件销毁
      handleDestroy() {
        this.$emit("destroyed");
      },
      //保存base64图片到相册
      saveBase64ImageToAlbum(base64, fileName) {
        return new Promise((resolve, reject) => {
          const basePath = "_doc";
          const dirPath = "uniapp_temp";
          const tempFilePath = basePath + "/" + dirPath + "/" + fileName;
          const bitmap = new plus.nativeObj.Bitmap(fileName);
          bitmap.loadBase64Data(base64, function() {
            bitmap.save(tempFilePath, {}, function() {
              bitmap.clear();
              plus.gallery.save(tempFilePath, function(e) {
                resolve(e.path);
              }, function(error) {
                reject(error);
              });
            }, function(error) {
              bitmap.clear();
              reject(error);
            });
          }, function(error) {
            bitmap.clear();
            reject(error);
          });
        });
      },
      //注入js，根据平台不同调用方式不同
      evalJS(name, ...args) {
        let functionName = name + "(";
        args.forEach((arg) => {
          if (typeof arg == "object") {
            functionName += '"' + this.parseArg(arg) + '",';
          } else if (typeof arg == "string") {
            functionName += '"' + arg + '",';
          } else {
            functionName += arg + ",";
          }
        });
        const lastIndex = functionName.lastIndexOf(",");
        if (lastIndex > -1)
          functionName = functionName.substr(0, lastIndex);
        functionName += ");";
        this.$refs.web && this.$refs.web.evalJS(functionName);
      }
    },
    watch: {
      //监听播放链接
      src(newVal) {
        if (newVal && this.ready) {
          this.reloadVideo();
        }
      },
      //监听切片列表
      segments: {
        handler(newVal, oldVal) {
          if (!this.src)
            this.reloadVideo();
        },
        deep: true
      },
      //监听静音属性
      muted(newVal) {
        this.setVideo("muted", newVal);
      },
      //监听倍速属性
      playbackRate(newVal) {
        this.setVideo("playbackRate", newVal);
      },
      //监听循环属性
      loop(newVal) {
        this.setVideo("loop", newVal);
      },
      //监听高度
      height(newVal) {
        this.updateHeight();
      },
      //监听header
      header() {
        this.updateConfig();
      },
      //监听controls
      controls() {
        this.updateConfig();
      },
      //深度监听custom
      custom: {
        handler(newVal, oldVal) {
          this.reloadCustom();
        },
        deep: true
      }
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return (0, import_vue.openBlock)(), (0, import_vue.createElementBlock)(
      "view",
      {
        class: (0, import_vue.normalizeClass)(["yingbing-video", { "yingbing-video-full": $data.fullscreen }]),
        style: (0, import_vue.normalizeStyle)([$options.boxStyle]),
        renderWhole: true
      },
      [
        (0, import_vue.createElementVNode)("u-web-view", {
          style: { "flex": "1" },
          ref: "web",
          src: $props.webSrc,
          "on:onPostMessage": _cache[0] || (_cache[0] = (...args) => $options.handleMessage && $options.handleMessage(...args))
        }, null, 40, ["src"])
      ],
      6
      /* CLASS, STYLE */
    );
  }
  var __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["styles", [_style_0$1]], ["__file", "E:/work/QF/66video/\u597D\u7528\u89C6\u9891\u64AD\u653E\u5668-sample/uni_modules/yingbing-video/components/yb-video/yb-video.vue"]]);
  function resolveEasycom(component, easycom) {
    return typeof component === "string" ? easycom : component;
  }
  var _style_0 = { "danmu-input": { "": { "borderWidth": 1, "borderStyle": "solid", "borderColor": "#eeeeee", "height": 45, "paddingTop": 0, "paddingRight": 10, "paddingBottom": 0, "paddingLeft": 10 } } };
  var _sfc_main = {
    data() {
      return {
        src: "",
        three: "",
        danmu: [],
        quality: [],
        subtitles: [{
          title: "ASS\u5B57\u5E55",
          src: "/static/subtitle/[zmk.pw]\u6211\u7684\u4E16\u754C\u5927\u7535\u5F71\u7CBE\u8BD1v3.ass"
        }, {
          title: "SRT\u5B57\u5E55",
          src: "/static/subtitle/wednesday.1080p.web.h264-successfulcrab-hi.srt"
        }, {
          title: "VTT\u5B57\u5E55",
          src: "/static/subtitle/sing-song_2025-09-05_103755.vtt"
        }],
        works: [],
        workIndex: 0,
        custom: {
          header: {
            more: [{
              text: "\u6D4B\u8BD5\u6309\u94AE",
              click: () => {
                this.$refs.video.showToast("\u70B9\u51FB\u4E86\u6D4B\u8BD5\u6309\u94AE");
              }
            }]
          },
          progress: {
            leftSlots: [{
              innerHTML: `
								<div class="yb-player-icon">\u6D4B\u8BD5\u6309\u94AE</div>
							`,
              click: () => {
                this.$refs.video.showToast("\u70B9\u51FB\u4E86\u6D4B\u8BD5\u6309\u94AE");
              }
            }],
            rightSlots: [{
              innerHTML: `
								<div class="custom_danmu">
									<svg t="1756368791455" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4446" width="48" height="48"><path d="M628.01 470.03h88.851v71.575h-88.85V470.03zM628.01 361.426h88.851v69.107h-88.85v-69.107zM497.184 470.03h86.382v71.575h-86.382V470.03z" p-id="4447"></path><path d="M798.06 65.29H225.939c-81.839 0-148.204 68.834-148.204 153.746V795.52c0 84.93 67.835 163.189 151.559 163.189h565.393c83.724 0 151.577-78.277 151.577-163.189V219.036c0.001-84.911-66.344-153.746-148.202-153.746zM541.61 213.325c11.497 21.402 23.032 49.363 34.567 83.922-14.815 4.938-31.287 11.535-49.383 19.744-6.596-29.62-16.453-56.771-29.611-81.454l44.427-22.212zM400.927 586.04l-9.876 116.01c-3.318 32.91-17.718 52.644-43.201 59.26a631.2 631.2 0 0 1-77.75 14.796c-3.317-21.412-9.065-41.966-17.284-61.71 37.847 1.658 62.52 1.235 74.056-1.234 11.479-2.47 18.076-13.572 19.735-33.323l9.876-123.42h-118.48c6.558-52.651 9.875-109.413 9.875-170.321H358.97v-91.32c-54.32 0-97.125 0.848-128.357 2.469v-44.435c26.294 1.668 51.832 2.47 76.505 2.47h98.747a1257.144 1257.144 0 0 0-2.488 78.983c0 26.341 0.83 56.78 2.488 91.34H292.323l-4.938 88.86h120.93c-3.318 23.05-5.767 46.884-7.388 71.575z m397.398 101.205c-32.947-1.611-60.9-2.469-83.932-2.469h-86.382c0 37.877 0.79 74.045 2.469 108.614h-49.363c1.62-37.884 2.45-74.055 2.45-108.614H487.31c-26.33 1.67-49.363 3.318-69.116 4.948v-46.903c19.753 1.648 42.785 3.307 69.116 4.928h96.258v-66.648H447.821c1.62-41.108 2.469-85.543 2.469-133.286 0-47.715-0.848-88.86-2.47-123.418h180.19c14.816-34.558 27.952-69.918 39.506-106.145 18.058 8.256 37 15.664 56.753 22.223-16.474 18.123-32.08 46.084-46.895 83.922h86.382c-1.658 31.278-2.469 73.234-2.469 125.878 0 52.681 0.81 96.268 2.47 130.827H628.01v66.648h83.913c21.374 0 50.174-0.81 86.4-2.47v41.965z" p-id="4448"></path><path d="M497.184 361.426h86.382v69.107h-86.382v-69.107z" p-id="4449"></path></svg>
								</div>
							`,
              click: () => {
                this.$refs.video.showToolbar({
                  selector: ".custom_danmu",
                  list: [{
                    text: "\u81EA\u5B9A\u4E49\u5DE5\u51771",
                    click: () => {
                      this.$refs.video.showToast("\u81EA\u5B9A\u4E49\u5DE5\u51771");
                    }
                  }, {
                    text: "\u81EA\u5B9A\u4E49\u5DE5\u51772",
                    click: () => {
                      this.$refs.video.showToast("\u81EA\u5B9A\u4E49\u5DE5\u51772");
                    }
                  }, {
                    text: "\u81EA\u5B9A\u4E49\u5DE5\u51773",
                    click: () => {
                      this.$refs.video.showToast("\u81EA\u5B9A\u4E49\u5DE5\u51773");
                    }
                  }]
                });
              }
            }]
          }
        },
        text: ""
      };
    },
    onReady() {
      this.changeSrc(2);
    },
    methods: {
      back() {
        uni.navigateBack();
      },
      changeSrc(index2) {
        var arr = [
          "/static/video/test-360.mp4",
          //如果网页开启了/h5/的前缀，就需要加上这个/h5/
          "https://v2-zj-scct.kwaicdn.com/upic/2025/08/14/20/BMjAyNTA4MTQyMDEwMDVfMzc5NDk1NDg1Nl8xNzIzNjYyNjIwNDdfMF8z_b_B92c62e9609ee404af820675b37447d6d.mp4?tag=1-1756166590-unknown-0-wo6mf8iejp-e4f1ab14369cda6a&provider=self&clientCacheKey=3x4mikyhc8uu4jk_b.mp4&di=b6859a4d&bp=14944&x-ks-ptid=172366262047&kwai-not-alloc=self-cdn&kcdntag=p:Sichuan;i:ChinaTelecom;ft:UNKNOWN;h:COLD;pn:kuaishouVideoProjection&Aecs=172.19.0.226&ocid=100000971&tt=b&ss=vps",
          "https://ydtnt-jw.oss-cn-zhangjiakou.aliyuncs.com/jw-video/%E8%A7%86%E9%A2%91/%E8%8B%B1%E8%AF%AD/%E5%94%90%E8%BF%9F%E8%AF%8D%E6%B1%87%E7%9A%84%E9%80%BB%E8%BE%91%E5%8D%95%E8%AF%8D%E8%AF%BE/Unit1-1_batch.mp4"
        ];
        this.quality = [];
        for (let i = 0; i < 3; i++) {
          this.quality.push({
            title: i == 0 ? "480p" : i == 1 ? "720p" : "1080p",
            src: arr[index2],
            type: "video"
          });
        }
        this.works = [];
        for (let i = 0; i < 10; i++) {
          this.works.push({
            title: "\u7B2C" + (i + 1) + "\u96C6",
            src: arr[index2]
          });
        }
        this.workIndex = 0;
        this.three = index2 == 0 ? "360" : "none";
        this.src = arr[index2];
      },
      handleWorkChange(e) {
        this.src = e.detail.src;
        this.$refs.video.showToast("\u7531\u4E8E\u6D4B\u8BD5\u5207\u6362\u94FE\u63A5\u548C\u5F53\u524D\u64AD\u653E\u94FE\u63A5\u662F\u540C\u4E00\u4E2A\u6240\u4EE5\u4E0D\u4F1A\u89E6\u53D1\u89C6\u9891\u5207\u6362");
      },
      handleQualityChange(e) {
        this.$refs.video.showToast("\u7531\u4E8E\u6240\u6709\u753B\u8D28\u94FE\u63A5\u90FD\u662F\u4E00\u6837\u7684\uFF0C\u6240\u4EE5\u600E\u4E48\u5207\u6362\u90FD\u4F1A\u7D22\u5F15\u5230\u7B2C\u4E00\u4E2A\u753B\u8D28");
      },
      handleLoaded(e) {
        if (e.type == "init") {
          this.danmu = [];
          for (var i = 0; i < 8e3; i++) {
            this.danmu.push({
              mode: 1,
              time: 1 * i / 2,
              // 弹幕出现的时间(单位：毫秒)
              text: "\u8FD9\u662F\u65B0\u589E\u7684\u4E00\u6761\u5F39\u5E55" + i,
              // 弹幕文本内容
              color: "#0ff"
              // 该条弹幕的颜色，会覆盖全局设置
            });
          }
          this.$nextTick(() => {
            this.$refs.video.loadDanmu();
          });
        }
      },
      toggle() {
        this.$refs.video.toggle();
      },
      sendDanmu(mode) {
        if (!this.text)
          return;
        this.$refs.video.sendDanmu({
          mode,
          text: this.text,
          color: "#ffffff",
          fontSize: 18
        }, true);
        this.$refs.video.showToast({ message: "\u53D1\u9001\u5F39\u5E55\u6210\u529F", duration: 5e3 });
      },
      toNvue() {
        uni.navigateTo({
          url: "/pages/nvue/index"
        });
      }
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_yb_video = resolveEasycom((0, import_vue.resolveDynamicComponent)("yb-video"), __easycom_0);
    const _component_button = (0, import_vue.resolveComponent)("button");
    return (0, import_vue.openBlock)(), (0, import_vue.createElementBlock)("scroll-view", {
      scrollY: true,
      showScrollbar: true,
      enableBackToTop: true,
      bubble: "true",
      style: { flexDirection: "column" }
    }, [
      (0, import_vue.createElementVNode)("view", null, [
        (0, import_vue.createVNode)(_component_yb_video, {
          ref: "video",
          title: "\u6D4B\u8BD5\u89C6\u9891",
          height: "auto",
          src: $data.src,
          three: $data.three,
          danmu: $data.danmu,
          quality: $data.quality,
          subtitles: $data.subtitles,
          works: $data.works,
          workIndex: $data.workIndex,
          custom: $data.custom,
          header: "",
          controls: "",
          onBack: $options.back,
          onWorkchange: $options.handleWorkChange,
          onQualitychange: $options.handleQualityChange,
          onLoadedmetadata: $options.handleLoaded
        }, null, 8, ["src", "three", "danmu", "quality", "subtitles", "works", "workIndex", "custom", "onBack", "onWorkchange", "onQualitychange", "onLoadedmetadata"]),
        (0, import_vue.createElementVNode)("u-input", {
          class: "danmu-input",
          modelValue: $data.text,
          onInput: _cache[0] || (_cache[0] = ($event) => $data.text = $event.detail.value),
          type: "text",
          placeholder: "\u8F93\u5165\u5F39\u5E55"
        }, null, 40, ["modelValue"]),
        (0, import_vue.createVNode)(_component_button, {
          onClick: _cache[1] || (_cache[1] = ($event) => $options.sendDanmu(1))
        }, {
          default: (0, import_vue.withCtx)(() => [
            (0, import_vue.createTextVNode)("\u53D1\u9001\u6EDA\u52A8\u5F39\u5E55")
          ]),
          _: 1
          /* STABLE */
        }),
        (0, import_vue.createVNode)(_component_button, {
          onClick: _cache[2] || (_cache[2] = ($event) => $options.sendDanmu(5))
        }, {
          default: (0, import_vue.withCtx)(() => [
            (0, import_vue.createTextVNode)("\u53D1\u9001\u9876\u7AEF\u5F39\u5E55")
          ]),
          _: 1
          /* STABLE */
        }),
        (0, import_vue.createVNode)(_component_button, {
          onClick: _cache[3] || (_cache[3] = ($event) => $options.sendDanmu(4))
        }, {
          default: (0, import_vue.withCtx)(() => [
            (0, import_vue.createTextVNode)("\u53D1\u9001\u5E95\u7AEF\u5F39\u5E55")
          ]),
          _: 1
          /* STABLE */
        }),
        (0, import_vue.createVNode)(_component_button, { onClick: $options.toggle }, {
          default: (0, import_vue.withCtx)(() => [
            (0, import_vue.createTextVNode)("\u64AD\u653E/\u6682\u505C")
          ]),
          _: 1
          /* STABLE */
        }, 8, ["onClick"]),
        (0, import_vue.createVNode)(_component_button, {
          onClick: _cache[4] || (_cache[4] = ($event) => $options.changeSrc(0))
        }, {
          default: (0, import_vue.withCtx)(() => [
            (0, import_vue.createTextVNode)("\u5207\u63623D")
          ]),
          _: 1
          /* STABLE */
        }),
        (0, import_vue.createVNode)(_component_button, {
          onClick: _cache[5] || (_cache[5] = ($event) => $options.changeSrc(2))
        }, {
          default: (0, import_vue.withCtx)(() => [
            (0, import_vue.createTextVNode)("\u5207\u63622D")
          ]),
          _: 1
          /* STABLE */
        }),
        (0, import_vue.createVNode)(_component_button, { onClick: $options.back }, {
          default: (0, import_vue.withCtx)(() => [
            (0, import_vue.createTextVNode)("\u8FD4\u56DEVUE")
          ]),
          _: 1
          /* STABLE */
        }, 8, ["onClick"])
      ])
    ]);
  }
  var index = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["styles", [_style_0]], ["__file", "E:/work/QF/66video/\u597D\u7528\u89C6\u9891\u64AD\u653E\u5668-sample/pages/nvue/index.nvue"]]);

  // <stdin>
  var webview = plus.webview.currentWebview();
  if (webview) {
    const __pageId = parseInt(webview.id);
    const __pagePath = "pages/nvue/index";
    let __pageQuery = {};
    try {
      __pageQuery = JSON.parse(webview.__query__);
    } catch (e) {
    }
    index.mpType = "page";
    const app = Vue.createPageApp(index, { $store: getApp({ allowDefault: true }).$store, __pageId, __pagePath, __pageQuery });
    app.provide("__globalStyles", Vue.useCssStyles([...__uniConfig.styles, ...index.styles || []]));
    app.mount("#root");
  }
})();
