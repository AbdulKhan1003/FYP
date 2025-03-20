import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RestaurantsContext } from './orderUP/AllRestaurants/RestaurantsContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RestaurantsContext>
        <App />
    </RestaurantsContext>
);

reportWebVitals();
