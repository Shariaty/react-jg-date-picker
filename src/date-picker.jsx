import React, { Component } from 'react';
import moment from 'moment';
import momentJalali from 'moment-jalaali';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight , faArrowLeft , faChevronRight , faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import Calendar from './calendar';
const persianMonths = [
    {value : 1 , label : 'فروردین' },
    {value : 2 , label : 'اردیبهشت' },
    {value : 3 , label : 'خرداد' },
    {value : 4 , label : 'تیر' },
    {value : 5 , label : 'مرداد' },
    {value : 6 , label : 'شهریور' },
    {value : 7 , label : 'مهر' },
    {value : 8 , label : 'آبان' },
    {value : 9 , label : 'آذر' },
    {value : 10 , label : 'دی' },
    {value : 11 , label : 'بهمن' },
    {value : 12 , label : 'اسفند' }
];

const miladiMonths = [
    {value : 0 , label : 'January' },
    {value : 1 , label : 'February' },
    {value : 2 , label : 'March' },
    {value : 3 , label : 'April' },
    {value : 4 , label : 'May' },
    {value : 5 , label : 'June' },
    {value : 6 , label : 'July' },
    {value : 7 , label : 'August' },
    {value : 8 , label : 'September' },
    {value : 9 , label : 'October' },
    {value : 10 , label : 'November' },
    {value : 11 , label : 'December' }
];


class DatePicker extends Component {

  constructor(props) {
    super(props);

    this.state = {
      displayDate: moment()
    };

    this.changeDisplay = this.changeDisplay.bind(this);
    this.changeDisplaySecondMonth = this.changeDisplaySecondMonth.bind(this);
  }

  moment(...args) {
    return (this.props.Moment || moment).apply(this.props.Moment || moment, args);
  }

  changeDisplay (fn, scope) {
      let { myLocale } = this.props;

      let changedDate = null;

      if (myLocale == 'fa') {
          let farsiChangedDate = momentJalali(this.state.displayDate)[fn](1, scope || 'jMonth');
          changedDate = this.moment(farsiChangedDate);

      } else {
          changedDate = this.moment(this.state.displayDate)[fn](1, scope || 'month')
      }
    this.setState({ displayDate: changedDate });
  }

  changeDisplaySecondMonth (fn, scope) {
      let { myLocale } = this.props;

      let changedDate = null;

      if (myLocale == 'fa') {
          let farsiChangedDate = momentJalali(this.state.displayDate)[fn](2, scope || 'jMonth');
          changedDate = this.moment(farsiChangedDate);

      } else {
          changedDate = this.moment(this.state.displayDate)[fn](2, scope || 'month')
      }

      this.setState({ displayDate: changedDate });
  }

  componentWillMount(){
      let { calenderDisplayDate , myLocale } = this.props;
      let { displayDate } = this.state;

      let farsiFirstDayofMOnth = momentJalali(calenderDisplayDate).startOf('jMonth');

      this.setState({displayDate: calenderDisplayDate});
  }

  componentWillReceiveProps(nextProps) {
      let { calenderDisplayDate , myLocale} = nextProps;
      let { displayDate } = this.state;

      this.setState({displayDate: calenderDisplayDate});
  }

  generateYearList(current , yearInFuture){
    let array = [];
    if(yearInFuture) {
        for(var i = current; i <= current+100; i++) array.push(i);
    } else {
        for(var i = current; i >= current-100; i--) array.push(i);
    }
    return array;
  }

  onYearSelect(year , myLocale){
      let final = null;

      if (myLocale == 'fa'){
          const farsiBaseDate = momentJalali(this.state.displayDate).format('jMM-jDD');
          const fullFarsiDateString = `${farsiBaseDate}-${year}`;
          const ConvertedToDateObject = momentJalali(fullFarsiDateString , 'jMM-jDD-jYYYY');
          const MiladiDateObject = moment(ConvertedToDateObject);

          let correctFinalDateObject = null;
          let kabisehStatus = null;

          if (MiladiDateObject.isLeapYear()) {
              kabisehStatus = 'is kabiseh';
              correctFinalDateObject = MiladiDateObject.add(1, 'days');
          } else {
              kabisehStatus = 'not kabiseh';
              correctFinalDateObject = MiladiDateObject;
          }

          const MIladiDate = correctFinalDateObject.format('YYYY');
          this.setState({ displayDate: this.moment(this.state.displayDate).set({'year': MIladiDate}) });
      }  else {
          this.setState({ displayDate: this.moment(this.state.displayDate).set({'year': year}) });
      }
  }

  onMonthSelect(month , myLocale , currentDate){
      let final = currentDate;

      if (myLocale == 'fa'){
          const farsiBaseDate = momentJalali(currentDate).format('jYYYY-jDD');
          const fullFarsiDateString = `${farsiBaseDate}-${month}`;
          const ConvertedToDateObject = momentJalali(fullFarsiDateString , 'jYYYY-jDD-jMM');
          const MiladiDateObject = moment(ConvertedToDateObject);
          const MIladiDate = MiladiDateObject.format('M');
          final =   MiladiDateObject;
      } else {
          final = this.moment(currentDate).set({'month': parseInt(month)});
      }

      this.setState({ displayDate: final });
    }


  getTheYearSelectedValue(displayDate , myLocale) {
        let final = null;

        if (myLocale == 'fa'){
            final = momentJalali(displayDate).jYear();
        }  else {
            final = moment(displayDate).year();
        }

        return final;
   }

