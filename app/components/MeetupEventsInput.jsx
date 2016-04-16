import React from 'react';
import update from 'react-addons-update';
import _ from 'lodash';

export default class MeetupEventsInput extends React.Component {
  static propTypes = {
    loading: React.PropTypes.bool.isRequired,
    events: React.PropTypes.array.isRequired,
    getMeetupResponses: React.PropTypes.func.isRequired
  };

  state = {
    selectedEvents: []
  };

  submitForm = (event) => {
    event.preventDefault();
    const { selectedEvents } = this.state;

    if (selectedEvents.length > 0) {
      this.props.getMeetupResponses(selectedEvents);
    } else {
      // eslint-disable-next-line
      alert('Please select at least one event');
    }
  }

  // Add or remove the ID of the events from the state
  // when checked or unchecked.
  onChange = (event) => {
    const { value, checked } = event.target;
    const { selectedEvents } = this.state;

    if (checked) {
      this.setState({
        selectedEvents: update(selectedEvents, {$push: [value]})
      });
    } else {
      const i = _.indexOf(selectedEvents, value);
      this.setState({
        selectedEvents: update(selectedEvents, {$splice: [[i, 1]]})
      });
    }
  }

  render() {
    const { events, loading } = this.props;

    return (
      <form className="form"
            onSubmit={this.submitForm}>

        <label htmlForm="events"
               className="label">
          Select the events you which to view responses for
        </label>

        { events.map((event, i) =>
          <span key={i}>
            <input type="checkbox"
                   name="events"
                   onChange={this.onChange}
                   value={event.id} />
            {event.name} | {event.time}<br />
          </span>
        ) }

        <button className="button">
          { loading && 'Loading...' }
          { !loading && 'View responses' }
        </button>
      </form>
    );
  }
}
