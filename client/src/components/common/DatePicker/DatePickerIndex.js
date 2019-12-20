import React, { Component } from 'react';
import DatePicker2 from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment';


class DatePicker extends Component {
  render() {
    return (
      // <input type="date" 
      //   className={this.props.className + " myInput"} 
      //   placeholder={this.props.placeholder} 
      //   onChange={this.props.onChange} 
      //   value={this.props.value}
      // />
        <DatePicker2
          dateFormat="dd mmm yyyy"
          className={this.props.className + " myInput"} 
          selected={moment(this.props.value).toDate()}
          onChange={this.props.onChange} 
          readOnly={true}
        />
    );
  }
}

export default DatePicker;
