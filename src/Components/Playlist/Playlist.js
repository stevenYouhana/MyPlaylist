import React from 'react';
import TrackList from '../TrackList/TrackList';
import './Playlist.css';

class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {playlistName: this.props.playlistName}
    this.handleNameChange = this.handleNameChange.bind(this);
  }
  handleNameChange(e) {
    this.props.onNameChange(e.target.value);
    this.setState({playlistName: e.target.value});
  }
  render() {
    return(
      <div className="Playlist">
        <input type="text" defaultValue={'New Playlist'} onChange={this.handleNameChange} />
        <h2>{this.state.playlistName}</h2>
        <TrackList tracks={this.props.playlistTracks}
          onRemove={this.props.onRemove}
          isRemoval={true}
        />
        <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
      </div>
    );
  }
}

export default Playlist;
