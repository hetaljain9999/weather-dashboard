
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, IconButton, Box, TextField, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { useTempUnit } from '../context/TempUnitContext';
import styled from 'styled-components';

interface WeatherData {
  temperature: number;
  condition: string;
  icon: string;
}

interface WeatherWidgetProps {
  city: string;    // Pass city as a prop
  onRemove: () => void;
}

const WeatherCard = styled(Card)`
  border-radius: 15px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  background: linear-gradient(135deg, #1e3c72, #2a5298);
  margin: 20px;
  padding: 15px;
  max-width: 300px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const Temperature = styled(Typography)`
  font-size: 2rem;
  font-weight: bold;
  color: #007BFF;
`;

const WeatherIcon = styled.img`
  width: 80px;
  height: 80px;
  margin-top: 10px;
`;

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ city, onRemove }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const { isCelsius } = useTempUnit();

  useEffect(() => {
    if (city) {
      // Fetch weather data dynamically based on city prop
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5aa63bd137475dd11641422c33f44fd3&units=metric`)
        .then((response) => {
          const data = response.data;
          setWeather({
            temperature: data.main.temp,
            condition: data.weather[0].main,
            icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
          });
        })
        .catch((error) => console.error('Error fetching weather data:', error));
    }
  }, [city]);  // Re-run useEffect when the city prop changes

  if (!weather) {
    return <Typography>Loading...</Typography>;
  }

  // Calculate the temperature based on the selected unit (Celsius or Fahrenheit)
  const temperature = isCelsius ? weather.temperature : (weather.temperature * 9) / 5 + 32;
  const unit = isCelsius ? '°C' : '°F';

  return (
    <WeatherCard>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" style={{ fontWeight: '600' }}>
            {city}
          </Typography>
          <IconButton onClick={onRemove}>
            <DeleteIcon style={{ color: '#FF6347' }} />
          </IconButton>
        </Box>
        <Temperature variant="h6">
          {temperature.toFixed(1)} {unit}  {/* Display the temperature with the correct unit*/ }
        </Temperature>
        <Typography variant="body1" style={{ color: '#555' }}>
          {weather.condition}
        </Typography>
        <Box display="flex" justifyContent="center">
          <WeatherIcon src={weather.icon} alt="Weather icon" />
        </Box>
      </CardContent>
    </WeatherCard>
  );
};

export default WeatherWidget;


