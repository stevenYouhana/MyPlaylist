import React from  'react';
import Track from '../Track/Track';
import './TrackList.css';

class TrackList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="TrackList">
        {
          this.props.tracks.map((track, i) => {
            return <Track key={i}
              track={track}
              name={track.Name}
              artist={track.Artist}
              album={track.Album}
              onRemove={this.props.onRemove}
              isRemoval={this.props.isRemoval}
              onAdd={this.props.onAdd}
            />;
          })
        }
      </div>
    );
  }
}
export default TrackList;
