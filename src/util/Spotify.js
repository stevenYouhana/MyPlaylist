import Env from '../Env.js';
const REDIRECT_URI = 'http://localhost:3000/';

// const REDIRECT_URI = "MyTunes.surge.sh";
let accesToken;
// let expiresIn = '';

const STATE = '34fFs29kd09';
const token_RGX = 'access_token=([^&]*)';
const exp_RGX = 'expires_in=([^&]*)';
const proxy = 'https://cors-anywhere.herokuapp.com/';
const urlToAccess = `https://accounts.spotify.com/authorize/?client_id=${Env.CLIENT_ID}&scope=playlist-modify-public&response_type=token&redirect_uri=${REDIRECT_URI}`;
let urlToFetch = 'https://api.spotify.com/v1/?search=';

const setURL = async () => {

}
const Spotify = {
  getAccessToken() {
    console.log('env.CLIENT_ID: ',Env.CLIENT_ID)
    if (accesToken) return accesToken;
    // accesToken = window.location.href.match(token_RGX);
    // let expiresIn = window.location.href.match(exp_RGX);
    if (window.location.href.match(token_RGX) &&
      window.location.href.match(exp_RGX)) {
        accesToken =  window.location.href.match(token_RGX)[1];
        const expiresIn = Number(window.location.href.match(exp_RGX)[1]);
        setTimeout(() => accesToken = '', expiresIn * 1000);
        window.history.pushState('Access Token', null, '/');
        return accesToken;
    }
    else {
        const goToUrl = `https://accounts.spotify.com/authorize?client_id=${Env.CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`;
        window.location = goToUrl;
    }
  },
  search(term) {
    let accessToken = Spotify.getAccessToken();
    const header = {Authorization: `Bearer ${accessToken}`};
      return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
        {headers: {Authorization: `Bearer ${accessToken}`}}).then(response => {
        return response.json();
      }).then(track => {
        if (!track.tracks) return [];
        return track.tracks.items.map(track => ({
          ID: track.id,
          Name: track.name,
          Artist: track.artists[0].name,
          Album: track.album.name,
          URI: track.uri
        }));
      });
  },
  savePlaylist (name, trackURIs) {
    if (!name || !trackURIs.length) return;
    let accesToken = Spotify.getAccessToken();
    let header = {Authorization: `Bearer ${accesToken}`};
    let userID = '';

    return fetch(`https://api.spotify.com/v1/me`, {headers: header})
      .then(response => response.json())
      .then(jsonResponse => {
        userID = jsonResponse.id;
        console.log('jsonResponse ',jsonResponse)
        return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`,
          {
            headers: header,
            method: 'POST',
            body: JSON.stringify({name: name})
          }).then(response => response.json())
            .then(jsonResponse => {
              const playlistID = jsonResponse.id;
              console.log('create playlist with ',accesToken)
              return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`,
              {
                headers: {Authorization: `Bearer ${accesToken}`},
                method: 'POST',
                body: JSON.stringify({uris: trackURIs})
              })
          })
      })
  },
  getPlayLists() {
    const header = {Authorization: `Bearer ${accesToken}`};
    return fetch('https://api.spotify.com/v1/me/playlists', {headers: header})
      .then(response => response.json());      
  }
}

export default Spotify;
