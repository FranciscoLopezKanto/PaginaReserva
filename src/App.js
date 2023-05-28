import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';

function App() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 2);

  const reservedDates = [
    new Date("2023-05-30"),
    new Date("2023-06-05"),
    new Date("2023-06-10")
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
    if (isDateReserved(date)) {
      // La fecha seleccionada está reservada, no se actualiza el estado
      return;
    }
    setSelectedDate(date);
  };

  const handleServiceChange = (service) => {
    setSelectedService(service);
  };

  const filterDates = (date) => {
    // Filtra las fechas reservadas
    return !isDateReserved(date);
  };

  const renderTicket = () => {
    if (!selectedDate || !selectedService) {
      return null;
    }
    if (isDateReserved(selectedDate)) {
      return <div className="ticket unavailable">No disponible</div>;
    }
    return (
      <div className="ticket available">
        <p>Fecha seleccionada: {selectedDate.toLocaleDateString()}</p>
        <p>Servicio seleccionado: {selectedService}</p>
      </div>
    );
  };

  return (
    <div className="App">
      <div className="container">
        <h1>CONSULTA DISPONIBILIDAD</h1>
        <div className="date-picker-container">
          <div className="sidebar">
            <h2>Lista de servicios</h2>
            <ul>
              <li>
                <button onClick={() => handleServiceChange('TOUR ASTRONÓMICO')}>
                TOUR ASTRONÓMICO
                </button>
              </li>
              <li>
                <button onClick={() => handleServiceChange('TOUR EN VEHÍCULO «VICUÑA')}>
                TOUR EN VEHÍCULO «ALREDEDORES DE VICUÑA»
                </button>
              </li>
              <li>
                <button onClick={() => handleServiceChange('ARRIENDO DE BICICLETAS')}>
                ARRIENDO DE BICICLETAS
                </button>
              </li>
            </ul>
          </div>
          <div className="date-picker-wrapper">
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
              minDate={minDate}
              filterDate={filterDates}
            />
            {renderTicket()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

