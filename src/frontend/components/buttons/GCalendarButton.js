import React from 'react';

const GoogleCalendarButton = () => {
  const urlPrefix = "https://calendar.google.com/calendar/embed?src=";
  const googleCalendarId = GOOGLECALENDAR_ID;

  return (
    <a href={urlPrefix + googleCalendarId} className="main-follow-button calendar-btn" target="_blank" rel="noopener noreferrer" />
  );
};

export default GoogleCalendarButton;
