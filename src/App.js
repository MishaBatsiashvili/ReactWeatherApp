import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import * as axios from "axios";
import {getWeather} from './api';

import SearchForm from './components/SearchForm';
import WeatherData from "./components/WeatherData";

import LoaderPath from './images/loader.gif';

const App = (props) => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const inputRef = useRef(null);

    useEffect(() => {
        const cityInput = props.match.params.city;
        if(!cityInput){
            setIsLoading(false);
            return;
        }

        /*
        this boolean is used to track if getWeather request has been canceled or not
        if we make a new request before the first request finishes then right before the next
        render's useEffect previous useEffect's cleanup method will execute and change the didCancel of the previous useEffect
        to false thus disregarding the results from the first getWeather request
        */
        let didCancel = false;


        //this two state changes are batched because they are inside
        // react-specific handler and not wrapped with async function
        setCity(cityInput);
        /*
        make this state slice true to trigger loader to show up
        then when the weather data has been received and set to state, change
        this slice to false to hide the loader
        */
        setIsLoading(true)
        setErrorMessage(null);

        getWeather(cityInput)
            .then(res => {
                if (!didCancel) {
                    //this check is to identify if the server returned us error
                    if(res.data && res.data.hasOwnProperty('message')){
                        setErrorMessage(res.data.message);
                        setWeather(null);
                    } else {
                        //this two state changes will not be batched and cause two re-renders
                        //because they are inside a promise
                        setWeather(res);
                    }
                    setIsLoading(false);
                }
            });

        return () => {
            didCancel = true;
        }
    }, [props.match.params.city]);

    const onCityChangedHandler = (e) => {
        setCity(e.target.value);
    }

    const onCitySubmittedHandler = (e) => {
        e.preventDefault();
        inputRef.current.blur();
        props.history.push(`/${city}`);
    }

    return (
        <div className={'main-wrapper'}>
            <div>
            <SearchForm
                city={city}
                inputRef={inputRef}
                onCitySubmittedHandler={onCitySubmittedHandler}
                onCityChangedHandler={onCityChangedHandler}/>

            {!isLoading
                ? <WeatherData errorMessage={errorMessage} weather={weather} />
                : <img src={LoaderPath} alt=""/>
            }
            </div>
        </div>
    )
}

export default App;
