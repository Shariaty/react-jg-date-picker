'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment2 = require('moment');

var _moment3 = _interopRequireDefault(_moment2);

var _momentJalaali = require('moment-jalaali');

var _momentJalaali2 = _interopRequireDefault(_momentJalaali);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactFontawesome = require('@fortawesome/react-fontawesome');

var _freeSolidSvgIcons = require('@fortawesome/free-solid-svg-icons');

var _calendar = require('./calendar');

var _calendar2 = _interopRequireDefault(_calendar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var persianMonths = [{ value: 1, label: 'فروردین' }, { value: 2, label: 'اردیبهشت' }, { value: 3, label: 'خرداد' }, { value: 4, label: 'تیر' }, { value: 5, label: 'مرداد' }, { value: 6, label: 'شهریور' }, { value: 7, label: 'مهر' }, { value: 8, label: 'آبان' }, { value: 9, label: 'آذر' }, { value: 10, label: 'دی' }, { value: 11, label: 'بهمن' }, { value: 12, label: 'اسفند' }];

var miladiMonths = [{ value: 0, label: 'January' }, { value: 1, label: 'February' }, { value: 2, label: 'March' }, { value: 3, label: 'April' }, { value: 4, label: 'May' }, { value: 5, label: 'June' }, { value: 6, label: 'July' }, { value: 7, label: 'August' }, { value: 8, label: 'September' }, { value: 9, label: 'October' }, { value: 10, label: 'November' }, { value: 11, label: 'December' }];

var DatePicker = function (_Component) {
    _inherits(DatePicker, _Component);

    function DatePicker(props) {
        _classCallCheck(this, DatePicker);

        var _this = _possibleConstructorReturn(this, (DatePicker.__proto__ || Object.getPrototypeOf(DatePicker)).call(this, props));

        _this.state = {
            displayDate: (0, _moment3.default)()
        };

        _this.changeDisplay = _this.changeDisplay.bind(_this);
        _this.changeDisplaySecondMonth = _this.changeDisplaySecondMonth.bind(_this);
        return _this;
    }

    _createClass(DatePicker, [{
        key: 'moment',
        value: function moment() {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return (this.props.Moment || _moment3.default).apply(this.props.Moment || _moment3.default, args);
        }
    }, {
        key: 'changeDisplay',
        value: function changeDisplay(fn, scope) {
            var myLocale = this.props.myLocale;


            var changedDate = null;

            if (myLocale == 'fa') {
                var farsiChangedDate = (0, _momentJalaali2.default)(this.state.displayDate)[fn](1, scope || 'jMonth');
                changedDate = this.moment(farsiChangedDate);
            } else {
                changedDate = this.moment(this.state.displayDate)[fn](1, scope || 'month');
            }
            this.setState({ displayDate: changedDate });
        }
    }, {
        key: 'changeDisplaySecondMonth',
        value: function changeDisplaySecondMonth(fn, scope) {
            var myLocale = this.props.myLocale;


            var changedDate = null;

            if (myLocale == 'fa') {
                var farsiChangedDate = (0, _momentJalaali2.default)(this.state.displayDate)[fn](2, scope || 'jMonth');
                changedDate = this.moment(farsiChangedDate);
            } else {
                changedDate = this.moment(this.state.displayDate)[fn](2, scope || 'month');
            }

            this.setState({ displayDate: changedDate });
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _props = this.props,
                calenderDisplayDate = _props.calenderDisplayDate,
                myLocale = _props.myLocale;
            var displayDate = this.state.displayDate;


            var farsiFirstDayofMOnth = (0, _momentJalaali2.default)(calenderDisplayDate).startOf('jMonth');

            this.setState({ displayDate: calenderDisplayDate });
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var calenderDisplayDate = nextProps.calenderDisplayDate,
                myLocale = nextProps.myLocale;
            var displayDate = this.state.displayDate;


            this.setState({ displayDate: calenderDisplayDate });
        }
    }, {
        key: 'generateYearList',
        value: function generateYearList(current, yearInFuture) {
            var array = [];
            if (yearInFuture) {
                for (var i = current; i <= current + 100; i++) {
                    array.push(i);
                }
            } else {
                for (var i = current; i >= current - 100; i--) {
                    array.push(i);
                }
            }
            return array;
        }
    }, {
        key: 'onYearSelect',
        value: function onYearSelect(year, myLocale) {
            var final = null;

            if (myLocale == 'fa') {
                var farsiBaseDate = (0, _momentJalaali2.default)(this.state.displayDate).format('jMM-jDD');
                var fullFarsiDateString = farsiBaseDate + '-' + year;
                var ConvertedToDateObject = (0, _momentJalaali2.default)(fullFarsiDateString, 'jMM-jDD-jYYYY');
                var MiladiDateObject = (0, _moment3.default)(ConvertedToDateObject);

                var correctFinalDateObject = null;
                var kabisehStatus = null;

                if (MiladiDateObject.isLeapYear()) {
                    kabisehStatus = 'is kabiseh';
                    correctFinalDateObject = MiladiDateObject.add(1, 'days');
                } else {
                    kabisehStatus = 'not kabiseh';
                    correctFinalDateObject = MiladiDateObject;
                }

                var MIladiDate = correctFinalDateObject.format('YYYY');
                this.setState({ displayDate: this.moment(this.state.displayDate).set({ 'year': MIladiDate }) });
            } else {
                this.setState({ displayDate: this.moment(this.state.displayDate).set({ 'year': year }) });
            }
        }
    }, {
        key: 'onMonthSelect',
        value: function onMonthSelect(month, myLocale, currentDate) {
            var final = currentDate;

            if (myLocale == 'fa') {
                var farsiBaseDate = (0, _momentJalaali2.default)(currentDate).format('jYYYY-jDD');
                var fullFarsiDateString = farsiBaseDate + '-' + month;
                var ConvertedToDateObject = (0, _momentJalaali2.default)(fullFarsiDateString, 'jYYYY-jDD-jMM');
                var MiladiDateObject = (0, _moment3.default)(ConvertedToDateObject);
                var MIladiDate = MiladiDateObject.format('M');
                final = MiladiDateObject;
            } else {
                final = this.moment(currentDate).set({ 'month': parseInt(month) });
            }

            this.setState({ displayDate: final });
        }
    }, {
        key: 'getTheYearSelectedValue',
        value: function getTheYearSelectedValue(displayDate, myLocale) {
            var final = null;

            if (myLocale == 'fa') {
                final = (0, _momentJalaali2.default)(displayDate).jYear();
            } else {
                final = (0, _moment3.default)(displayDate).year();
            }

            return final;
        }
    }, {
        key: 'getTheMonthSelectedValue',
        value: function getTheMonthSelectedValue(displayDate, myLocale) {
            var final = null;

            if (myLocale == 'fa') {
                final = (0, _momentJalaali2.default)(displayDate).locale('fa').format('jM');
            } else {
                final = (0, _moment3.default)(displayDate).locale('en').format('M') - 1;
            }

            return final;
        }
    }, {
        key: 'renderHeader',
        value: function renderHeader() {
            var _this2 = this;

            var _props2 = this.props,
                doubleMonth = _props2.doubleMonth,
                Moment = _props2.Moment,
                myLocale = _props2.myLocale,
                enabledFuture = _props2.enabledFuture;
            var displayDate = this.state.displayDate;

            var list = this.generateYearList(myLocale === 'fa' ? (0, _momentJalaali2.default)().jYear() : (0, _moment3.default)().year(), enabledFuture);

            var MonthList = myLocale === 'fa' ? persianMonths : miladiMonths;

            return _react2.default.createElement(
                'div',
                { className: 'date-picker-header' },
                doubleMonth && _react2.default.createElement(
                    'div',
                    null,
                    this.props.beforePrevButton,
                    this.props.displayYearActions && _react2.default.createElement(
                        'span',
                        { className: 'action', onClick: function onClick() {
                                return _this2.changeDisplay('subtract', 'year');
                            } },
                        this.props.yearLabelPrev || _react2.default.createElement(_reactFontawesome.FontAwesomeIcon, { icon: this.props.myLocale == 'fa' ? _freeSolidSvgIcons.faChevronRight : _freeSolidSvgIcons.faChevronLeft })
                    ),
                    _react2.default.createElement(
                        'span',
                        { className: 'action', onClick: function onClick() {
                                return _this2.changeDisplay('subtract');
                            } },
                        this.props.monthLabelPrev || _react2.default.createElement(_reactFontawesome.FontAwesomeIcon, { icon: this.props.myLocale == 'fa' ? _freeSolidSvgIcons.faArrowRight : _freeSolidSvgIcons.faArrowLeft })
                    )
                ),
                !doubleMonth && _react2.default.createElement(
                    'div',
                    { className: 'year-jump', style: { display: 'flex', justifyContent: 'space-between', marginTop: -8 } },
                    _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(
                            'select',
                            { className: 'custom-select', value: this.getTheYearSelectedValue(displayDate, myLocale), onChange: function onChange(e) {
                                    return _this2.onYearSelect(e.target.value, myLocale);
                                } },
                            list.map(function (item) {
                                return _react2.default.createElement(
                                    'option',
                                    { key: item, value: item },
                                    item
                                );
                            })
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(
                            'select',
                            { className: 'custom-select', value: this.getTheMonthSelectedValue(displayDate, myLocale), onChange: function onChange(e) {
                                    return _this2.onMonthSelect(e.target.value, myLocale, displayDate);
                                } },
                            MonthList.map(function (item, index) {
                                return _react2.default.createElement(
                                    'option',
                                    { key: index, value: item.value },
                                    item.label
                                );
                            })
                        )
                    )
                ),
                doubleMonth && _react2.default.createElement(
                    'div',
                    { style: { float: 'right' } },
                    _react2.default.createElement(
                        'span',
                        { className: 'action', onClick: function onClick() {
                                return _this2.changeDisplay('add');
                            } },
                        this.props.monthLabelNext || _react2.default.createElement(_reactFontawesome.FontAwesomeIcon, { icon: this.props.myLocale == 'fa' ? _freeSolidSvgIcons.faArrowLeft : _freeSolidSvgIcons.faArrowRight })
                    ),
                    this.props.displayYearActions && _react2.default.createElement(
                        'span',
                        { className: 'action', onClick: function onClick() {
                                return _this2.changeDisplay('add', 'year');
                            } },
                        this.props.yearLabelNext || _react2.default.createElement(_reactFontawesome.FontAwesomeIcon, { icon: this.props.myLocale == 'fa' ? _freeSolidSvgIcons.faChevronLeft : _freeSolidSvgIcons.faChevronRight })
                    ),
                    this.props.afterNextButton
                )
            );
        }
    }, {
        key: '_createFutureMonth',
        value: function _createFutureMonth(date, locale) {
            var changedDate = null;

            if (locale == 'fa') {
                var farsiChangedDate = (0, _momentJalaali2.default)(date)['add'](1, 'jMonth');
                changedDate = this.moment(farsiChangedDate);
            } else {
                changedDate = this.moment(date)['add'](1, 'month');
            }
            return changedDate;
        }
    }, {
        key: 'render',
        value: function render() {
            var _props3 = this.props,
                doubleMonth = _props3.doubleMonth,
                rangeObject = _props3.rangeObject,
                isSelected = _props3.isSelected,
                type = _props3.type,
                singleIcon = _props3.singleIcon,
                myLocale = _props3.myLocale;

            var futureMonth = this._createFutureMonth(this.state.displayDate, myLocale);

            return _react2.default.createElement(
                'div',
                { className: 'date-picker' },
                this.renderHeader(),
                _react2.default.createElement(
                    'div',
                    { style: { width: 630, display: 'flex', justifyContent: 'space-between' } },
                    _react2.default.createElement(_calendar2.default, _extends({
                        type: type,
                        rangeObject: rangeObject ? rangeObject : null,
                        doubleMonth: doubleMonth,
                        displayDate: this.state.displayDate,
                        changeDisplay: this.changeDisplay
                    }, this.props)),
                    doubleMonth && _react2.default.createElement(_calendar2.default, _extends({
                        type: type,
                        rangeObject: rangeObject ? rangeObject : null,
                        doubleMonth: doubleMonth,
                        displayDate: futureMonth,
                        changeDisplay: this.changeDisplaySecondMonth
                    }, this.props))
                )
            );
        }
    }]);

    return DatePicker;
}(_react.Component);

var _Calendar$propTypes = _calendar2.default.propTypes,
    changeDisplay = _Calendar$propTypes.changeDisplay,
    displayDate = _Calendar$propTypes.displayDate,
    CalendarProps = _Calendar$propTypes.CalendarProps;

DatePicker.propTypes = _extends({
    // Function that renders header of the datepicker. Receive a unix timestamp
    // and is expected to return a JSX valid element (including strings).
    enabledFuture: _propTypes2.default.bool,
    displayYearActions: _propTypes2.default.bool,
    headerFormat: _propTypes2.default.func,
    monthLabelNext: _propTypes2.default.any,
    monthLabelPrev: _propTypes2.default.any,
    beforePrevButton: _propTypes2.default.any,
    afterNextButton: _propTypes2.default.any,
    doubleMonth: _propTypes2.default.bool
}, CalendarProps);

exports.default = DatePicker;