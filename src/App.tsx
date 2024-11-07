import React, { useState } from 'react';
import './App.css';
import { Weather } from './Weather';


const App = () => {

    const [city, setCity] = useState<string>('')
    const [error, setError] = useState<null | string>(null)
    const [weather, setWeather] = useState<{ temp: number, description: string, speed: number, humidity: number } | null>(null)

    const fetchWeather = (): void => {
        // const city: string = 'Minsk';
        const apiKey: string = 'd72abc864d1467d07bbd63d6f8a413e1';
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&appid=${apiKey}&units=metric`)
            .then(response => response.json())
            .then(json => {
                if (json.cod === "404") {
                    setError('Город не найден'); // Устонавливается ошибка, если город не найден
                } else {
                    console.log(json)
                    setWeather({
                        temp: Math.round(json.main.temp),
                        description: json.weather[0].description,
                        speed: Math.round(json.wind.speed),
                        humidity: json.main.humidity

                    });
                    setError(null); // Сбрасываем ошибку, если запрос успешен 
                }
            })
            .catch(error => {
                console.error("Ошибка", error);
                setError("Error") // Ошибка на случай других проблем
            })
    }
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        if (event.key === 'Enter') {
            fetchWeather();
        }
    }


    return (
        <div className="App">
            <h1>Weather App</h1>
            <div className='Enter'>
                <input type="text" placeholder='Введите город'
                    onChange={(e) => setCity(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
            </div>
            <button onClick={fetchWeather}>Get weather</button>
            {weather && <Weather
                temp={weather.temp}
                description={weather.description}
                speed={weather.speed}
                humidity={weather.humidity}
            />}
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Отображаем ошибку */}

        </div>

    );
}

export default App

