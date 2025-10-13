<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
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
	body{
		background: #202020!important;
	}
	page ,.custom-tabbar {
	  max-width: 480px; /* 设置最大宽度 */
	  margin: 0 auto; /* 居中显示 */
	  background-color: #f5f5f5;
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
</style>