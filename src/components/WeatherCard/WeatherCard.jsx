import cloudy from "../../assets/cloudy.png";

function WeatherCard() {
  return (
    <section className="weather-card">
      <p className="weather-card__temp">75 &deg;</p>
      <img src={cloudy} alt="cloudy" className="weather-card__image" />
    </section>
  );
}
export default WeatherCard;
