/*
combined files : 

kg/textbox/2.0.4/text
kg/textbox/2.0.4/keyCodeUtils
kg/textbox/2.0.4/number
kg/textbox/2.0.4/numberUtils
kg/textbox/2.0.4/phonenumber
kg/textbox/2.0.4/qqnumber
kg/textbox/2.0.4/index

*/
/*
 * @fileoverview 输入框封装类
 * @author 牧云 <muyun.my@taobao.com>
 * @date 2013-01-22
 */
/**
 * TODO
 * 1.将部分属性设置为只读
 * 2.aria支持
 */
KISSY.add('kg/textbox/2.0.4/text',function (S, DOM, Node, Base, JSON, Overlay) {
    var UA = S.UA;

    var PLACEHOLDER_STYLE = {
        ALL: 0,
        AUTO: 1,
        ARR: [0, 1]
    };

    /*
     * @name TextBox
     * @class 文本输入框
     * @constructor
     * @param {Node|DOMNode|String} container input元素容器
     * @param {Object} config
     * config.selectAllOnFocus {Boolean} 是否在focus的时候全选
     * config.autoTrim {Boolean} 是否在focus的时候全选
     * config.paste {Boolean} 是否支持粘贴
     * config.placeholderStyle {Number} placeholder实现风格，0 - 统一模拟（浏览器实现交互方式不同），1 - 不支持的模拟，支持的不做处理
     * config.placeholderText {String} placeholder
     * config.prefixCls {String} css类名前缀
     */
    function TextBox (container, config) {
        var containerNode = Node.one(container);

        TextBox.superclass.constructor.call(this, containerNode, config);

        // TODO 加强验证
        try {
            this.set('containerNode', containerNode);
            this.set('textInputNode', containerNode.one('input'));
            if (!this.get('textInputNode')) {
                throw new Error('[TextBox]无法获取输入框元素');
            }
        } catch (e) {
            S.error(e.message);
        }

        // 配置
        this._config(config);
    }

    S.extend(TextBox, Base, {
        _needToImplementPlaceholder: function () {
            return this.get('placeholderStyle') == TextBox.PLACEHOLDER_STYLE.ALL || !TextBox.IS_PLACEHOLDER_SUPPORTED;
        },
        /**
         * 设置maxLength
         * @param {number} maxLength
         */
        _updateMaxLength: function (maxLength) {
            var val = this.get('textInputNode').val();

            maxLength = maxLength || this.get('maxLength');

            if (maxLength >= 0 && maxLength < val.length) {
                this.set('value', val.substring(0, maxLength));
            }

            this.get('textInputNode').prop('maxLength', maxLength);
        },
        selectAll: function () {
            var domNode = this.get('textInputNode').getDOMNode(),
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
        },
        _trim: function () {
            var textInputNode = this.get('textInputNode'),
                prevVal = textInputNode.val(),
                newVal;

            newVal = S.trim(prevVal);
            if (newVal != prevVal) {
                textInputNode.val(newVal);
            }

        },
        checkValidity: function () {
            var re = true;

            if (!this.get('validity').valid) {
                this.fire('invalid');
                re = false;
            }

            return re;
        },
        setCustomValidity: function (msg) {
            this.set('validationMessage', msg);
        },
        render: function () {
            this._init();
        },
        _initPlaceholder: function () {
            var textInputNode = this.get('textInputNode'),
                containerNode = this.get('containerNode'),
                value = textInputNode.val();

            if (this._needToImplementPlaceholder()) {
                textInputNode.attr('placeholder', '');
                value = textInputNode.val();
                // 模拟placeholder
                if (value == '') {
                    // 当前输入框值为空时
                    textInputNode.val(this.get('placeholderText'));
                    containerNode.addClass(this.get('prefixCls') + TextBox.CLS.PLACEHOLDER);
                    this.set('value', '');
                } else {
                    // 当前输入框值有值时
                    containerNode.removeClass(this.get('prefixCls') + TextBox.CLS.PLACEHOLDER);
                    this.set('value', value);
                }

            } else {
                // 使用原生的placeholder实现
                textInputNode.attr('placeholder', this.get('placeholderText'));
                this.set('value', value);
            }
        },
        /**
         * 初始化属性
         * @param {Object} config
         * @private
         */
        _config: function (config) {
            var textInputNode = this.get('textInputNode');

            this.set('valueMissingMessage', config && config.valueMissingMessage || textInputNode.attr('data-valuemissingmessage'));
            this.set('patternMismatchMessage', config && config.patternMismatchMessage || textInputNode.attr('data-patternmismatchmessage'));
            this.set('helper', config && config.helper || textInputNode.attr('data-helper'));
            this.set('autoTrim', config && config.autoTrim || textInputNode.attr('data-autotrim'));
            this.set('selectAllOnFocus', config && config.selectAllOnFocus || textInputNode.attr('data-selectallonfocus'));
            this.set('paste', config && config.paste || textInputNode.attr('data-paste'));
            this.set('required', config && config.required || textInputNode.prop('required') || textInputNode.attr('required') == 'required');
            this.set('pattern', config && config.pattern || textInputNode.attr('pattern'));
            this.set('placeholderText', config && config.placeholderText || textInputNode.prop('placeholder') || textInputNode.attr('placeholder'));
            this.set('placeholderStyle', config && config.placeholderStyle || textInputNode.attr('data-placeholderstyle') * 1);
            this.set('maxLength', config && config.maxLength || textInputNode.prop('maxlength'));
            this.set('prefixCls', config && config.prefixCls || textInputNode.attr('data-prefixcls'));
        },
        _init: function () {
            // 初始化容器
            var textInputNode = this.get('textInputNode'),
                containerNode = this.get('containerNode');

            containerNode.addClass(this.get('prefixCls') + TextBox.CLS.CONTAINER);

            /*if (!containerNode) {
             containerNode = S.one(DOM.create('<div class="' + containerClassName + '"></div>'));
             containerNode.appendTo(textInputNode.parent());
             containerNode.append(textInputNode);
             }*/

            this.on('afterMaxLengthChange', function () {
                this._updateMaxLength();
            }, this);

            // 绑定事件
            textInputNode.on('focus', function (ev) {
                // 输入框focus事件
                var value = this.get('value');

                this.set('liveValue', value, {
                    silent: true
                });

                if (this._blurTimeout) {
                    // S.log('[TextBox]blurring is cancelled');
                    this._blurTimeout.cancel();
                    this._blurTimeout = null;
                }

                this.get('containerNode').addClass(this.get('prefixCls') + TextBox.CLS.ACTIVE);

                this.fire('focus');

                if (value != '') {
                    if (this.get('selectAllOnFocus')) {
                        this.selectAll();
                    }
                } else if (this._needToImplementPlaceholder()) {
                    // 模拟placeholder
                    textInputNode.val('');
                    this.get('containerNode').removeClass(this.get('prefixCls') + TextBox.CLS.PLACEHOLDER);
                }
            }, this);

            textInputNode.on('keydown', function (ev) {
                /*if (!this.get('paste')) {
                 // 屏蔽ctrl + v
                 // v对应的keyCode是86
                 // ctrl对应的keyCode是17
                 if (ev.ctrlKey && ev.keyCode == KeyCodeMap.key_v) {
                 ev.preventDefault();
                 }
                 }*/
                this.fire('keydown', ev);
            }, this);

            textInputNode.on('keyup', function (ev) {
                if (this.get('autoTrim')) {
                    // trim
                    this._trim();
                }

                this.set('liveValue', textInputNode.val());

                this.fire('keyup', ev);
            }, this);

            textInputNode.on('blur', function (ev) {
                var that = this;

                // S.log('[TextBox]blurring is delayed');
                that._blurTimeout = S.later(function () {
                    var value = that.get('value');

                    // S.log('[TextBox]blurring happens');
                    that.get('containerNode').removeClass(that.get('prefixCls') + TextBox.CLS.ACTIVE);

                    if (value == '' && that._needToImplementPlaceholder()) {
                        // 模拟placeholder
                        textInputNode.val(that.get('placeholderText'));
                        that.get('containerNode').addClass(that.get('prefixCls') + TextBox.CLS.PLACEHOLDER);
                    }
                    that.fire('blur');
                }, 0);

            }, this);

            textInputNode.on('change', function (ev) {
                this.set('value', ev.target.value);
                this.fire('change', ev);
            }, this);

            textInputNode.on('invalid', function (ev) {
                ev.preventDefault();
            }, this);

            if (TextBox.IS_PASTE_EVENT_SUPPORTED && !this.get('paste')) {
                textInputNode.on('paste', function (ev) {
                    ev.preventDefault();
                });
            }

            this.on('afterLiveValueChange', function (ev) {
                var helperContent,
                    helperContentFn,
                    helperOverlay;

                if (this.get('helper')) {
                    helperContentFn = this.get('helperContentFn');
                    if (S.isFucntion(helperContentFn)) {
                        helperContent = helperContentFn(ev.newVal);
                    } else {
                        helperContent = ev.newVal;
                    }
                    helperOverlay = this.get('helperOverlay');
                    if (!helperOverlay) {
                        helperOverlay = new Overlay({
                            prefixCls: this.get('prefixCls'),
                            content: helperContent
                        });
                    }
                    this._showHelperOverlay(helperContent);
                }
            }, this);

            this.on('afterValueChange', function (ev) {
                // trim
                var prevVal = ev.prevVal,
                    newVal = ev.newVal,
                    textInputNode = this.get('textInputNode');

                if (newVal != prevVal) {
                    if (!this._needToImplementPlaceholder()) {
                        textInputNode.val(newVal);
                    } else if (newVal == '') {
                        this.get('containerNode').addClass(this.get('prefixCls') + TextBox.CLS.PLACEHOLDER);
                        textInputNode.val(this.get('placeholderText'));
                    } else {
                        this.get('containerNode').removeClass(this.get('prefixCls') + TextBox.CLS.PLACEHOLDER);
                        textInputNode.val(newVal);
                    }
                }

                this._checkValidity(newVal);
            });

            this.on('afterPlaceholderTextChange', function (ev) {
                if (this.get('value') == '' && this._needToImplementPlaceholder()) {
                    textInputNode.val(ev.newVal);
                    textInputNode.addClass(this.get('prefixCls') + TextBox.CLS.PLACEHOLDER);
                }
            });

            this.on('afterRequiredChange', function (ev) {
                var valueMissing;
                if (ev.newVal && this.get('value') == '') {
                    valueMissing = true;
                } else if (!ev.newVal && this.get('validity').valueMissing) {
                    valueMissing = false;
                }

                if (!S.isNull(valueMissing)) {
                    this.set('validity', S.merge(this.get('validity'), {
                        valueMissing: valueMissing
                    }));
                }
            }, this);

            this.on('afterValidityChange', function (ev) {
                var valid = true;

                S.each(ev.newVal, function (value, key) {
                    if (key != 'valid' && value) {
                        valid = false;
                        return false;
                    }
                });

                ev.newVal.valid = valid;
            }, this);

            this.on('afterValidationMessageChange', function (ev) {
                var customError;
                if (ev.newVal == '' && this.get('validity').customError) {
                    customError = false;
                } else if (ev.newVal != '' && !this.get('validity').customError) {
                    customError = true;
                }

                if (!S.isNull(customError)) {
                    this.set('validity', S.merge(this.get('validity'), {
                        customError: customError
                    }));
                }
            }, this);

            this._initPlaceholder();

            this._checkValidity();
        },
        _checkValidity: function (value) {
            var validationMessage = '',
                validity = {
                    customError: false
                };

            if (S.isUndefined(value)) {
                value = this.get('value');
            }
            if (this.get('required') && value == '') {
                S.mix(validity, {
                    valueMissing: true
                });
                validationMessage = this.get('valueMissingMessage');
            } else {
                S.mix(validity, {
                    valueMissing: false
                });
            }

            if (value != '' && this.get('pattern') != '' && !(new RegExp(this.get('pattern'))).test(value)) {
                S.mix(validity, {
                    patternMismatch: true
                });
                validationMessage = this.get('patternMismatchMessage');
            } else {
                S.mix(validity, {
                    patternMismatch: false
                });
            }

            this.set('validity', S.merge(this.get('validity'), validity));
            this.set('validationMessage', validationMessage);
        }
    }, {
        PLACEHOLDER_STYLE: PLACEHOLDER_STYLE,
        // 浏览器是否支持placeholder
        IS_PLACEHOLDER_SUPPORTED: 'placeholder' in document.createElement('input'),
        // 浏览器是否支持粘贴事件 TODO opera不支持paste事件
        IS_PASTE_EVENT_SUPPORTED: UA.ie || UA.firefox || UA.safari || UA.chrome,
        ATTRS: {
            textInputNode: {
                value: null
            },
            containerNode: {
                value: null
            },
            selectAllOnFocus: {
                value: true,
                setter: function (value) {
                    if (S.isBoolean(value)) {
                        return value;
                    } else {
                        return value == 'enabled';
                    }
                },
                validator: function (value) {
                    return (S.isString(value) && (value == 'enabled' || value == 'disabled')) || S.isBoolean(value);
                }
            },
            autoTrim: {
                value: true,
                setter: function (value) {
                    if (S.isBoolean(value)) {
                        return value;
                    } else {
                        return value == 'enabled';
                    }
                },
                validator: function (value) {
                    return (S.isString(value) && (value == 'enabled' || value == 'disabled')) || S.isBoolean(value);
                }
            },
            paste: {
                value: true,
                setter: function (value) {
                    if (S.isBoolean(value)) {
                        return value;
                    } else {
                        return value == 'enabled';
                    }
                },
                validator: function (value) {
                    return (S.isString(value) && (value == 'enabled' || value == 'disabled')) || S.isBoolean(value);
                }
            },
            placeholderStyle: {
                value: PLACEHOLDER_STYLE.AUTO,
                validator: function (value) {
                    var re = true;

                    if (!S.isNumber(value) || !S.inArray(value, TextBox.PLACEHOLDER_STYLE.ARR)) {
                        re = false;
                    }

                    return re;
                }
            },
            placeholderText: {
                value: '',
                validator: function (value) {
                    return S.isString(value);
                }
            },
            prefixCls: {
                value: 'kf-textbox-',
                validator: function (value) {
                    return !!value;
                }
            },
            value: {
                value: '',
                setter: function (value, key) {
                    if (this.get('autoTrim')) {
                        return S.trim(value);
                    }
                }
            },
            maxLength: {
                value: -1,
                validator: function (value) {
                    return !!value;
                }
            },
            pattern: {
                value: '',
                validator: function (value) {
                    return S.isString(value);
                }
            },
            required: {
                value: false,
                validator: function (value) {
                    return S.isBoolean(value);
                }
            },
            validity: {
                value: {
                    customError: false,
                    patternMismatch: false,
                    rangeOverflow: false,
                    rangUnderflow: false,
                    stepMismatch: false,
                    tooLong: false,
                    typeMismatch: false,
                    valueMissing: false,
                    valid: true
                }
            },
            willValidate: {
                value: false
            },
            validationMessage: {
                value: '',
                validator: function (value) {
                    return S.isString(value);
                }
            },
            liveValue: {
                value: ''
            },
            valueMissingMessage: {
                value: '请输入',
                validator: function (value) {
                    return S.isString(value);
                }
            },
            patternMismatchMessage: {
                value: '输入有误',
                validator: function (value) {
                    return S.isString(value);
                }
            },
            helper: {
                valule: false,
                setter: function (value) {
                    var re = undefined;

                    if (!S.isUndefined(value)) {
                        if (S.isString(value)) {
                            if (value == 'enabled') {
                                re = true;
                            } else if (value == 'disabled') {
                                re = false;
                            }
                        } else {
                            re = !!value;
                        }
                    }
                    return re;
                }
            },
            helperOverlay: {
                value: null
            },
            helperContentFn: {
                value: null
            }
        },
        NAME: 'kf-textinput',
        CLS: {
            PLACEHOLDER: 'placeholder',
            ACTIVE: 'active',
            CONTAINER: 'container'
        }
    });

    return TextBox;
}, {
    requires: [
        'dom',
        'node',
        'base',
        'json',
        'overlay'
    ]
});

