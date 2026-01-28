<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			this.detectPCAndScale();
		},
		methods: {
			detectPCAndScale() {
				// 判断是否为PC端（屏幕宽度大于768px）
				const isPC = window.innerWidth > 768;

				if (isPC && process.env.VUE_APP_PLATFORM === 'h5') {
					// 创建样式表
					const style = document.createElement('style');
					style.innerHTML = `
		          .pc-scale-container {
		            transform: scale(1.2);
		            transform-origin: 0 0;
		            width: calc(100% / 1.2);
		            height: calc(100% / 1.2);
		          }
		        `;
					document.head.appendChild(style);

					// 给body添加缩放容器类
					document.body.classList.add('pc-scale-container');
				}
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
	}
</script>

<style>
	body {
		background: #202020 !important;
	}

	page,
	.custom-tabbar {
		max-width: 480px;
		/* 设置最大宽度 */
		margin: 0 auto;
		/* 居中显示 */
		background: #202020 !important;
	}

	/*每个页面公共css */
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}

	* {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
		font-family: -apple-system-font, Helvetica Neue, Arial, sans-serif;
	}

	li {
		list-style: none;
	}

	body {
		overflow: auto;
	}

	i {
		font-style: normal;
	}

	a {
		text-decoration: none;
	}
	/* 在 App.vue 的 style 中 */
	scroll-view ::-webkit-scrollbar {
	  display: none;
	  width: 0;
	  height: 0;
	  background: transparent;
	}
	
	scroll-view {
	  -ms-overflow-style: none;
	  scrollbar-width: none;
	}
	/* 方案1：使用通用选择器 */
	rich-text img {
	  max-width: 100% !important;
	  height: auto !important;
	  display: block;
	}
	
	/* 方案2：使用深度选择器（如果rich-text有scope） */
	::v-deep rich-text img {
	  max-width: 100% !important;
	  height: auto !important;
	}
</style>