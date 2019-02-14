import React from 'react';
import '../../stylesheets/components/searchBox.scss';

export default class LocationsFilter extends React.Component {
  render() {
    return (
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter location"
          onChange={e => this.props.onSearchChange(e.target.value)}/>
        <div
          className="btn"
          onClick={this.props.onSearchClick}>
          Search
        </div>
      </div>
    );
  }
}
