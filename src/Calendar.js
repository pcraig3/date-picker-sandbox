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

    let { value, onChange } = this.props.input;

    const selectedDays = value || [];
    if (selected) {
      const selectedIndex = selectedDays.findIndex(selectedDay =>
        DateUtils.isSameDay(selectedDay, day)
      );
      selectedDays.splice(selectedIndex, 1);
    } else {
      selectedDays.push(day);
    }

    value = selectedDays;
    onChange(value);
    this.forceUpdate();
  }

  render() {
    let { value, onBlur, onFocus, name } = this.props.input;

    return (
      <div className="calender-wrapper" name={name}>
        <DayPicker
          month={new Date(2018, 5)}
          numberOfMonths={1}
          disabledDays={[{ daysOfWeek: [0, 6] }]}
          selectedDays={value || []}
          onDayClick={this.handleDayClick}
          onFocus={() => onFocus(value)}
          onBlur={() => onBlur(value)}
        />
        <p>selected days:</p>
        <pre>{JSON.stringify(value)}</pre>
      </div>
    );
  }
}
