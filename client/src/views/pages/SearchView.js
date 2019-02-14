import React from 'react';
import {connect} from 'react-redux';
import {fetchApartmentsListByLocation, filterApartmentsList, cleanFilter} from './../../store/actions/apartmentsListActions';
import {fetchLocationsList} from './../../store/actions/locationsListActions';
import ApartmentTileView from "../components/ApartmentTileView";
import SearchBox from "../components/SearchBox";
import RangeFilter from "../components/RangeFilter";
import MultipleItemsFilter from "../components/MultiItemsFilter";
import DetailsFilter from "../components/DetailsFilter";
import '../../stylesheets/pages/searchView.scss';

class SearchView extends React.Component {
  state = {
    searchStr: ''
  };

  componentWillMount() {
    this.props.fetchLocationsList();
  }

  handleSearchChange = (str) => {
    this.setState({
      searchStr: str
    });
  }

  handleSearchClicked = () => {
    let {locationsList} = this.props;
    let {searchStr} = this.state;
    let searchLocation = locationsList.items.find(location => location.title.toUpperCase() === searchStr.toUpperCase());
    searchLocation = searchLocation ? searchLocation._id : '';
    this.props.fetchApartmentsListByLocation(searchLocation);
    this.props.cleanFilter();
  }

  handleFilterItemChange = (item, key) => {
    console.log(item+"item");
    console.log(key+"key");
    let {filter} = this.props;
    let newFilter;
    if (key === 'amenities' || key === 'services') {
      let hasFilteredItem = filter[key].find(filteredItem => filteredItem === item);
      newFilter = {
        ...filter,
        [key]: hasFilteredItem ? filter[key].filter(el => el !== item) : [...filter[key], item]
      };
    } else {
      newFilter = {
        ...filter,
        [key]: item
      };
    }
    this.props.filterApartmentsList(newFilter);
  }

  render() {
    let {locationsList, apartmentsList, filter} = this.props;

    if (!Object.keys(locationsList).length) {
      return <div>Loading...</div>
    }
    return (
      <div className="container-list container-lg clearfix">
        <div className="col-12 float-left">
          <div className="category-block">
            <div className="category-text">Location: </div>
            <SearchBox
              onSearchChange={this.handleSearchChange}
              onSearchClick={this.handleSearchClicked}/>
          </div>
          <div className="category-block">
            <div className="category-text">Size: </div>
            <RangeFilter
              filter={filter}
              category={'size'}
              onRangeFilterClick={this.handleFilterItemChange}/>
            <div className="category-text price">Price: </div>
            <RangeFilter
              filter={filter}
              category={'price'}
              onRangeFilterClick={this.handleFilterItemChange}/>
          </div>
          <div className="category-block">
            <div className="category-text">Details: </div>
            <DetailsFilter
             filter={filter}
             category={'details'}
             onDetailsFiltered={this.handleFilterItemChange}/>
          </div>
          <MultipleItemsFilter
            apartments={apartmentsList}
            filter={filter}
            category={'amenities'}
            onFilterItemChange={this.handleFilterItemChange}/>
          <MultipleItemsFilter
            apartments={apartmentsList}
            filter={filter}
            category={'services'}
            onFilterItemChange={this.handleFilterItemChange}/>
          <div className="results-wrap">
            {apartmentsList.length > 0 ?
              <div className="view-apartment-list">
                {apartmentsList.map((item, index) => (
                  <ApartmentTileView key={index} apartment={item} />
                ))}
              </div>
              :
              <span>No Results</span>
            }
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  locationsList: state.locationsList.locations,
  apartmentsList: state.apartmentsList.visibleApartments,
  filter: state.apartmentsList.filter
});

export default connect(mapStateToProps, {
  fetchLocationsList,
  fetchApartmentsListByLocation,
  filterApartmentsList,
  cleanFilter
})(SearchView);
