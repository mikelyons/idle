import React, { Component } from 'react';

class GoodMorningNight extends Component {

  render() {

    function timeOfDay() {
      const date = new Date()

      const hours = date.getHours()
      let timeOfDay
      
      if (hours < 12) {
        timeOfDay = "morning"
      } else if (hours >= 12 && hours < 17) {
        timeOfDay = "afternoon"
      } else if (hours >= 17 && hours < 20) {
        timeOfDay = "evening"
      } else if (hours >= 0 && hours < 1) {
        timeOfDay = "witching hour"
      } else {
        timeOfDay = "night"
      }

      return timeOfDay
    }



    return (
      <span>Good {timeOfDay()}!</span>
    );
  }
}

export default GoodMorningNight;