  getTheMonthSelectedValue(displayDate , myLocale) {
        let final = null;

        if (myLocale == 'fa'){
            final = momentJalali(displayDate).locale('fa').format('jM');
        }  else {
            final = moment(displayDate).locale('en').format('M') - 1;
        }

        return final;
    }

  renderHeader() {

   let { doubleMonth , Moment , myLocale , enabledFuture} = this.props;
   let { displayDate } = this.state;
   const list = this.generateYearList( (myLocale === 'fa') ? momentJalali().jYear() : moment().year() , enabledFuture);

   const MonthList = (myLocale === 'fa') ? persianMonths : miladiMonths ;

    return (
      <div className="date-picker-header">
          { doubleMonth &&
              <div>
                  {this.props.beforePrevButton}
                  {this.props.displayYearActions && (
                      <span className="action" onClick={() => this.changeDisplay('subtract', 'year')}>{this.props.yearLabelPrev || <FontAwesomeIcon icon={this.props.myLocale == 'fa' ? faChevronRight : faChevronLeft} />}</span>
                  )}
                  <span className="action" onClick={() => this.changeDisplay('subtract')}>{this.props.monthLabelPrev || <FontAwesomeIcon icon={this.props.myLocale == 'fa' ? faArrowRight : faArrowLeft} />}</span>
              </div>
          }


          { !doubleMonth &&
              <div className="year-jump" style={{ display: 'flex', justifyContent: 'space-between' , marginTop: -8}}>
                  <div>
                      <select className="custom-select" value={this.getTheYearSelectedValue(displayDate , myLocale)} onChange={(e) => this.onYearSelect(e.target.value , myLocale)}>
                          {list.map( item => (
                              <option key={item} value={item}>{item}</option>
                          ))}
                      </select>
                  </div>

                  <div>
                      <select className="custom-select" value={this.getTheMonthSelectedValue(displayDate , myLocale)} onChange={(e) => this.onMonthSelect(e.target.value , myLocale , displayDate)}>
                          { MonthList.map( (item , index) => (
                              <option key={index} value={item.value}>{item.label}</option>
                          ))}
                      </select>



                      {/*<div style={{marginTop: 4}}>*/}
                          {/*<span className="action" onClick={() => this.changeDisplay('subtract')}>{this.props.monthLabelPrev || <FontAwesomeIcon icon={this.props.myLocale == 'fa' ? faArrowRight : faArrowLeft} />}</span>*/}
                          {/*<span style={{padding: 15}}>{ (myLocale === 'fa') ? momentJalali(displayDate).locale('fa').format('jMMMM') :  moment(displayDate).locale('en').format('MMMM')}</span>*/}
                          {/*<span className="action" onClick={() => this.changeDisplay('add')}>{this.props.monthLabelNext || <FontAwesomeIcon icon={this.props.myLocale == 'fa' ? faArrowLeft : faArrowRight} />}</span>*/}
                      {/*</div>*/}
                  </div>
              </div>
          }


          {doubleMonth &&
              <div style={{float: 'right'}}>
                  <span className="action" onClick={() => this.changeDisplay('add')}>{this.props.monthLabelNext || <FontAwesomeIcon icon={this.props.myLocale == 'fa' ? faArrowLeft : faArrowRight} />}</span>
                  {this.props.displayYearActions && (
                      <span className="action" onClick={() => this.changeDisplay('add', 'year')}>{this.props.yearLabelNext || <FontAwesomeIcon icon={this.props.myLocale == 'fa' ? faChevronLeft : faChevronRight} />}</span>
                  )}
                  {this.props.afterNextButton}
              </div>
          }

      </div>
    );
  }

  _createFutureMonth(date , locale) {
      let changedDate = null;

      if (locale == 'fa') {
          let farsiChangedDate = momentJalali(date)['add'](1,'jMonth');
          changedDate = this.moment(farsiChangedDate);

      } else {
          changedDate = this.moment(date)['add'](1, 'month')
      }
      return changedDate;
  }

  render() {
    const { doubleMonth , rangeObject , isSelected , type , singleIcon , myLocale} = this.props;
    let futureMonth =  this._createFutureMonth(this.state.displayDate , myLocale);

    return (
      <div className="date-picker">
        {this.renderHeader()}

        <div style={{width: 630, display: 'flex', justifyContent: 'space-between'}}>
            <Calendar
              type={type}
              rangeObject={rangeObject ? rangeObject : null}
              doubleMonth={doubleMonth}
              displayDate={this.state.displayDate}
              changeDisplay={this.changeDisplay}
              {...this.props} />

            {doubleMonth &&
                <Calendar
                    type={type}
                    rangeObject={rangeObject ? rangeObject : null}
                    doubleMonth={doubleMonth}
                    displayDate={futureMonth}
                    changeDisplay={this.changeDisplaySecondMonth}
                    {...this.props} />
            }

        </div>
      </div>
    );
  }
}

const { changeDisplay, displayDate, CalendarProps } = Calendar.propTypes;
DatePicker.propTypes = {
  // Function that renders header of the datepicker. Receive a unix timestamp
  // and is expected to return a JSX valid element (including strings).
  enabledFuture: PropTypes.bool,
  displayYearActions: PropTypes.bool,
  headerFormat: PropTypes.func,
  monthLabelNext: PropTypes.any,
  monthLabelPrev: PropTypes.any,
  beforePrevButton: PropTypes.any,
  afterNextButton: PropTypes.any,
  doubleMonth:PropTypes.bool,
  ...CalendarProps,
}

export default DatePicker;