/*
 * @fileoverview KeyCode Map
 * @author 牧云 <muyun.my@taobao.com>
 * @date 2013-01-22
 */
KISSY.add('kg/textbox/2.0.4/keyCodeUtils',function (S) {
    return {
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        ENTER: 13,
        ESC: 27,
        TAB: 9,
        /*
         * 是否在号码输入键的黑名单中（65-90，219-222，186-192, shiftKey + 96-105,48-57）
         * @param {Object} keyEvent
         */
        inNumberBlacklist: function (keyEvent) {
            var re = false,
                keyCode = keyEvent.keyCode,
                shiftKey = keyEvent.shiftKey,
                ctrlKey = keyEvent.ctrlKey,
                metaKey = keyEvent.metaKey;

            if (keyCode) {
                keyCode = keyCode * 1;

                if ((keyCode >= 96 && keyCode <= 105 || keyCode >= 48 && keyCode <= 57 ) && shiftKey || keyCode >= 65 && keyCode <= 90 && !metaKey || keyCode >= 219 && keyCode <= 222 || keyCode >= 186 && keyCode <= 192) {
                    re = true;
                }
            }

            return re;
        }
    };
});

/*
 * @fileoverview 号码输入框封装类
 * @author 牧云 <muyun.my@taobao.com>
 * @date 2013-01-22
 */
