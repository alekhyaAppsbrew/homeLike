import React from 'react';
import uuidv1 from 'uuid/v1';

export default class ApartmentAmentityView extends React.Component {
  render() {
    let {apartment, limit} = this.props;
    let amentities = [];
    apartment.amenities.forEach((item, index) => {
      if (index < limit) {
        amentities.push(
          <span key={uuidv1()} className="_1h9l4w0vvX6d56ZnJ3NLod">
            <i></i>
            <span>{item}</span>
          </span>
        );
      }
    });
    return amentities
  }
}
