import React, { Component } from "react";
import DayPicker, { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.state = {
      selectedDays: this.props.input.value || []
    };
    this.props.input.value = this.state.selectedDays;
  }
  handleDayClick(day, { selected, disabled }) {
    if (disabled) {
      return;
    }

    const { selectedDays } = this.state;
    if (selected) {
      const selectedIndex = selectedDays.findIndex(selectedDay =>
        DateUtils.isSameDay(selectedDay, day)
      );
      selectedDays.splice(selectedIndex, 1);
    } else {
      selectedDays.push(day);
    }

    this.setState({ selectedDays });
    this.props.input.value = this.state.selectedDays;
    this.props.input.onChange(this.props.input.value);
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