/**
 * TODO
 * 1.将部分属性设置为只读
 * 2.aria支持
 */
KISSY.add('kg/textbox/2.0.4/number',function (S, DOM, Node, TextBox, KeyCodeUtils) {
        /*
         * @name NumberTextBox
         * @class 号码输入框
         * @extends TextBox
         * @constructor
         * @param {Node|DOMNode|String} container 容器
         * @param {Object} config
         * 1.粘贴
         * 2.placeholder
         * 3.blur延时
         * 4.键入时全选
         * 5.键入后trim
         * 6.maxlength
         * 7.autocomplete
         */
        function NumberTextBox (container, config) {

            NumberTextBox.superclass.constructor.call(this, container, config);

            this._config(config);
        }

        S.extend(NumberTextBox, TextBox, {
            render: function () {
                this._init();
            },
            /**
             * 初始化属性
             * @param {Object} config
             * @private
             */
            _config: function (config) {
                var textInputNode;

                textInputNode = this.get('textInputNode');

                this.set('pattern', config && config.pattern || textInputNode.attr('pattern') || '\\d+');
                this.set('patternMismatchMessage', config && config.patternMismatchMessage || textInputNode.attr('data-patternmismatchmessage') || '只能输入数字');
            },
            _init: function () {
                NumberTextBox.superclass._init.call(this);
                // 绑定事件
                this.on('keydown', function (ev) {
                    if (KeyCodeUtils.inNumberBlacklist(ev)) {
                        ev.preventDefault();
                    }
                }, this);

                this.on('keyup', function () {

                    var textInputNode = this.get('textInputNode'),
                        value = textInputNode.val();

                    if (!/^\d*$/.test(value)) {
                        textInputNode.val(value.replace(/\D/g, ''));
                    }
                }, this);
            }
        });

        return NumberTextBox;
    },
    {
        requires: [
            'dom',
            'node',
            './text',
            './keyCodeUtils'
        ]
    });

