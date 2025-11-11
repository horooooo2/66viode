<template>
	<view class="address">
		<view class="status_bar"></view>
		<NavBar title="用户服务协议" fallbackUrl='/pages/points/index'></NavBar>
		<view style="color: #a0a3a3;padding: 20rpx;">
			欢迎使用我们的应用程序。本隐私政策旨在告知您我们收集、使用和披露的个人信息以及您个人信息的选择权。当您选择使用我们的应用程序时，即表示您同意本政策中描述的信息处理方式。<br />
			<br>
			收集和使用个人信息<br />
			<br>
			我们的应用程序可能会收集您的一些个人信息，包括但不限于：<br />
			<br>
			唯一设备识别符<br />
			IP 地址<br />
			使用情况统计数据<br />
			我们会将收集的个人信息用于以下用途：<br />
			<br>
			提供和维护我们的应用程序<br />
			改进我们的应用程序<br />
			提供客户支持<br />
			向您发送重要通知<br />
			<br>
			信息披露<br />
			我们不会向任何第三方出售、交易或转让您的个人信息。但在以下情况下，我们可能会披露您的个人信息：<br />
			<br>
			根据法律法规的要求<br />
			保护我们或他人的权利、财产或安全<br />
			 数据安全<br />
			<br>
			我们努力采取合理的安全措施来保护您的个人信息，但请注意，没有互联网传输方式或电子存储方式是 100% 安全的。<br />
			<br>
			未成年人隐私<br />
			我们的应用程序不针对未满 18 岁的未成年人。如果您是未成年人，您需要得到父母或监护人的同意才能使用我们的应用程序。<br />
			<br>
			隐私政策的变更<br />
			我们可能会不时更新我们的隐私政策。我们会在此页面上发布任何隐私政策变更，并在我们的应用程序中通知您。<br />
			<br><br>
			联系我们<br />
			如果您对本隐私政策有任何疑问或建议，请通过以下联系方式与我们联系：[联系邮箱或其他联系方式]<br />
			<br>
			本隐私政策于 [2023-8-8] 生效。<br />
		</view>
	</view>
</template>

<script>
	import NavBar from '@/components/NavBar/index.vue'
	export default {
		components: {
			NavBar
		},
		data() {
			return {
			}
		},
		onShow() {
			
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.address {
		width: 100%;
		background-color: #101010;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}
</style>