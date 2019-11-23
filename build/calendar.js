'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment2 = require('moment');

var _moment3 = _interopRequireDefault(_moment2);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactMomentProptypes = require('react-moment-proptypes');

var _reactMomentProptypes2 = _interopRequireDefault(_reactMomentProptypes);

var _reactFontawesome = require('@fortawesome/react-fontawesome');

var _freeSolidSvgIcons = require('@fortawesome/free-solid-svg-icons');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Calendar = function (_React$Component) {
  _inherits(Calendar, _React$Component);

  function Calendar() {
    _classCallCheck(this, Calendar);

    return _possibleConstructorReturn(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).apply(this, arguments));
  }

  _createClass(Calendar, [{
    key: 'moment',
    value: function moment() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return (this.props.Moment || _moment3.default).apply(this.props.Moment || _moment3.default, args);
    }
  }, {
    key: 'generateDay',
    value: function generateDay(day, month, notBelonging) {
      var _props = this.props,
          isSelected = _props.isSelected,
          isSelectable = _props.isSelectable,
          dayTemplate = _props.dayTemplate,
          rangeObject = _props.rangeObject,
          type = _props.type,
          singleIcon = _props.singleIcon,
          startIcon = _props.startIcon,
          endIcon = _props.endIcon;


      if (dayTemplate) {
        return dayTemplate(day, this.onClickHandler(day, month));
      }

      var isDateSelected = typeof isSelected === 'function' ? isSelected(day) : this.moment(isSelected).isSame(day);

      var isSingleSelected = isSelected && typeof isSelected === 'function' ? isSelected(day) : this.moment(isSelected).isSame(day);

      var isItTheFirst = rangeObject && rangeObject.start ? (0, _moment3.default)(rangeObject.start).isSame(day) : false;

      var isItTheLast = rangeObject && rangeObject.end ? (0, _moment3.default)(rangeObject.end).isSame(day) : false;

      var isDayActive = (isSelectable || function () {
        return true;
      })(day);
      var className = (0, _classnames2.default)('calendar-day clickable', {
        'seem-disabled': month || !isDayActive,
        selected: isDateSelected,
        'out': notBelonging,
        'first-selected': isItTheFirst,
        'last-selected': isItTheLast,
        'single-selected': isSingleSelected && type === "single"
      });

      var onClick = isDayActive ? this.onClickHandler(day, month) : function () {};

      return _react2.default.createElement(
        'div',
        {
          onClick: onClick,
          className: className,
          key: day.format('YYYY-MM-D') },
        isItTheFirst && startIcon,
        isItTheLast && endIcon,
        isSingleSelected && type === "single" && singleIcon,
        !isItTheFirst && !isItTheLast && !(isSingleSelected && type === "single") && _react2.default.createElement(
          'span',
          null,
          day.format(this.props.FormatOfDay || 'D')
        )
      );
    }
  }, {
    key: 'onClickHandler',
    value: function onClickHandler(day, month) {
      var _props2 = this.props,
          selectDate = _props2.selectDate,
          changeDisplay = _props2.changeDisplay;

      var momentDay = this.moment(day);
      if (month === 'next') {
        return function () {
          return changeDisplay('add');
        };
      } else if (month === 'previous') {
        return function () {
          return changeDisplay('subtract');
        };
      } else {
        return function () {
          return selectDate(momentDay);
        };
      }
    }
  }, {
    key: 'generateWeeks',
    value: function generateWeeks(dates) {
      var i = 0;
      return (this.props.weekdays || ['M', 'T', 'W', 'T', 'F', 'S', 'S']).map(function (day) {
        return _react2.default.createElement(
          'div',
          { className: 'calendar-week-day', key: Math.random() * 100 },
          _react2.default.createElement(
            'span',
            null,
            day
          )
        );
      }).concat(dates).reduce(function (tmp, date) {
        tmp[i].push(date);
        if (tmp[i].length === 7) {
          i++;
          tmp[i] = [];
        }

        return tmp;
      }, [[]]).map(function (week, index) {
        return _react2.default.createElement(
          'div',
          { className: 'calendar-week', key: index },
          week
        );
      });
    }
  }, {
    key: 'renderCustomHeader',
    value: function renderCustomHeader() {
      return _react2.default.createElement(
        'span',
        { className: 'title' },
        this.props.headerFormat ? this.props.headerFormat(+(0, _moment3.default)(this.props.displayDate)) : this.moment(this.props.displayDate).format('MMMM YYYY')
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var dates = [];
      var startOfNextMonth = this.moment(this.props.displayDate).endOf(this.props.UnitOfMonth || 'month');
      var date = this.moment(this.props.displayDate).startOf(this.props.UnitOfMonth || 'month');

      // This loop generates days from previous month that show up in the first
      // week of the current month.
      for (var i = 6, j = 0; i !== date.day(); i === 6 ? i = 0 : i++, j++) {
        var day = this.moment(date).subtract(date.day() - j + 1, 'days');
        dates.push(this.generateDay(day, 'previous', true));
      }

      // Generates days of the current month
      while (date.isBefore(startOfNextMonth)) {
        dates.push(this.generateDay(date));
        date.add(1, 'days');
      }

      // Like the first loop but for days of the next month appearing in the last
      // week
      for (var _i = date.day(); _i < 6; _i++) {
        var _day = this.moment(date).subtract(date.day() - _i, 'days');
        dates.push(this.generateDay(_day, 'next', true));
      }

      return _react2.default.createElement(
        'div',
        { className: 'calendar-month' },
        this.props.doubleMonth ? _react2.default.createElement(
          'div',
          { style: { textAlign: 'center', fontWeight: 'bold' } },
          this.renderCustomHeader()
        ) : _react2.default.createElement('div', { style: { height: 30 } }),
        this.generateWeeks(dates)
      );
    }
  }]);

  return Calendar;
}(_react2.default.Component);

