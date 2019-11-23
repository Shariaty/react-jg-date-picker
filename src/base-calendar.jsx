import React from 'react';
import PropTypes from 'prop-types';

class BaseCalendar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.groupDays = this.groupDays.bind(this);
    this.groupByWeek = this.groupByWeek.bind(this);
    this.renderGroup = this.renderGroup.bind(this);
    this.renderDay = this.renderDay.bind(this);

    this.state = {
      days: [],
    };
  }

  componentDidMount() {
    this.calculateDays();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.month !== this.props.month) {
      this.calculateDays();
    }
  }

  calculateDays() {
    const date = new Date(this.props.month || Date.now());
    const month = date.getMonth();
    const days = [];

    date.setDate(1);
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    this.setState({ days });
  }

  renderGroup(group, i) {
    const days = group.map(this.renderDay);

    if (this.props.renderGroup) {
      return this.props.renderGroup(days);
    }

    return (
      <div key={`group-${i}`}>{days}</div>
    );
  }

  renderDay(day, i) {
    if (this.props.renderDay) {
      return this.props.renderDay(day);
    }

    if (day === null) {
      return null;
    }

    return (
      <span key={`date-${i}`}>{day.getDate()}</span>
    );
  }

  groupByWeek(days) {
    const weeks = []
    days.reduce((tmp, day, i, arr) => {
      if (tmp.length === 0) {
        for (let i = 0; i < day.getDay(); i++) {
          tmp.push(null);
        }
      } else if (tmp.length === 7) {
        weeks.push(tmp);
        tmp = [];
      }

      tmp.push(day);

      if (i === arr.length - 1) {
        if (tmp.length < 7) {
          for (let i = tmp.length; i < 7; i++) {
            tmp.push(null);
          }
        }

        weeks.push(tmp);
      }
      return tmp;
    }, []);
    return weeks;
  }

  groupDays(days) {
    return (this.props.group || this.groupByWeek)(days);
  }

  render() {
    return this.groupDays(this.state.days).map(this.renderGroup);
  }
}

BaseCalendar.propTypes = {
  month: PropTypes.number,
  renderDay: PropTypes.func,
  renderGroup: PropTypes.func,
  group: PropTypes.func,
}

export default BaseCalendar;
