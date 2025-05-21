<template>
	<div class="home">
		<div class="header">
			<div class="logo">66 Video</div>
			<div class="button">
				<div class="login">登录</div>
				<div class="register">注册</div>
			</div>
		</div>
	</div>
</template>

<script>
</script>

<style lang="scss">
	.home{
		.header{
			width: 100%;
			height: 50px;
			padding: 0 16px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.logo{
				font-size: 16px;
				font-weight: bold;
			}
			.button{
				display: flex;
				.login, .register{
					width: 74px;
					height: 30px;
					text-align: center;
					line-height: 30px;
					color: #ffffff;
					font-size: 13px;
				}
				.login{
					border-radius: 40px;
					background: rgba(251, 95, 251, 0.20);
					margin-right: 10px;
				}
				.register{
					border-radius: 40px;
					background: var(--_, linear-gradient(0deg, #D018F5 0%, #FA3296 100%));
				}
			}
		}
	}
</style>