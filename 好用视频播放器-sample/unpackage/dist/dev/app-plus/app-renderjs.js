var __renderjsModules={};

__renderjsModules["73aeced3"] = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
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

  // <stdin>
  var stdin_exports = {};
  __export(stdin_exports, {
    default: () => stdin_default
  });
  var stdin_default = {
    data() {
      return {
        dom: null,
        domSlot: null,
        mp: null
      };
    },
    beforeDestroy() {
      this.destroyRender();
    },
    methods: {
      messageListener(e) {
        this.callMethod("message", { origin: e.origin, data: e.data });
      },
      dataIdWatcher(newVal) {
        if (newVal) {
          this.dom = document.querySelector(".rvideo" + newVal);
          this.domSlot = document.querySelector(".rvideoslot" + newVal);
          this.init();
        }
      },
      init() {
        return __async(this, null, function* () {
          if (!window.Hls)
            yield this.loadScriptInSandbox(this.parseSrc("/uni_modules/yingbing-video/static/html/js/hls.min.js"), "hls");
          if (!window.flvjs)
            yield this.loadScriptInSandbox(this.parseSrc("/uni_modules/yingbing-video/static/html/js/flv.min.js"), "flv");
          if (!window.JSMpeg)
            yield this.loadScriptInSandbox(this.parseSrc("/uni_modules/yingbing-video/static/html/js/jsmpeg.min.js"), "JSMpeg");
          if (!window.THREE)
            yield this.loadScriptInSandbox(this.parseSrc("/uni_modules/yingbing-video/static/html/js/three.min.js"), "three");
          if (!window.THREE.OrbitControls)
            yield this.loadScriptInSandbox(this.parseSrc("/uni_modules/yingbing-video/static/html/js/OrbitControls.js"), "OrbitControls");
          if (!window.THREE.DeviceOrientationControls)
            yield this.loadScriptInSandbox(this.parseSrc("/uni_modules/yingbing-video/static/html/js/DeviceOrientationControls.js"), "DeviceOrientationControls");
          if (!window.YbSubtitle)
            yield this.loadScriptInSandbox(this.parseSrc("/uni_modules/yingbing-video/static/html/js/yb-player-subtitle.js"), "ybPlayerSubtitle");
          if (!window.YbDanmu)
            yield this.loadScriptInSandbox(this.parseSrc("/uni_modules/yingbing-video/static/html/js/yb-player-danmu.js"), "ybPlayerDanmu");
          if (!window.YbPano)
            yield this.loadScriptInSandbox(this.parseSrc("/uni_modules/yingbing-video/static/html/js/yb-player-pano.js"), "ybPlayerPano");
          if (!window.YbMpeg)
            yield this.loadScriptInSandbox(this.parseSrc("/uni_modules/yingbing-video/static/html/js/yb-player-mpeg.js"), "ybPlayerMpeg");
          if (!window.YbPlayer)
            yield this.loadScriptInSandbox(this.parseSrc("/uni_modules/yingbing-video/static/html/js/yb-player.js"), "ybPlayer");
          if (!window.YbGesture)
            yield this.loadScriptInSandbox(this.parseSrc("/uni_modules/yingbing-video/static/html/js/yb-player-gesture.js"), "ybPlayerGesture");
          this.loadCss();
          this.callMethod("ready");
        });
      },
      loadCss() {
        let links = document.getElementsByTagName("link");
        let linkarr = [];
        for (let i = 0; i < links.length; i++) {
          if (links[i].getAttribute("data-id"))
            linkarr.push(links[i].getAttribute("data-id"));
        }
        if (linkarr.indexOf("yb-player") == -1) {
          const link = document.createElement("LINK");
          link.setAttribute("data-id", "yb-player");
          link.rel = "stylesheet";
          link.href = this.parseSrc("/uni_modules/yingbing-video/static/html/css/yb-player.css");
          document.head.appendChild(link);
        }
        if (linkarr.indexOf("yb-player-plugin") == -1) {
          const link = document.createElement("LINK");
          link.setAttribute("data-id", "yb-player-plugin");
          link.rel = "stylesheet";
          link.href = this.parseSrc("/uni_modules/yingbing-video/static/html/css/yb-player-plugin.css");
          document.head.appendChild(link);
        }
      },
      request(url) {
        return new Promise((resolve, reject) => {
          if (url.startsWith("http")) {
            var xhr = new plus.net.XMLHttpRequest();
            xhr.onreadystatechange = () => {
              if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                  resolve(xhr.responseText);
                } else {
                  resolve(null);
                }
                xhr.abort();
              }
            };
            xhr.onabort = function() {
              xhr = null;
            };
            xhr.open("GET", url);
            xhr.responseType = "text";
            xhr.send();
          } else {
            plus.io.resolveLocalFileSystemURL(url.replace("./", "_www/"), function(entry) {
              entry.file(function(file) {
                var fileReader = new plus.io.FileReader();
                fileReader.readAsText(file, "utf-8");
                fileReader.onloadend = function(evt) {
                  resolve(evt.target.result);
                };
              });
            }, function(e) {
              resolve(null);
            });
          }
        });
      },
      parseSrc(path) {
        return "." + path;
      },
      // 安全加载JS库的方法
      loadScriptInSandbox(url, id) {
        return __async(this, null, function* () {
          try {
            const response = yield this.request(url);
            const jsCode = response;
            const sandbox = {
              window,
              document,
              navigator
              // 添加其他必要的全局对象...
            };
            const code = `
					(function(sandbox) {
					    var window = sandbox.window;
					    var document = sandbox.document;
					    var navigator = sandbox.navigator;
					    var uni = undefined;
					    ${jsCode}
					})(sandbox);
					`;
            const executeInSandbox = new Function("sandbox", code);
            executeInSandbox(sandbox);
            return { success: true, sandbox };
          } catch (error) {
            console.error(`\u52A0\u8F7D\u811A\u672C\u5931\u8D25: ${error}`);
          }
        });
      },
      loadScriptInDom(src, id) {
        return __async(this, null, function* () {
          return new Promise((resolve) => {
            const script = document.createElement("SCRIPT");
            script.setAttribute("data-id", id);
            script.src = src;
            script.onload = function() {
              resolve(true);
            };
            document.head.appendChild(script);
          });
        });
      },
      //深度克隆数据，避免数据污染
      _traverseObject(obj, emitname) {
        if (typeof obj !== "object" && typeof obj !== "function") {
          return obj;
        }
        var o = Object.prototype.toString.call(obj) === "[object Array]" ? [] : {};
        for (let i in obj) {
          if (obj.hasOwnProperty(i)) {
            const value = obj[i];
            const emit = {};
            emit[emitname] = value;
            o[i] = i == "click" ? () => {
              this.callMethod("message", { data: emit });
            } : typeof value === "object" ? this._traverseObject(value, emitname) : value;
          }
        }
        return o;
      },
      //处理hlsConfig
      parseHlsConfig(config = {}) {
        Object.keys(config).forEach((key) => {
          if (["xhrSetup"].includes(key)) {
            config[key] = new Function("return (" + config[key] + ")")();
          }
          if (["pLoader", "fLoader"].includes(key)) {
            config[key] = new Function(`return ${config[key]}`)();
          }
        });
        return config;
      },
      reloadVideoRender(params) {
        if (!params)
          return;
        this.unloadRender();
        window.addEventListener("message", this.messageListener);
        const custom = this._traverseObject(params.custom, "slotclick");
        this.mp = new YbPlayer({
          container: this.dom,
          src: params.src,
          segments: params.segments,
          title: params.title,
          poster: params.poster || void 0,
          type: params.type,
          three: params.three,
          initialTime: params.initialTime,
          duration: params.duration,
          autoplay: params.autoplay,
          preload: params.preload,
          muted: params.muted,
          playbackRate: params.playbackRate,
          loop: params.loop,
          isLive: params.isLive,
          header: params.header,
          controls: params.controls,
          height: "100%",
          objectFit: params.objectFit,
          crossOrigin: params.crossOrigin,
          openDirection: params.openDirection,
          exitDirection: params.exitDirection,
          quality: params.quality,
          works: params.works,
          workIndex: params.workIndex,
          subtitles: params.subtitles,
          subtitleIndex: params.subtitleIndex,
          custom,
          decoder: {
            hls: {
              loader: Hls,
              config: this.parseHlsConfig(params.hlsConfig)
            },
            flv: {
              loader: flvjs,
              config: params.flvConfig
            },
            jsmpeg: {
              loader: JSMpeg,
              config: params.jsmpegConfig
            }
          }
        });
        this.mp.load();
        this.mp.loadVideo();
        this.mp.loadGestureEvent();
        this.mp.appendDom(this.domSlot);
        window.addEventListener("resize", this.updateSizeRender);
      },
      //动态修改video属性
      setVideoRender(newVal) {
        var _a;
        if (!newVal)
          return;
        const { key, value } = newVal;
        (_a = this.mp) == null ? void 0 : _a.setVideo(key, value);
      },
      //加载弹幕
      loadDanmuRender(danmu) {
        if (!danmu)
          return;
        if (this.mp) {
          this.mp.setConfig("danmu", YbPlayer.deepClone(danmu));
          this.mp.unloadDanmu();
          this.mp.loadDanmu();
        }
      },
      //卸载弹幕
      unloadDanmuRender(newVal) {
        var _a;
        if (newVal == -1)
          return;
        (_a = this.mp) == null ? void 0 : _a.unloadDanmu();
      },
      //发送弹幕
      sendDanmuRender(newVal) {
        var _a;
        if (!newVal)
          return;
        const { danmu, border } = newVal;
        (_a = this.mp) == null ? void 0 : _a.sendDanmu(danmu, border);
      },
      //插入弹幕
      insertDanmuRender(newVal) {
        var _a;
        if (!newVal)
          return;
        (_a = this.mp) == null ? void 0 : _a.insertDanmu(newVal);
      },
      //更新配置
      updateConfigRender(config) {
        var _a;
        if (!config)
          return;
        Object.keys(config).forEach((key) => {
          var _a2;
          (_a2 = this.mp) == null ? void 0 : _a2.setConfig(key, config[key]);
        });
        (_a = this.mp) == null ? void 0 : _a.hideControls();
      },
      //重加载自定义配置
      reloadCustomRender(config) {
        var _a, _b;
        if (!config)
          return;
        const newConfig = this._traverseObject(config, "slotclick");
        Object.keys(newConfig).forEach((key) => {
          var _a2;
          (_a2 = this.mp) == null ? void 0 : _a2.setCustom(key, newConfig[key]);
        });
        (_a = this.mp) == null ? void 0 : _a.unloadCustom();
        (_b = this.mp) == null ? void 0 : _b.loadCustom();
      },
      //播放/暂停
      toggleRender(newVal) {
        var _a;
        if (newVal == -1)
          return;
        (_a = this.mp) == null ? void 0 : _a.toggle();
      },
      //播放
      playRender(newVal) {
        var _a, _b;
        if (newVal == -1)
          return;
        (_b = (_a = this.mp) == null ? void 0 : _a.video) == null ? void 0 : _b.play();
      },
      //暂停
      pauseRender(newVal) {
        var _a, _b;
        if (newVal == -1)
          return;
        (_b = (_a = this.mp) == null ? void 0 : _a.video) == null ? void 0 : _b.pause();
      },
      //跳转
      seekRender(time) {
        var _a;
        if (time == -1)
          return;
        (_a = this.mp) == null ? void 0 : _a.seek(time);
      },
      //开启全屏
      openFullscreenRender(direction) {
        var _a;
        if (direction == -1)
          return;
        (_a = this.mp) == null ? void 0 : _a.openFullscreen(direction);
      },
      //退出全屏
      exitFullscreenRender(newVal) {
        var _a;
        if (newVal == -1)
          return;
        (_a = this.mp) == null ? void 0 : _a.exitFullscreen();
      },
      //消息提示
      showToastRender(data) {
        var _a;
        if (!data)
          return;
        (_a = this.mp) == null ? void 0 : _a.showToast(data);
      },
      //展示工具栏
      showToolbarRender(data) {
        var _a;
        if (!data)
          return;
        const newDate = this._traverseObject(data, "toolclick");
        (_a = this.mp) == null ? void 0 : _a.showToolbar(newDate.selector, newDate.list, newDate.checkShow, newDate.checkIndex);
      },
      //截图
      captureRender(data) {
        var _a;
        if (!data)
          return;
        (_a = this.mp) == null ? void 0 : _a.capture(data.type, data.show);
      },
      //禁用手势事件
      disableGestureRender(newVal) {
        var _a;
        if (newVal == -1)
          return;
        (_a = this.mp) == null ? void 0 : _a.disableGesture();
      },
      //启用手势事件
      enableGestureRender(newVal) {
        var _a;
        if (newVal == -1)
          return;
        (_a = this.mp) == null ? void 0 : _a.enableGesture();
      },
      //卸载视频
      unloadRender() {
        if (this.mp) {
          if (this.domSlot && this.dom)
            this.dom.appendChild(this.domSlot);
          this.mp.unloadDanmu();
          this.mp.unloadGestureEvent();
          this.mp.unloadVideo();
          this.mp.unload();
          window.removeEventListener("resize", this.updateSizeRender);
          window.removeEventListener("message", this.messageListener);
        }
      },
      //卸载视频
      destroyRender(newVal) {
        if (newVal == 1) {
          this.unloadRender();
          this.callMethod("destroyed");
        }
      },
      //重置画布尺寸
      updateSizeRender() {
        var _a, _b;
        (_a = this.mp) == null ? void 0 : _a.refreshDanmu();
        (_b = this.mp) == null ? void 0 : _b.refreshPano();
      },
      callMethod(name, args) {
        this.$ownerInstance && this.$ownerInstance.callMethod(name, args);
      }
    }
  };
  return __toCommonJS(stdin_exports);
})();


