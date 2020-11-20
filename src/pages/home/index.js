import React,{Component} from 'react';

import './home.css';
import PlacesAutocomplete, { geocodeByAddress, getLatLng,} from 'react-places-autocomplete';

class Home extends Component{
  constructor(props) {
    super(props);
    this.state = { 
      address: '',
      lat:null,
      lng:null
    };
  }
 
  handleChange = address => {
    this.setState({ address });
  };
 
  handleSelect = address => {
    this.setState({ address });
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        this.setState({lat:latLng.lat});
        this.setState({lng:latLng.lng});

      })
      .catch(error => console.error('Error', error));
  };

  sendLocation = () => {
    let lat = this.state.lat;
    let lng = this.state.lng;
    let path = `produtos/${lat}/${lng}`;
    this.props.history.push(path);

  }
   
  render() {
    return (
      <div className="home">
        <PlacesAutocomplete
                value={this.state.address}
                onChange={this.handleChange}
                onSelect={this.handleSelect}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div className="form">
              <h2>Digite o seu endereço para buscar os produtos mais próximos</h2>
              <input
                {...getInputProps({
                  placeholder: 'Localizar...',
                  className: 'location-search-input',
                })}
              />
              <div className="autocomplete-dropdown-container">
                {loading && <div>Buscando...</div>}
                {suggestions.map(suggestion => {
                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: '#FD8D00', cursor: 'pointer' }
                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
              <button className="btn-send" onClick={this.sendLocation}>buscar</button>

            </div>
          )}
        </PlacesAutocomplete>

      </div>
    );
  }
}

export default Home;