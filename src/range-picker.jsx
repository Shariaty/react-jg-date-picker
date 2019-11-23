import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import DatePicker from './date-picker';
import {faPlane} from "@fortawesome/free-solid-svg-icons";
import Calendar from "./calendar";


function dateDiff(first , last){
    if (first && last){
        const nights = last.diff(first, 'days');
        const days = nights+1;

        return <div style={{display: 'inline-flex',fontWeight: 'bold'}}>
                { nights ?
                  <div style={{display: 'inline-flex'}}>
                    <div>شب</div>&nbsp;
                    <div>{nights}</div>
                  </div>
                    : <span/>
                }
                { (nights && days) ?
                    <div>&nbsp;<span> | </span>&nbsp;</div> : <span/>
                }
                { days &&
                    <div style={{display: 'inline-flex'}}>
                        <div>روز</div>&nbsp;
                        <div>{days}</div>
                    </div>
                }

               </div>

    } else {
        return null;
    }
}

class RangePicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayDate: (props.Moment || moment)(),
      lastSetFromDate: false,
    };

    this.changeDisplay = this.changeDisplay.bind(this);
    this.selectDate = this.selectDate.bind(this);
    this.isSelected = this.isSelected.bind(this);
  }

  moment(...args) {
    return (this.props.Moment || moment).apply(this.props.Moment || moment, args);
  }

  changeDisplay(fn) {
    this.setState({ displayDate: this.moment(this.state.displayDate)[fn](1, 'month') });
  }

  selectDate(date) {
    let { fromDate, toDate } = this.props, lastSetFromDate;

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
    this.setState({ lastSetFromDate });
  }

  isSelected(date) {
    if (this.props.fromDate && this.props.toDate) {
        return date.isBetween(this.props.fromDate, this.props.toDate, 'day', '[]');
    } else if (this.props.fromDate && !this.props.toDate) {
        return date.isBetween(this.props.fromDate, this.props.fromDate, 'day', '[]');
    } else if (!this.props.fromDate && this.props.toDate){
        return date.isBetween(this.props.toDate, this.props.toDate, 'day', '[]');
    } else {
      return false;
    }
  }

  render() {
    let { fromDate, toDate, selectDate, changeLocale , myLocale , doubleMonth , handleClose ,
        calenderDisplayDate , type , hotel , ...props } = this.props;

    return (
      <div className={["date-picker range-picker" , myLocale == 'fa' ? ' rtlClass' : 'ltrClass' ,
          doubleMonth ? 'multi-date-picker-container' : 'single-date-picker-container'
      ].join(" ")}>
            <DatePicker
                type={type}
                rangeObject={{
                    start: fromDate,
                    end: toDate
                }}
                calenderDisplayDate={calenderDisplayDate}
                doubleMonth={doubleMonth}
                myLocale={myLocale}
                isSelected={this.isSelected}
                selectDate={this.selectDate}
                {...props} />
        <div style={{ marginTop: 10}} className="calender-botton-tools">

          { myLocale === 'fa' ?
              <button className="locale-button" onClick={this.props.changeLocale}>میلادی</button>
              :
              <button className="locale-button" onClick={this.props.changeLocale}>جلالی</button>
          }

          { ( hotel && dateDiff(fromDate , toDate) ) &&
            <span className="blue-btn">{ dateDiff(fromDate , toDate) }</span>
          }

          <button className="locale-button green-btn" onClick={this.props.handleClose} style={{float: 'right'}}>تایید</button>
        </div>
      </div>
    );
  }
}

const { isSelected, DatePickerProps } = DatePicker.propTypes;
RangePicker.propTypes = {
  // moment object or a valid moment accepted string that shows the selected
  // date starting range.
  hotel: PropTypes.bool,
  fromDate: PropTypes.oneOfType([PropTypes.string, momentPropTypes.momentObj ]),
  // moment object or a valid moment accepted string that shows the selected
  // date ending range.
  toDate: PropTypes.oneOfType([PropTypes.string, momentPropTypes.momentObj ]),
  changeLocale: PropTypes.func,
  myLocale: PropTypes.string,
  doubleMonth: PropTypes.bool,
  ...DatePickerProps,
}
RangePicker.defaultProps = {
    hotel: false
};

export default RangePicker;
