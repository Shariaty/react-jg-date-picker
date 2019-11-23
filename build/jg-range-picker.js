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

var _rangePicker = require('./range-picker');

var _rangePicker2 = _interopRequireDefault(_rangePicker);

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

var JGRangePicker = function (_Component) {
    _inherits(JGRangePicker, _Component);

    function JGRangePicker(props) {
        _classCallCheck(this, JGRangePicker);

        var _this = _possibleConstructorReturn(this, (JGRangePicker.__proto__ || Object.getPrototypeOf(JGRangePicker)).call(this, props));

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

    _createClass(JGRangePicker, [{
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
        key: 'render',
        value: function render() {
            var _props = this.props,
                doubleMonth = _props.doubleMonth,
                locale = _props.locale,
                changeLocale = _props.changeLocale,
                selectRange = _props.selectRange,
                fromDate = _props.fromDate,
                toDate = _props.toDate,
                removeDate = _props.removeDate,
                calenderDisplayDate = _props.calenderDisplayDate,
                startIcon = _props.startIcon,
                endIcon = _props.endIcon,
                firstPlaceholder = _props.firstPlaceholder,
                secondPlaceholder = _props.secondPlaceholder,
                hotel = _props.hotel;

            var futureDay = (0, _moment2.default)()['subtract'](1, 'day');

            return _react2.default.createElement(
                'div',
                { style: { direction: 'rtl' } },
                _react2.default.createElement(
                    'div',
                    { className: 'bootrap-like-input-for-range' },
                    _react2.default.createElement(
                        'div',
                        { onClick: this.handleOpen.bind(this), style: { display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' } },
                        _react2.default.createElement(
                            'div',
                            null,
                            fromDate ? locale === 'fa' ? (0, _momentJalaali2.default)(fromDate).format('jYYYY/jMM/jDD') : fromDate.format('YYYY/MM/DD') : _react2.default.createElement(
                                'div',
                                { className: 'datePickerPlaceholder', style: { minWidth: 130 } },
                                firstPlaceholder
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'datePickerPlaceholder' },
                            '\u0627\u0644\u06CC'
                        ),
                        _react2.default.createElement(
                            'div',
                            null,
                            toDate ? locale === 'fa' ? (0, _momentJalaali2.default)(toDate).format('jYYYY/jMM/jDD') : toDate.format('YYYY/MM/DD') : _react2.default.createElement(
                                'div',
                                { className: 'datePickerPlaceholder', style: { minWidth: 130 } },
                                secondPlaceholder
                            )
                        )
                    ),
                    fromDate && toDate && _react2.default.createElement(
                        'div',
                        { className: 'datePickerRemoveIcon', onClick: removeDate },
                        _react2.default.createElement(_reactFontawesome.FontAwesomeIcon, { icon: _freeSolidSvgIcons.faTimes })
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
                        { classes: { root: 'no-padding' } },
                        _react2.default.createElement(
                            'div',
                            null,
                            locale === 'fa' ? _react2.default.createElement(_rangePicker2.default, {
                                hotel: hotel,
                                startIcon: startIcon,
                                endIcon: endIcon,
                                type: 'range',
                                doubleMonth: doubleMonth,
                                myLocale: locale,
                                displayYearActions: true,
                                weekdays: ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'],
                                fromDate: fromDate,
                                toDate: toDate,
                                selectDate: selectRange,
                                Moment: _momentJalaali2.default,
                                isSelectable: function isSelectable(day) {
                                    return day.isAfter(futureDay, 'day') || day.isSame((0, _moment2.default)());
                                },
                                headerFormat: function headerFormat(day) {
                                    return (0, _momentJalaali2.default)(day).format('jMMMM jYYYY');
                                },
                                UnitOfMonth: 'jmonth',
                                FormatOfDay: 'jD',
                                changeLocale: changeLocale,
                                handleClose: this.handleClose.bind(this),
                                calenderDisplayDate: calenderDisplayDate
                            }) : _react2.default.createElement(_rangePicker2.default, {
                                hotel: hotel,
                                startIcon: startIcon,
                                endIcon: endIcon,
                                type: 'range',
                                doubleMonth: doubleMonth,
                                myLocale: locale,
                                displayYearActions: true,
                                fromDate: fromDate,
                                toDate: toDate,
                                selectDate: selectRange,
                                changeLocale: changeLocale,
                                isSelectable: function isSelectable(day) {
                                    return day.isAfter(futureDay, 'day') || day.isSame((0, _moment2.default)());
                                },
                                handleClose: this.handleClose.bind(this),
                                calenderDisplayDate: calenderDisplayDate
                            })
                        )
                    )
                )
            );
        }
    }]);

    return JGRangePicker;
}(_react.Component);

JGRangePicker.defaultProps = {
    hotel: false,
    startIcon: null,
    endIcon: null,
    firstPlaceholder: 'تاریخ شروع',
    secondPlaceholder: 'تاریخ پایان'
};

exports.default = JGRangePicker;