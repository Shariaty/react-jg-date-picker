import React from 'react';
import moment from 'moment';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faArrowRight, faChevronLeft, faChevronRight , faPlane} from "@fortawesome/free-solid-svg-icons";


class Calendar extends React.Component {
  moment(...args) {
    return (this.props.Moment || moment).apply(this.props.Moment || moment, args);
  }

  generateDay (day, month , notBelonging) {
    const { isSelected, isSelectable, dayTemplate , rangeObject , type
    , singleIcon, startIcon, endIcon} = this.props;

      if (dayTemplate) {
      return dayTemplate(day, this.onClickHandler(day, month));
    }

    const isDateSelected = typeof isSelected === 'function' ?
          isSelected(day) : this.moment(isSelected).isSame(day);

    const isSingleSelected = (isSelected && typeof isSelected === 'function') ? isSelected(day)
        : this.moment(isSelected).isSame(day);

    const isItTheFirst = (rangeObject && rangeObject.start) ?
          moment(rangeObject.start).isSame(day)
          : false;

    const isItTheLast = (rangeObject && rangeObject.end) ?
          moment(rangeObject.end).isSame(day)
          : false;


    const isDayActive = (isSelectable || (() => true))(day);
    const className = classNames('calendar-day clickable', {
      'seem-disabled': month || !isDayActive,
      selected: isDateSelected,
      'out': notBelonging,
      'first-selected': isItTheFirst,
      'last-selected': isItTheLast,
      'single-selected': (isSingleSelected && type === "single")
    });

    const onClick = isDayActive ? this.onClickHandler(day, month) : () => {};

    return (
      <div
        onClick={onClick}
        className={className}
        key={day.format('YYYY-MM-D')}>

          { isItTheFirst && startIcon }

          { isItTheLast && endIcon }

          { (isSingleSelected && type === "single") && singleIcon }
          
          { (!isItTheFirst && !isItTheLast && !(isSingleSelected && type === "single")) &&
            <span>{day.format(this.props.FormatOfDay || 'D')}</span>
          }
      </div>
    );
  }

  onClickHandler (day, month) {
    const { selectDate, changeDisplay } = this.props;
    const momentDay = this.moment(day);
    if (month === 'next') {
      return () => changeDisplay('add');
    } else if (month === 'previous') {
      return () => changeDisplay('subtract');
    } else {
      return () => selectDate(momentDay);
    }
  }

  generateWeeks(dates) {
    let i = 0;
    return (this.props.weekdays || ['M', 'T', 'W', 'T', 'F', 'S', 'S'])
      .map(day => {
        return (
          <div className="calendar-week-day" key={Math.random() * 100}>
            <span>{day}</span>
          </div>
        );
      })
      .concat(dates)
      .reduce((tmp, date) => {
        tmp[i].push(date);
        if (tmp[i].length === 7) {
          i++;
          tmp[i] = [];
        }

        return tmp;
      }, [[]])
      .map((week, index) => {
        return (
          <div className="calendar-week" key={index}>
            {week}
          </div>
        );
      });
  }

  renderCustomHeader() {
      return (
          <span className="title">
          {this.props.headerFormat ?
              this.props.headerFormat(+moment(this.props.displayDate)) :
              this.moment(this.props.displayDate).format('MMMM YYYY')}
          </span>
      );
  }

  render () {
    const dates = [];
    const startOfNextMonth = this.moment(this.props.displayDate).endOf(this.props.UnitOfMonth || 'month');
    let date = this.moment(this.props.displayDate).startOf(this.props.UnitOfMonth || 'month');

    // This loop generates days from previous month that show up in the first
    // week of the current month.
    for (let i = 6, j = 0; i !== date.day(); i === 6 ? i = 0 : i++, j++) {
      const day = this.moment(date).subtract(date.day() - j + 1, 'days');
      dates.push(this.generateDay(day, 'previous' , true));
    }

    // Generates days of the current month
    while (date.isBefore(startOfNextMonth)) {
      dates.push(this.generateDay(date));
      date.add(1, 'days');
    }

    // Like the first loop but for days of the next month appearing in the last
    // week
    for (let i = date.day(); i < 6; i++) {
      const day = this.moment(date).subtract(date.day() - i, 'days');
      dates.push(this.generateDay(day, 'next' , true));
    }

    return (
      <div className="calendar-month">
        { this.props.doubleMonth ?
          <div style={{textAlign: 'center', fontWeight: 'bold'}}>
              {this.renderCustomHeader()}
          </div>
            :
          <div style={{height: 30}}/>
        }

        {this.generateWeeks(dates)}
      </div>
    );
  }
}

Calendar.defaultProps = {
    singleIcon: <FontAwesomeIcon flip="horizontal" icon={faPlane}/>,
    startIcon: <FontAwesomeIcon flip="horizontal" icon={faPlane}/>,
    endIcon: <FontAwesomeIcon icon={faPlane}/>
};

Calendar.propTypes = {
  type: PropTypes.string.isRequired,
  doubleMonth: PropTypes.bool.isRequired,
  // the active month displayed in the calendar.
  displayDate: PropTypes.oneOfType([PropTypes.string, momentPropTypes.momentObj ]).isRequired,
  // the function called when attempting to change the active month.
  changeDisplay: PropTypes.func.isRequired,
  // this prop would cause a "selected" to be added to the selected day. String
  // value should be a moment accepted string. Function value receives a moment
  // object of the date that is being generated and should return a boolean.
  isSelected: PropTypes.oneOfType([PropTypes.func, PropTypes.string, momentPropTypes.momentObj ]),
  // function called when a date is selected. Conventionally should affect
  // isSelected output.
  selectDate: PropTypes.func.isRequired,
  // this prop would cause a "seem-disabled" class to be added to the disabled
  // day. Disabled days are not selectable. Function receives a moment object
  // of the date being generated and is expected to return a boolean. Defaults
  // to true for every day.
  isSelectable: PropTypes.func,
  // if this prop is passed the default day template is ignored. Function
  // receives a moment of the date being generated and the onClick callback and
  // is expected to return a JSX element. Defaults to this.generateDay function.
  dayTemplate: PropTypes.func,
  // if supplied would be passed to this.generateDay function as the format in
  // which dates are displayed. Useful for changing the text or localization.
  // For Jalali calendar pass 'jD'. Defaults to 'D'.
  FormatOfDay: PropTypes.string,
  // in case you want to use a customized moment object (moment-jalaali or so on
  // ) you may need to change this attribute so every month starts of the right
  // day. For Jalali calendar pass 'jMonth'. Defaults to 'month'.
  UnitOfMonth: PropTypes.string,
  // needed in case you want a localized moment object. Pass 'moment-jalaali'
  // for example for Jalali calendar. Defaults to 'moment'.
  Moment: PropTypes.any,
  // an array of JSX elements or strings to be displayed for each weekday. Can
  // be used for localization. For Jalali calendar pass
  // ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج']. Defaults to
  // ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  weekdays: PropTypes.any,
};

export default Calendar;