/*
 * 号码格式化生成工具
 * @author 牧云<muyun.my@taobao.com>
 * @date 2012-06
 */
KISSY.add('kg/textbox/2.0.4/numberUtils',function (S, AJAX) {
    var re = {};

    var UTILS = re;

    /**
     * <p>12345678901 -> 123-4567-8901</p>
     * <p>0XXX12345678 -> 0XXX-12345678</p>
     * @param {String} number
     * @param {String} delimiter
     * @returns {String}
     */
    re.format = function (number, delimiter) {
        var re = number;

        delimiter = delimiter || '-';

        if (/^1\d{10}$/.test(number)) {
            // 格式化手机号码
            var arr = number.match(/^(\d{3})(\d{4})(\d{4})$/);
            re = arr[1] + delimiter + arr[2] + delimiter + arr[3];
        } else if (/^0\d{9,11}$/.test(number)) {
            // 格式化固定电话号码
            // 查找区号
            var prefix = this.getDistrictNumber(number);
            if (prefix !== '') {
                re = prefix + delimiter + number.substring(prefix.length);
            }
        }

        return re;
    };

    /**
     * <p>123 -> 123-</p>
     * <p>1234 -> 123-4</p>
     * <p>1234567 -> 123-4567-</p>
     * <p>12345678 -> 123-4567-8</p>
     * <p>010 -> 010-</p>
     * <p>0108 -> 010-8</p>
     * <p>0571 -> 0571-</p>
     * <p>05718 -> 0571-8</p>
     * @param {String} number
     * @param {String} delimiter
     * @returns {String}
     */
    re.format2 = function (number, delimiter) {
        var re = '',
            len = number.length;

        delimiter = delimiter || '-';

        if (number.charAt(0) == '1') {
            // 格式化手机号码
            if (len < 4) {
                re = number;
            } else {
                re = number.substring(0, 3);
                if (len < 8) {
                    re += '-' + number.substring(3, len);
                } else {
                    re += '-' + number.substring(3, 7) + '-' + number.substring(7, len);
                }
            }
            if (len == 3 || len == 7) {
                re += '-';
            }
        } else if (number.charAt(0) == '0') {
            // 格式化固定电话号码
            // 查找区号
            if (len <= 2) {
                re = number;
            } else if (/^0(10|2([0-5]||[7-9]))/.test(number)) {
                re = number.substring(0, 3) + '-' + number.substring(3, len);
            } else if (number.length < 4) {
                re = number;
            } else {
                re = number.substring(0, 4) + '-' + number.substring(4, len);
            }
        } else {
            re = number;
        }

        return re;
    };

    re.getDistrictNumber = function (number) {
        var re = '';

        if (/^0\d{9,11}$/.test(number)) {
            // 固定电话号码
            if (/^0(10|2([0-5]||[7-9]))/.test(number)) {
                // 三位区号
                re = number.substring(0, 3);
            } else {
                // 四位区号
                re = number.substring(0, 4);
            }
        }

        return re;

    };

    re.getProvince = function (number) {
        var re = '';

        if (S.isString(number) && /^0[1-9]\d{2}/.test(number)) {
            switch (number.substring(1, 3)) {
                case '10':
                    re = '北京';
                    break;
                case '21':
                    re = '上海';
                    break;
                case '22':
                    re = '天津';
                    break;
                case '23':
                    re = '重庆';
                    break;
                case '24':
                    // 沈阳
                    re = '辽宁';
                    break;
                case '25':
                    // 南京
                    re = '江苏';
                    break;
                case '27':
                    // 武汉
                    re = '湖北';
                    break;
                case '28':
                    // 成都
                    re = '四川';
                    break;
                case '29':
                    // 西安
                    re = '陕西';
                    break;
                case '20':
                    // 广州
                    re = '广东';
                    break;
                case '31':
                case '32':
                case '33':
                    re = '河北';
                    break;
                case '34':
                case '35':
                    re = '山西';
                    break;
                case '37':
                case '38':
                case '39':
                    re = '河南';
                    break;
                case '41':
                case '42':
                    re = '辽宁';
                    break;
                case '43':
                case '44':
                    re = '吉林';
                    break;
                case '45':
                case '46':
                    re = '黑龙江';
                    break;
                case '47':
                case '48':
                    re = '内蒙古';
                    break;
                case '51':
                case '52':
                    re = '江苏';
                    break;
                case '53':
                case '54':
                case '63':
                    re = '山东';
                    break;
                case '55':
                case '56':
                    re = '安徽';
                    break;
                case '57':
                case '58':
                    re = '浙江';
                    break;
                case '59':
                    re = '福建';
                    break;
                case '71':
                case '72':
                    re = '湖北';
                    break;
                case '73':
                case '74':
                    re = '湖南';
                    break;
                case '75':
                case '76':
                case '66':
                    re = '广东';
                    break;
                case '77':
                    re = '广西';
                    break;
                case '79':
                case '70':
                    re = '江西';
                    break;
                case '81':
                case '82':
                case '83':
                    re = '江西';
                    break;
                case '85':
                    re = '贵州';
                    break;
                case '87':
                case '88':
                case '69':
                    re = '云南';
                    break;
                case '89':
                    if (number.charAt(3) === '8') {
                        // 0898属海南
                        re = '海南';
                    } else {
                        // 089[1-7]属海南
                        re = '西藏';
                    }
                    break;
                case '91':
                    re = '陕西';
                    break;
                case '93':
                case '94':
                    re = '甘肃';
                    break;
                case '95':
                    re = '宁夏';
                    break;
                case '97':
                    re = '青海';
                    break;
                case '99':
                case '90':
                    re = '新疆';
                    break;
            }
        }

        return re;
    };

    re.NUMBER_TYPE = {
        UNKNOWN: 0,
        TEL: 1,
        FIXED: 2,
        ARR: [0, 1, 2]
    };



    re.VALIDATION_RESULT_TYPE = {
        VALID: 0,
        MISSING: 1,
        MISMATCH: 2,
        UNSUPPORTED: 3
    };

    re.isFixedNumber = function (number) {
        return /^(0\d{9,11})$/.test(number);
    };

    re.isTelNumber = function (number) {
        return /^(1\d{10})$/.test(number);
    };

    re._getCarrierStr = function (str) {
        var arr = str.match(/移动|联通|电信/);
        return arr && arr[0] || '';
    };

    re._numberInfoCache = {};

    re._tccUrlBase = S.substitute('http://{hostname}/cc/json/mobile_tel_segment.htm', {
        hostname: /assets\.daily\.taobao\.net/.test(S.Config.base) ? 'tcc.daily.taobao.net' : 'tcc.taobao.com'
    });

    /**
     * 取号码信息
     * @param {String} number
     * @param {Function} onSuccess
     * @param {Function} onError
     */
    re.getNumberInfo = function (number, onSuccess, onError) {
        var that = this,
            data,
            province;

        S.log('[number-utils]start to get info of ' + number);
        if (/^\d+$/.test(number)) {
            S.log('[number-utils]number is valid');
            S.log('[number-utils]check cache');
            data = this._numberInfoCache[number];
            if (data) {
                S.log('[number-utils]cache is found');
                // 缓存中有记录
                if (data.code == 1) {
                    onSuccess(data);
                } else {
                    onError(data);
                }
            } else {
                S.log('[number-utils]no cache');
                data = {};
                // 请求信息
                if (number.charAt(0) == '1') {
                    S.log('[number-utils]it\'s a telephone number, get its info from remote server');
                    // 手机号请求服务器
                    AJAX({
                        url: this._tccUrlBase,
                        dataType: 'script',
                        scriptCharset: 'gbk',
                        data: {
                            tel: number
                        },
                        cache: false,
                        timeout: 5,
                        error: function (nothing, textStatus) {
                            S.log('[number-utils]error happens during requesting, make the info unknown');
                            data.msg = '号码信息未知';
                            data.code = -1;
                            S.isFunction(onError) && onError(data);
                        },
                        success: function () {
                            var result = window.__GetZoneResult_;

                            data.msg = '';

                            if (result.telString) {
                                S.log('[number-utils]info: ' + result.province + ', ' + that._getCarrierStr(result.catName));
                                data.code = 1;
                                S.mix(data, {
                                    carrier: that._getCarrierStr(result.catName),
                                    area: result.province,
                                    number: number
                                });
                                S.log('[number-utils]caching...');
                                that._numberInfoCache[number] = data;
                                if (S.isFunction(onSuccess)) {
                                    onSuccess(data)
                                }
                            } else {
                                data.code = -1;
                                S.log('[number-utils]the info remains unknown');
                                data.error = '号码信息未知';
                                S.log('[number-utils]caching...');
                                that._numberInfoCache[number] = data;
                                S.isFunction(onError) && onError(data);
                            }

                        }
                    });
                } else {
                    S.log('[number-utils]it\'s a fixed number, try to guess its area info');
                    // 固定电话号码
                    province = that.getProvince(number);
                    if (province != '') {
                        // 固定电话号码无法判断运营商
                        S.mix(data, {
                            carrier: '固话',
                            area: province,
                            number: number
                        });
                        that._numberInfoCache[number] = data;
                        S.isFunction(onSuccess) && onSuccess(data);
                    } else {
                        data.error = '号码信息未知';
                        that._numberInfoCache[number] = data;
                        S.isFunction(onError) && onError(infoObj);
                    }
                }
            }
        }
    };

    re.NUMBER_HELPER_CONTENT_FN = {
        SIMPLE: function (number) {
            return this.format(number);
        },
        ADVANCED: function (number) {
            var str = S.substitute('<p class="{prefixCls}number">{number}</p>', {
                number: this.format(number),
                prefixCls: this.get('prefixCls') + 'helper-'
            });
            if (UTILS.isTelNumber(number)) {
                if (this.get('accept') == UTILS.NUMBER_TYPE.FIXED) {
                    str += '<p class="{prefixCls}tip">请输入固定电话号码</p>';
                } else {
                    str += '<p class="{prefixCls}tip">手机号是11位数字</p>';
                }
            } else {
                if (this.get('accept') == UTILS.NUMBER_TYPE.TEL) {
                    str += '<p class="{prefixCls}tip">请输入手机号码</p>';
                } else {
                    str += '<p class="{prefixCls}tip">小灵通或固话需10-12位</p>';
                }
            }
        }
    };

    /**
     * 返回指定类型、指定号码下的最大长度
     * @param {Number} accept
     * @param {String} number
     * @return {Number}
     */
    re.getMaxLength = function (accept, number) {
        var re;

        if (S.isNumber(accept) && S.inArray(accept, this.NUMBER_TYPE.ARR)) {
            if (S.isString(number) && number != '') {
                if (number.charAt(0) == '0' && accept != this.NUMBER_TYPE.TEL) {
                    re = 12;
                } else {
                    re = 11;
                }
            } else {
                if (accept == this.NUMBER_TYPE.FIXED) {
                    re = 12;
                } else {
                    re = 11;
                }
            }
        }
        return re;
    };

    /*
     * @param {String} value
     * @param {Number} 接受的号码类型
     * @returns {Number} 返回错误码
     **/
    re.validate = function (accept, number) {
        return this._analyze(accept, number).validationResultType;
    };

    re.getNumberType = function (accept, number) {
        return this._analyze(accept, number).numberType;
    };

    re._analyze = function (accept, number) {
        var re = {
            validationResultType: this.VALIDATION_RESULT_TYPE.VALID,
            numberType: this.NUMBER_TYPE.UNKNOWN
        };

        if (!accept) {
            accept = this.NUMBER_TYPE.UNKNOWN;
        }

        if (S.isString(number) && number != '') {
            if (accept == this.NUMBER_TYPE.TEL) {
                if (/^1\d{10}$/.test(number)) {
                    re.numberType = this.NUMBER_TYPE.TEL
                } else if (/^0/.test(number)) {
                    re.validationResultType = this.VALIDATION_RESULT_TYPE.UNSUPPORTED;
                } else {
                    re.validationResultType = this.VALIDATION_RESULT_TYPE.MISMATCH;
                }
            } else if (accept == this.NUMBER_TYPE.FIXED) {
                if (/^0\d{9,11}$/.test(number)) {
                    re.numberType = this.NUMBER_TYPE.FIXED
                } else if (/^1/.test(number)) {
                    re.validationResultType = this.VALIDATION_RESULT_TYPE.UNSUPPORTED;
                } else {
                    re.validationResultType = this.VALIDATION_RESULT_TYPE.MISMATCH;
                }
            } else if (/^1\d{10}$/.test(number)) {
                re.numberType = this.NUMBER_TYPE.TEL
            } else if (/^0\d{9,11}$/.test(number)) {
                re.numberType = this.NUMBER_TYPE.FIXED
            } else {
                re.validationResultType = this.VALIDATION_RESULT_TYPE.MISMATCH;
            }
        } else {
            re.validationResultType = this.VALIDATION_RESULT_TYPE.MISSING;
        }

        return re;
    };

    return re;
}, {
    requires: ['ajax']
});

