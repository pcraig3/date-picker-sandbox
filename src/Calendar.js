import React, { Component } from "react";
import DayPicker, { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
  }
  handleDayClick(day, { selected, disabled }) {
    if (disabled) {
      return;
    }

    const selectedDays = this.props.input.value || [];
    if (selected) {
      const selectedIndex = selectedDays.findIndex(selectedDay =>
        DateUtils.isSameDay(selectedDay, day)
      );
      selectedDays.splice(selectedIndex, 1);
    } else {
      selectedDays.push(day);
    }

    this.props.input.value = selectedDays;
    this.props.input.onChange(this.props.input.value);
  }

  render() {
    let { value, onBlur, onFocus, name } = this.props.input;

    return (
      <div className="calender-wrapper" name={name}>
        <DayPicker
          month={new Date(2018, 5)}
          fromMonth={new Date(2018, 5)}
          toMonth={new Date(2018, 6)}
          numberOfMonths={2}
          disabledDays={[{ daysOfWeek: [0, 1, 3, 4, 6] }]}
          onDayClick={this.handleDayClick}
          onFocus={() => onFocus(value)}
          onBlur={() => onBlur(value)}
        />
        <p>selected days:</p>
        <pre>{JSON.stringify(this.props.input.value)}</pre>
      </div>
    );
  }
}
