import {FETCH_APARTMENTS_LIST, FILTER_APARTMENTS_LIST, CLEAN_FILTER} from "./types";
import gql from "graphql-tag";
import client from './../../ApolloClient'

export const fetchApartmentsList = () => dispatch => {
  client.query({
    query: gql`
    {
      apartments(active: true) {
        items {
          _id
          owner {
          _id
            email
          }
          title
          location {
            title
          }
          size
          price
          amenities
          images
        }
      }
    }`
})
.then(apartments => dispatch({
  type: FETCH_APARTMENTS_LIST,
  payload: apartments.data
}));
};

export const fetchApartmentsListByLocation = (location) => dispatch => {
  client.query({
    query: gql`
    {
      apartments(active: true, location: "${location}") {
        items {
          _id
          owner {
          _id
            email
          }
          title
          location {
            _id
            title
          }
          size
          price
          amenities
          images
          details {
            rooms
            bedrooms
            floor
            bathrooms
          }
          services
        }
      }
    }`
})
.then(apartments => dispatch({
  type: FETCH_APARTMENTS_LIST,
  payload: apartments.data
}));
};

export const filterApartmentsList = (filter) => dispatch => {
  dispatch({
    type: FILTER_APARTMENTS_LIST,
    filter: filter
  })
};

export const cleanFilter = () => dispatch => {
  dispatch({
    type: CLEAN_FILTER
  })
};
