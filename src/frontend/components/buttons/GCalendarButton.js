import React from 'react';

const GoogleCalendarButton = () => {
  const urlPrefix = "https://calendar.google.com/calendar/embed?src=";
  const googleCalendarId = "qvrnclm8e6ndipoki2hh6rtg1k@group.calendar.google.com&ctz=Europe/Stockholm#main_7";

  return (
    <a href={urlPrefix + googleCalendarId} className="main-follow-button calendar-btn" target="_blank" rel="noopener noreferrer" />
  );
};

export default GoogleCalendarButton;
