import {FETCH_APARTMENTS_LIST, FILTER_APARTMENTS_LIST, CLEAN_FILTER} from './../actions/types';
import constants from '../../constants';

const initialState = {
  apartments: [],
  visibleApartments: [],
  filter: {
    size: {
      min: 0,
      max: constants.RANGE_UPPER_LIMIT
    },
    price: {
      min: 0,
      max: constants.RANGE_UPPER_LIMIT
    },
    amenities: [],
    services: [],
    details: {
      rooms: null,
      bedrooms: null,
      floor: null,
      bathrooms: null
    }
  }
};

const notIncludedItemInArray = (array, items) => {
  return array.some(el => items.indexOf(el) < 0 );
};

const checkDetailsMatch = (details, itemDetails) => {
  let filteredDetailsItems = {};
  for (let key in details) {
    if (details[key]) {
      filteredDetailsItems[key] = details[key];
    }
  }
  for (let key in filteredDetailsItems) {
    if (filteredDetailsItems[key] !== itemDetails[key]) {
      return false;
    }
  }
  return true;
}

const getApartmentsByFilter = (items, filter) => {
  return items.filter(item => {
    let {details} = filter;
    let notHasAmenities = notIncludedItemInArray(filter.amenities, item.amenities);
    let notHasServices = notIncludedItemInArray(filter.services, item.services);
    let matchDetails = checkDetailsMatch(details, item.details);

    return (
      item.size >= filter.size.min &&
      item.size <= filter.size.max &&
      item.price >= filter.price.min &&
      item.price <= filter.price.max &&
      !notHasAmenities &&
      !notHasServices &&
      matchDetails
    );
  });
};


export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_APARTMENTS_LIST:
          return {
              ...state,
              apartments: action.payload.apartments.items,
              visibleApartments: getApartmentsByFilter(action.payload.apartments.items, state.filter)
          };
        case FILTER_APARTMENTS_LIST:
          return {
            ...state,
            filter: action.filter,
            visibleApartments: getApartmentsByFilter(state.apartments, action.filter)
          };
        case CLEAN_FILTER:
          return {
            ...state,
            filter: {
              ...initialState.filter,
              size: state.filter.size,
              price: state.filter.price,
              details: state.filter.details
            }
          };
        default:
          return state;
    }
}
