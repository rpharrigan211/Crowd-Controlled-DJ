import React, { Component } from 'react';
import Deck from './Deck';

let loadYT;

export default class Turntable extends Component {
  constructor(props) {
    super(props);
    this.state = { ytready: false };
  }

  componentDidMount() {
    if (!loadYT) {
      loadYT = new Promise((resolve) => {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        window.onYouTubeIframeAPIReady = () => resolve(window.YT);
      });
    }
    loadYT.then((YT) => {
      this.setState({ ytready: true });
      console.log("Youtube iFrame API ready");
    });
  }

  render() {
    return (
      <div className="Turntable">
        {!this.state.ytready ?
          <p>Loading...</p>
          :
          <div className="row">
            <Deck side="Left" />
            <Deck side="Right" />
          </div>
        }
      </div>
    );
  }
}
