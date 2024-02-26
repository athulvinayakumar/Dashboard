import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Cell, Pie } from 'recharts';

function Dashboard() {
  const [data, setData] = useState({
    coord: { lat:0, lon: 0 },
    main: { temp: 0, humidity: 0 },
    wind: { speed: 0 },
    weather: [{ description: "" }]
  })
  const [cityName, setCityName] = useState('');

  const weatherData = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=99debba57133a8f6d4e86bebf80f3fff`);
      setData(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  const currentDate = new Date();
  let currentHour = currentDate.getHours() % 12;
  const currentMinute = currentDate.getMinutes();
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDayIndex = currentDate.getDay();
  const currentDay = daysOfWeek[currentDayIndex];

  const latitude = data.coord?.lat;
  const longitude = data.coord?.lon;
  const temperature = data.main?.temp;
  const humidity = data.main?.humidity;
  const windSpeed = data.wind?.speed;
  const weatherDescription = data.weather?.[0]?.description;

  const pieData = [
    { name: 'Latitude', value: latitude },
    { name: 'Longitude', value: longitude },
    { name: 'Humidity', value: humidity },
  ];

  const barChartData = [
    { name: 'Temperature', value: temperature },
    { name: 'Humidity', value: humidity },
    { name: 'Wind Speed', value: windSpeed },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <>
      <Header />
      <div className='d-flex'>
        <div className='d-flex flex-column bg-primary' style={{ width: '250px', height: '88vh' }}>
          <Link className='mt-5 ms-3' style={{ textDecoration: 'none', color: 'white' }} to={'/dashboard'}><h5> <i className="fa-solid fa-bars me-2"></i>DashBoard</h5></Link>
          <Link className='mt-3 ms-3' style={{ textDecoration: 'none', color: 'white' }} to={'/'}><h5><i className="fa-solid fa-user me-2"></i>Settings</h5></Link>
        </div>
        <div className='p-3 w-100'>
          <h3 className='text-primary'>Dashboard</h3>
          <div className='w-100 d-flex justify-content-center align-items-center mt-3'>
            <form className="d-flex ms-md-5 ms-lg-5 me-md-3 me-lg-5 w-50">
              <input
                className="border border-black form-control me-2 flex-grow-1"
                type="search" value={cityName} onChange={(e) => setCityName(e.target.value)} placeholder="Search by city"
                aria-label="Search" style={{ color: '#211C6A' }}
              />
              <button className="btn btn-primary" onClick={(e) => weatherData(e)}>
                Search
              </button>
            </form>
          </div>

          <div className="container mt-5">
            <div className="row">
              <div className="col-md-6">
                <h5>Bar Chart</h5>
                <BarChart
                  width={600}
                  height={400}
                  data={barChartData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </div>
              <div className="col-md-6">
                <h5>Pie Chart</h5>
                <PieChart width={600} height={400}>
                  <Pie
                    data={pieData}
                    cx={200}
                    cy={200}
                    labelLine={false}
                    outerRadius={70}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
