/*
 * @fileoverview 输入框封装类插件range
 * @author 牧云 <muyun.my@taobao.com>
 * @date 2013-12-02
 */
KISSY.add(function (S) {
	var methods = {
		selectAll: function () {
			var domNode = this.get('inputNode').getDOMNode(),
				len = domNode.value.length,
				range,
				delay = 100;

			if (UA.ie) {
				S.later(function () {
					range = domNode.createTextRange();
					range.collapse(true);
					range.moveStart('character', 0);
					range.moveEnd('character', len);
					range.select();
				}, delay);
			} else {
				S.later(function () {
					domNode.setSelectionRange(0, len);
				}, delay);
			}
		}
	};

	//selectAllOnFocus

	return Plugin = {
		pluginInitializer: function (textbox) {
			if (!textbox) return false;


			S.mix(textbox, methods);
		},
		pluginDestructor: function () {
			S.each(methods, function (methodName) {
				textbox[methodName] = null;
			});
		},
		pluginId: {
			value: 'range'
		}
	};
});