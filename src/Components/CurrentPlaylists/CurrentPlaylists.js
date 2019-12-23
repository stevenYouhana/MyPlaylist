import React from 'react';
import './CurrentPlaylists.css';

class CurrentPlaylists extends React.Component {
  constructor(props) {
    super(props);
    this.getPlayLists = this.getPlayLists.bind(this);
  }
  getPlayLists() {
    return this.props.playlists.map((listname, i) => {
      return <h3 key={i}>{listname}</h3>
    });
  }
  render() {
    return(
      <div className="CurrentPlaylists">
        <h2>My current playlists</h2>
        {this.getPlayLists()}
      </div>
    );
  }
}

export default CurrentPlaylists;
