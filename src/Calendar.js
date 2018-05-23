import React, { Component } from "react";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";

const makeDays = () => {
  let date = new Date("Jun 1 2018 12:00:00");
  let startingMonth = date.getUTCMonth();
  let days = [date];

  while (date.getUTCMonth() === startingMonth) {
    date = new Date(date.getTime() + 1000 * 60 * 60 * 24);
    days.push(date);
  }

  return days;
};

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleSelectChange(e) {
    this.props.input.onChange(this.props.input.value);
    this.forceUpdate();
  }

  handleDayClick(day, { selected, disabled }, e) {
    if (disabled) {
      return;
    }

    const selectedDays = this.props.input.value || [];
    if (selected) {
      const selectedIndex = selectedDays.includes(day.toISOString());
      selectedDays.splice(selectedIndex, 1);
    } else {
      selectedDays.push(day.toISOString());
    }

    this.props.input.value = selectedDays;
    this.handleSelectChange(e);
  }

  render() {
    let { value, onBlur, onFocus, name } = this.props.input;
    value = value || [];

    return (
      <div className="calender-wrapper" name={name}>
        <div className="days-select">
          <label>Days</label>
          <select
            name={name}
            value={value}
            onChange={this.handleSelectChange}
            ref={selectContainer => {
              this.selectContainer = selectContainer;
            }}
            multiple
          >
            {makeDays().map((day, i) => {
              return (
                <option key={i} value={day.toISOString()}>
                  {day.toDateString()}
                </option>
              );
            })}
          </select>
        </div>
        <DayPicker
          month={new Date(2018, 5)}
          numberOfMonths={1}
          disabledDays={[{ daysOfWeek: [0, 6] }]}
          selectedDays={value ? value.map(date => new Date(date)) : []}
          onDayClick={this.handleDayClick}
          onBlur={() => onBlur(value)}
          onFocus={() => onFocus(value)}
        />
        <p>selected days:</p>
        <pre>{JSON.stringify(value)}</pre>
      </div>
    );
  }
}
