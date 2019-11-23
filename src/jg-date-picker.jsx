import React, { Component } from 'react';
import moment from 'moment';
import momentJalali from 'moment-jalaali';
import DatePicker from './date-picker';
import {faArrowLeft, faArrowRight, faPlane, faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

class JGDatePicker extends Component {

    constructor(props){
        super(props);

        this.state = {
            open: false
        }

        if (this.props.usePersianDigits) {
            momentJalali.loadPersian({dialect: 'persian-modern' , usePersianDigits: true});
        } else {
            momentJalali.loadPersian({dialect: 'persian-modern' , usePersianDigits: false});
        }
    }

    handleOpen() {
        this.setState({open : true});
    }

    handleClose() {
        this.setState({open : false});
    }

    selectSingleDate(date){
        let { selectDate } = this.props;
        this.handleClose();
        selectDate(date);
    }

    render() {
        let { doubleMonth , locale , calenderDisplayDate , changeLocale , selectDate ,
            isSelected , removeDate , enabledFuture , todayHandler , singleIcon , customDisablePast , customDisableFuture , placeholder} = this.props;
        let futureDay =  moment()['subtract'](1, 'day');

        return (

            <div>
                <div style={{direction: 'rtl'}}>
                    <div className="bootrap-like-input">
                        <div onClick={this.handleOpen.bind(this)}>
                            { isSelected ?
                                locale === 'fa' ?
                                momentJalali(isSelected).format('jYYYY/jMM/jDD')
                                :
                                isSelected.format('YYYY/MM/DD')

                                :
                                <span className="datePickerPlaceholder">{placeholder}</span>
                            }
                        </div>
                        {isSelected &&
                            <div className="datePickerRemoveIcon" onClick={removeDate}>
                                <FontAwesomeIcon icon={faTimes}/>
                            </div>
                        }
                    </div>
                </div>

                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose.bind(this)}
                    aria-labelledby="form-dialog-title"
                    maxWidth='md'
                >
                    <DialogContent
                        classes={{
                            root: 'no-padding'
                        }}
                    >
                        <div className={["date-picker range-picker" , locale === 'fa' ? ' rtlClass' : 'ltrClass' ,
                            doubleMonth ? 'multi-date-picker-container' : 'single-date-picker-container'
                        ].join(" ")}>

                            {locale === 'fa' ?
                                <DatePicker
                                    placeholder
                                    singleIcon={singleIcon}
                                    type="single"
                                    doubleMonth={doubleMonth}
                                    myLocale={locale}
                                    displayYearActions={true}
                                    selectDate={this.selectSingleDate.bind(this)}
                                    changeLocale={changeLocale}
                                    isSelected={isSelected}
                                    Moment={momentJalali}
                                    weekdays={['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج']}
                                    isSelectable={day => {
                                        if (customDisableFuture) {
                                            return day.isBefore(customDisableFuture, 'day') || day.isSame(moment());
                                        } else if (customDisablePast) {
                                            return day.isAfter(customDisablePast, 'day') || day.isSame(moment());
                                        } else {
                                            if (enabledFuture) {
                                                return day.isAfter(futureDay, 'day') || day.isSame(moment());
                                            } else {
                                                return day.isBefore(futureDay, 'day') || day.isSame(moment());
                                            }
                                        }
                                    }}
                                    headerFormat={day => {
                                        return momentJalali(day).format('jMMMM jYYYY');
                                    }}
                                    UnitOfMonth="jmonth"
                                    FormatOfDay="jD"
                                    enabledFuture={enabledFuture}
                                    calenderDisplayDate={calenderDisplayDate}
                                />
                                :
                                <DatePicker
                                    singleIcon={singleIcon}
                                    type="single"
                                    doubleMonth={doubleMonth}
                                    myLocale={locale}
                                    displayYearActions={true}
                                    selectDate={this.selectSingleDate.bind(this)}
                                    changeLocale={changeLocale}
                                    isSelected={isSelected}
                                    Moment={moment}
                                    isSelectable={day => {
                                        if (customDisableFuture) {
                                            return day.isBefore(customDisableFuture, 'day') || day.isSame(moment());
                                        } else if (customDisablePast) {
                                            return day.isAfter(customDisablePast, 'day') || day.isSame(moment());
                                        } else {
                                            if (enabledFuture) {
                                                return day.isAfter(futureDay, 'day') || day.isSame(moment());
                                            } else {
                                                return day.isBefore(futureDay, 'day') || day.isSame(moment());
                                            }
                                        }
                                    }}
                                    enabledFuture={enabledFuture}
                                    calenderDisplayDate={calenderDisplayDate}
                                />
                            }

                            <div style={{ marginTop: 10 }} className="calender-botton-tools">
                                { locale === 'fa' ?
                                    <button className="locale-button orange-btn" onClick={changeLocale}>میلادی</button>
                                    :
                                    <button className="locale-button orange-btn" onClick={changeLocale}>جلالی</button>
                                }
                                <button className="locale-button red-btn"
                                        onClick={todayHandler}>امروز</button>
                            </div>

                        </div>
                    </DialogContent>

                </Dialog>
            </div>

        );
    }
}

JGDatePicker.defaultProps = {
    customDisablePast: null,
    placeholder: 'انتخاب تاربخ'
};

export default JGDatePicker;
