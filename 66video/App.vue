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
		}
	}
</script>

<style>
	/*每个页面公共css */
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}
	*{
	  padding: 0;
	  margin: 0;
	  box-sizing: border-box;
	  font-family: -apple-system-font, Helvetica Neue, Arial, sans-serif;
	}
	li{
	  list-style: none;
	}
	body{
	  overflow: auto;
	}
	i{
	  font-style: normal;
	}
	a{
	  text-decoration: none;
	}
</style>