/*
 * @fileoverview QQ号输入框封装类
 * @author 牧云 <muyun.my@taobao.com>
 * @date 2013-01-22
 */
KISSY.add('kg/textbox/2.0.4/phonenumber',function (S, DOM, Node, NumberTextBox, NumberUtils) {
        /*
         * @name PhoneNumberTextBox
         * @class 电话号码输入框
         * @extends NumberTextBox
         * @constructor
         * @param {Node|DOMNode|String} container 容器
         * @param {Object} config
         */
        function PhoneNumberTextBox (container, config) {

            PhoneNumberTextBox.superclass.constructor.call(this, container, config);

            this._config(config);
        }

        S.extend(PhoneNumberTextBox, NumberTextBox, {
            render: function () {
                PhoneNumberTextBox.superclass._init.call(this);
                this._init();
            },
            _checkValidity: function (value) {
                var validationMessage,
                    validity,
                    re,
                    accept,
                    utils;

                PhoneNumberTextBox.superclass._checkValidity.call(this, value);

                if (S.isUndefined(value)) {
                    value = this.get('value');
                }

                validationMessage = '';
                validity = {
                    customError: false
                };
                accept = this.get('accept');
                utils = NumberUtils;

                if (this.get('validationMessage') == '' && value != '') {
                    re = utils.validate(accept, value);

                    if (re == utils.VALIDATION_RESULT_TYPE.MISMATCH) {
                        this.set('validity', S.merge(this.get('validity'), {
                            customError: false
                        }));
                        validationMessage = this.get('patternMismatchMessage');
                    } else if (re == utils.VALIDATION_RESULT_TYPE.UNSUPPORTED) {
                        this.set('validity', S.merge(this.get('validity'), {
                            customError: true
                        }));
                        validationMessage = this.get('numberUnsupportedMessage') || accept == NumberUtils.NUMBER_TYPE.TEL && '不支持固定电话号码' || accept == NumberUtils.NUMBER_TYPE.FIXED && '不支持手机号码';
                    }
                    this.set('validity', S.merge(this.get('validity'), validity));
                    this.set('validationMessage', validationMessage);
                }
            },
            /**
             * 初始化属性
             * @param {Object} config
             * @private
             */
            _config: function (config) {
                var textInputNode;

                textInputNode = this.get('textInputNode');

                this.set('patternMismatchMessage', config && config.patternMismatchMessage || textInputNode.attr('data-patternmismatchmessage') || '号码有误');
                this.set('accept', config && config.accept || textInputNode.attr('data-accept') * 1);
            },
            _init: function () {
                var textInputNode;

                textInputNode = this.get('textInputNode');

                if (textInputNode.prop('type') == 'text') {
                    // ie无法修改type
                    try {
                        textInputNode.prop('type', 'tel');
                    } catch (e) {
                    }
                }

                this.set('helperContentFn', NumberUtils.NUMBER_HELPER_CONTENT_FN.ADVANCED);

                this.on('afterValueChange', function (ev) {
                    // 自适应maxlength
                    this.set('maxLength', NumberUtils.getMaxLength(this.get('accept'), ev.newVal));

                    this.set('number', {
                        number: ev.value,
                        src: 'change'
                    });
                });

                this.on('afterAcceptChange', function (ev) {
                    var accept = ev.newVal;

                    // 自适应maxlength
                    this.set('maxLength', NumberUtils.getMaxLength(accept, this.get('textInputNode').val()));

                    if (accept == NumberUtils.NUMBER_TYPE.TEL) {
                        this.set('pattern', '\\d{11}');
                    } else if  (accept == NumberUtils.NUMBER_TYPE.FIXED) {
                        this.set('pattern', '\\d{10-12}');
                    }
                });

                this.on('afterLiveValueChange', function (ev) {
                    // 自适应maxlength
                    this.set('maxLength', NumberUtils.getMaxLength(this.get('accept'), ev.newVal));
                    this.set('number', {
                        number: ev.value,
                        src: 'input'
                    });
                });

                this.set('maxLength', NumberUtils.getMaxLength(this.get('accept'), textInputNode.val()));

                this.set('number', {
                    number: this.get('value'),
                    src: 'init'
                });
            }
        }, {
            ATTRS: {
                accept: {
                    value: NumberUtils.NUMBER_TYPE.UNKNOWN,
                    validator: function (value) {
                        return S.isNumber(value) && S.inArray(value, NumberUtils.NUMBER_TYPE.ARR);
                    }
                },
                phonenumber: {
                    value: {
                        number: '',
                        type: NumberUtils.NUMBER_TYPE.UNKNOWN,
                        src: ''
                    },
                    validator: function (value) {
                        return S.isPlainObject(value) && S.isString(value.number);
                    },
                    setter: function (value, key) {
                        var type = NumberUtils.getNumberType(this.get('accept'), value.number);

                        return {
                            number: type == NumberUtils.NUMBER_TYPE.UNKNOWN ? '' : ev.newVal,
                            numberType: type,
                            src: S.isString(value.src) || ''
                        };
                    }
                },
                numberUnsupportedMessage: {
                    value: '',
                    validator: function (value) {
                        return S.isString(value);
                    }
                }
            },
            utils: NumberUtils
        });

        return PhoneNumberTextBox;
    },
    {
        requires: [
            'dom',
            'node',
            './number',
            './numberUtils'
        ]
    });

