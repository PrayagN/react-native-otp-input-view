"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var styles = react_native_1.StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    textInput: {
        height: 50,
        width: 46,
        // borderBottomWidth: 1,
        textAlign: "center",
        fontSize: 20,
        fontWeight: "500",
        color: "#fff",
    },
});
var DEFAULT_TINT_COLOR = "#3CB371";
var DEFAULT_OFF_TINT_COLOR = "#DCDCDC";
var DEFAULT_TEST_ID_PREFIX = "otp_input_";
var DEFAULT_KEYBOARD_TYPE = "numeric";
var OTPInputView = /** @class */ (function (_super) {
    __extends(OTPInputView, _super);
    function OTPInputView(props) {
        var _this = _super.call(this, props) || this;
        _this.getOTPTextChucks = function (inputCount, inputCellLength, text) {
            var matches = text.match(new RegExp(".{1," + inputCellLength + "}", "g")) || [];
            return matches.slice(0, inputCount);
        };
        _this.checkTintColorCount = function () {
            var _a = _this.props, tintColor = _a.tintColor, offTintColor = _a.offTintColor, inputCount = _a.inputCount;
            if (typeof tintColor !== "string" && tintColor.length !== inputCount) {
                throw new Error("If tint color is an array it's length should be equal to input count");
            }
            if (typeof offTintColor !== "string" &&
                offTintColor.length !== inputCount) {
                throw new Error("If off tint color is an array it's length should be equal to input count");
            }
        };
        _this.basicValidation = function (text) {
            var validText = /^[0-9a-zA-Z]+$/;
            return text.match(validText);
        };
        _this.onTextChange = function (text, i) {
            var _a = _this.props, inputCellLength = _a.inputCellLength, inputCount = _a.inputCount, handleTextChange = _a.handleTextChange, handleCellTextChange = _a.handleCellTextChange;
            if (text && !_this.basicValidation(text)) {
                return;
            }
            _this.setState(function (prevState) {
                var otpText = prevState.otpText;
                otpText[i] = text;
                return {
                    otpText: otpText,
                };
            }, function () {
                handleTextChange(_this.state.otpText.join(""));
                handleCellTextChange && handleCellTextChange(text, i);
                if (text.length === inputCellLength && i !== inputCount - 1) {
                    _this.inputs[i + 1].focus();
                }
            });
        };
        _this.onInputFocus = function (i) {
            var otpText = _this.state.otpText;
            var prevIndex = i - 1;
            if (prevIndex > -1 && !otpText[prevIndex] && !otpText.join("")) {
                _this.inputs[prevIndex].focus();
                return;
            }
            _this.setState({ focusedInput: i });
        };
        _this.onKeyPress = function (e, i) {
            console.log("onKeyPress");
            var val = _this.state.otpText[i] || "";
            var _a = _this.props, handleTextChange = _a.handleTextChange, inputCellLength = _a.inputCellLength, inputCount = _a.inputCount;
            var otpText = _this.state.otpText;
            if (e.nativeEvent.key !== "Backspace" && val && i !== inputCount - 1) {
                _this.inputs[i + 1].focus();
                return;
            }
            if (e.nativeEvent.key === "Backspace" && i !== 0) {
                if (!val.length && otpText[i - 1].length === inputCellLength) {
                    _this.setState(function (prevState) {
                        var prevStateOtpText = prevState.otpText;
                        prevStateOtpText[i - 1] = prevStateOtpText[i - 1]
                            .split("")
                            .splice(0, prevStateOtpText[i - 1].length - 1)
                            .join("");
                        return {
                            otpText: prevStateOtpText,
                        };
                    }, function () {
                        handleTextChange(_this.state.otpText.join(""));
                        _this.inputs[i - 1].focus();
                    });
                }
            }
        };
        _this.clear = function () {
            _this.setState({
                otpText: [],
            }, function () {
                _this.inputs[0].focus();
                _this.props.handleTextChange("");
            });
        };
        _this.setValue = function (value, isPaste) {
            if (isPaste === void 0) { isPaste = false; }
            var _a = _this.props, inputCount = _a.inputCount, inputCellLength = _a.inputCellLength;
            var updatedFocusInput = isPaste ? inputCount - 1 : value.length - 1;
            _this.setState({
                otpText: _this.getOTPTextChucks(inputCount, inputCellLength, value),
            }, function () {
                if (_this.inputs[updatedFocusInput]) {
                    _this.inputs[updatedFocusInput].focus();
                }
                _this.props.handleTextChange(value);
            });
        };
        _this.state = {
            focusedInput: 0,
            otpText: _this.getOTPTextChucks(props.inputCount || 4, props.inputCellLength, props.defaultValue),
        };
        _this.inputs = [];
        _this.checkTintColorCount();
        return _this;
    }
    OTPInputView.prototype.render = function () {
        var _this = this;
        var _a = this.props, inputCount = _a.inputCount, offTintColor = _a.offTintColor, tintColor = _a.tintColor, defaultValue = _a.defaultValue, inputCellLength = _a.inputCellLength, containerStyle = _a.containerStyle, textInputStyle = _a.textInputStyle, keyboardType = _a.keyboardType, testIDPrefix = _a.testIDPrefix, autoFocus = _a.autoFocus, textInputProps = __rest(_a, ["inputCount", "offTintColor", "tintColor", "defaultValue", "inputCellLength", "containerStyle", "textInputStyle", "keyboardType", "testIDPrefix", "autoFocus"]);
        var _b = this.state, focusedInput = _b.focusedInput, otpText = _b.otpText;
        var TextInputs = [];
        var _loop_1 = function (i) {
            var _tintColor = typeof tintColor === "string" ? tintColor : tintColor[i];
            var _offTintColor = typeof offTintColor === "string" ? offTintColor : offTintColor[i];
            var inputStyle = [
                styles.textInput,
                textInputStyle,
                {
                    borderColor: _offTintColor,
                },
            ];
            if (focusedInput === i) {
                inputStyle.push({
                    borderColor: _tintColor,
                });
            }
            TextInputs.push(react_1.default.createElement(react_native_1.TextInput, __assign({ ref: function (e) {
                    if (e) {
                        _this.inputs[i] = e;
                    }
                }, key: i, autoCorrect: false, keyboardType: keyboardType, autoFocus: autoFocus && i === 0, value: otpText[i] || "", style: inputStyle, maxLength: this_1.props.inputCellLength, onFocus: function () { return _this.onInputFocus(i); }, onChangeText: function (text) { return _this.onTextChange(text, i); }, multiline: false, onKeyPress: function (e) { return _this.onKeyPress(e, i); }, selectionColor: _tintColor, cursorColor: _tintColor }, textInputProps, { testID: "".concat(testIDPrefix).concat(i) })));
        };
        var this_1 = this;
        for (var i = 0; i < inputCount; i += 1) {
            _loop_1(i);
        }
        return react_1.default.createElement(react_native_1.View, { style: [styles.container, containerStyle] }, TextInputs);
    };
    OTPInputView.defaultProps = {
        defaultValue: "",
        inputCount: 4,
        tintColor: DEFAULT_TINT_COLOR,
        offTintColor: DEFAULT_OFF_TINT_COLOR,
        inputCellLength: 1,
        containerStyle: {},
        textInputStyle: {},
        handleTextChange: function () { },
        keyboardType: DEFAULT_KEYBOARD_TYPE,
        testIDPrefix: DEFAULT_TEST_ID_PREFIX,
        autoFocus: true,
    };
    return OTPInputView;
}(react_1.Component));
exports.default = OTPInputView;
