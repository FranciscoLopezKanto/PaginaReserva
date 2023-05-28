import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';

function App() {
  const [selectedDate, setSelectedDate] = useState(null);
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 2);

  const reservedDates = [
    new Date("2023-05-30"),
    new Date("2023-06-05"),
    new Date("2023-06-19"),
    new Date("2023-06-12"),
    new Date("2023-06-16")
    // Agrega aquí las fechas reservadas que desees
  ];

  const isDateReserved = (date) => {
    return reservedDates.some(
      (reservedDate) =>
        reservedDate.getDate() === date.getDate() &&
        reservedDate.getMonth() === date.getMonth() &&
        reservedDate.getFullYear() === date.getFullYear()
    );
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const renderTicket = () => {
    if (!selectedDate) {
      return null;
    }
    if (isDateReserved(selectedDate)) {
      return <div className="ticket unavailable">No disponible</div>;
    }
    return <div className="ticket available">Disponible</div>;
  };

  const CustomDay = ({ day, date }) => {
    const isReserved = isDateReserved(date);

    return (
      <div className={`custom-day ${isReserved ? 'reserved' : ''}`}>
        <span>{day}</span>
        {isReserved && <span className="tooltip">No disponible</span>}
      </div>
    );
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Date Picker Example</h1>
        <div className="date-picker-container">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            minDate={minDate}
            customDayClassName={() => 'custom-day'}
            dayClassName={() => 'normal-day'}
            renderDayContents={(day, date) => <CustomDay day={day} date={date} />}
          />
          {renderTicket()}
        </div>
      </div>
    </div>
  );
}

export default App;
