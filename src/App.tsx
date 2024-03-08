import { useEffect, useState } from 'react';
import './assets/App.scss';
import GameBoard4InARow from './components/GameBoard4InARow';

interface Forecast {
    date: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}

function App() {
    // const [forecasts, setForecasts] = useState<Forecast[]>();

    // useEffect(() => {
    //     populateWeatherData();
    // }, []);

    //     const contents = forecasts === undefined
    //     ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
    //     : <table className="table table-striped" aria-labelledby="tabelLabel">
    //         <thead>
    //             <tr>
    //                 <th>Date</th>
    //                 <th>Temp. (C)</th>
    //                 <th>Temp. (F)</th>
    //                 <th>Summary</th>
    //             </tr>
    //         </thead>
    //         <tbody>
    //             {forecasts.map(forecast =>
    //                 <tr key={forecast.date}>
    //                     <td>{forecast.date}</td>
    //                     <td>{forecast.temperatureC}</td>
    //                     <td>{forecast.temperatureF}</td>
    //                     <td>{forecast.summary}</td>
    //                 </tr>
    //             )}
    //         </tbody>
    //     </table>;

    return (
        <GameBoard4InARow />
        // <div>
            // {/* <h1 id="tabelLabel">Weather forecast</h1> */}
            // {/* <p>This component demonstrates fetching data from the server.</p> */}
            // {/* {contents} */}
        // </div>
    );

    async function populateWeatherData() {
        // const response = await fetch('weatherforecast');
        // const data = await response.json();
        // setForecasts(data);
    }
}

export default App;