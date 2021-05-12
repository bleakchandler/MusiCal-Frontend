import React, { useEffect, useState } from "react";
import "./Calendar.css";
import moment from "moment";
import BuildCalendar from "./BuildCalendar";
import Header from "./CalendarHeader";
import { useDataLayerValue } from "../DataLayer.js";
// import Async from "react-async";
import "./Album Modal/SeeAlbumInfoModal.js";

function Calendar({
  spotify,
  currentDaysData,
  currentDayID,
  showModal,
  setAlbumInfoForModalForm,
  setRerender,
  hideModal,
  refresh,
  rerender,
  setAlbumSongsInfoForModalForm,
  albumInfoForModalForm,
  albumSongsInfoForModalForm,
  generateNewRandomAlbum,
  chosenSongToBeReviewed,
}) {
  const [{ albums, albumTracks }, dispatch] = useDataLayerValue();
  const [calendar, setCalendar] = useState([]);
  const [value, setValue] = useState(moment());
  const [dailyAlbum, setDailyAlbum] = useState([]);
  const [selectedDay, setSelectedDay] = useState([]);
  const [dailyAlbumTitle, setDailyAlbumTitle] = useState("");
  const [dailyAlbumArtist, setDailyAlbumArtist] = useState("");
  const [dailyAlbumArt, setDailyAlbumArt] = useState("");
  const [dailyAlbumSpotifyLink, setDailyAlbumSpotifyLink] = useState("");
  const [dailyAlbumReleaseDate, setDailyAlbumReleaseDate] = useState("");
  const userDays = currentDaysData.map((a) => a.date);

  const [albumInfoForBox, setAlbumInfoForBox] = useState([]);
  const [albumSongsInfoForBox, setAlbumSongsInfoForBox] = useState(
    []
  );

  function setTodaysAlbumForBox() {
    for (let i = 0, l = currentDaysData.length; i < l; i++) {
      if ((moment().format("YYYY-MM-DD")) == currentDaysData[i].date) {
        if (currentDaysData[i].album != null) {
          setAlbumInfoForBox(currentDaysData[i].album);
        }
      }
    }
  }

  useEffect(() => {
    setCalendar(BuildCalendar(value));
    setTodaysAlbumForBox()
  }, [value]);

  useEffect(() => {
    setTodaysAlbumForBox();
    getAlbumInfoForModal(moment())
  }, [rerender]);

  useEffect(() => {
    if (
      setDailyAlbum.length > 0 &&
      dailyAlbumTitle.length > 0 &&
      dailyAlbumArtist.length > 0 &&
      dailyAlbumArt.length > 0
    ) {
      setDailyAlbumBackendCheck();
    }
  }, [dailyAlbum]);

  function isSelected(day) {
    return value.isSame(day, "day");
  }

  function beforeToday(day) {
    return day.isBefore(new Date(), "day");
  }

  function isToday(day) {
    return day.isSame(new Date(), "day");
  }

  function dayStyles(day) {
    if (beforeToday(day)) return "before";
    if (isSelected(day)) return "selected";
    if (isToday(day)) return "today";
    else return "";
  }

  function dailyAlbumImage(day) {
    for (let i = 0, l = currentDaysData.length; i < l; i++) {
      if (day.format("YYYY-MM-DD") == currentDaysData[i].date) {
        if (currentDaysData[i].album != null) {
          return <img src={currentDaysData[i].album.album_art} />;
        }
      }
    }   
  }

  function getAlbumInfoForModal(day) {
    for (let i = 0, l = currentDaysData.length; i < l; i++) {
      if (day.format("YYYY-MM-DD") == currentDaysData[i].date) {
        if (currentDaysData[i].album != null) {
          setSelectedDay(day);
          setAlbumSongsInfoForModalForm(
            currentDaysData[i].songs.sort((a, b) => (a.id > b.id ? 1 : -1))
          );
          setAlbumInfoForModalForm(currentDaysData[i].album);
          setTodaysAlbumForBox()
        }
      }
    }
  }

  function chooseRandomAlbum() {
    console.log("chooseRandomAlbum was called", albums);
    albums?.albums.items.map((album) => setDailyAlbum(album));
    albums?.albums.items.map((album) => setDailyAlbumArt(album.images[0].url));
    albums?.albums.items.map((album) =>
      setDailyAlbumArtist(album.artists[0].name)
    );
    albums?.albums.items.map((album) => setDailyAlbumTitle(album.name));
    albums?.albums.items.map((album) =>
      setDailyAlbumSpotifyLink(album.external_urls.spotify)
    );
    albums?.albums.items.map((album) =>
      setDailyAlbumReleaseDate(album.release_date)
    );
  }

  function setDailyAlbumBackendCheck() {
    const d = moment().format("YYYY-MM-DD");
    if (userDays.length !== 0) {
      userDays.indexOf(d) === -1
        ? setAlbumBackendHelper()
        : getAlbumInfoForModal(moment());
    }
  }

  function setAlbumBackendHelper() {
    setDailyAlbumBackend();
  }

  useEffect(() => {
    if (refresh != 0) {
      chooseRandomAlbum();
    }
  }, [refresh]);

  useEffect(() => {
    if (refresh != 0) {
      deleteAllSongs();
      refreshDailyAlbumBackend();
      getAlbumInfoForModal(selectedDay);
    }
  }, [dailyAlbumTitle]);

  function setDailyAlbumBackend() {
    fetch(`http://localhost:3000/albums`, {
      method: "POST",
      body: JSON.stringify({
        title: dailyAlbumTitle,
        artist: dailyAlbumArtist,
        album_art: dailyAlbumArt,
        day_id: currentDayID,
        release_date: dailyAlbumReleaseDate.substring(0, 4),
        spotify_link: dailyAlbumSpotifyLink,
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((r) => r.json())
      .then((data) => addAlbumSongsToBackend(data));
  }

  function refreshDailyAlbumBackend() {
    fetch(`http://localhost:3000/albums/${currentDayID}`, {
      method: "PATCH",
      body: JSON.stringify({
        title: dailyAlbumTitle,
        artist: dailyAlbumArtist,
        album_art: dailyAlbumArt,
        day_id: currentDayID,
        release_date: dailyAlbumReleaseDate.substring(0, 4),
        spotify_link: dailyAlbumSpotifyLink,
        comment: "",
        rating: "",
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((r) => r.json())
      .then((data) => addAlbumSongsToBackend(data));
  }

  function addAlbumSongsToBackend(data) {
    for (let i = 0, l = albumTracks.items.length; i < l; i++) {
      fetch(`http://localhost:3000/songs`, {
        method: "POST",
        body: JSON.stringify({
          title: albumTracks.items[i].name,
          artist: albumTracks.items[i].artists[0].name,
          album_id: data.id,
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((r) => r.json())
        .then((data) => setRerender(data));
    }
    setTodaysAlbumForBox() 
  }

  function deleteAllSongs() {
    fetch(`http://localhost:3000/songs/${currentDayID}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        setRerender(currentDayID);
      });
  }

  function handleAlbumClick(day) {
    setValue(day);
    showModal();
    getAlbumInfoForModal(day);
  }

  if (dailyAlbum.length == 0 && albumTracks != null) {
    chooseRandomAlbum();
    return <span>Loading...</span>;
  } else
    return (
      <React.Fragment>
        <div className="dailyAlbumInfo">
          <div className="todaysInfoBox">
            <div className="todaysInfoDate">{moment().format("LL")}</div>
          </div>
          <div className="dailyAlbumInfoText">
            Today's Album:
            <div style={{ fontSize: 20 }}>
              {albumInfoForBox.title} by {""}
              {albumInfoForBox.artist}
            </div>
          </div>
          <img
            class="dailyAlbumArt"
            src={albumInfoForBox.album_art}
            onClick={generateNewRandomAlbum}
          />
        </div>
        <div className="calendar">
          <Header value={value} setValue={setValue} />
          <div className="body">
            <div className="day-names">
              {["s", "m", "t", "w", "t", "f", "s"].map((d) => (
                <div className="week">{d}</div>
              ))}
            </div>
            {calendar.map((week) => (
              <div classname="week">
                {week.map((day) => (
                  <div className="day" onClick={() => handleAlbumClick(day)}>
                    <div className={dayStyles(day)}>
                      {dailyAlbumImage(day)}
                      <div class="numberCircle"></div>
                      <div class="dayNumber">
                        {day.format("D").toString()}
                        <div />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>{" "}
      </React.Fragment>
    );
}

export default Calendar;
