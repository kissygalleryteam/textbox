/*!build time : 2014-08-08 4:49:44 PM*/
KISSY.add("kg/textbox/2.0.1/text",function(a,b,c,d,e,f){function g(b,d){var e=c.one(b);g.superclass.constructor.call(this,e,d);try{if(this.set("containerNode",e),this.set("textInputNode",e.one("input")),!this.get("textInputNode"))throw new Error("[TextBox]\u65e0\u6cd5\u83b7\u53d6\u8f93\u5165\u6846\u5143\u7d20")}catch(f){a.error(f.message)}this._config(d)}var h=a.UA,i={ALL:0,AUTO:1,ARR:[0,1]};return a.extend(g,d,{_needToImplementPlaceholder:function(){return this.get("placeholderStyle")==g.PLACEHOLDER_STYLE.ALL||!g.IS_PLACEHOLDER_SUPPORTED},_updateMaxLength:function(a){var b=this.get("textInputNode").val();a=a||this.get("maxLength"),a>=0&&a<b.length&&this.set("value",b.substring(0,a)),this.get("textInputNode").prop("maxLength",a)},selectAll:function(){var b,c=this.get("textInputNode").getDOMNode(),d=c.value.length,e=100;h.ie?a.later(function(){b=c.createTextRange(),b.collapse(!0),b.moveStart("character",0),b.moveEnd("character",d),b.select()},e):a.later(function(){c.setSelectionRange(0,d)},e)},_trim:function(){var b,c=this.get("textInputNode"),d=c.val();b=a.trim(d),b!=d&&c.val(b)},checkValidity:function(){var a=!0;return this.get("validity").valid||(this.fire("invalid"),a=!1),a},setCustomValidity:function(a){this.set("validationMessage",a)},render:function(){this._init()},_initPlaceholder:function(){var a=this.get("textInputNode"),b=this.get("containerNode"),c=a.val();this._needToImplementPlaceholder()?(a.attr("placeholder",""),c=a.val(),""==c?(a.val(this.get("placeholderText")),b.addClass(this.get("prefixCls")+g.CLS.PLACEHOLDER),this.set("value","")):(b.removeClass(this.get("prefixCls")+g.CLS.PLACEHOLDER),this.set("value",c))):(a.attr("placeholder",this.get("placeholderText")),this.set("value",c))},_config:function(a){var b=this.get("textInputNode");this.set("valueMissingMessage",a&&a.valueMissingMessage||b.attr("data-valuemissingmessage")),this.set("patternMismatchMessage",a&&a.patternMismatchMessage||b.attr("data-patternmismatchmessage")),this.set("helper",a&&a.helper||b.attr("data-helper")),this.set("autoTrim",a&&a.autoTrim||b.attr("data-autotrim")),this.set("selectAllOnFocus",a&&a.selectAllOnFocus||b.attr("data-selectallonfocus")),this.set("paste",a&&a.paste||b.attr("data-paste")),this.set("required",a&&a.required||b.prop("required")||"required"==b.attr("required")),this.set("pattern",a&&a.pattern||b.attr("pattern")),this.set("placeholderText",a&&a.placeholderText||b.prop("placeholder")||b.attr("placeholder")),this.set("placeholderStyle",a&&a.placeholderStyle||1*b.attr("data-placeholderstyle")),this.set("maxLength",a&&a.maxLength||b.prop("maxlength")),this.set("prefixCls",a&&a.prefixCls||b.attr("data-prefixcls"))},_init:function(){var b=this.get("textInputNode"),c=this.get("containerNode");c.addClass(this.get("prefixCls")+g.CLS.CONTAINER),this.on("afterMaxLengthChange",function(){this._updateMaxLength()},this),b.on("focus",function(){var a=this.get("value");this.set("liveValue",a,{silent:!0}),this._blurTimeout&&(this._blurTimeout.cancel(),this._blurTimeout=null),this.get("containerNode").addClass(this.get("prefixCls")+g.CLS.ACTIVE),this.fire("focus"),""!=a?this.get("selectAllOnFocus")&&this.selectAll():this._needToImplementPlaceholder()&&(b.val(""),this.get("containerNode").removeClass(this.get("prefixCls")+g.CLS.PLACEHOLDER))},this),b.on("keydown",function(a){this.fire("keydown",a)},this),b.on("keyup",function(a){this.get("autoTrim")&&this._trim(),this.set("liveValue",b.val()),this.fire("keyup",a)},this),b.on("blur",function(){var c=this;c._blurTimeout=a.later(function(){var a=c.get("value");c.get("containerNode").removeClass(c.get("prefixCls")+g.CLS.ACTIVE),""==a&&c._needToImplementPlaceholder()&&(b.val(c.get("placeholderText")),c.get("containerNode").addClass(c.get("prefixCls")+g.CLS.PLACEHOLDER)),c.fire("blur")},0)},this),b.on("change",function(a){this.set("value",a.target.value),this.fire("change",a)},this),b.on("invalid",function(a){a.preventDefault()},this),g.IS_PASTE_EVENT_SUPPORTED&&!this.get("paste")&&b.on("paste",function(a){a.preventDefault()}),this.on("afterLiveValueChange",function(b){var c,d,e;this.get("helper")&&(d=this.get("helperContentFn"),c=a.isFucntion(d)?d(b.newVal):b.newVal,e=this.get("helperOverlay"),e||(e=new f({prefixCls:this.get("prefixCls"),content:c})),this._showHelperOverlay(c))},this),this.on("afterValueChange",function(a){var b=a.prevVal,c=a.newVal,d=this.get("textInputNode");c!=b&&(this._needToImplementPlaceholder()?""==c?(this.get("containerNode").addClass(this.get("prefixCls")+g.CLS.PLACEHOLDER),d.val(this.get("placeholderText"))):(this.get("containerNode").removeClass(this.get("prefixCls")+g.CLS.PLACEHOLDER),d.val(c)):d.val(c)),this._checkValidity(c)}),this.on("afterPlaceholderTextChange",function(a){""==this.get("value")&&this._needToImplementPlaceholder()&&(b.val(a.newVal),b.addClass(this.get("prefixCls")+g.CLS.PLACEHOLDER))}),this.on("afterRequiredChange",function(b){var c;b.newVal&&""==this.get("value")?c=!0:!b.newVal&&this.get("validity").valueMissing&&(c=!1),a.isNull(c)||this.set("validity",a.merge(this.get("validity"),{valueMissing:c}))},this),this.on("afterValidityChange",function(b){var c=!0;a.each(b.newVal,function(a,b){return"valid"!=b&&a?(c=!1,!1):void 0}),b.newVal.valid=c},this),this.on("afterValidationMessageChange",function(b){var c;""==b.newVal&&this.get("validity").customError?c=!1:""==b.newVal||this.get("validity").customError||(c=!0),a.isNull(c)||this.set("validity",a.merge(this.get("validity"),{customError:c}))},this),this._initPlaceholder(),this._checkValidity()},_checkValidity:function(b){var c="",d={customError:!1};a.isUndefined(b)&&(b=this.get("value")),this.get("required")&&""==b?(a.mix(d,{valueMissing:!0}),c=this.get("valueMissingMessage")):a.mix(d,{valueMissing:!1}),""==b||""==this.get("pattern")||new RegExp(this.get("pattern")).test(b)?a.mix(d,{patternMismatch:!1}):(a.mix(d,{patternMismatch:!0}),c=this.get("patternMismatchMessage")),this.set("validity",a.merge(this.get("validity"),d)),this.set("validationMessage",c)}},{PLACEHOLDER_STYLE:i,IS_PLACEHOLDER_SUPPORTED:"placeholder"in document.createElement("input"),IS_PASTE_EVENT_SUPPORTED:h.ie||h.firefox||h.safari||h.chrome,ATTRS:{textInputNode:{value:null},containerNode:{value:null},selectAllOnFocus:{value:!0,setter:function(b){return a.isBoolean(b)?b:"enabled"==b},validator:function(b){return a.isString(b)&&("enabled"==b||"disabled"==b)||a.isBoolean(b)}},autoTrim:{value:!0,setter:function(b){return a.isBoolean(b)?b:"enabled"==b},validator:function(b){return a.isString(b)&&("enabled"==b||"disabled"==b)||a.isBoolean(b)}},paste:{value:!0,setter:function(b){return a.isBoolean(b)?b:"enabled"==b},validator:function(b){return a.isString(b)&&("enabled"==b||"disabled"==b)||a.isBoolean(b)}},placeholderStyle:{value:i.AUTO,validator:function(b){var c=!0;return a.isNumber(b)&&a.inArray(b,g.PLACEHOLDER_STYLE.ARR)||(c=!1),c}},placeholderText:{value:"",validator:function(b){return a.isString(b)}},prefixCls:{value:"kf-textbox-",validator:function(a){return!!a}},value:{value:"",setter:function(b){return this.get("autoTrim")?a.trim(b):void 0}},maxLength:{value:-1,validator:function(a){return!!a}},pattern:{value:"",validator:function(b){return a.isString(b)}},required:{value:!1,validator:function(b){return a.isBoolean(b)}},validity:{value:{customError:!1,patternMismatch:!1,rangeOverflow:!1,rangUnderflow:!1,stepMismatch:!1,tooLong:!1,typeMismatch:!1,valueMissing:!1,valid:!0}},willValidate:{value:!1},validationMessage:{value:"",validator:function(b){return a.isString(b)}},liveValue:{value:""},valueMissingMessage:{value:"\u8bf7\u8f93\u5165",validator:function(b){return a.isString(b)}},patternMismatchMessage:{value:"\u8f93\u5165\u6709\u8bef",validator:function(b){return a.isString(b)}},helper:{valule:!1,setter:function(b){var c=void 0;return a.isUndefined(b)||(a.isString(b)?"enabled"==b?c=!0:"disabled"==b&&(c=!1):c=!!b),c}},helperOverlay:{value:null},helperContentFn:{value:null}},NAME:"kf-textinput",CLS:{PLACEHOLDER:"placeholder",ACTIVE:"active",CONTAINER:"container"}}),g},{requires:["dom","node","base","json","overlay"]}),KISSY.add("kg/textbox/2.0.1/keyCodeUtils",function(){return{LEFT:37,UP:38,RIGHT:39,DOWN:40,ENTER:13,ESC:27,TAB:9,inNumberBlacklist:function(a){var b=!1,c=a.keyCode,d=a.shiftKey,e=(a.ctrlKey,a.metaKey);return c&&(c=1*c,((c>=96&&105>=c||c>=48&&57>=c)&&d||c>=65&&90>=c&&!e||c>=219&&222>=c||c>=186&&192>=c)&&(b=!0)),b}}}),KISSY.add("kg/textbox/2.0.1/number",function(a,b,c,d,e){function f(a,b){f.superclass.constructor.call(this,a,b),this._config(b)}return a.extend(f,d,{render:function(){this._init()},_config:function(a){var b;b=this.get("textInputNode"),this.set("pattern",a&&a.pattern||b.attr("pattern")||"\\d+"),this.set("patternMismatchMessage",a&&a.patternMismatchMessage||b.attr("data-patternmismatchmessage")||"\u53ea\u80fd\u8f93\u5165\u6570\u5b57")},_init:function(){f.superclass._init.call(this),this.on("keydown",function(a){e.inNumberBlacklist(a)&&a.preventDefault()},this),this.on("keyup",function(){var a=this.get("textInputNode"),b=a.val();/^\d*$/.test(b)||a.val(b.replace(/\D/g,""))},this)}}),f},{requires:["dom","node","./text","./keyCodeUtils"]});