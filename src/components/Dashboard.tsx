
import React, { useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import WeatherWidget from './WeatherWidget';
import styled from 'styled-components';

// Example cities
const initialCities = ['New York', 'London', 'Tokyo', 'Paris'];

// Styled components for centering the input and button
const DashboardWrapper = styled.div`
  background: linear-gradient(to right, #141e30, #243b55);  /* Dark gradient background 
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  color: white;
`;

const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const StyledInput = styled(TextField)`
  background-color: white;
  border-radius: 4px;
  margin-right: 10px;

  .MuiInputBase-input {
    color: black;  /* Black text inside the input 
  }
`;

const StyledButton = styled(Button)`
  background-color: #ff6f61;
  color: white;

  &:hover {
    background-color: #ff4c3b;
  }
`;

const Dashboard: React.FC = () => {
  const [selectedCities, setSelectedCities] = useState<string[]>(initialCities);
  const [newCity, setNewCity] = useState<string>('');

  const handleAddCity = () => {
    if (newCity && !selectedCities.includes(newCity)) {
      setSelectedCities([...selectedCities, newCity]);
      setNewCity('');  // Clear the input after adding a city
    }
  };

  const removeCity = (city: string) => {
    setSelectedCities(selectedCities.filter((c) => c !== city));
  };

  return (
    <DashboardWrapper>
      <FormWrapper>
        <StyledInput
          label="Enter City"
          variant="outlined"
          value={newCity}
          onChange={(e) => setNewCity(e.target.value)}
        />
        <StyledButton variant="contained" onClick={handleAddCity}>
          Add City
        </StyledButton>
      </FormWrapper>

      <Grid container spacing={3} justifyContent="center">
        {selectedCities.map((city) => (
          <Grid item key={city}>
            <WeatherWidget city={city} onRemove={() => removeCity(city)} />
          </Grid>
        ))}
      </Grid>
    </DashboardWrapper>
  );
};

export default Dashboard;


