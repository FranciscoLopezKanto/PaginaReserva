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
    new Date("2023-06-10")
    // Agrega aquí las fechas reservadas que desees
  ];

  const isDateReserved = (date) => {
    // Verifica si la fecha está en el array de fechas reservadas
    return reservedDates.some(reservedDate =>
      reservedDate.getDate() === date.getDate() &&
      reservedDate.getMonth() === date.getMonth() &&
      reservedDate.getFullYear() === date.getFullYear()
    );
  };

  const handleDateChange = (date) => {
    if (isDateReserved(date)) {
      // La fecha seleccionada está reservada, no se actualiza el estado
      return;
    }
    setSelectedDate(date);
  };

  const filterDates = (date) => {
    // Filtra las fechas reservadas
    return !isDateReserved(date);
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
            filterDate={filterDates}
          />
        </div>
        {selectedDate && (
          <p>Selected Date: {selectedDate.toLocaleDateString()}</p>
        )}
      </div>
    </div>
  );
}

export default App;
