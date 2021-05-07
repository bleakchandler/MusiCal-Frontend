import React, {
  useEffect,
  useState,
  forwardRef,
  useRef,
  useImperativeHandle,
} from "react";
import "./App.css";
import Login from "./components/Login/Login.js";
import { getTokenFromURL } from "./components/Spotify Config/SpotifyConfig.js";
import SpotifyWebApi from "spotify-web-api-js";
import { useDataLayerValue } from "./components/DataLayer.js";
import Player from "./components/Player/Player.js";
import moment from "moment";
import { ChakraProvider } from "@chakra-ui/react";
import Calendar from "./components/Calendar/Calendar.js";
import AlbumFormModal from "./components/Calendar/Album Modal/SeeAlbumInfoModal";

// import logo from "./logo.svg";
// import Body from "./components/Body/Body.js";
// import NavBar from "./components/NavBar/Navbar";
// import { BrowserRouter, Switch, Route } from "react-router-dom";
// import Landing from "./components/Landing/Landing.js";
// import Async from "react-async";
// console.log("date test", new Date());

const spotify = new SpotifyWebApi();

function App() {
  const [{ user, token }, dispatch] = useDataLayerValue();
  const randomOffset = Math.floor(Math.random() * 100);
  const [todaysDate, setTodaysDate] = useState("");
  const [currentDaysData, setCurrentDaysData] = useState("");
  const [rerender, setRerender] = useState([]);
  const [newRandomAlbum, setNewRandomAlbum] = useState([]);
  // const [albumTracks, setAlbumTracks] = useState([]);
  const hash = getTokenFromURL();
  const _token = hash.access_token;
  const [refresh, doRefresh] = useState(0);

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
      // spotify.getUserPlaylists().then((playlists) => {
      //   dispatch({
      //     type: "SET_PLAYLISTS",
      //     playlists,
      //   });
      // });
      // spotify.getPlaylist("37i9dQZF1E34Ucml4HHx1w").then((playlist) => {
      //   dispatch({
      //     type: "SET_DISCOVER_WEEKLY",
      //     discover_weekly: playlist,
      //   });
      // });
      // spotify.getArtistAlbums("43ZHCT0cAZBISjO8DG9PnE").then(
      //   function (data) {
      //     console.log("Artist albums", data);
      //   },
      //   function (err) {
      //     console.error(err);
      //   }
      // );
      // spotify.searchAlbums(getRandomSearch(), { limit: 1, offset: 10 }).then(
      //   function (data) {
      //     // console.log('Search by "Albums"', data);
      //   },
      //   function (err) {
      //     console.error(err);
      //   }
      // );
      //where random albums are pulled
      spotify
        .searchAlbums(getRandomSearch(), { limit: 1, offset: randomOffset })
        .then((albums) => {
          setAlbumTracks(albums.albums.items[0].id)
          dispatch({
            type: "SET_ALBUMS",
            albums,
          });
        });

      // console.log("the random song is", getRandomSearch());
      // console.log("the random offset is", randomOffset);

      // spotify.getTrack("37i9dQZF1E34Ucml4HHx1w").then((playlist) => {
      //   dispatch({
      //     type: "SET_DISCOVER_WEEKLY",
      //     discover_weekly: playlist,
      //   });
      // });
      // set Today's date
    }
  }, []);

  function setAlbumTracks(albumInfo) {
    spotify
      .getAlbumTracks(albumInfo)
      .then((albumTracks) => {
        dispatch({
          type: "SET_ALBUM_TRACKS",
          albumTracks,
        });
      });
  }

  function generateNewRandomAlbum() {
    spotify
      .searchAlbums(getRandomSearch(), { limit: 1, offset: randomOffset })
      .then((albums) => {
        setAlbumTracks(albums.albums.items[0].id);
        dispatch({
          type: "SET_ALBUMS",
          albums,
        });
      });
    doRefresh((prev) => prev + 1);
  }

  // function getAlbumTracks(albumID) {
  //   spotify.getAlbumTracks(albumID).then(
  //     function (data) {
  //       setAlbumTracks(data);
  //     },
  //     function (err) {
  //       console.error(err);
  //     }
  //   );
  // }

  useEffect(() => {
    fetch(`http://localhost:3000/days`)
      .then((r) => r.json())
      .then((data) =>
        setCurrentDaysData(data.filter((dayObj) => dayObj.user_id === 1))
      );
  }, [rerender]);

  if (currentDaysData.length == 0) {
    return <span>Loading...</span>;
  } else {
    return (
      <ChakraProvider>
        <div className="App">
          {token ? (
            <Player
              spotify={spotify}
              todaysDate={todaysDate}
              currentDaysData={currentDaysData}
              setRerender={setRerender}
              generateNewRandomAlbum={generateNewRandomAlbum}
              newRandomAlbum={newRandomAlbum}
              refresh={refresh}
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

// return (
//   <BrowserRouter>
//   <Switch>
//     <Route path="/">
//       <Login />
//       {/* <Landing /> */}
//       {/* <NavBar />
//       <Body /> */}
//     </Route>
//   </Switch>
// </BrowserRouter>
// );
