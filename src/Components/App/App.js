import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import CurrentPlaylists from '../CurrentPlaylists/CurrentPlaylists';
import Spotify from '../../util/Spotify';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state =
    {
      searchResults: [],
      playlistName: '',
      playlistTracks: [],
      currentPlaylists: []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);

    Spotify.getAccessToken();
    console.log('process.env: ', process.env);
  }
  addTrack(track) {
    if (!this.state.playlistTracks.find(trackData => {
      return trackData.ID === track.ID;
    }))
      this.setState({
        playlistTracks: [...this.state.playlistTracks, track]
      });
  }
  removeTrack(track) {
    let updatedPlaylist = this.state.playlistTracks.filter(aTrack => aTrack.ID !== track.ID);
    this.setState({playlistTracks: updatedPlaylist});
  }
  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }
  savePlaylist() {
    if (!this.state.playlistName) {
      alert('specify playlist name');
      return;
    }
    let trackURIs = this.state.playlistTracks.map(track => track.URI);
    try {
      Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
        this.setState({
          playlistName: 'New Playlist',
          playlistTracks: []
        });
      });
    } catch(error) {
      console.error(error);
    }
  }
  search(search) {
    Spotify.search(search).then(results => {
      this.setState({searchResults: results});
    });
  }
  render() {
    return(
      <div>
        <h1 id="my">My<span className="highlight">Tunes</span></h1>
        <div className="App">
        <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <CurrentPlaylists />
            <Playlist playlistName={this.state.playlistName} onRemove={this.removeTrack}
            playlistTracks={this.state.playlistTracks} onNameChange={this.updatePlaylistName}
            onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default App;
