'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _momentJalaali = require('moment-jalaali');

var _momentJalaali2 = _interopRequireDefault(_momentJalaali);

var _datePicker = require('./date-picker');

var _datePicker2 = _interopRequireDefault(_datePicker);

var _freeSolidSvgIcons = require('@fortawesome/free-solid-svg-icons');

var _reactFontawesome = require('@fortawesome/react-fontawesome');

var _Dialog = require('@material-ui/core/Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _DialogContent = require('@material-ui/core/DialogContent');

var _DialogContent2 = _interopRequireDefault(_DialogContent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var JGDatePicker = function (_Component) {
    _inherits(JGDatePicker, _Component);

    function JGDatePicker(props) {
        _classCallCheck(this, JGDatePicker);

        var _this = _possibleConstructorReturn(this, (JGDatePicker.__proto__ || Object.getPrototypeOf(JGDatePicker)).call(this, props));

        _this.state = {
            open: false
        };

        if (_this.props.usePersianDigits) {
            _momentJalaali2.default.loadPersian({ dialect: 'persian-modern', usePersianDigits: true });
        } else {
            _momentJalaali2.default.loadPersian({ dialect: 'persian-modern', usePersianDigits: false });
        }
        return _this;
    }

    _createClass(JGDatePicker, [{
        key: 'handleOpen',
        value: function handleOpen() {
            this.setState({ open: true });
        }
    }, {
        key: 'handleClose',
        value: function handleClose() {
            this.setState({ open: false });
        }
    }, {
        key: 'selectSingleDate',
        value: function selectSingleDate(date) {
            var selectDate = this.props.selectDate;

            this.handleClose();
            selectDate(date);
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                doubleMonth = _props.doubleMonth,
                locale = _props.locale,
                calenderDisplayDate = _props.calenderDisplayDate,
                changeLocale = _props.changeLocale,
                selectDate = _props.selectDate,
                isSelected = _props.isSelected,
                removeDate = _props.removeDate,
                enabledFuture = _props.enabledFuture,
                todayHandler = _props.todayHandler,
                singleIcon = _props.singleIcon,
                customDisablePast = _props.customDisablePast,
                customDisableFuture = _props.customDisableFuture,
                placeholder = _props.placeholder;

            var futureDay = (0, _moment2.default)()['subtract'](1, 'day');

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    { style: { direction: 'rtl' } },
                    _react2.default.createElement(
                        'div',
                        { className: 'bootrap-like-input' },
                        _react2.default.createElement(
                            'div',
                            { onClick: this.handleOpen.bind(this) },
                            isSelected ? locale === 'fa' ? (0, _momentJalaali2.default)(isSelected).format('jYYYY/jMM/jDD') : isSelected.format('YYYY/MM/DD') : _react2.default.createElement(
                                'span',
                                { className: 'datePickerPlaceholder' },
                                placeholder
                            )
                        ),
                        isSelected && _react2.default.createElement(
                            'div',
                            { className: 'datePickerRemoveIcon', onClick: removeDate },
                            _react2.default.createElement(_reactFontawesome.FontAwesomeIcon, { icon: _freeSolidSvgIcons.faTimes })
                        )
                    )
                ),
                _react2.default.createElement(
                    _Dialog2.default,
                    {
                        open: this.state.open,
                        onClose: this.handleClose.bind(this),
                        'aria-labelledby': 'form-dialog-title',
                        maxWidth: 'md'
                    },
                    _react2.default.createElement(
                        _DialogContent2.default,
                        {
                            classes: {
                                root: 'no-padding'
                            }
                        },
                        _react2.default.createElement(
                            'div',
                            { className: ["date-picker range-picker", locale === 'fa' ? ' rtlClass' : 'ltrClass', doubleMonth ? 'multi-date-picker-container' : 'single-date-picker-container'].join(" ") },
                            locale === 'fa' ? _react2.default.createElement(_datePicker2.default, {
                                placeholder: true,
                                singleIcon: singleIcon,
                                type: 'single',
                                doubleMonth: doubleMonth,
                                myLocale: locale,
                                displayYearActions: true,
                                selectDate: this.selectSingleDate.bind(this),
                                changeLocale: changeLocale,
                                isSelected: isSelected,
                                Moment: _momentJalaali2.default,
                                weekdays: ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'],
                                isSelectable: function isSelectable(day) {
                                    if (customDisableFuture) {
                                        return day.isBefore(customDisableFuture, 'day') || day.isSame((0, _moment2.default)());
                                    } else if (customDisablePast) {
                                        return day.isAfter(customDisablePast, 'day') || day.isSame((0, _moment2.default)());
                                    } else {
                                        if (enabledFuture) {
                                            return day.isAfter(futureDay, 'day') || day.isSame((0, _moment2.default)());
                                        } else {
                                            return day.isBefore(futureDay, 'day') || day.isSame((0, _moment2.default)());
                                        }
                                    }
                                },
                                headerFormat: function headerFormat(day) {
                                    return (0, _momentJalaali2.default)(day).format('jMMMM jYYYY');
                                },
                                UnitOfMonth: 'jmonth',
                                FormatOfDay: 'jD',
                                enabledFuture: enabledFuture,
                                calenderDisplayDate: calenderDisplayDate
                            }) : _react2.default.createElement(_datePicker2.default, {
                                singleIcon: singleIcon,
                                type: 'single',
                                doubleMonth: doubleMonth,
                                myLocale: locale,
                                displayYearActions: true,
                                selectDate: this.selectSingleDate.bind(this),
                                changeLocale: changeLocale,
                                isSelected: isSelected,
                                Moment: _moment2.default,
                                isSelectable: function isSelectable(day) {
                                    if (customDisableFuture) {
                                        return day.isBefore(customDisableFuture, 'day') || day.isSame((0, _moment2.default)());
                                    } else if (customDisablePast) {
                                        return day.isAfter(customDisablePast, 'day') || day.isSame((0, _moment2.default)());
                                    } else {
                                        if (enabledFuture) {
                                            return day.isAfter(futureDay, 'day') || day.isSame((0, _moment2.default)());
                                        } else {
                                            return day.isBefore(futureDay, 'day') || day.isSame((0, _moment2.default)());
                                        }
                                    }
                                },
                                enabledFuture: enabledFuture,
                                calenderDisplayDate: calenderDisplayDate
                            }),
                            _react2.default.createElement(
                                'div',
                                { style: { marginTop: 10 }, className: 'calender-botton-tools' },
                                locale === 'fa' ? _react2.default.createElement(
                                    'button',
                                    { className: 'locale-button orange-btn', onClick: changeLocale },
                                    '\u0645\u06CC\u0644\u0627\u062F\u06CC'
                                ) : _react2.default.createElement(
                                    'button',
                                    { className: 'locale-button orange-btn', onClick: changeLocale },
                                    '\u062C\u0644\u0627\u0644\u06CC'
                                ),
                                _react2.default.createElement(
                                    'button',
                                    { className: 'locale-button red-btn',
                                        onClick: todayHandler },
                                    '\u0627\u0645\u0631\u0648\u0632'
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return JGDatePicker;
}(_react.Component);

JGDatePicker.defaultProps = {
    customDisablePast: null,
    placeholder: 'انتخاب تاربخ'
};

exports.default = JGDatePicker;