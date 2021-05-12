import React, { useState, useEffect } from "react";
import "./Body.css";
import Calendar from "../Calendar/Calendar.js";
import moment from "moment";
import "../Calendar/Album Modal/SeeAlbumInfoModal.js";
import SeeAlbumInfoModal from "../Calendar/Album Modal/SeeAlbumInfoModal.js";
import AlbumRatingModal from "../Calendar/Album Modal/ReviewAlbumModal";
import SongsRatingModal from "../Calendar/Album Modal/ReviewSongModal.js";
import SongsRatingListModal from "../Calendar/Album Modal/SeeListOfSongsToReview.js";
import NavBar from "../NavBar/Navbar.js";

function Body({
  spotify,
  todaysDate,
  currentDaysData,
  setRerender,
  newRandomAlbum,
  generateNewRandomAlbum,
  refresh,
  rerender,
  doRefresh,
}) {
  const [currentDayID, setCurrentDayID] = useState([]);
  const userDays = currentDaysData.map((a) => a.date);
  const currentDate = moment().format("YYYY-MM-DD");
  const [isOpen, setIsOpen] = React.useState(false);
  const [albumInfoForModalForm, setAlbumInfoForModalForm] = useState([]);
  const [albumSongsInfoForModalForm, setAlbumSongsInfoForModalForm] = useState(
    []
  );
  const [chosenSongToBeReviewed, setChosenSongToBeReviewed] = useState([]);

  const [albumRatingModalIsOpen, setAlbumRatingModalIsOpen] =
    React.useState(false);

  const [songsRatingModalIsOpen, setSongsRatingModalIsOpen] =
    React.useState(false);

  const [songsRatingListModalIsOpen, setSongsRatingListModalIsOpen] =
    React.useState(false);

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  const showAlbumRatingModal = () => {
    setAlbumRatingModalIsOpen(true);
  };

  const hideAlbumRatingModal = () => {
    setAlbumRatingModalIsOpen(false);
  };

  const showSongsRatingModal = () => {
    setSongsRatingModalIsOpen(true);
  };

  const hideSongsRatingModal = () => {
    setSongsRatingModalIsOpen(false);
  };

  const showSongsRatingListModal = () => {
    setSongsRatingListModalIsOpen(true);
  };

  const hideSongsRatingListModal = () => {
    setSongsRatingListModalIsOpen(false);
  };

  useEffect(() => {
    if (currentDayID.length === 0) {
      fetch(`http://localhost:3000/days`, {
        method: "POST",
        body: JSON.stringify({
          date: moment().format("YYYY-MM-DD"),
          note: "test",
          user_id: 1,
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((r) => r.json())
        .then((data) => setCurrentDayID(data.id));
    }
  }, []);

  function findDayID() {
    {
      for (let i = 0, l = currentDaysData.length; i < l; i++) {
        if (currentDate == currentDaysData[i].date) {
          setCurrentDayID(currentDaysData[i].id);
        }
      }
    }
  }

  if (currentDayID.length === 0 && userDays.length !== 0) {
    findDayID();
    return <span>Loading...</span>;
  } else {
    return (
      <div className="Body">
        <div className="Body__body">
          <NavBar />
          <Calendar
            rerender={rerender}
            spotify={spotify}
            todaysDate={todaysDate}
            currentDayID={currentDayID}
            currentDaysData={currentDaysData}
            showModal={showModal}
            setAlbumInfoForModalForm={setAlbumInfoForModalForm}
            setAlbumSongsInfoForModalForm={setAlbumSongsInfoForModalForm}
            setRerender={setRerender}
            newRandomAlbum={newRandomAlbum}
            hideModal={hideModal}
            refresh={refresh}
            doRefresh={doRefresh}
            albumInfoForModalForm={albumInfoForModalForm}
            albumSongsInfoForModalForm={albumSongsInfoForModalForm}
            generateNewRandomAlbum={generateNewRandomAlbum}
          />
        </div>

        <SeeAlbumInfoModal
          showModal={showModal}
          hideModal={hideModal}
          isOpen={isOpen}
          albumInfoForModalForm={albumInfoForModalForm}
          albumSongsInfoForModalForm={albumSongsInfoForModalForm}
          showAlbumRatingModal={showAlbumRatingModal}
          showSongsRatingModal={showSongsRatingModal}
          setAlbumInfoForModalForm={setAlbumInfoForModalForm}
          rerender={rerender}
          setRerender={setRerender}
          generateNewRandomAlbum={generateNewRandomAlbum}
          currentDayID={currentDayID}
          setChosenSongToBeReviewed={setChosenSongToBeReviewed}
          chosenSongToBeReviewed={chosenSongToBeReviewed}
          showSongsRatingListModal={showSongsRatingListModal}
        ></SeeAlbumInfoModal>

        <SongsRatingModal
          doRefresh={doRefresh}
          showModal={showModal}
          albumSongsInfoForModalForm={albumSongsInfoForModalForm}
          albumInfoForModalForm={albumInfoForModalForm}
          songsRatingModalIsOpen={songsRatingModalIsOpen}
          hideSongsRatingModal={hideSongsRatingModal}
          setRerender={setRerender}
          chosenSongToBeReviewed={chosenSongToBeReviewed}
        ></SongsRatingModal>

        <AlbumRatingModal
          showModal={showModal}
          showAlbumRatingModal={showAlbumRatingModal}
          hideAlbumRatingModal={hideAlbumRatingModal}
          albumRatingModalIsOpen={albumRatingModalIsOpen}
          albumInfoForModalForm={albumInfoForModalForm}
          albumSongsInfoForModalForm={albumSongsInfoForModalForm}
          setRerender={setRerender}
        ></AlbumRatingModal>

        <SongsRatingListModal
          showSongsRatingModal={showSongsRatingModal}
          showModal={showModal}
          albumInfoForModalForm={albumInfoForModalForm}
          albumSongsInfoForModalForm={albumSongsInfoForModalForm}
          setAlbumInfoForModalForm={setAlbumInfoForModalForm}
          setChosenSongToBeReviewed={setChosenSongToBeReviewed}
          chosenSongToBeReviewed={chosenSongToBeReviewed}
          showSongsRatingListModal={showSongsRatingListModal}
          songsRatingListModalIsOpen={songsRatingListModalIsOpen}
          hideSongsRatingListModal={hideSongsRatingListModal}
          setRerender={setRerender}
        ></SongsRatingListModal>
      </div>
    );
  }
}

export default Body;
