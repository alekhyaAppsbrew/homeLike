import React from 'react';

export default class Button extends React.Component {
  render() {
    return (
      <div
        className="btn apply-btn"
        onClick={this.props.onClick}>
        Apply
      </div>
    );
  }
}
