# Documentation
## Usage
There are three components in this repository.

### Calendar
Calendar is the core component of the other two. It generates all the dates for the month and some days for the previous and next month (those that are in the same week that the month starts or ends).

Using a core component allows for a more extensible functionality. Instead of having one component that gets a lot of props to be configured, here we have one component that can do a lot of stuff but if you only need a simple date picker, you can use the date picker component.

### DatePicker
DatePicker component is built upon calendar but only provides one simple thing; you don't have to manage the active month. In calendar component there is no mechanism to switch months and here we have it.

### RangePicker
RangePicker component is actually built upon DatePicker only to provide a range on it. It's a quite simple mechanism but to provide it out of the box, I've made it so selecting from and to dates and there events available.

## Props
Almost all the props are passed to Calendar core component. Although a few are caught in the way if you are using other components. Here is a table explaining all of them:

|Prop Name|Component|Description        |Type|
|---------|:-------:|-------------------|----|
|**displayDate**|All|The active month displayed in the calendar.|oneOfType ([**string**, **instanceOf(moment)**]) .isRequired|
|**changeDisplay**|All|The function called when attempting to change the active month.|**func** .isRequired|
|**isSelected**|All|This prop would cause a "selected" to be added to the selected day. String value should be a moment accepted string. Function value receives a moment object of the date that is being generated and should return a boolean.|oneOfType ([**func**, **string**, **instanceOf(moment)**]) .isRequired|
|**selectDate**|All|Function called when a date is selected. Conventionally should affect isSelected output.|**func** .isRequired|
|**isSelectable**|All|This prop would cause a "seem-disabled" class to be added to the disabled day. Disabled days are not selectable. Function receives a moment object of the date being generated and is expected to return a boolean. Defaults to true for every day.|**func**|
|**dayTemplate**|All|If this prop is passed the default day template is ignored. Function receives a moment of the date being generated and the onClick callback and is expected to return a JSX element. Defaults to this.generateDay function|**func**|
|**FormatOfDay**|All|If supplied would be passed to this.generateDay function as the format in which dates are displayed. Useful for changing the text or localization. For Jalali calendar pass 'jD'. Defaults to 'D'.|**string**|
|**UnitOfMonth**|All|In case you want to use a customized moment object (moment-jalaali or so on ) you may need to change this attribute so every month starts of the right day. For Jalali calendar pass 'jMonth'. Defaults to 'month'|**string**|
|**Moment**|All|Needed in case you want a localized moment object. Pass 'moment-jalaali' for example for Jalali calendar. Defaults to 'moment'|**any**|
|**weekdays**|All|An array of JSX elements or strings to be displayed for each weekday. Can be used for localization. For Jalali calendar pass ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج']. Defaults to ['M', 'T', 'W', 'T', 'F', 'S', 'S']|oneOf([**arrayOf(element)**, **arrayOf(string)**])|
|**headerFormat**|DatePicker|Function that renders header of the datepicker. Receive a unix timestamp and is expected to return a JSX valid element (including strings)|**func**|
|**fromDate**|RangePicker|Moment object or a valid moment accepted string that shows the selected date starting range.|oneOfType ([**string**, **instanceOf(moment)**]) .isRequired|
|**toDate**|RangetPicker|Moment object or a valid moment accepted string that shows the selected date ending range.|oneOfType ([**string**, **instanceOf(moment)**]) .isRequired|
