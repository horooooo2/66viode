if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  const ON_READY = "onReady";
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  function resolveEasycom(component, easycom) {
    return typeof component === "string" ? easycom : component;
  }
  const createLifeCycleHook = (lifecycle, flag = 0) => (hook, target = vue.getCurrentInstance()) => {
    !vue.isInSSRComponentSetup && vue.injectHook(lifecycle, hook, target);
  };
  const onReady = /* @__PURE__ */ createLifeCycleHook(
    ON_READY,
    2
    /* HookFlags.PAGE */
  );
  const block0$1 = (Comp) => {
    (Comp.$renderjs || (Comp.$renderjs = [])).push("ComIframe");
    (Comp.$renderjsModules || (Comp.$renderjsModules = {}))["ComIframe"] = "16e87d9e";
  };
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$5 = {
    props: {
      dataId: {
        type: String,
        default() {
          return (/* @__PURE__ */ new Date()).getTime().toString() + Math.round(Math.random() * 1e4);
        }
      },
      src: {
        //链接
        type: String,
        default: ""
      },
      sandbox: {
        //沙盒模式 原生属性
        type: String,
        default: "allow-same-origin allow-scripts allow-forms allow-top-navigation-by-user-activation allow-popups allow-modals"
      },
      allow: {
        //允许一些操作 原生属性
        type: String,
        // default: 'autoplay; fullscreen; encrypted-media; picture-in-picture'
        default: ""
      },
      allowfullscreen: {
        //是否允许全屏 原生属性
        type: Boolean,
        default: true
      },
      //跨域属性 anonymous-它有一个默认值。它定义了将在不传递凭据信息的情况下发送CORS请求 use-credentials-将发送带有凭据、cookie 和证书的 cross-origin 请求
      crossOrigin: {
        type: String,
        default: ""
      },
      frameborder: {
        //iframe边框 原生属性
        type: String,
        default: "0"
      },
      iframeClass: {
        //iframe样式
        type: [String, Object],
        default: ""
      },
      iframeStyle: {
        //iframe样式
        type: [String, Object],
        default: ""
      },
      loadingShow: {
        //展示loading
        type: Boolean,
        default: true
      },
      console: {
        //控制console
        type: String,
        default: "log warn error"
      },
      overrideUrlLoadingOptions: {
        //仅支持app
        type: Object,
        default: () => {
          return {
            effect: "",
            mode: "",
            match: "",
            exclude: ""
          };
        }
      }
    },
    computed: {
      overrideUrlLoadingOptionsString() {
        return JSON.stringify(this.overrideUrlLoadingOptions);
      },
      iframeStyleString() {
        return JSON.stringify(this.iframeStyle);
      },
      iframeClassString() {
        return JSON.stringify(this.iframeClass);
      }
    },
    data() {
      return {
        ready: "",
        jump: 0,
        isDestroy: false,
        evalJSString: "",
        //js字符串
        evalCSSString: "",
        //注入css字符串
        assignUrl: "",
        //跳转链接
        loadingStatus: -1,
        //加载进度提控制
        evalJSTask: /* @__PURE__ */ new Map(),
        //注入js临时队列表
        setDataName: "",
        setDataValue: ""
      };
    },
    mounted() {
      this.$nextTick(function() {
        setTimeout(() => {
          this.ready = this.dataId;
        }, 100);
      });
    },
    methods: {
      //返回上一页
      back() {
        this.jump = 0;
        this.$nextTick(function() {
          this.jump = -1;
        });
      },
      //调用内部iframe跳转链接
      assign(url) {
        this.assignUrl = url;
      },
      //显示进度条加载
      showLoading() {
        this.loadingStatus = -1;
        this.$nextTick(function() {
          this.loadingStatus = 1;
        });
      },
      //关闭进度条加载
      hideLoading() {
        this.loadingStatus = -1;
        this.$nextTick(function() {
          this.loadingStatus = 0;
        });
      },
      //销毁
      destroy() {
        this.isDestroy = false;
        this.$nextTick(() => {
          this.isDestroy = true;
        });
      },
      //注入js
      evalJS(str) {
        if (this.evalJSString) {
          const id = (/* @__PURE__ */ new Date()).getTime().toString() + Math.round(Math.random() * 1e4);
          this.evalJSTask.set(id, str);
        } else {
          this.evalJSString = str;
        }
      },
      //注入css
      evalCSS(str) {
        this.evalCSSString = "";
        this.$nextTick(() => {
          this.evalCSSString = str;
        });
      },
      setData(key, value) {
        this.setDataName = key;
        this.setDataValue = "";
        this.$nextTick(() => {
          this.setDataValue = value;
        });
      },
      loadstart(e) {
        this.$emit("loadstart", e);
      },
      loaded(e) {
        this.$emit("loaded", e);
      },
      callError(e) {
        this.$emit("error", e);
      },
      backError() {
        this.$emit("backerror");
      },
      callDestroy() {
        this.$emit("destroyed");
      },
      overrideUrlLoading(e) {
        this.$emit("overrideurlloading", e);
      },
      message(e) {
        this.$emit("message", e);
      },
      callEvalJS(e) {
        this.evalJSString = "";
        if (this.evalJSTask.size) {
          const firstEntrie = this.evalJSTask.entries().next().value;
          this.evalJS(firstEntrie[1]);
          this.evalJSTask.delete(firstEntrie[0]);
        }
        if (e.status == "error")
          this.callError(e.message);
      }
    }
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", {
      class: vue.normalizeClass(["iframe" + $props.dataId, "find_iframe"]),
      "data-sandbox": $props.sandbox,
      "data-allow": $props.allow,
      "data-allowfullscreen": $props.allowfullscreen,
      "data-frameborder": $props.frameborder,
      "data-loadingShow": $props.loadingShow,
      "data-console": $props.console,
      "data-iframeStyle": $options.iframeStyleString,
      "data-iframeClass": $options.iframeClassString,
      "data-crossOrigin": $props.crossOrigin,
      "data-setDataName": $data.setDataName,
      "data-overrideUrlLoadingOptions": $options.overrideUrlLoadingOptionsString,
      ready: vue.wp($data.ready),
      "change:ready": _ctx.ComIframe.readyWatcher,
      isDestroy: vue.wp($data.isDestroy),
      "change:isDestroy": _ctx.ComIframe.destroyWatcher,
      src: vue.wp($props.src),
      "change:src": _ctx.ComIframe.srcWatcher,
      sandbox: vue.wp($props.sandbox),
      "change:sandbox": _ctx.ComIframe.sandboxWatcher,
      allow: vue.wp($props.allow),
      "change:allow": _ctx.ComIframe.allowWatcher,
      allowfullscreen: vue.wp($props.allowfullscreen),
      "change:allowfullscreen": _ctx.ComIframe.allowfullscreenWatcher,
      frameborder: vue.wp($props.frameborder),
      "change:frameborder": _ctx.ComIframe.frameborderWatcher,
      iframeStyle: vue.wp($props.iframeStyle),
      "change:iframeStyle": _ctx.ComIframe.iframeStyleWatcher,
      iframeClass: vue.wp($props.iframeClass),
      "change:iframeClass": _ctx.ComIframe.iframeClassWatcher,
      jump: vue.wp($data.jump),
      "change:jump": _ctx.ComIframe.jumpWatcher,
      assignUrl: vue.wp($data.assignUrl),
      "change:assignUrl": _ctx.ComIframe.assignUrlWatcher,
      loadingStatus: vue.wp($data.loadingStatus),
      "change:loadingStatus": _ctx.ComIframe.loadingWatcher,
      evalJS: vue.wp($data.evalJSString),
      "change:evalJS": _ctx.ComIframe.evalJSWatcher,
      evalCSS: vue.wp($data.evalCSSString),
      "change:evalCSS": _ctx.ComIframe.evalCSSWatcher,
      setData: vue.wp($data.setDataValue),
      "change:setData": _ctx.ComIframe.setDataWatcher,
      overrideUrlLoading: vue.wp($options.overrideUrlLoadingOptionsString),
      "change:overrideUrlLoading": _ctx.ComIframe.overrideUrlLoadingWatcher
    }, null, 10, ["data-sandbox", "data-allow", "data-allowfullscreen", "data-frameborder", "data-loadingShow", "data-console", "data-iframeStyle", "data-iframeClass", "data-crossOrigin", "data-setDataName", "data-overrideUrlLoadingOptions", "ready", "change:ready", "isDestroy", "change:isDestroy", "src", "change:src", "sandbox", "change:sandbox", "allow", "change:allow", "allowfullscreen", "change:allowfullscreen", "frameborder", "change:frameborder", "iframeStyle", "change:iframeStyle", "iframeClass", "change:iframeClass", "jump", "change:jump", "assignUrl", "change:assignUrl", "loadingStatus", "change:loadingStatus", "evalJS", "change:evalJS", "evalCSS", "change:evalCSS", "setData", "change:setData", "overrideUrlLoading", "change:overrideUrlLoading"]);
  }
  if (typeof block0$1 === "function")
    block0$1(_sfc_main$5);
  const RIframe = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$4], ["__scopeId", "data-v-29e0aad6"], ["__file", "E:/work/QF/66video/好用视频播放器-sample/uni_modules/yingbing-video/components/modules/iframe.vue"]]);
  const block0 = (Comp) => {
    (Comp.$renderjs || (Comp.$renderjs = [])).push("RenderVideo");
    (Comp.$renderjsModules || (Comp.$renderjsModules = {}))["RenderVideo"] = "73aeced3";
  };
  const _sfc_main$4 = {
    data() {
      return {
        dataId: "",
        videoParams: "",
        //视频参数
        isUnload: -1,
        //是否卸载视频
        loadDanmuParams: "",
        //弹幕配置
        isUnloadDanmu: -1,
        //是否卸载弹幕
        sendDanmuParams: "",
        //发送弹幕
        insertDanmuParams: "",
        //插入弹幕
        setVideoParams: "",
        //设置video属性
        reloadCustomParams: "",
        //重加载自定义配置
        updateConfigParams: "",
        //更新配置
        isPlay: -1,
        //是否播放
        isPause: -1,
        //是否暂停
        isToggle: -1,
        //是否切换
        seekTime: -1,
        //跳转时间
        isOpenFullscreen: -1,
        //是否开启全屏
        isExitFullscreen: -1,
        //是否退出全屏
        captureParams: "",
        //截屏
        toastParams: "",
        //消息提示
        toolbarParams: "",
        //工具栏
        isEnableGesture: -1,
        //是否开启手势事件
        isDisableGesture: -1,
        //是否关闭手势事件
        isUpdateSize: -1
        //是否更新画布尺寸
      };
    },
    mounted() {
      this.dataId = (/* @__PURE__ */ new Date()).getTime().toString() + Math.round(Math.random() * 1e4);
    },
    methods: {
      ready() {
        this.emit("message", { ready: true });
      },
      destroyed() {
        this.$emit("destroyed");
      },
      message(e) {
        this.$emit("message", e);
      },
      emit(name, data) {
        this.$emit(name, {
          data
        });
      },
      //重加载视频
      reloadVideo(params) {
        this.videoParams = "";
        this.$nextTick(() => {
          this.videoParams = params;
        });
      },
      //卸载视频
      destroy() {
        this.isUnload = -1;
        this.$nextTick(() => {
          this.isUnload = 1;
        });
      },
      //加载弹幕
      loadDanmu(danmu) {
        this.loadDanmuParams = "";
        this.$nextTick(() => {
          this.loadDanmuParams = danmu;
        });
      },
      //卸载弹幕
      unloadDanmu() {
        this.isUnloadDanmu = -1;
        this.$nextTick(() => {
          this.isUnloadDanmu = 1;
        });
      },
      //发送弹幕
      sendDanmu(danmu, border) {
        this.sendDanmuParams = "";
        this.$nextTick(() => {
          this.sendDanmuParams = {
            danmu,
            border
          };
        });
      },
      //插入弹幕
      insertDanmu(danmu) {
        this.insertDanmuParams = "";
        this.$nextTick(() => {
          this.insertDanmuParams = danmu;
        });
      },
      //动态修改video属性
      setVideo(key, value) {
        this.setVideoParams = "";
        this.$nextTick(() => {
          this.setVideoParams = {
            key,
            value
          };
        });
      },
      //重加载自定义配置
      reloadCustom(params) {
        this.reloadCustomParams = "";
        this.$nextTick(() => {
          this.reloadCustomParams = params;
        });
      },
      //更新配置
      updateConfig(params) {
        this.updateConfigParams = "";
        this.$nextTick(() => {
          this.updateConfigParams = params;
        });
      },
      //播放视频
      play() {
        this.isPlay = -1;
        this.$nextTick(() => {
          this.isPlay = 1;
        });
      },
      //暂停视频
      pause() {
        this.isPause = -1;
        this.$nextTick(() => {
          this.isPause = 1;
        });
      },
      //播放和暂停视频
      toggle() {
        this.isToggle = -1;
        this.$nextTick(() => {
          this.isToggle = 1;
        });
      },
      /**
       * 跳转视频
       * @param {Number} time 跳转位置（单位秒）
      */
      seek(time) {
        this.seekTime = -1;
        this.$nextTick(() => {
          this.seekTime = time;
        });
      },
      /**
       * 播放和暂停视频
       * @param {String} direction 屏幕方向 auto-自动计算 landscape-横屏 portrait-竖屏
      */
      openFullscreen(direction) {
        this.isOpenFullscreen = -1;
        this.$nextTick(() => {
          this.isOpenFullscreen = direction;
        });
      },
      //退出全屏
      exitFullscreen() {
        this.isExitFullscreen = -1;
        this.$nextTick(() => {
          this.isExitFullscreen = 1;
        });
      },
      //截图
      capture(data) {
        this.captureParams = "";
        this.$nextTick(() => {
          this.captureParams = data;
        });
      },
      //消息提示
      showToast(data) {
        this.toastParams = "";
        this.$nextTick(() => {
          this.toastParams = data;
        });
      },
      //展示工具栏
      showToolbar(data) {
        this.toolbarParams = "";
        this.$nextTick(() => {
          this.toolbarParams = data;
        });
      },
      //禁用手势事件
      disableGesture() {
        this.isDisableGesture = -1;
        this.$nextTick(() => {
          this.isDisableGesture = 1;
        });
      },
      //启用手势事件
      enableGesture() {
        this.isEnableGesture = -1;
        this.$nextTick(() => {
          this.isEnableGesture = 1;
        });
      },
      updateSize() {
        this.isUpdateSize = -1;
        this.$nextTick(() => {
          this.isUpdateSize = 1;
        });
      }
    }
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", {
      class: vue.normalizeClass(["render-video", "rvideo" + $data.dataId]),
      dataId: vue.wp($data.dataId),
      "change:dataId": _ctx.RenderVideo.dataIdWatcher,
      videoParams: vue.wp($data.videoParams),
      "change:videoParams": _ctx.RenderVideo.reloadVideoRender,
      isUnload: vue.wp($data.isUnload),
      "change:isUnload": _ctx.RenderVideo.destroyRender,
      loadDanmuParams: vue.wp($data.loadDanmuParams),
      "change:loadDanmuParams": _ctx.RenderVideo.loadDanmuRender,
      isUnloadDanmu: vue.wp($data.isUnloadDanmu),
      "change:isUnloadDanmu": _ctx.RenderVideo.unloadDanmuRender,
      sendDanmuParams: vue.wp($data.sendDanmuParams),
      "change:sendDanmuParams": _ctx.RenderVideo.sendDanmuRender,
      insertDanmuParams: vue.wp($data.insertDanmuParams),
      "change:insertDanmuParams": _ctx.RenderVideo.insertDanmuRender,
      setVideoParams: vue.wp($data.setVideoParams),
      "change:setVideoParams": _ctx.RenderVideo.setVideoRender,
      reloadCustomParams: vue.wp($data.reloadCustomParams),
      "change:reloadCustomParams": _ctx.RenderVideo.reloadCustomRender,
      updateConfigParams: vue.wp($data.updateConfigParams),
      "change:updateConfigParams": _ctx.RenderVideo.updateConfigRender,
      isPlay: vue.wp($data.isPlay),
      "change:isPlay": _ctx.RenderVideo.playRender,
      isPause: vue.wp($data.isPause),
      "change:isPause": _ctx.RenderVideo.pauseRender,
      isToggle: vue.wp($data.isToggle),
      "change:isToggle": _ctx.RenderVideo.toggleRender,
      seekTime: vue.wp($data.seekTime),
      "change:seekTime": _ctx.RenderVideo.seekRender,
      isOpenFullscreen: vue.wp($data.isOpenFullscreen),
      "change:isOpenFullscreen": _ctx.RenderVideo.openFullscreenRender,
      isExitFullscreen: vue.wp($data.isExitFullscreen),
      "change:isExitFullscreen": _ctx.RenderVideo.exitFullscreenRender,
      captureParams: vue.wp($data.captureParams),
      "change:captureParams": _ctx.RenderVideo.captureRender,
      toastParams: vue.wp($data.toastParams),
      "change:toastParams": _ctx.RenderVideo.showToastRender,
      toolbarParams: vue.wp($data.toolbarParams),
      "change:toolbarParams": _ctx.RenderVideo.showToolbarRender,
      isEnableGesture: vue.wp($data.isEnableGesture),
      "change:isEnableGesture": _ctx.RenderVideo.enableGestureRender,
      isDisableGesture: vue.wp($data.isDisableGesture),
      "change:isDisableGesture": _ctx.RenderVideo.disableGestureRender,
      isUpdateSize: vue.wp($data.isUpdateSize),
      "change:isUpdateSize": _ctx.RenderVideo.updateSizeRender
    }, [
      vue.createElementVNode(
        "view",
        {
          class: vue.normalizeClass("rvideoslot" + $data.dataId)
        },
        [
          vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ],
        2
        /* CLASS */
      )
    ], 10, ["dataId", "change:dataId", "videoParams", "change:videoParams", "isUnload", "change:isUnload", "loadDanmuParams", "change:loadDanmuParams", "isUnloadDanmu", "change:isUnloadDanmu", "sendDanmuParams", "change:sendDanmuParams", "insertDanmuParams", "change:insertDanmuParams", "setVideoParams", "change:setVideoParams", "reloadCustomParams", "change:reloadCustomParams", "updateConfigParams", "change:updateConfigParams", "isPlay", "change:isPlay", "isPause", "change:isPause", "isToggle", "change:isToggle", "seekTime", "change:seekTime", "isOpenFullscreen", "change:isOpenFullscreen", "isExitFullscreen", "change:isExitFullscreen", "captureParams", "change:captureParams", "toastParams", "change:toastParams", "toolbarParams", "change:toolbarParams", "isEnableGesture", "change:isEnableGesture", "isDisableGesture", "change:isDisableGesture", "isUpdateSize", "change:isUpdateSize"]);
  }
  if (typeof block0 === "function")
    block0(_sfc_main$4);
  const RVideo = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$3], ["__scopeId", "data-v-79092f7c"], ["__file", "E:/work/QF/66video/好用视频播放器-sample/uni_modules/yingbing-video/components/modules/video.vue"]]);
  const _sfc_main$3 = {
    components: { RIframe, RVideo },
    props: {
      //iframe或者webview访问的自定义src
      webSrc: {
        type: String,
        default: () => {
          const path = "/uni_modules/yingbing-video/static/html/video.html";
          return "." + path;
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
      //渲染类型
      renderType: {
        type: String,
        default: () => {
          if (uni.getSystemInfoSync().platform == "ios") {
            return "renderjs";
          } else {
            return "web";
          }
        }
      }
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
        this.parseMessage(e.data.type == "WEB_INVOKE_APPSERVICE" ? e.data.data.arg : e.data);
      },
      //处理返回的消息
      async parseMessage(data) {
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
              this.showToast("保存到相册成功");
            }).catch(() => {
              this.showToast("保存到相册失败");
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
      async parseCustom() {
        const custom = this._deepClone(this.custom);
        const initialLight = await this.getLight();
        const initialVolume = await this.getVolume();
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
          return { ...item, src: this.parseSrc(item.src) };
        });
      },
      //处理切片列表链接
      parseSegments(data) {
        return data.map((item) => {
          return { ...item, url: this.parseSrc(item.url) };
        });
      },
      //处理通信参数
      parseArg(arg) {
        return encodeURIComponent(encodeURIComponent(JSON.stringify(arg)));
      },
      //重加载视频
      async reloadVideo() {
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
          custom: await this.parseCustom(),
          flvConfig: this.flvConfig,
          hlsConfig: this.hlsConfig,
          jsmpegConfig: this.jsmpegConfig
        };
        this.evalJS("reloadVideo", arg);
      },
      //卸载视频
      unload() {
        this.evalJS("destroy");
      },
      //加载弹幕
      loadDanmu() {
        if (this.renderType == "renderjs") {
          this.evalJS("loadDanmu", this.danmu);
        } else {
          this.$refs.web && this.$refs.web.setData("danmu", this.danmu);
          setTimeout(() => {
            this.evalJS("loadDanmu");
          }, 100);
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
        this.customTimer = setTimeout(async () => {
          const custom = await this.parseCustom();
          this.evalJS("reloadCustom", custom);
        }, 200);
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
      async getLight() {
        if (this.customHandles.getLight) {
          return await this.customHandles.getLight();
        } else {
          return new Promise((resolve) => {
            uni.getScreenBrightness({
              success: (res) => {
                resolve(res.value);
              }
            });
          });
        }
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
        if (this.renderType == "renderjs")
          this.$refs.web && this.$refs.web[name](...args);
        else
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
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_r_video = vue.resolveComponent("r-video");
    const _component_r_iframe = vue.resolveComponent("r-iframe");
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["yingbing-video", { "yingbing-video-full": $data.fullscreen }]),
        style: vue.normalizeStyle([$options.boxStyle])
      },
      [
        $props.renderType == "renderjs" ? (vue.openBlock(), vue.createBlock(_component_r_video, {
          key: 0,
          ref: "web",
          class: "yb-iframe",
          onMessage: $options.handleMessage,
          onDestroyed: $options.handleDestroy
        }, {
          default: vue.withCtx(() => [
            vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
          ]),
          _: 3
          /* FORWARDED */
        }, 8, ["onMessage", "onDestroyed"])) : (vue.openBlock(), vue.createBlock(_component_r_iframe, {
          key: 1,
          ref: "web",
          class: "yb-iframe",
          crossOrigin: "anonymous",
          src: $props.webSrc,
          onMessage: $options.handleMessage,
          "loading-show": false,
          onDestroyed: $options.handleDestroy
        }, null, 8, ["src", "onMessage", "onDestroyed"]))
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__scopeId", "data-v-66d24760"], ["__file", "E:/work/QF/66video/好用视频播放器-sample/uni_modules/yingbing-video/components/yb-video/yb-video.vue"]]);
  const _sfc_main$2 = {
    data() {
      return {
        src: "",
        three: "",
        crossOrigin: "",
        danmu: [],
        quality: [],
        works: [],
        workIndex: 0,
        subtitles: [{
          title: "ASS字幕",
          src: "/static/subtitle/[zmk.pw]我的世界大电影精译v3.ass"
        }, {
          title: "SRT字幕",
          src: "/static/subtitle/wednesday.1080p.web.h264-successfulcrab-hi.srt"
        }, {
          title: "VTT字幕",
          src: "/static/subtitle/sing-song_2025-09-05_103755.vtt"
        }],
        custom: {
          header: {
            more: [{
              text: "测试按钮",
              click: () => {
                this.$refs.video.showToast("点击了测试按钮");
              }
            }]
          },
          progress: {
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
                    text: "重置弹幕",
                    click: () => {
                      this.loadDanmu();
                    }
                  }, {
                    text: "自定义工具2",
                    click: () => {
                      this.$refs.video.showToast("自定义工具2");
                    }
                  }, {
                    text: "自定义工具3",
                    click: () => {
                      this.$refs.video.showToast("自定义工具3");
                    }
                  }]
                });
              }
            }]
          },
          danmu: {
            //过滤列表
            filter: [{
              pattern: "ost",
              type: "string"
              //普通文本过滤
            }, {
              pattern: "发弹幕",
              type: "string"
            }, {
              pattern: "求不卡",
              type: "string"
            }, {
              pattern: "\\d+",
              type: "regex"
              //正则过滤
            }]
          }
        },
        text: ""
      };
    },
    onReady() {
      this.changeSrc(3);
    },
    methods: {
      changeSrc(index) {
        var arr = [
          "/static/video/test-360.mp4",
          //如果网页开启了/h5/的前缀，就需要加上这个/h5/
          "https://v2-zj-scct.kwaicdn.com/upic/2025/08/14/20/BMjAyNTA4MTQyMDEwMDVfMzc5NDk1NDg1Nl8xNzIzNjYyNjIwNDdfMF8z_b_B92c62e9609ee404af820675b37447d6d.mp4?tag=1-1756166590-unknown-0-wo6mf8iejp-e4f1ab14369cda6a&provider=self&clientCacheKey=3x4mikyhc8uu4jk_b.mp4&di=b6859a4d&bp=14944&x-ks-ptid=172366262047&kwai-not-alloc=self-cdn&kcdntag=p:Sichuan;i:ChinaTelecom;ft:UNKNOWN;h:COLD;pn:kuaishouVideoProjection&Aecs=172.19.0.226&ocid=100000971&tt=b&ss=vps",
          "https://files2.changyou.com/vc/dj/2023/1115/loop2.ts",
          "https://ydtnt-jw.oss-cn-zhangjiakou.aliyuncs.com/jw-video/%E8%A7%86%E9%A2%91/%E8%8B%B1%E8%AF%AD/%E5%94%90%E8%BF%9F%E8%AF%8D%E6%B1%87%E7%9A%84%E9%80%BB%E8%BE%91%E5%8D%95%E8%AF%8D%E8%AF%BE/Unit1-1_batch.mp4"
        ];
        this.quality = [];
        for (let i = 0; i < 3; i++) {
          this.quality.push({
            title: i == 0 ? "480p" : i == 1 ? "720p" : "1080p",
            src: arr[index],
            type: "video"
          });
        }
        this.works = [];
        for (let i = 0; i < 10; i++) {
          this.works.push({
            title: "第" + (i + 1) + "集",
            src: arr[index]
          });
        }
        this.workIndex = 0;
        this.three = index == 0 ? "360" : "none";
        this.crossOrigin = index == 0 ? "anonymous" : "";
        this.src = arr[index];
      },
      handleDestroyed() {
        uni.showToast({
          title: "视频已销毁",
          icon: "none"
        });
        formatAppLog("log", "at pages/vue2/index.vue:155", "destroyed");
      },
      handleWorkChange(e) {
        this.src = e.detail.src;
        this.$refs.video.showToast("由于测试切换链接和当前播放链接是同一个所以不会触发视频切换");
      },
      handleQualityChange(e) {
        this.$refs.video.showToast("由于所有画质链接都是一样的，所以怎么切换都会索引到第一个画质");
      },
      handleLoaded(e) {
        if (e.type == "init") {
          this.loadDanmu();
        }
      },
      handleDanmuFilterReduce(e) {
        formatAppLog("log", "at pages/vue2/index.vue:170", "reduce", e);
      },
      handleDanmuFilterAdd(e) {
        formatAppLog("log", "at pages/vue2/index.vue:173", "add", e);
      },
      async loadDanmu() {
        this.danmu = [];
        this.danmu = await this.getDanmu();
        this.$nextTick(() => {
          this.$refs.video.loadDanmu();
        });
      },
      getDanmu() {
        const url = "/static/danmu/bilibilimadoka.xml";
        return new Promise((resolve) => {
          plus.io.resolveLocalFileSystemURL(url, (entry) => {
            entry.file((file) => {
              var fileReader = new plus.io.FileReader();
              fileReader.readAsText(file, "utf-8");
              fileReader.onloadend = (evt) => {
                resolve(this.parseDanmu(evt.target.result));
              };
            });
          }, function(e) {
            resolve(null);
          });
        });
      },
      parseDanmu(content) {
        const pattern = /<d\b[^>]*>(.*?)<\/d\s*>/g;
        const danmuku = [];
        let match = "";
        while ((match = pattern.exec(content)) !== null) {
          const attr = match[0].match(/p=\"*([\s\S]*?)\"/)[1];
          const attrs = attr.split(",");
          danmuku.push({
            mode: attrs[1],
            time: Number(attrs[0]),
            color: this.decimalToRgb(Number(attrs[3])),
            fontSize: attrs[2],
            text: match[1]
          });
        }
        return danmuku;
      },
      decimalToRgb(decimal) {
        var r = decimal >> 16 & 255;
        var g = decimal >> 8 & 255;
        var b = decimal & 255;
        return "rgb(" + r + "," + g + "," + b + ")";
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
        this.$refs.video.showToast({ message: "发送弹幕成功", duration: 5e3 });
      },
      handleClickSlot() {
        this.$refs.video.showToast("点击了组件插槽");
      },
      destroy() {
        this.$refs.video.unload();
      },
      toNvue() {
        uni.navigateTo({
          url: "/pages/nvue/index"
        });
      },
      toVue3() {
        uni.navigateTo({
          url: "/pages/vue3/index"
        });
      }
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_yb_video = resolveEasycom(vue.resolveDynamicComponent("yb-video"), __easycom_0);
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createVNode(_component_yb_video, {
        ref: "video",
        title: "测试视频",
        height: "auto",
        "render-type": "renderjs",
        crossOrigin: $data.crossOrigin,
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
        loop: "",
        "object-fit": "contain",
        onDestroyed: $options.handleDestroyed,
        onWorkchange: $options.handleWorkChange,
        onQualitychange: $options.handleQualityChange,
        onLoadedmetadata: $options.handleLoaded,
        onDanmufilterreduce: $options.handleDanmuFilterReduce,
        onDanmufilteradd: $options.handleDanmuFilterAdd
      }, {
        default: vue.withCtx(() => [
          vue.createElementVNode("view", {
            style: { "position": "absolute", "top": "50px", "left": "50px", "color": "#fff" },
            onClick: _cache[0] || (_cache[0] = (...args) => $options.handleClickSlot && $options.handleClickSlot(...args))
          }, "这是组件插槽仅在renderjs渲染类型下有效")
        ]),
        _: 1
        /* STABLE */
      }, 8, ["crossOrigin", "src", "three", "danmu", "quality", "subtitles", "works", "workIndex", "custom", "onDestroyed", "onWorkchange", "onQualitychange", "onLoadedmetadata", "onDanmufilterreduce", "onDanmufilteradd"]),
      vue.withDirectives(vue.createElementVNode(
        "input",
        {
          class: "danmu-input",
          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.text = $event),
          type: "text",
          placeholder: "输入弹幕"
        },
        null,
        512
        /* NEED_PATCH */
      ), [
        [vue.vModelText, $data.text]
      ]),
      vue.createElementVNode("button", {
        onClick: _cache[2] || (_cache[2] = ($event) => $options.sendDanmu(1))
      }, "发送滚动弹幕"),
      vue.createElementVNode("button", {
        onClick: _cache[3] || (_cache[3] = ($event) => $options.sendDanmu(5))
      }, "发送顶端弹幕"),
      vue.createElementVNode("button", {
        onClick: _cache[4] || (_cache[4] = ($event) => $options.sendDanmu(4))
      }, "发送底端弹幕"),
      vue.createElementVNode("button", {
        onClick: _cache[5] || (_cache[5] = (...args) => $options.toggle && $options.toggle(...args))
      }, "播放/暂停"),
      vue.createElementVNode("button", {
        onClick: _cache[6] || (_cache[6] = ($event) => $options.changeSrc(0))
      }, "切换3D"),
      vue.createElementVNode("button", {
        onClick: _cache[7] || (_cache[7] = ($event) => $options.changeSrc(2))
      }, "切换2D"),
      vue.createElementVNode("button", {
        onClick: _cache[8] || (_cache[8] = (...args) => $options.toNvue && $options.toNvue(...args))
      }, "NVUE测试"),
      vue.createElementVNode("button", {
        onClick: _cache[9] || (_cache[9] = (...args) => $options.toVue3 && $options.toVue3(...args))
      }, "VUE3语法测试（请在vue3版本下测试）"),
      vue.createElementVNode("button", {
        onClick: _cache[10] || (_cache[10] = (...args) => $options.destroy && $options.destroy(...args))
      }, "销毁视频")
    ]);
  }
  const PagesVue2Index = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__file", "E:/work/QF/66video/好用视频播放器-sample/pages/vue2/index.vue"]]);
  const _sfc_main$1 = {
    __name: "index",
    setup(__props, { expose: __expose }) {
      const videoRef = vue.ref(null);
      const src = vue.ref("");
      const poster = vue.ref("");
      const videoTitle = vue.ref("视频播放");
      const autoplay = vue.ref(false);
      const loop = vue.ref(false);
      const muted = vue.ref(false);
      const initVideo = () => {
        const videoSources = [
          "/static/video/test-360.mp4",
          "https://ydtnt-jw.oss-cn-zhangjiakou.aliyuncs.com/jw-video/%E8%A7%86%E9%A2%91/%E8%8B%B1%E8%AF%AD/%E5%94%90%E8%BF%9F%E8%AF%8D%E6%B1%87%E7%9A%84%E9%80%BB%E8%BE%91%E5%8D%95%E8%AF%8D%E8%AF%BE/Unit1-1_batch.mp4"
        ];
        src.value = videoSources[0];
      };
      const onPlay = () => {
        formatAppLog("log", "at pages/vue3/index.vue:48", "视频开始播放");
      };
      const onPause = () => {
        formatAppLog("log", "at pages/vue3/index.vue:52", "视频暂停");
      };
      const onEnded = () => {
        formatAppLog("log", "at pages/vue3/index.vue:56", "视频播放结束");
      };
      const onError = (e) => {
        formatAppLog("error", "at pages/vue3/index.vue:60", "视频播放错误:", e);
      };
      const onFullscreenChange = (e) => {
        formatAppLog("log", "at pages/vue3/index.vue:64", "全屏状态变化:", e.detail.fullScreen);
      };
      const handleLoaded = (e) => {
        formatAppLog("log", "at pages/vue3/index.vue:68", "视频元数据加载完成");
      };
      const play = () => {
        var _a;
        (_a = videoRef.value) == null ? void 0 : _a.play();
      };
      const pause = () => {
        var _a;
        (_a = videoRef.value) == null ? void 0 : _a.pause();
      };
      const toggleFullscreen = () => {
        var _a;
        (_a = videoRef.value) == null ? void 0 : _a.requestFullScreen();
      };
      onReady(() => {
        initVideo();
      });
      __expose({
        play,
        pause,
        toggleFullscreen
      });
      const __returned__ = { videoRef, src, poster, videoTitle, autoplay, loop, muted, initVideo, onPlay, onPause, onEnded, onError, onFullscreenChange, handleLoaded, play, pause, toggleFullscreen, ref: vue.ref, get onReady() {
        return onReady;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_yb_video = resolveEasycom(vue.resolveDynamicComponent("yb-video"), __easycom_0);
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createVNode(_component_yb_video, {
        ref: "videoRef",
        title: $setup.videoTitle,
        height: "auto",
        src: $setup.src,
        poster: $setup.poster,
        autoplay: $setup.autoplay,
        loop: $setup.loop,
        muted: $setup.muted,
        controls: "",
        onPlay: $setup.onPlay,
        onPause: $setup.onPause,
        onEnded: $setup.onEnded,
        onError: $setup.onError,
        onLoadedmetadata: $setup.handleLoaded,
        onFullscreenchange: $setup.onFullscreenChange
      }, null, 8, ["title", "src", "poster", "autoplay", "loop", "muted"])
    ]);
  }
  const PagesVue3Index = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__file", "E:/work/QF/66video/好用视频播放器-sample/pages/vue3/index.vue"]]);
  __definePage("pages/vue2/index", PagesVue2Index);
  __definePage("pages/vue3/index", PagesVue3Index);
  const _sfc_main = {
    onLaunch: function() {
      formatAppLog("log", "at App.vue:4", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:7", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:10", "App Hide");
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "E:/work/QF/66video/好用视频播放器-sample/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);
