import React from 'react';
import {connect} from 'react-redux';
import {fetchApartmentsListByLocation} from './../../store/actions/apartmentsListActions';
import {fetchLocationsList} from './../../store/actions/locationsListActions';
import ApartmentTileView from "../components/ApartmentTileView";
import LocationsFilter from "../components/LocationsFilter";

class LocationsView extends React.Component {
  state = {
    selectedLocation: null
  };
  componentWillMount() {
    this.props.fetchLocationsList();
  }

  handleLocationChange = (locationId) => {
    this.props.fetchApartmentsListByLocation(locationId);
    this.setState({
      selectedLocation: locationId
    });
  }

  render() {
    let {locationsList, apartmentsList} = this.props;
    let {selectedLocation} = this.state;
    if (!Object.keys(locationsList).length) {
      return <div>Loading...</div>
    }
    let apartmentListPlaceholder = <div>{`${selectedLocation ? 'Loading...' : 'Please select a location'}`}</div>;
    return (
      <div className="container-list container-lg clearfix">
        <div className="col-12 float-left">
          <LocationsFilter
            locations={locationsList.items}
            selectedLocation={selectedLocation}
            onLocationChange={this.handleLocationChange}/>
          {apartmentsList.length ?
            <div className="view-apartment-list">
              {apartmentsList.map((item, index) => (
                  <ApartmentTileView key={index} apartment={item} />
              ))}
            </div>
            :
            apartmentListPlaceholder
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  locationsList: state.locationsList.locations,
  apartmentsList: state.apartmentsList.apartments
});

export default connect(mapStateToProps, {fetchLocationsList, fetchApartmentsListByLocation})(LocationsView)
