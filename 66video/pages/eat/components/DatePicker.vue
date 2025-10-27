<template>
	<view class="date-picker">
		<view class="picker-header">
			<text class="cancel" @click="$emit('cancel')">取消</text>
			<text class="confirm" @click="confirmSelect">完成</text>
		</view>

		<view class="picker-body">
			<!-- 年 -->
			<picker-view class="picker-view" :value="pickerValue" @change="onPickerChange"
				indicator-style="height: 88rpx;">
				<picker-view-column>
					<view class="picker-item" v-for="year in years" :key="year">{{ year }}年</view>
				</picker-view-column>
				<picker-view-column>
					<view class="picker-item" v-for="month in months" :key="month">{{ month }}月</view>
				</picker-view-column>
				<picker-view-column>
					<view class="picker-item" v-for="day in days" :key="day">{{ day }}日</view>
				</picker-view-column>
			</picker-view>

			<!-- 选中高亮 -->
			<view class="picker-highlight"></view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			startYear: {
				type: Number,
				default: 2020,
			},
			endYear: {
				type: Number,
				default: new Date().getFullYear() + 2,
			},
			value: {
				type: String,
				default: "",
			},
		},
		data() {
			// 设置默认日期为今天
			const today = new Date();
			const defaultDate = {
				year: today.getFullYear(),
				month: today.getMonth() + 1,
				day: today.getDate(),
			};

			return {
				years: [],
				months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
				selectedYear: defaultDate.year,
				selectedMonth: defaultDate.month,
				selectedDay: defaultDate.day,
				pickerValue: [0, 0, 0],
			};
		},
		computed: {
			days() {
				// 计算当前年月对应的天数
				const daysInMonth = new Date(
					this.selectedYear,
					this.selectedMonth,
					0
				).getDate();
				return Array.from({
						length: daysInMonth,
					},
					(_, i) => i + 1
				);
			},
		},
		watch: {
			value: {
				immediate: true,
				handler(newVal) {
					if (newVal) {
						this.setDateFromString(newVal);
					}
				},
			},
			selectedYear() {
				this.updatePickerValue();
			},
			selectedMonth() {
				this.updatePickerValue();
			},
			selectedDay() {
				this.updatePickerValue();
			},
			days() {
				// 天数变化时确保选中日期有效
				if (this.selectedDay > this.days.length) {
					this.selectedDay = this.days.length;
				}
				this.updatePickerValue();
			},
		},
		mounted() {
			this.initYears();
			this.setDateFromString(this.value);
		},
		methods: {
			initYears() {
				this.years = [];
				for (let year = this.startYear; year <= this.endYear; year++) {
					this.years.push(year);
				}
			},

			setDateFromString(dateString) {
				if (!dateString) {
					// 如果没有传入日期，使用今天
					const today = new Date();
					this.selectedYear = today.getFullYear();
					this.selectedMonth = today.getMonth() + 1;
					this.selectedDay = today.getDate();
					this.$nextTick(() => {
						this.updatePickerValue();
					});
					return;
				}

				try {
					// 解析日期字符串，支持 YYYY-MM-DD 格式
					const parts = dateString.split("-");
					if (parts.length === 3) {
						const year = parseInt(parts[0]);
						const month = parseInt(parts[1]);
						const day = parseInt(parts[2]);

						if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
							this.selectedYear = year;
							this.selectedMonth = month;
							this.selectedDay = day;
							this.$nextTick(() => {
								this.updatePickerValue();
							});
							return;
						}
					}
				} catch (error) {
					console.warn("日期解析错误:", error);
				}

				// 解析失败时使用今天
				const today = new Date();
				this.selectedYear = today.getFullYear();
				this.selectedMonth = today.getMonth() + 1;
				this.selectedDay = today.getDate();
				this.$nextTick(() => {
					this.updatePickerValue();
				});
			},

			updatePickerValue() {
				const yearIndex = this.years.indexOf(this.selectedYear);
				const monthIndex = this.months.indexOf(this.selectedMonth);
				const dayIndex = this.days.indexOf(this.selectedDay);

				this.pickerValue = [
					yearIndex >= 0 ? yearIndex : 0,
					monthIndex >= 0 ? monthIndex : 0,
					dayIndex >= 0 ? dayIndex : 0,
				];
			},

			onPickerChange(e) {
				const values = e.detail.value;

				// 更新选中的年月日
				this.selectedYear = this.years[values[0]] || this.selectedYear;
				this.selectedMonth = this.months[values[1]] || this.selectedMonth;

				// 先更新天数数组，再设置选中的日
				this.$nextTick(() => {
					this.selectedDay = this.days[values[2]] || this.selectedDay;
				});
			},

			confirmSelect() {
				const year = this.selectedYear;
				const month = String(this.selectedMonth).padStart(2, "0");
				const day = String(this.selectedDay).padStart(2, "0");
				const result = `${year}-${month}-${day}`;

				console.log("选择的日期:", result); // 调试用
				this.$emit("confirm", result);
			},
		},
	};
</script>

<style scoped>
	::v-deep .uni-picker-view-mask {
		background-image: none;
	}

	.date-picker {
		border-radius: 16rpx;
		overflow: hidden;
		width: 100%;
	}

	.picker-header {
		display: flex;
		justify-content: space-between;
		padding: 30rpx 40rpx;
		border-bottom: 1rpx solid #333;
	}

	.cancel {
		color: #999;
		font-size: 32rpx;
	}

	.confirm {
		color: #ff1a8c;
		font-size: 32rpx;
		font-weight: 600;
	}

	.picker-body {
		position: relative;
		height: 400rpx;
	}

	.picker-view {
		height: 100%;
		width: 100%;
	}

	.picker-item {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 88rpx;
		color: #666;
		font-size: 32rpx;
		font-weight: 400;
	}

	/* 选中项的样式由 picker-view 自动处理 */

	.picker-highlight {
		position: absolute;
		top: 50%;
		left: 0;
		right: 0;
		height: 88rpx;
		transform: translateY(-50%);
		pointer-events: none;
		border-top: 1rpx solid rgba(255, 255, 255, 0.3);
		border-bottom: 1rpx solid rgba(255, 255, 255, 0.3);
	}
</style>