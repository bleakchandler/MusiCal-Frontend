import React, { useEffect, useState } from "react";
import "./App.css";
import Login from "./components/Login/Login.js";
import { getTokenFromURL } from "./components/Spotify Config/SpotifyConfig.js";
import SpotifyWebApi from "spotify-web-api-js";
import { useDataLayerValue } from "./components/DataLayer.js";
import Body from "./components/Body/Body.js";
import { ChakraProvider } from "@chakra-ui/react";

const spotify = new SpotifyWebApi();

function App() {
  const [{ token }, dispatch] = useDataLayerValue();
  const randomOffset = Math.floor(Math.random() * 100);
  const [todaysDate] = useState("");
  const [currentDaysData, setCurrentDaysData] = useState("");
  const [rerender, setRerender] = useState([]);
  const [newRandomAlbum] = useState([]);
  const hash = getTokenFromURL();
  const _token = hash.access_token;
  const [refresh, doRefresh] = useState(0);
  const [albumRating, setAlbumRating] = useState([]);

  const [activateRerender, setActivateRerender] = useState([]);

  function getRandomSearch() {
    // A list of all characters that can be chosen.
    const characters = "abcdefghijklmnopqrstuvwxyz";

    // Gets a random character from the characters string.
    const randomCharacter = characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
    let randomSearch = "";

    // Places the wildcard character at the beginning, or both beginning and end, randomly.
    switch (Math.round(Math.random())) {
      case 0:
        randomSearch = randomCharacter + "%";
        break;
      case 1:
        randomSearch = "%" + randomCharacter + "%";
        break;
    }
    return randomSearch;
  }

  useEffect(() => {
    window.location.hash = "";

    if (_token) {
      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });
      spotify.setAccessToken(_token);
      spotify.getMe().then((user) => {
        dispatch({
          type: "SET_USER",
          user,
        });
      });

      //where random albums are pulled
      spotify
        .searchAlbums(getRandomSearch(), { limit: 1, offset: randomOffset })
        .then((albums) => {
          spotify
            .getAlbumTracks(albums.albums.items[0].id)
            .then((albumTracks) => {
              dispatch({
                type: "SET_ALBUM_TRACKS",
                albumTracks,
              });
              dispatch({
                type: "SET_ALBUMS",
                albums,
              });
            });
        });
    }
  }, []);

  function generateNewRandomAlbum() {
    spotify
      .searchAlbums(getRandomSearch(), { limit: 1, offset: randomOffset })
      .then((albums) => {
        spotify
          .getAlbumTracks(albums.albums.items[0].id)
          .then((albumTracks) => {
            dispatch({
              type: "SET_ALBUM_TRACKS",
              albumTracks,
            });
            dispatch({
              type: "SET_ALBUMS",
              albums,
            });
            doRefresh((prev) => prev + 1);
          });
      });
  }

  useEffect(() => {
    fetch(`http://localhost:3000/days`)
      .then((r) => r.json())
      .then((data) =>
        setCurrentDaysData(data.filter((dayObj) => dayObj.user_id === 1))
      );
  }, [rerender]);

  useEffect(() => {
    fetch(`http://localhost:3000/days`)
      .then((r) => r.json())
      .then((data) =>
        setCurrentDaysData(data.filter((dayObj) => dayObj.user_id === 1))
      );
  }, [activateRerender]);

  if (currentDaysData.length == 0) {
    return <span>Loading...</span>;
  } else {
    return (
      <ChakraProvider>
        <div className="App">
          {token ? (
            <Body
              rerender={rerender}
              spotify={spotify}
              doRefresh={doRefresh}
              todaysDate={todaysDate}
              currentDaysData={currentDaysData}
              setRerender={setRerender}
              generateNewRandomAlbum={generateNewRandomAlbum}
              newRandomAlbum={newRandomAlbum}
              refresh={refresh}
              albumRating={albumRating}
              setAlbumRating={setAlbumRating}
              setActivateRerender={setActivateRerender}
              activateRerender={activateRerender}
            />
          ) : (
            <Login />
          )}
        </div>
      </ChakraProvider>
    );
  }
}

export default App;
