
export default (app) => {
  // 注册全局指令
  app.directive('highlight', {
	beforeUpdate(el) {
	  // 清除之前的高亮效果
	  if (el.__originalHTML) {
		el.innerHTML = el.__originalHTML;
	  }
	},
    updated(el, binding) {
		const { value } = binding;
		console.log('el==',el)
		// 保存原始HTML用于恢复
		if (!el.__originalHTML) {
		  el.__originalHTML = el.innerHTML;
		}
		if (!value) {
			el.innerHTML = el.__originalHTML;
			return
		};
		const text = el.textContent;
		const escaped = value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
		const regex = new RegExp(`(${escaped})`, 'gi');
		el.innerHTML = text.replace(
			regex, 
			'<text style="color:#FF1A8C">$1</text>'
		);
    }
  });
}
