import React, {
  useEffect,
  useState,
  forwardRef,
  useRef,
  useImperativeHandle,
} from "react";
import "./Calendar.css";
import moment from "moment";
import BuildCalendar from "./BuildCalendar";
import Header from "./CalendarHeader";
import { useDataLayerValue } from "../DataLayer.js";
import Async from "react-async";
import "./Album Modal/SeeAlbumInfoModal.js";

function Calendar({
  spotify,
  currentDaysData,
  currentDayID,
  showModal,
  setAlbumInfoForModalForm,
  setRerender,
  newRandomAlbum,
  hideModal,
  refresh,
  rerender,
}) {
  const [{ albums, albumTracks }, dispatch] = useDataLayerValue();
  const [calendar, setCalendar] = useState([]);
  const [value, setValue] = useState(moment());
  const [dailyAlbum, setDailyAlbum] = useState([]);
  const [dailyAlbumTracks, setDailyAlbumTracks] = useState([]);
  const [dailyAlbumTitle, setDailyAlbumTitle] = useState("");
  const [dailyAlbumArtist, setDailyAlbumArtist] = useState("");
  const [dailyAlbumArt, setDailyAlbumArt] = useState("");
  const [dailyAlbumSpotifyLink, setDailyAlbumSpotifyLink] = useState("");
  const [dailyAlbumReleaseDate, setDailyAlbumReleaseDate] = useState("");
  const userDays = currentDaysData.map((a) => a.date);

  useEffect(() => {
    setCalendar(BuildCalendar(value));
  }, [value]);

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
          setAlbumInfoForModalForm(currentDaysData[i].album);
        }
      }
    }
  }

  function chooseRandomAlbum() {
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
        ? setTracksAndAlbumBackendHelper()
        : console.log("album already exists for today");
    }
  }

  function setTracksAndAlbumBackendHelper() {
    setDailyAlbumBackend();
  }

  useEffect(() => {
    if (refresh != 0) {
      chooseRandomAlbum();
      refreshDailyAlbumBackend();
      hideModal();
    }
  }, [refresh]);

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
        rating: "",
        comment: "",
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((r) => r.json())
      .then((data) => setRerender(data));
  }

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
      .then((data) => setRerender(data));
  }

  function handleAlbumClick(day) {
    setValue(day);
    showModal();
    getAlbumInfoForModal(day);
  }

  if (dailyAlbum.length == 0 && albumTracks != null) {
    console.log(albumTracks);
    chooseRandomAlbum();
    return <span>Loading...</span>;
  } else
  return (
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
    </div>
  );
}

export default Calendar;
