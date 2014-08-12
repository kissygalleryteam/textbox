/*!build time : 2014-08-08 6:14:10 PM*/
KISSY.add("kg/textbox/2.0.4/text",function(a,b,c,d,e,f){function g(b,d){var e=c.one(b);g.superclass.constructor.call(this,e,d);try{if(this.set("containerNode",e),this.set("textInputNode",e.one("input")),!this.get("textInputNode"))throw new Error("[TextBox]\u65e0\u6cd5\u83b7\u53d6\u8f93\u5165\u6846\u5143\u7d20")}catch(f){a.error(f.message)}this._config(d)}var h=a.UA,i={ALL:0,AUTO:1,ARR:[0,1]};return a.extend(g,d,{_needToImplementPlaceholder:function(){return this.get("placeholderStyle")==g.PLACEHOLDER_STYLE.ALL||!g.IS_PLACEHOLDER_SUPPORTED},_updateMaxLength:function(a){var b=this.get("textInputNode").val();a=a||this.get("maxLength"),a>=0&&a<b.length&&this.set("value",b.substring(0,a)),this.get("textInputNode").prop("maxLength",a)},selectAll:function(){var b,c=this.get("textInputNode").getDOMNode(),d=c.value.length,e=100;h.ie?a.later(function(){b=c.createTextRange(),b.collapse(!0),b.moveStart("character",0),b.moveEnd("character",d),b.select()},e):a.later(function(){c.setSelectionRange(0,d)},e)},_trim:function(){var b,c=this.get("textInputNode"),d=c.val();b=a.trim(d),b!=d&&c.val(b)},checkValidity:function(){var a=!0;return this.get("validity").valid||(this.fire("invalid"),a=!1),a},setCustomValidity:function(a){this.set("validationMessage",a)},render:function(){this._init()},_initPlaceholder:function(){var a=this.get("textInputNode"),b=this.get("containerNode"),c=a.val();this._needToImplementPlaceholder()?(a.attr("placeholder",""),c=a.val(),""==c?(a.val(this.get("placeholderText")),b.addClass(this.get("prefixCls")+g.CLS.PLACEHOLDER),this.set("value","")):(b.removeClass(this.get("prefixCls")+g.CLS.PLACEHOLDER),this.set("value",c))):(a.attr("placeholder",this.get("placeholderText")),this.set("value",c))},_config:function(a){var b=this.get("textInputNode");this.set("valueMissingMessage",a&&a.valueMissingMessage||b.attr("data-valuemissingmessage")),this.set("patternMismatchMessage",a&&a.patternMismatchMessage||b.attr("data-patternmismatchmessage")),this.set("helper",a&&a.helper||b.attr("data-helper")),this.set("autoTrim",a&&a.autoTrim||b.attr("data-autotrim")),this.set("selectAllOnFocus",a&&a.selectAllOnFocus||b.attr("data-selectallonfocus")),this.set("paste",a&&a.paste||b.attr("data-paste")),this.set("required",a&&a.required||b.prop("required")||"required"==b.attr("required")),this.set("pattern",a&&a.pattern||b.attr("pattern")),this.set("placeholderText",a&&a.placeholderText||b.prop("placeholder")||b.attr("placeholder")),this.set("placeholderStyle",a&&a.placeholderStyle||1*b.attr("data-placeholderstyle")),this.set("maxLength",a&&a.maxLength||b.prop("maxlength")),this.set("prefixCls",a&&a.prefixCls||b.attr("data-prefixcls"))},_init:function(){var b=this.get("textInputNode"),c=this.get("containerNode");c.addClass(this.get("prefixCls")+g.CLS.CONTAINER),this.on("afterMaxLengthChange",function(){this._updateMaxLength()},this),b.on("focus",function(){var a=this.get("value");this.set("liveValue",a,{silent:!0}),this._blurTimeout&&(this._blurTimeout.cancel(),this._blurTimeout=null),this.get("containerNode").addClass(this.get("prefixCls")+g.CLS.ACTIVE),this.fire("focus"),""!=a?this.get("selectAllOnFocus")&&this.selectAll():this._needToImplementPlaceholder()&&(b.val(""),this.get("containerNode").removeClass(this.get("prefixCls")+g.CLS.PLACEHOLDER))},this),b.on("keydown",function(a){this.fire("keydown",a)},this),b.on("keyup",function(a){this.get("autoTrim")&&this._trim(),this.set("liveValue",b.val()),this.fire("keyup",a)},this),b.on("blur",function(){var c=this;c._blurTimeout=a.later(function(){var a=c.get("value");c.get("containerNode").removeClass(c.get("prefixCls")+g.CLS.ACTIVE),""==a&&c._needToImplementPlaceholder()&&(b.val(c.get("placeholderText")),c.get("containerNode").addClass(c.get("prefixCls")+g.CLS.PLACEHOLDER)),c.fire("blur")},0)},this),b.on("change",function(a){this.set("value",a.target.value),this.fire("change",a)},this),b.on("invalid",function(a){a.preventDefault()},this),g.IS_PASTE_EVENT_SUPPORTED&&!this.get("paste")&&b.on("paste",function(a){a.preventDefault()}),this.on("afterLiveValueChange",function(b){var c,d,e;this.get("helper")&&(d=this.get("helperContentFn"),c=a.isFucntion(d)?d(b.newVal):b.newVal,e=this.get("helperOverlay"),e||(e=new f({prefixCls:this.get("prefixCls"),content:c})),this._showHelperOverlay(c))},this),this.on("afterValueChange",function(a){var b=a.prevVal,c=a.newVal,d=this.get("textInputNode");c!=b&&(this._needToImplementPlaceholder()?""==c?(this.get("containerNode").addClass(this.get("prefixCls")+g.CLS.PLACEHOLDER),d.val(this.get("placeholderText"))):(this.get("containerNode").removeClass(this.get("prefixCls")+g.CLS.PLACEHOLDER),d.val(c)):d.val(c)),this._checkValidity(c)}),this.on("afterPlaceholderTextChange",function(a){""==this.get("value")&&this._needToImplementPlaceholder()&&(b.val(a.newVal),b.addClass(this.get("prefixCls")+g.CLS.PLACEHOLDER))}),this.on("afterRequiredChange",function(b){var c;b.newVal&&""==this.get("value")?c=!0:!b.newVal&&this.get("validity").valueMissing&&(c=!1),a.isNull(c)||this.set("validity",a.merge(this.get("validity"),{valueMissing:c}))},this),this.on("afterValidityChange",function(b){var c=!0;a.each(b.newVal,function(a,b){return"valid"!=b&&a?(c=!1,!1):void 0}),b.newVal.valid=c},this),this.on("afterValidationMessageChange",function(b){var c;""==b.newVal&&this.get("validity").customError?c=!1:""==b.newVal||this.get("validity").customError||(c=!0),a.isNull(c)||this.set("validity",a.merge(this.get("validity"),{customError:c}))},this),this._initPlaceholder(),this._checkValidity()},_checkValidity:function(b){var c="",d={customError:!1};a.isUndefined(b)&&(b=this.get("value")),this.get("required")&&""==b?(a.mix(d,{valueMissing:!0}),c=this.get("valueMissingMessage")):a.mix(d,{valueMissing:!1}),""==b||""==this.get("pattern")||new RegExp(this.get("pattern")).test(b)?a.mix(d,{patternMismatch:!1}):(a.mix(d,{patternMismatch:!0}),c=this.get("patternMismatchMessage")),this.set("validity",a.merge(this.get("validity"),d)),this.set("validationMessage",c)}},{PLACEHOLDER_STYLE:i,IS_PLACEHOLDER_SUPPORTED:"placeholder"in document.createElement("input"),IS_PASTE_EVENT_SUPPORTED:h.ie||h.firefox||h.safari||h.chrome,ATTRS:{textInputNode:{value:null},containerNode:{value:null},selectAllOnFocus:{value:!0,setter:function(b){return a.isBoolean(b)?b:"enabled"==b},validator:function(b){return a.isString(b)&&("enabled"==b||"disabled"==b)||a.isBoolean(b)}},autoTrim:{value:!0,setter:function(b){return a.isBoolean(b)?b:"enabled"==b},validator:function(b){return a.isString(b)&&("enabled"==b||"disabled"==b)||a.isBoolean(b)}},paste:{value:!0,setter:function(b){return a.isBoolean(b)?b:"enabled"==b},validator:function(b){return a.isString(b)&&("enabled"==b||"disabled"==b)||a.isBoolean(b)}},placeholderStyle:{value:i.AUTO,validator:function(b){var c=!0;return a.isNumber(b)&&a.inArray(b,g.PLACEHOLDER_STYLE.ARR)||(c=!1),c}},placeholderText:{value:"",validator:function(b){return a.isString(b)}},prefixCls:{value:"kf-textbox-",validator:function(a){return!!a}},value:{value:"",setter:function(b){return this.get("autoTrim")?a.trim(b):void 0}},maxLength:{value:-1,validator:function(a){return!!a}},pattern:{value:"",validator:function(b){return a.isString(b)}},required:{value:!1,validator:function(b){return a.isBoolean(b)}},validity:{value:{customError:!1,patternMismatch:!1,rangeOverflow:!1,rangUnderflow:!1,stepMismatch:!1,tooLong:!1,typeMismatch:!1,valueMissing:!1,valid:!0}},willValidate:{value:!1},validationMessage:{value:"",validator:function(b){return a.isString(b)}},liveValue:{value:""},valueMissingMessage:{value:"\u8bf7\u8f93\u5165",validator:function(b){return a.isString(b)}},patternMismatchMessage:{value:"\u8f93\u5165\u6709\u8bef",validator:function(b){return a.isString(b)}},helper:{valule:!1,setter:function(b){var c=void 0;return a.isUndefined(b)||(a.isString(b)?"enabled"==b?c=!0:"disabled"==b&&(c=!1):c=!!b),c}},helperOverlay:{value:null},helperContentFn:{value:null}},NAME:"kf-textinput",CLS:{PLACEHOLDER:"placeholder",ACTIVE:"active",CONTAINER:"container"}}),g},{requires:["dom","node","base","json","overlay"]}),KISSY.add("kg/textbox/2.0.4/keyCodeUtils",function(){return{LEFT:37,UP:38,RIGHT:39,DOWN:40,ENTER:13,ESC:27,TAB:9,inNumberBlacklist:function(a){var b=!1,c=a.keyCode,d=a.shiftKey,e=(a.ctrlKey,a.metaKey);return c&&(c=1*c,((c>=96&&105>=c||c>=48&&57>=c)&&d||c>=65&&90>=c&&!e||c>=219&&222>=c||c>=186&&192>=c)&&(b=!0)),b}}}),KISSY.add("kg/textbox/2.0.4/number",function(a,b,c,d,e){function f(a,b){f.superclass.constructor.call(this,a,b),this._config(b)}return a.extend(f,d,{render:function(){this._init()},_config:function(a){var b;b=this.get("textInputNode"),this.set("pattern",a&&a.pattern||b.attr("pattern")||"\\d+"),this.set("patternMismatchMessage",a&&a.patternMismatchMessage||b.attr("data-patternmismatchmessage")||"\u53ea\u80fd\u8f93\u5165\u6570\u5b57")},_init:function(){f.superclass._init.call(this),this.on("keydown",function(a){e.inNumberBlacklist(a)&&a.preventDefault()},this),this.on("keyup",function(){var a=this.get("textInputNode"),b=a.val();/^\d*$/.test(b)||a.val(b.replace(/\D/g,""))},this)}}),f},{requires:["dom","node","./text","./keyCodeUtils"]}),KISSY.add("kg/textbox/2.0.4/numberUtils",function(a,b){var c={},d=c;return c.format=function(a,b){var c=a;if(b=b||"-",/^1\d{10}$/.test(a)){var d=a.match(/^(\d{3})(\d{4})(\d{4})$/);c=d[1]+b+d[2]+b+d[3]}else if(/^0\d{9,11}$/.test(a)){var e=this.getDistrictNumber(a);""!==e&&(c=e+b+a.substring(e.length))}return c},c.format2=function(a,b){var c="",d=a.length;return b=b||"-","1"==a.charAt(0)?(4>d?c=a:(c=a.substring(0,3),c+=8>d?"-"+a.substring(3,d):"-"+a.substring(3,7)+"-"+a.substring(7,d)),(3==d||7==d)&&(c+="-")):c="0"==a.charAt(0)?2>=d?a:/^0(10|2([0-5]||[7-9]))/.test(a)?a.substring(0,3)+"-"+a.substring(3,d):a.length<4?a:a.substring(0,4)+"-"+a.substring(4,d):a,c},c.getDistrictNumber=function(a){var b="";return/^0\d{9,11}$/.test(a)&&(b=/^0(10|2([0-5]||[7-9]))/.test(a)?a.substring(0,3):a.substring(0,4)),b},c.getProvince=function(b){var c="";if(a.isString(b)&&/^0[1-9]\d{2}/.test(b))switch(b.substring(1,3)){case"10":c="\u5317\u4eac";break;case"21":c="\u4e0a\u6d77";break;case"22":c="\u5929\u6d25";break;case"23":c="\u91cd\u5e86";break;case"24":c="\u8fbd\u5b81";break;case"25":c="\u6c5f\u82cf";break;case"27":c="\u6e56\u5317";break;case"28":c="\u56db\u5ddd";break;case"29":c="\u9655\u897f";break;case"20":c="\u5e7f\u4e1c";break;case"31":case"32":case"33":c="\u6cb3\u5317";break;case"34":case"35":c="\u5c71\u897f";break;case"37":case"38":case"39":c="\u6cb3\u5357";break;case"41":case"42":c="\u8fbd\u5b81";break;case"43":case"44":c="\u5409\u6797";break;case"45":case"46":c="\u9ed1\u9f99\u6c5f";break;case"47":case"48":c="\u5185\u8499\u53e4";break;case"51":case"52":c="\u6c5f\u82cf";break;case"53":case"54":case"63":c="\u5c71\u4e1c";break;case"55":case"56":c="\u5b89\u5fbd";break;case"57":case"58":c="\u6d59\u6c5f";break;case"59":c="\u798f\u5efa";break;case"71":case"72":c="\u6e56\u5317";break;case"73":case"74":c="\u6e56\u5357";break;case"75":case"76":case"66":c="\u5e7f\u4e1c";break;case"77":c="\u5e7f\u897f";break;case"79":case"70":c="\u6c5f\u897f";break;case"81":case"82":case"83":c="\u6c5f\u897f";break;case"85":c="\u8d35\u5dde";break;case"87":case"88":case"69":c="\u4e91\u5357";break;case"89":c="8"===b.charAt(3)?"\u6d77\u5357":"\u897f\u85cf";break;case"91":c="\u9655\u897f";break;case"93":case"94":c="\u7518\u8083";break;case"95":c="\u5b81\u590f";break;case"97":c="\u9752\u6d77";break;case"99":case"90":c="\u65b0\u7586"}return c},c.NUMBER_TYPE={UNKNOWN:0,TEL:1,FIXED:2,ARR:[0,1,2]},c.VALIDATION_RESULT_TYPE={VALID:0,MISSING:1,MISMATCH:2,UNSUPPORTED:3},c.isFixedNumber=function(a){return/^(0\d{9,11})$/.test(a)},c.isTelNumber=function(a){return/^(1\d{10})$/.test(a)},c._getCarrierStr=function(a){var b=a.match(/\u79fb\u52a8|\u8054\u901a|\u7535\u4fe1/);return b&&b[0]||""},c._numberInfoCache={},c._tccUrlBase=a.substitute("http://{hostname}/cc/json/mobile_tel_segment.htm",{hostname:/assets\.daily\.taobao\.net/.test(a.Config.base)?"tcc.daily.taobao.net":"tcc.taobao.com"}),c.getNumberInfo=function(c,d,e){var f,g,h=this;a.log("[number-utils]start to get info of "+c),/^\d+$/.test(c)&&(a.log("[number-utils]number is valid"),a.log("[number-utils]check cache"),f=this._numberInfoCache[c],f?(a.log("[number-utils]cache is found"),1==f.code?d(f):e(f)):(a.log("[number-utils]no cache"),f={},"1"==c.charAt(0)?(a.log("[number-utils]it's a telephone number, get its info from remote server"),b({url:this._tccUrlBase,dataType:"script",scriptCharset:"gbk",data:{tel:c},cache:!1,timeout:5,error:function(){a.log("[number-utils]error happens during requesting, make the info unknown"),f.msg="\u53f7\u7801\u4fe1\u606f\u672a\u77e5",f.code=-1,a.isFunction(e)&&e(f)},success:function(){var b=window.__GetZoneResult_;f.msg="",b.telString?(a.log("[number-utils]info: "+b.province+", "+h._getCarrierStr(b.catName)),f.code=1,a.mix(f,{carrier:h._getCarrierStr(b.catName),area:b.province,number:c}),a.log("[number-utils]caching..."),h._numberInfoCache[c]=f,a.isFunction(d)&&d(f)):(f.code=-1,a.log("[number-utils]the info remains unknown"),f.error="\u53f7\u7801\u4fe1\u606f\u672a\u77e5",a.log("[number-utils]caching..."),h._numberInfoCache[c]=f,a.isFunction(e)&&e(f))}})):(a.log("[number-utils]it's a fixed number, try to guess its area info"),g=h.getProvince(c),""!=g?(a.mix(f,{carrier:"\u56fa\u8bdd",area:g,number:c}),h._numberInfoCache[c]=f,a.isFunction(d)&&d(f)):(f.error="\u53f7\u7801\u4fe1\u606f\u672a\u77e5",h._numberInfoCache[c]=f,a.isFunction(e)&&e(infoObj)))))},c.NUMBER_HELPER_CONTENT_FN={SIMPLE:function(a){return this.format(a)},ADVANCED:function(b){var c=a.substitute('<p class="{prefixCls}number">{number}</p>',{number:this.format(b),prefixCls:this.get("prefixCls")+"helper-"});c+=d.isTelNumber(b)?this.get("accept")==d.NUMBER_TYPE.FIXED?'<p class="{prefixCls}tip">\u8bf7\u8f93\u5165\u56fa\u5b9a\u7535\u8bdd\u53f7\u7801</p>':'<p class="{prefixCls}tip">\u624b\u673a\u53f7\u662f11\u4f4d\u6570\u5b57</p>':this.get("accept")==d.NUMBER_TYPE.TEL?'<p class="{prefixCls}tip">\u8bf7\u8f93\u5165\u624b\u673a\u53f7\u7801</p>':'<p class="{prefixCls}tip">\u5c0f\u7075\u901a\u6216\u56fa\u8bdd\u970010-12\u4f4d</p>'}},c.getMaxLength=function(b,c){var d;return a.isNumber(b)&&a.inArray(b,this.NUMBER_TYPE.ARR)&&(d=a.isString(c)&&""!=c?"0"==c.charAt(0)&&b!=this.NUMBER_TYPE.TEL?12:11:b==this.NUMBER_TYPE.FIXED?12:11),d},c.validate=function(a,b){return this._analyze(a,b).validationResultType},c.getNumberType=function(a,b){return this._analyze(a,b).numberType},c._analyze=function(b,c){var d={validationResultType:this.VALIDATION_RESULT_TYPE.VALID,numberType:this.NUMBER_TYPE.UNKNOWN};return b||(b=this.NUMBER_TYPE.UNKNOWN),a.isString(c)&&""!=c?b==this.NUMBER_TYPE.TEL?/^1\d{10}$/.test(c)?d.numberType=this.NUMBER_TYPE.TEL:d.validationResultType=/^0/.test(c)?this.VALIDATION_RESULT_TYPE.UNSUPPORTED:this.VALIDATION_RESULT_TYPE.MISMATCH:b==this.NUMBER_TYPE.FIXED?/^0\d{9,11}$/.test(c)?d.numberType=this.NUMBER_TYPE.FIXED:d.validationResultType=/^1/.test(c)?this.VALIDATION_RESULT_TYPE.UNSUPPORTED:this.VALIDATION_RESULT_TYPE.MISMATCH:/^1\d{10}$/.test(c)?d.numberType=this.NUMBER_TYPE.TEL:/^0\d{9,11}$/.test(c)?d.numberType=this.NUMBER_TYPE.FIXED:d.validationResultType=this.VALIDATION_RESULT_TYPE.MISMATCH:d.validationResultType=this.VALIDATION_RESULT_TYPE.MISSING,d},c},{requires:["ajax"]}),KISSY.add("kg/textbox/2.0.4/phonenumber",function(a,b,c,d,e){function f(a,b){f.superclass.constructor.call(this,a,b),this._config(b)}return a.extend(f,d,{render:function(){f.superclass._init.call(this),this._init()},_checkValidity:function(b){var c,d,g,h,i;f.superclass._checkValidity.call(this,b),a.isUndefined(b)&&(b=this.get("value")),c="",d={customError:!1},h=this.get("accept"),i=e,""==this.get("validationMessage")&&""!=b&&(g=i.validate(h,b),g==i.VALIDATION_RESULT_TYPE.MISMATCH?(this.set("validity",a.merge(this.get("validity"),{customError:!1})),c=this.get("patternMismatchMessage")):g==i.VALIDATION_RESULT_TYPE.UNSUPPORTED&&(this.set("validity",a.merge(this.get("validity"),{customError:!0})),c=this.get("numberUnsupportedMessage")||h==e.NUMBER_TYPE.TEL&&"\u4e0d\u652f\u6301\u56fa\u5b9a\u7535\u8bdd\u53f7\u7801"||h==e.NUMBER_TYPE.FIXED&&"\u4e0d\u652f\u6301\u624b\u673a\u53f7\u7801"),this.set("validity",a.merge(this.get("validity"),d)),this.set("validationMessage",c))},_config:function(a){var b;b=this.get("textInputNode"),this.set("patternMismatchMessage",a&&a.patternMismatchMessage||b.attr("data-patternmismatchmessage")||"\u53f7\u7801\u6709\u8bef"),this.set("accept",a&&a.accept||1*b.attr("data-accept"))},_init:function(){var a;if(a=this.get("textInputNode"),"text"==a.prop("type"))try{a.prop("type","tel")}catch(b){}this.set("helperContentFn",e.NUMBER_HELPER_CONTENT_FN.ADVANCED),this.on("afterValueChange",function(a){this.set("maxLength",e.getMaxLength(this.get("accept"),a.newVal)),this.set("number",{number:a.value,src:"change"})}),this.on("afterAcceptChange",function(a){var b=a.newVal;this.set("maxLength",e.getMaxLength(b,this.get("textInputNode").val())),b==e.NUMBER_TYPE.TEL?this.set("pattern","\\d{11}"):b==e.NUMBER_TYPE.FIXED&&this.set("pattern","\\d{10-12}")}),this.on("afterLiveValueChange",function(a){this.set("maxLength",e.getMaxLength(this.get("accept"),a.newVal)),this.set("number",{number:a.value,src:"input"})}),this.set("maxLength",e.getMaxLength(this.get("accept"),a.val())),this.set("number",{number:this.get("value"),src:"init"})}},{ATTRS:{accept:{value:e.NUMBER_TYPE.UNKNOWN,validator:function(b){return a.isNumber(b)&&a.inArray(b,e.NUMBER_TYPE.ARR)}},phonenumber:{value:{number:"",type:e.NUMBER_TYPE.UNKNOWN,src:""},validator:function(b){return a.isPlainObject(b)&&a.isString(b.number)},setter:function(b){var c=e.getNumberType(this.get("accept"),b.number);return{number:c==e.NUMBER_TYPE.UNKNOWN?"":ev.newVal,numberType:c,src:a.isString(b.src)||""}}},numberUnsupportedMessage:{value:"",validator:function(b){return a.isString(b)}}},utils:e}),f},{requires:["dom","node","./number","./numberUtils"]}),KISSY.add("kg/textbox/2.0.4/qqnumber",function(a,b,c,d,e){function f(a,b){f.superclass.constructor.call(this,a,b),this._config(b)}return a.extend(f,e,{_config:function(a){var b;b=this.get("textInputNode"),this.set("pattern",a&&a.pattern||b.attr("pattern")||"\\d{5-11}"),this.set("patternMismatchMessage",a&&a.patternMismatchMessage||b.attr("data-patternmismatchmessage")||"QQ\u53f7\u5fc5\u987b\u662f5-11\u4f4d\u7684\u6570\u5b57")},_init:function(){f.superclass._init.call(this)}}),f},{requires:["dom","node","base","./number","./keyCodeUtils"]}),KISSY.add("kg/textbox/2.0.4/index",function(a,b,c,d,e){return{TextBox:b,NumberTextBox:c,PhoneNumberTextBox:d,QQNumberTextBox:e}},{requires:["./text","./number","./phonenumber","./qqnumber"]});