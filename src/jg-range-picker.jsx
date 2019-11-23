import React, { Component } from 'react';
import moment from 'moment';
import momentJalali from 'moment-jalaali';
import RangePicker from './range-picker';
import {faArrowLeft, faArrowRight, faPlane} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

class JGRangePicker extends Component {

    constructor(props){
        super(props);

        this.state = {
            open: false
        }

        if (this.props.usePersianDigits) {
            momentJalali.loadPersian({dialect: 'persian-modern' ,usePersianDigits: true});
        } else {
            momentJalali.loadPersian({dialect: 'persian-modern' ,usePersianDigits: false});
        }
    }

    handleOpen() {
        this.setState({open : true});
    }

    handleClose() {
        this.setState({open : false});
    }

    render() {
        let { doubleMonth , locale , changeLocale , selectRange , fromDate , toDate , removeDate ,
            calenderDisplayDate , startIcon , endIcon , firstPlaceholder , secondPlaceholder , hotel} = this.props;
        let futureDay =  moment()['subtract'](1, 'day');

        return (
            <div style={{direction: 'rtl'}}>
                <div className="bootrap-like-input-for-range">
                    <div onClick={this.handleOpen.bind(this)} style={{display: 'flex' , justifyContent: 'space-evenly', alignItems: 'center'}}>
                        <div>
                            { fromDate ?
                                locale === 'fa' ?
                                    momentJalali(fromDate).format('jYYYY/jMM/jDD')
                                    :
                                    fromDate.format('YYYY/MM/DD')

                                :
                                <div className="datePickerPlaceholder" style={{minWidth: 130}}>{firstPlaceholder}</div>
                            }
                        </div>
                        <div className="datePickerPlaceholder">الی</div>
                        <div>
                            { toDate ?

                                locale === 'fa' ?
                                    momentJalali(toDate).format('jYYYY/jMM/jDD')
                                    :
                                    toDate.format('YYYY/MM/DD')

                                :
                                <div className="datePickerPlaceholder" style={{minWidth: 130}}>{secondPlaceholder}</div>
                            }
                        </div>
                    </div>
                    {(fromDate && toDate) &&
                        <div className="datePickerRemoveIcon" onClick={removeDate}>
                            <FontAwesomeIcon icon={faTimes}/>
                        </div>
                    }
                </div>

                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose.bind(this)}
                    aria-labelledby="form-dialog-title"
                    maxWidth='md'
                >
                    <DialogContent classes={{ root: 'no-padding' }}>
                        <div>
                            { locale === 'fa' ?
                                <RangePicker
                                    hotel={hotel}
                                    startIcon={startIcon}
                                    endIcon={endIcon}
                                    type="range"
                                    doubleMonth={doubleMonth}
                                    myLocale={locale}
                                    displayYearActions={true}
                                    weekdays={['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج']}
                                    fromDate={fromDate}
                                    toDate={toDate}
                                    selectDate={selectRange}
                                    Moment={momentJalali}
                                    isSelectable={day => {
                                        return day.isAfter(futureDay, 'day') || day.isSame(moment());
                                    }}
                                    headerFormat={day => {
                                        return momentJalali(day).format('jMMMM jYYYY');
                                    }}
                                    UnitOfMonth="jmonth"
                                    FormatOfDay="jD"
                                    changeLocale={changeLocale}
                                    handleClose={this.handleClose.bind(this)}
                                    calenderDisplayDate={calenderDisplayDate}
                                />
                                :
                                <RangePicker
                                    hotel={hotel}
                                    startIcon={startIcon}
                                    endIcon={endIcon}
                                    type="range"
                                    doubleMonth={doubleMonth}
                                    myLocale={locale}
                                    displayYearActions={true}
                                    fromDate={fromDate}
                                    toDate={toDate}
                                    selectDate={selectRange}
                                    changeLocale={changeLocale}
                                    isSelectable={day => {
                                        return day.isAfter(futureDay, 'day') || day.isSame(moment());
                                    }}
                                    handleClose={this.handleClose.bind(this)}
                                    calenderDisplayDate={calenderDisplayDate}
                                />
                            }
                        </div>
                    </DialogContent>

                </Dialog>
            </div>
        );
    }
}

JGRangePicker.defaultProps = {
    hotel: false ,
    startIcon: null,
    endIcon: null,
    firstPlaceholder: 'تاریخ شروع',
    secondPlaceholder: 'تاریخ پایان'
};

export default JGRangePicker;
