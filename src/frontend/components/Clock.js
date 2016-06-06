
import React from "react";

const rotateHour = (time) => (time % 12) / 12 * 360;
const rotateMinute = (time) => (time / 60) * 360;

const Clock = React.createClass({
  render() {
    const { time } = this.props;

    const hours = time.getHours();
    const minutes = time.getMinutes();

    const hourDegrees = rotateHour(hours);
    const minuteDegrees = rotateMinute(minutes);

    return (
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" dataIcon="clock" width="64px" height="64px" className="iconic iconic-clock" viewBox="0 0 128 128">
        <g className="iconic-metadata">
          <title>Clock</title>
        </g>
        <g dataWidth="128" dataHeight="128" className="iconic-container iconic-lg" display="inline">
          <circle stroke="#000" strokeWidth="8" strokeMiterlimit="10" cx="64" cy="64" r="60" className="iconic-clock-body iconic-property-stroke" fill="none" />
          <circle cx="64" cy="14" r="2" className="iconic-clock-hour iconic-clock-hour-12 iconic-property-fill" />
          <circle cx="39" cy="20.7" r="2" className="iconic-clock-hour iconic-clock-hour-11 iconic-property-fill" />
          <circle cx="20.7" cy="39" r="2" className="iconic-clock-hour iconic-clock-hour-10 iconic-property-fill" />
          <circle cx="14" cy="64" r="2" className="iconic-clock-hour iconic-clock-hour-9 iconic-property-fill" />
          <circle cx="20.7" cy="89" r="2" className="iconic-clock-hour iconic-clock-hour-8 iconic-property-fill" />
          <circle cx="39" cy="107.3" r="2" className="iconic-clock-hour iconic-clock-hour-7 iconic-property-fill" />
          <circle cx="64" cy="114" r="2" className="iconic-clock-hour iconic-clock-hour-6 iconic-property-fill" />
          <circle cx="89" cy="107.3" r="2" className="iconic-clock-hour iconic-clock-hour-5 iconic-property-fill" />
          <circle cx="107.3" cy="89" r="2" className="iconic-clock-hour iconic-clock-hour-4 iconic-property-fill" />
          <circle cx="114" cy="64" r="2" className="iconic-clock-hour iconic-clock-hour-3 iconic-property-fill" />
          <circle cx="107.3" cy="39" r="2" className="iconic-clock-hour iconic-clock-hour-2 iconic-property-fill" />
          <circle cx="89" cy="20.7" r="2" className="iconic-clock-hour iconic-clock-hour-1 iconic-property-fill" />
          <path stroke="#000"
                strokeWidth="4"
                strokeLinecap="square"
                className="iconic-clock-hand iconic-clock-hand-minute iconic-property-stroke"
                d="M64 26v37"
                style={{transform: `rotate(${minuteDegrees}deg)`}}
                fill="none" />
          <path stroke="#000"
                strokeWidth="4"
                strokeLinecap="square"
                className="iconic-clock-hand iconic-clock-hand-hour iconic-property-stroke"
                d="M65 65l23 13"
                style={{transform: `rotate(${hourDegrees - 120}deg)`}}
                fill="none" />
          <circle cx="64" cy="64" r="2" className="iconic-clock-axis iconic-property-fill" />
        </g>
      </svg>
    );
  }
});

export default Clock;