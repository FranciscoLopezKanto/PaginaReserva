import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';

function App() {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Consulta la disponiblidad</h1>
        <div className="date-picker-container">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
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


