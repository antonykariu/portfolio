import React, { useEffect, useState } from "react";
import moment from "moment";
import describeArc from "./svgCircle";

import "./countdown.scss";

const Countdown = (props) => {
  const defaultTime = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };
  const [state, setState] = useState(defaultTime);

  useEffect(() => {
    setInterval(() => {
      const { timeTillDate, timeFormat } = props;
      const then = moment(timeTillDate, timeFormat);
      const now = moment();
      const countdown = moment(then - now);
      const days = countdown.format("D");
      const hours = countdown.format("HH");
      const minutes = countdown.format("mm");
      const seconds = countdown.format("ss");
      setState({ days, hours, minutes, seconds });
    }, 5000);
  });

  const mapNumber = (number, in_min, in_max, out_min, out_max) => {
    return (
      ((number - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
    );
  };

  const daysRadius = mapNumber(state.days, 30, 0, 0, 360);
  const hoursRadius = mapNumber(state.hours, 24, 0, 0, 360);
  const minutesRadius = mapNumber(state.minutes, 60, 0, 0, 360);
  const secondsRadius = mapNumber(state.seconds, 60, 0, 0, 360);

  if (!state.seconds) return null;

  const SvgCircle = ({ radius }) => {
    return (
      <svg className="countdown-svg">
        <path
          fill="none"
          stroke="#dadada"
          strokeWidth="4"
          d={describeArc(50, 50, 48, 0, radius)}
        />
      </svg>
    );
  };

  return (
    <div className="countdown-wrapper">
      <div className="overlay">
        <h1>Coming soon!</h1>
        {state.days && (
          <div className="countdown-item">
            <SvgCircle radius={daysRadius} />
            {state.days}
            <span>days</span>
          </div>
        )}
        {state.hours && (
          <div className="countdown-item">
            <SvgCircle radius={hoursRadius} />
            {state.hours}
            <span>hours</span>
          </div>
        )}
        {state.minutes && (
          <div className="countdown-item">
            <SvgCircle radius={minutesRadius} />
            {state.minutes}
            <span>minutes</span>
          </div>
        )}
        {state.seconds && (
          <div className="countdown-item">
            <SvgCircle radius={secondsRadius} />
            {state.seconds}
            <span>seconds</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Countdown;
