import React from 'react';
import Button from './Button';
import '../../stylesheets/components/rangeFilter.scss';

export default class RangeFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      range: props.filter[props.category]
    };
  }
  handleRangeChange = (val, index) => {
    let {range} = this.state;
    let newRange = [ ...range];
    newRange[index] = val;
    this.setState({
      range: newRange
    });
  }
  handleRangeClicked = () => {
    let {range} = this.state;
    let newRange = [ ...range];
    if (!newRange[0] || !newRange[1]) {
      alert(`Please eneter lower/upper bound for ${this.props.category}`);
    } else {
      // swap two numbers if min > max
      if (parseInt(range[0], 10) > parseInt(range[1], 10)) {
        newRange[0] = range[1];
        newRange[1] = range[0];
      }
      this.setState({
        range: newRange
      })
      this.props.onRangeFilterClick({
        min: parseInt(newRange[0], 10),
        max: parseInt(newRange[1], 10)
      }, this.props.category);
    }
  }
  render() {
    let {range} = this.state;
    return (
      <div className="range-filter">
        <input
          type="number"
          placeholder="min"
          value={range[0]}
          onChange={e => this.handleRangeChange(e.target.value, 0)}/>
        <span> - </span>
        <input
          type="number"
          placeholder="max"
          value={range[1]}
          onChange={e => this.handleRangeChange(e.target.value, 1)}/>
        <Button onClick={this.handleRangeClicked}/>
      </div>
    );
  }
}
