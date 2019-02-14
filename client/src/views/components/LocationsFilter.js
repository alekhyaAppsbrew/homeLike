import React from 'react';
import '../../stylesheets/components/locationsfilter.scss';

export default class LocationsFilter extends React.Component {
  render() {
    let {locations, selectedLocation} = this.props;
    let locationsList = locations.map((item, index) => {
      return (
        <span key={item._id}>
          <input
            type="radio"
            name="locations"
            checked={selectedLocation === item._id}
            onChange={() => this.props.onLocationChange(item._id)}/>
          <div className="item-title-text">{item.title}</div>
        </span>
      );
    });
    return (
      <form className="locations-filter">
        <div><b>Location: </b></div>
        {locationsList}
      </form>
    );
  }
}
