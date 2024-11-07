type Props = {
    temp:number,
    description:string,
    speed:number,
    humidity:number
}

export const Weather = ({temp,description,speed,humidity}:Props) => {
    return(
        <div className="weather">
            <p>Температура: {temp}°C</p>
            <p>Облачность: {description}</p>
            <p>Скорость ветра: {speed} м/c</p>
            <p>Влажность: {humidity} %</p>
        </div>
    );
};