Calendar.defaultProps = {
  singleIcon: _react2.default.createElement(_reactFontawesome.FontAwesomeIcon, { flip: 'horizontal', icon: _freeSolidSvgIcons.faPlane }),
  startIcon: _react2.default.createElement(_reactFontawesome.FontAwesomeIcon, { flip: 'horizontal', icon: _freeSolidSvgIcons.faPlane }),
  endIcon: _react2.default.createElement(_reactFontawesome.FontAwesomeIcon, { icon: _freeSolidSvgIcons.faPlane })
};

Calendar.propTypes = {
  type: _propTypes2.default.string.isRequired,
  doubleMonth: _propTypes2.default.bool.isRequired,
  // the active month displayed in the calendar.
  displayDate: _propTypes2.default.oneOfType([_propTypes2.default.string, _reactMomentProptypes2.default.momentObj]).isRequired,
  // the function called when attempting to change the active month.
  changeDisplay: _propTypes2.default.func.isRequired,
  // this prop would cause a "selected" to be added to the selected day. String
  // value should be a moment accepted string. Function value receives a moment
  // object of the date that is being generated and should return a boolean.
  isSelected: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string, _reactMomentProptypes2.default.momentObj]),
  // function called when a date is selected. Conventionally should affect
  // isSelected output.
  selectDate: _propTypes2.default.func.isRequired,
  // this prop would cause a "seem-disabled" class to be added to the disabled
  // day. Disabled days are not selectable. Function receives a moment object
  // of the date being generated and is expected to return a boolean. Defaults
  // to true for every day.
  isSelectable: _propTypes2.default.func,
  // if this prop is passed the default day template is ignored. Function
  // receives a moment of the date being generated and the onClick callback and
  // is expected to return a JSX element. Defaults to this.generateDay function.
  dayTemplate: _propTypes2.default.func,
  // if supplied would be passed to this.generateDay function as the format in
  // which dates are displayed. Useful for changing the text or localization.
  // For Jalali calendar pass 'jD'. Defaults to 'D'.
  FormatOfDay: _propTypes2.default.string,
  // in case you want to use a customized moment object (moment-jalaali or so on
  // ) you may need to change this attribute so every month starts of the right
  // day. For Jalali calendar pass 'jMonth'. Defaults to 'month'.
  UnitOfMonth: _propTypes2.default.string,
  // needed in case you want a localized moment object. Pass 'moment-jalaali'
  // for example for Jalali calendar. Defaults to 'moment'.
  Moment: _propTypes2.default.any,
  // an array of JSX elements or strings to be displayed for each weekday. Can
  // be used for localization. For Jalali calendar pass
  // ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج']. Defaults to
  // ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  weekdays: _propTypes2.default.any
};

exports.default = Calendar;