__renderjsModules["16e87d9e"] = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // <stdin>
  var stdin_exports = {};
  __export(stdin_exports, {
    default: () => stdin_default
  });
  var stdin_default = {
    data() {
      return {
        dom: null,
        iframe: null,
        loading: null,
        iframeSrc: "",
        backTimer: null
      };
    },
    mounted() {
      window.addEventListener("message", this.messageListener);
    },
    beforeDestroy() {
      this.destoryIframe();
    },
    methods: {
      messageListener(e) {
        this.callMethod("message", { origin: e.origin, data: e.data });
      },
      destoryIframe() {
        window.removeEventListener("message", this.messageListener);
        if (this.loading) {
          this.loading.remove();
          this.loading = null;
        }
        if (this.iframe) {
          this.iframe.remove();
          this.iframe = null;
        }
        this.callMethod("callDestroy");
      },
      showLoadingRender() {
        if (this.loading && this.getData("loadingShow")) {
          this.loading.classList.remove("browser-loading-hide");
          this.loading.classList.add("browser-loading-show");
        }
      },
      hideLoadingRender() {
        if (this.loading && this.getData("loadingShow")) {
          this.loading.classList.remove("browser-loading-show");
          this.loading.classList.add("browser-loading-hide");
        }
      },
      clearBackTimer() {
        if (this.backTimer) {
          window.clearTimeout(this.backTimer);
          this.backTimer = null;
        }
      },
      initIframe() {
        this.showLoadingRender();
        this.callMethod("loadstart", { href: this.iframeSrc });
        this.iframe = document.createElement("IFRAME");
        this.iframe.setAttribute("class", "find_iframe_iframe");
        this.iframe.setAttribute("frameborder", this.getData("frameborder"));
        this.iframe.setAttribute("allow", this.getData("allow"));
        this.iframe.setAttribute("allowfullscreen", this.getData("allowfullscreen"));
        this.iframe.setAttribute("sandbox", this.getData("sandbox"));
        this.iframe.setAttribute("crossOrigin", this.getData("crossOrigin"));
        if (this.getData("iframeStyle"))
          this.iframeStyleWatcher(JSON.parse(this.getData("iframeStyle")));
        if (this.getData("iframeClass"))
          this.iframeClassWatcher(JSON.parse(this.getData("iframeClass")));
        this.iframe.src = this.iframeSrc;
        this.iframe.onload = () => {
          this.hideLoadingRender();
          const iframeWindow2 = this.iframe.contentWindow;
          iframeWindow2.onbeforeunload = (e) => {
            this.clearBackTimer();
            this.callMethod("loadstart", e);
            this.showLoadingRender();
          };
          const history = iframeWindow2.history;
          const iframeDocument = this.iframe.contentDocument || iframeWindow2.document;
          const title = iframeDocument.title;
          const href = iframeWindow2.location.href;
          const head = iframeDocument.head;
          const links = head.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"]');
          const favicon = links.length > 0 ? links[0].href : href + (href.substring(href.length - 1) == "/" ? "" : "/") + "favicon.ico";
          this.callMethod("loaded", { title, href, favicon, history });
        };
        this.iframe.onerror = (e) => {
          this.hideLoadingRender();
          this.callMethod("callError", e);
        };
        this.dom.appendChild(this.iframe);
        const consoles = this.getData("console").split(" ");
        Object.keys(this.iframe.contentWindow.console).forEach((key) => {
          if (consoles.indexOf(key) == -1)
            this.iframe.contentWindow.console[key] = function() {
            };
        });
        const options = JSON.parse(this.getData("overrideUrlLoadingOptions"));
        if (options && options.mode)
          this.overrideUrlLoadingWatcher(this.getData("overrideUrlLoadingOptions"));
      },
      readyWatcher(newVal) {
        if (newVal) {
          this.dom = document.querySelector(".iframe" + newVal);
          this.loading = document.createElement("DIV");
          this.loading.setAttribute("class", "browser-loading-line");
          this.dom.appendChild(this.loading);
        }
        if (this.iframeSrc && this.dom)
          this.initIframe();
      },
      destroyWatcher(newVal) {
        if (newVal)
          this.destoryIframe();
      },
      srcWatcher(newVal, oldVal) {
        this.iframeSrc = newVal;
        if (!this.dom)
          return;
        if (newVal != oldVal) {
          if (oldVal)
            this.destoryIframe();
          if (newVal)
            this.initIframe();
        }
      },
      sandboxWatcher(newVal) {
        this.iframe && this.iframe.setAttribute("sandbox", newVal);
      },
      allowWatcher(newVal) {
        this.iframe && this.iframe.setAttribute("allow", allow);
      },
      allowfullscreenWatcher(newVal) {
        this.iframe && this.iframe.setAttribute("allowfullscreen", newVal);
      },
      frameborderWatcher(newVal) {
        this.iframe && this.iframe.setAttribute("frameborder", newVal);
      },
      iframeStyleWatcher(newVal) {
        if (typeof newVal == "string")
          this.iframe && this.iframe.setAttribute("style", newVal);
        if (typeof newVal == "object") {
          let style = "";
          Object.keys(newVal).forEach((key) => {
            style += key + ":" + newVal[key] + ";";
          });
          this.iframe && this.iframe.setAttribute("style", style);
        }
      },
      iframeClassWatcher(newVal) {
        if (typeof newVal == "string")
          this.iframe && this.iframe.setAttribute("class", "find_iframe_iframe " + newVal);
        if (typeof newVal == "object") {
          let className = "";
          Object.keys(newVal).forEach((key) => {
            className += newVal[key] ? key + " " : "";
          });
          this.iframe && this.iframe.setAttribute("class", "find_iframe_iframe " + className);
        }
      },
      jumpWatcher(newVal) {
        if (newVal < 0 && this.iframe) {
          this.iframe.contentWindow.history.back();
          this.backTimer = window.setTimeout(() => {
            this.callMethod("backError");
          }, 300);
        }
      },
      assignUrlWatcher(newVal) {
        var _a;
        const iframeWindow2 = (_a = this.iframe) == null ? void 0 : _a.contentWindow;
        iframeWindow2 && iframeWindow2.window.location.assign(newVal);
      },
      loadingWatcher(newVal) {
        if (newVal == 0)
          this.hideLoading();
        if (newVal == 1)
          this.showLoading();
      },
      evalJSWatcher(newVal) {
        if (newVal) {
          try {
            const iframeDocument = this.iframe.contentDocument || iframeWindow.document;
            const script = iframeDocument.createElement("SCRIPT");
            script.innerHTML = newVal;
            iframeDocument.head.appendChild(script);
            this.callMethod("callEvalJS", { status: "success" });
            iframeDocument.head.removeChild(script);
          } catch (e) {
            this.callMethod("callEvalJS", { status: "error", message: JSON.stringify(e) });
          }
        }
      },
      evalCSSWatcher(newVal) {
        if (newVal) {
          try {
            const iframeDocument = this.iframe.contentDocument || iframeWindow.document;
            const style = iframeDocument.createElement("STYLE");
            style.innerHTML = newVal;
            iframeDocument.head.appendChild(style);
          } catch (e) {
            this.callMethod("callError", e);
          }
        }
      },
      //给网页值传参
      setDataWatcher(newVal) {
        if (newVal) {
          try {
            const iframeWindow2 = this.iframe.contentWindow;
            const key = this.getData("setDataName");
            if (key)
              iframeWindow2[key] = newVal;
          } catch (e) {
            this.callMethod("callEvalJS", { status: "error", message: JSON.stringify(e) });
          }
        }
      },
      //拦截监听
      overrideUrlLoadingWatcher(newVal) {
        const wv = plus.webview.currentWebview();
        const options = JSON.parse(newVal);
        wv.overrideUrlLoading(options, (e) => {
          this.callMethod("overrideUrlLoading", e);
          return true;
        });
      },
      getData(name) {
        const value = this.dom.getAttribute("data-" + name);
        if (["true", "false"].includes(value))
          return value == "false" ? false : true;
        else if (/^\d+$/.test(value))
          return Number(value);
        else
          return value;
      },
      callMethod(name, args) {
        this.$ownerInstance.callMethod(name, args);
      }
    }
  };
  return __toCommonJS(stdin_exports);
})();
