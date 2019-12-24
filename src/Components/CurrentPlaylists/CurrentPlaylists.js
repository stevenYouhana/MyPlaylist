import React from 'react';
import './CurrentPlaylists.css';
import Spotify from '../../util/Spotify';

class CurrentPlaylists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPlaylists: []
    }
    this.getPlayLists = this.getPlayLists.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
    this.loadPlaylist = this.loadPlaylist.bind(this);
  }
  getPlayLists() {
    return this.state.currentPlaylists.map((listname, i) => {
      return <h3 key={i}>{listname}</h3>
    });
  }
  handleRefresh() {
    this.loadPlaylist();
  }
  loadPlaylist() {
    let lists = [];
    Spotify.getPlayLists().then(lists => lists.items).then(list => {
      list.map(data => {
        lists.push(data.name)
      });
    }).then(() => {
      this.setState({currentPlaylists: lists});
    });
  }
  componentDidMount() {
    this.loadPlaylist();
  }
  render() {
    return(
      <div className="CurrentPlaylists">
        <h2>My current playlists</h2>
              <div className="refresh-playlist" onClick={this.handleRefresh}>refresh</div>
        {this.getPlayLists()}
      </div>
    );
  }
}

export default CurrentPlaylists;
