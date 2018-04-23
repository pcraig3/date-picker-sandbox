import React, { Component } from "react";
import { Form, Field } from "react-final-form";
import Calendar from "./Calendar";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const onSubmit = async values => {
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>React Final Form including DayPicker</h1>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, pristine, reset, submitting, values }) => {
            return (
              <form onSubmit={handleSubmit}>
                <div>
                  <label>Name field</label>
                  <Field
                    name="username"
                    component="input"
                    placeholder="Username"
                  />
                </div>
                <div>
                  <label>Calendar Field</label>
                  <Field name="calendar" component={Calendar} />
                </div>
                <div className="buttons">
                  <button type="submit" disabled={submitting || pristine}>
                    Submit
                  </button>
                </div>
                <p>form values</p>
                <pre>{JSON.stringify(values, 0, 2)}</pre>
              </form>
            );
          }}
        />
      </div>
    );
  }
}

export default App;
