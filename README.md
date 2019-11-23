# React JG Date Picker

Single and Range Date Selector component built to be functional in jalali and gregorian at the same time.
### Usage

```bash
$ npm install react-jg-date-picker
# OR
$ yarn add react-jg-date-picker
```

```javascript
// Date and range import
import {JGDatePicker , JGRangePicker} from 'react-jg-date-picker';
```
Dont forger to import the css file
```javascript
// Date and range import
import 'react-jg-date-picker/css/App.css';
```

#### Jalali and Gregorian calender

Default calendar is jalali based on `moment-jalaali`, in both date and range componante
there is a button to switch between jalali and gregorian calender based on `moment`.
Also this package used the greate work of `react-jdate-picker` as its calender core.

For example for Jalali calendar you need to do something like
this:


### Example
```javascript
import {JGDatePicker , JGRangePicker} from 'react-jg-date-picker';
import 'react-jg-date-picker/css/App.css';
import moment from 'moment';


class Main extends Component {

    constructor(props) {
        super(props);

        this.state = {
            locale: 'fa',
            selectedDate: moment(),
            fromDate: moment(),
            toDate: moment(),
        };
    }

    selectDate = (date) => {
        this.setState({ selectedDate: date });
    };

    selectRange = (fromDate, toDate) => {
        this.setState({ fromDate, toDate });
    };

    removeDate = () => {
        this.setState({ selectedDate: null });
    };

    removeDates = () => {
        this.setState({ fromDate: null , toDate: null});
    };

    changeTheLocale(){
        let { locale } = this.state;
        if (locale === 'fa') {
            this.setState({locale: 'en'})
        } else {
            this.setState({locale: 'fa'})
        }
    };

    render() {
        let { locale , selectedDate , fromDate , toDate} = this.state;
        return (
            <div className="App">

                <div>

                    <JGDatePicker
                        locale={locale}
                        usePersianDigits={false}
                        doubleMonth={false}
                        isSelected={selectedDate}
                        changeLocale={this.changeTheLocale.bind(this)}
                        selectDate={this.selectDate.bind(this)}
                        removeDate={this.removeDate.bind(this)}
                    />

                    <hr/>

                    <JGRangePicker
                        locale={locale}
                        usePersianDigits={false}
                        doubleMonth={true}
                        fromDate={fromDate}
                        toDate={toDate}
                        changeLocale={this.changeTheLocale.bind(this)}
                        selectRange={this.selectRange.bind(this)}
                        removeDate={this.removeDates.bind(this)}
                    />

                </div>
            </div>
        );
    }
}

export default Main;
```

You can also pass null values to default states. 

