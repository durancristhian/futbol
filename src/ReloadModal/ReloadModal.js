import React, { Component } from 'react';

class ReloadModal extends Component {
  state = {
    show: false
  };

  componentDidMount() {
    window.addEventListener('newContentAvailable', () => {
      this.setState({
        show: true
      });
    });
  }

  onClick = () => {
    window.location.reload(window.location.href);
  };

  render() {
    if (!this.state.show) {
      return null;
    }

    return (
      <div
        className="b--black ba bg-black-80 bottom-0 fixed left-0 mb4 ml4 pa3 pointer white"
        onClick={this.onClick}
      >
        <p className="mv0">
          <em>
            Nueva versión disponible. <strong>Toca para refrescar.</strong>
          </em>
        </p>
      </div>
    );
  }
}

export default ReloadModal;
