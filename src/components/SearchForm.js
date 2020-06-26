import React from "react";

const SearchForm = props => {
    return (
        <form autoComplete="off" onSubmit={props.onCitySubmittedHandler}>
            <input
                className={'city-form-input'}
                type="text"
                name={'city'}
                value={props.city}
                placeholder={'City Name'}
                ref={props.inputRef}
                onChange={props.onCityChangedHandler}/>

            <button className={'city-form-btn'}>Search</button>
        </form>
    )
}

export default SearchForm;
