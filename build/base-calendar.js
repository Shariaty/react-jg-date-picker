'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseCalendar = function (_React$PureComponent) {
  _inherits(BaseCalendar, _React$PureComponent);

  function BaseCalendar(props) {
    _classCallCheck(this, BaseCalendar);

    var _this = _possibleConstructorReturn(this, (BaseCalendar.__proto__ || Object.getPrototypeOf(BaseCalendar)).call(this, props));

    _this.groupDays = _this.groupDays.bind(_this);
    _this.groupByWeek = _this.groupByWeek.bind(_this);
    _this.renderGroup = _this.renderGroup.bind(_this);
    _this.renderDay = _this.renderDay.bind(_this);

    _this.state = {
      days: []
    };
    return _this;
  }

  _createClass(BaseCalendar, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.calculateDays();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (prevProps.month !== this.props.month) {
        this.calculateDays();
      }
    }
  }, {
    key: 'calculateDays',
    value: function calculateDays() {
      var date = new Date(this.props.month || Date.now());
      var month = date.getMonth();
      var days = [];

      date.setDate(1);
      while (date.getMonth() === month) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
      }

      this.setState({ days: days });
    }
  }, {
    key: 'renderGroup',
    value: function renderGroup(group, i) {
      var days = group.map(this.renderDay);

      if (this.props.renderGroup) {
        return this.props.renderGroup(days);
      }

      return _react2.default.createElement(
        'div',
        { key: 'group-' + i },
        days
      );
    }
  }, {
    key: 'renderDay',
    value: function renderDay(day, i) {
      if (this.props.renderDay) {
        return this.props.renderDay(day);
      }

      if (day === null) {
        return null;
      }

      return _react2.default.createElement(
        'span',
        { key: 'date-' + i },
        day.getDate()
      );
    }
  }, {
    key: 'groupByWeek',
    value: function groupByWeek(days) {
      var weeks = [];
      days.reduce(function (tmp, day, i, arr) {
        if (tmp.length === 0) {
          for (var _i = 0; _i < day.getDay(); _i++) {
            tmp.push(null);
          }
        } else if (tmp.length === 7) {
          weeks.push(tmp);
          tmp = [];
        }

        tmp.push(day);

        if (i === arr.length - 1) {
          if (tmp.length < 7) {
            for (var _i2 = tmp.length; _i2 < 7; _i2++) {
              tmp.push(null);
            }
          }

          weeks.push(tmp);
        }
        return tmp;
      }, []);
      return weeks;
    }
  }, {
    key: 'groupDays',
    value: function groupDays(days) {
      return (this.props.group || this.groupByWeek)(days);
    }
  }, {
    key: 'render',
    value: function render() {
      return this.groupDays(this.state.days).map(this.renderGroup);
    }
  }]);

  return BaseCalendar;
}(_react2.default.PureComponent);

BaseCalendar.propTypes = {
  month: _propTypes2.default.number,
  renderDay: _propTypes2.default.func,
  renderGroup: _propTypes2.default.func,
  group: _propTypes2.default.func
};

exports.default = BaseCalendar;