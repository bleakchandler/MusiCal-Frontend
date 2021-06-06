import React from "react";

function calendarHeader({ value, setValue }) {
  function currentMonth() {
    return value.format("MMMM");
  }

  function currentYear() {
    return value.format("YYYY");
  }

  function previousMonth() {
    return value.clone().subtract(1, "month");
  }

  function nextMonth() {
    return value.clone().add(1, "month");
  }

  // function thisMonth() {
  //   return value.isSame(new Date(), "month");
  // }

  return (
    <div className="header">
      <div className="previous" onClick={() => setValue(previousMonth())}>
        {String.fromCharCode(8678)}
      </div>

      <div className="current">
        {currentMonth()} {currentYear()}
      </div>
      <div className="next" onClick={() => setValue(nextMonth())}>
        {String.fromCharCode(8680)}
      </div>
    </div>
  );
}

export default calendarHeader;