/*
 * @fileoverview QQ号输入框封装类
 * @author 牧云 <muyun.my@taobao.com>
 * @date 2013-01-22
 */
/**
 * TODO
 * 1.将部分属性设置为只读
 * 2.aria支持
 */
KISSY.add('kg/textbox/2.0.4/qqnumber',function (S, DOM, Node, Base, NumberTextBox, KeyCodeUtils) {
        /*
         * @name QQNumberTextBox
         * @class QQ号输入框
         * @extends TextBox
         * @constructor
         * @param {Node|DOMNode|String} contaienr 容器
         * @param {Object} config
         */
        function QQNumberTextBox (contaienr, config) {
            QQNumberTextBox.superclass.constructor.call(this, contaienr, config);

            this._config(config);
        }

        S.extend(QQNumberTextBox, NumberTextBox, {
            /**
             * 初始化属性
             * @param {Object} config
             * @private
             */
            _config: function (config) {
                var textInputNode;

                textInputNode = this.get('textInputNode');

                this.set('pattern', config && config.pattern || textInputNode.attr('pattern') || '\\d{5-11}');
                this.set('patternMismatchMessage', config && config.patternMismatchMessage || textInputNode.attr('data-patternmismatchmessage') || 'QQ号必须是5-11位的数字');
            },
            _init: function () {
                QQNumberTextBox.superclass._init.call(this);
            }
        });

        return QQNumberTextBox;
    },
    {
        requires: [
            'dom',
            'node',
            'base',
            './number',
            './keyCodeUtils'
        ]
    });
/*
 * @fileoverview 文本输入框封装类入口
 * @author 牧云 <muyun.my@taobao.com>
 * @date 2013-01-22
 */
KISSY.add('kg/textbox/2.0.4/index',function (S, TextBox, NumberTextBox, PhoneNumberTextBox, QQNumberTextBox) {
        return {
            TextBox: TextBox,
            NumberTextBox: NumberTextBox,
            PhoneNumberTextBox: PhoneNumberTextBox,
            QQNumberTextBox: QQNumberTextBox
        };
    },
    {
        requires: [
            './text',
            './number',
            './phonenumber',
            './qqnumber'
        ]
    });
