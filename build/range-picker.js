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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactMomentProptypes = require('react-moment-proptypes');

var _reactMomentProptypes2 = _interopRequireDefault(_reactMomentProptypes);

var _datePicker = require('./date-picker');

var _datePicker2 = _interopRequireDefault(_datePicker);

var _freeSolidSvgIcons = require('@fortawesome/free-solid-svg-icons');

var _calendar = require('./calendar');

var _calendar2 = _interopRequireDefault(_calendar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function dateDiff(first, last) {
  if (first && last) {
    var nights = last.diff(first, 'days');
    var days = nights + 1;

    return _react2.default.createElement(
      'div',
      { style: { display: 'inline-flex', fontWeight: 'bold' } },
      nights ? _react2.default.createElement(
        'div',
        { style: { display: 'inline-flex' } },
        _react2.default.createElement(
          'div',
          null,
          '\u0634\u0628'
        ),
        '\xA0',
        _react2.default.createElement(
          'div',
          null,
          nights
        )
      ) : _react2.default.createElement('span', null),
      nights && days ? _react2.default.createElement(
        'div',
        null,
        '\xA0',
        _react2.default.createElement(
          'span',
          null,
          ' | '
        ),
        '\xA0'
      ) : _react2.default.createElement('span', null),
      days && _react2.default.createElement(
        'div',
        { style: { display: 'inline-flex' } },
        _react2.default.createElement(
          'div',
          null,
          '\u0631\u0648\u0632'
        ),
        '\xA0',
        _react2.default.createElement(
          'div',
          null,
          days
        )
      )
    );
  } else {
    return null;
  }
}

var RangePicker = function (_Component) {
  _inherits(RangePicker, _Component);

  function RangePicker(props) {
    _classCallCheck(this, RangePicker);

    var _this = _possibleConstructorReturn(this, (RangePicker.__proto__ || Object.getPrototypeOf(RangePicker)).call(this, props));

    _this.state = {
      displayDate: (props.Moment || _moment3.default)(),
      lastSetFromDate: false
    };

    _this.changeDisplay = _this.changeDisplay.bind(_this);
    _this.selectDate = _this.selectDate.bind(_this);
    _this.isSelected = _this.isSelected.bind(_this);
    return _this;
  }

  _createClass(RangePicker, [{
    key: 'moment',
    value: function moment() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return (this.props.Moment || _moment3.default).apply(this.props.Moment || _moment3.default, args);
    }
  }, {
    key: 'changeDisplay',
    value: function changeDisplay(fn) {
      this.setState({ displayDate: this.moment(this.state.displayDate)[fn](1, 'month') });
    }
  }, {
    key: 'selectDate',
    value: function selectDate(date) {
      var _props = this.props,
          fromDate = _props.fromDate,
          toDate = _props.toDate,
          lastSetFromDate = void 0;


      if (date.isBefore(this.props.fromDate)) {
        fromDate = date;
        lastSetFromDate = true;
      } else if (date.isAfter(this.props.toDate)) {
        toDate = date;
        lastSetFromDate = false;
      } else {
        if (this.state.lastSetFromDate) {
          toDate = date;
          lastSetFromDate = false;
        } else {
          fromDate = date;
          lastSetFromDate = true;
        }
      }

      if (fromDate.isSame(toDate)) {
        console.log('same');
      }

      this.props.selectDate(fromDate, toDate);
      this.setState({ lastSetFromDate: lastSetFromDate });
    }
  }, {
    key: 'isSelected',
    value: function isSelected(date) {
      if (this.props.fromDate && this.props.toDate) {
        return date.isBetween(this.props.fromDate, this.props.toDate, 'day', '[]');
      } else if (this.props.fromDate && !this.props.toDate) {
        return date.isBetween(this.props.fromDate, this.props.fromDate, 'day', '[]');
      } else if (!this.props.fromDate && this.props.toDate) {
        return date.isBetween(this.props.toDate, this.props.toDate, 'day', '[]');
      } else {
        return false;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          fromDate = _props2.fromDate,
          toDate = _props2.toDate,
          selectDate = _props2.selectDate,
          changeLocale = _props2.changeLocale,
          myLocale = _props2.myLocale,
          doubleMonth = _props2.doubleMonth,
          handleClose = _props2.handleClose,
          calenderDisplayDate = _props2.calenderDisplayDate,
          type = _props2.type,
          hotel = _props2.hotel,
          props = _objectWithoutProperties(_props2, ['fromDate', 'toDate', 'selectDate', 'changeLocale', 'myLocale', 'doubleMonth', 'handleClose', 'calenderDisplayDate', 'type', 'hotel']);

      return _react2.default.createElement(
        'div',
        { className: ["date-picker range-picker", myLocale == 'fa' ? ' rtlClass' : 'ltrClass', doubleMonth ? 'multi-date-picker-container' : 'single-date-picker-container'].join(" ") },
        _react2.default.createElement(_datePicker2.default, _extends({
          type: type,
          rangeObject: {
            start: fromDate,
            end: toDate
          },
          calenderDisplayDate: calenderDisplayDate,
          doubleMonth: doubleMonth,
          myLocale: myLocale,
          isSelected: this.isSelected,
          selectDate: this.selectDate
        }, props)),
        _react2.default.createElement(
          'div',
          { style: { marginTop: 10 }, className: 'calender-botton-tools' },
          myLocale === 'fa' ? _react2.default.createElement(
            'button',
            { className: 'locale-button', onClick: this.props.changeLocale },
            '\u0645\u06CC\u0644\u0627\u062F\u06CC'
          ) : _react2.default.createElement(
            'button',
            { className: 'locale-button', onClick: this.props.changeLocale },
            '\u062C\u0644\u0627\u0644\u06CC'
          ),
          hotel && dateDiff(fromDate, toDate) && _react2.default.createElement(
            'span',
            { className: 'blue-btn' },
            dateDiff(fromDate, toDate)
          ),
          _react2.default.createElement(
            'button',
            { className: 'locale-button green-btn', onClick: this.props.handleClose, style: { float: 'right' } },
            '\u062A\u0627\u06CC\u06CC\u062F'
          )
        )
      );
    }
  }]);

  return RangePicker;
}(_react.Component);

var _DatePicker$propTypes = _datePicker2.default.propTypes,
    isSelected = _DatePicker$propTypes.isSelected,
    DatePickerProps = _DatePicker$propTypes.DatePickerProps;

RangePicker.propTypes = _extends({
  // moment object or a valid moment accepted string that shows the selected
  // date starting range.
  hotel: _propTypes2.default.bool,
  fromDate: _propTypes2.default.oneOfType([_propTypes2.default.string, _reactMomentProptypes2.default.momentObj]),
  // moment object or a valid moment accepted string that shows the selected
  // date ending range.
  toDate: _propTypes2.default.oneOfType([_propTypes2.default.string, _reactMomentProptypes2.default.momentObj]),
  changeLocale: _propTypes2.default.func,
  myLocale: _propTypes2.default.string,
  doubleMonth: _propTypes2.default.bool
}, DatePickerProps);
RangePicker.defaultProps = {
  hotel: false
};

exports.default = RangePicker;