import React from 'react';
import Button from './Button';
import '../../stylesheets/components/detailsFilter.scss';

export default class DetailsFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: props.filter.details
    };
  }
  handleDetailsChanged = (val, key) => {
    let {details} = this.state;
    this.setState({
      details: {
        ...details,
        [key]: val === '' ? null : parseInt(val, 10)
      }
    });
  }
  render() {
    let {details} = this.state;
    let detailsItems = [];
    for (let key in details) {
      let itemText = `${key[0].toUpperCase()}${key.substring(1, key.length)}`;
      detailsItems.push(
        <div key={key} className="details-item">
          <div className="details-item-text">{itemText}</div>
          <input
            type="number"
            value={details[key] || ''}
            onChange={(e) => this.handleDetailsChanged(e.target.value, key)}/>
        </div>
      );
    }
    return (
      <div className="details-filter">
        {detailsItems}
        <Button onClick={() => this.props.onDetailsFiltered(details, this.props.category)}/>
      </div>
    );
  }
}
