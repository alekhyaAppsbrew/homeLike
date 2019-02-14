import React from 'react';
import '../../stylesheets/components/multiItemsFilter.scss';

export default class MultiItemsFilter extends React.Component {
  render() {
    let {apartments, category, filter} = this.props;
    let uniqueItems = [];
    if (apartments.length === 0) return null;
    apartments.forEach(apartment => {
      uniqueItems = [...uniqueItems, ...apartment[category]]
    });
    uniqueItems = [...new Set(uniqueItems)];
    let categoryText = `${category[0].toUpperCase()}${category.substring(1, category.length)}`;
    return (
      <div className="multi-items-filter">
        <div className="category-text">{categoryText}</div>
        {uniqueItems.map(item =>
          <div key={`${item}`} className="item">
            <input
              type="checkbox"
              checked={filter[category].indexOf(item) !== -1}
              onChange={() => this.props.onFilterItemChange(item, category)}/>
            <div className="item-text">{item}</div>
          </div>
          )
        }
      </div>
    );
  }
}
