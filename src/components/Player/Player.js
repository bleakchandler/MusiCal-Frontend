import React, { useState, useEffect } from "react";
import "./Player.css";
import Calendar from "../Calendar/Calendar.js";
import moment from "moment";
import "../Calendar/Album Modal/SeeAlbumInfoModal.js";
import SeeAlbumInfoModal from "../Calendar/Album Modal/SeeAlbumInfoModal.js";
import UpdateAlbumModal from "../Calendar/Album Modal/UpdateAlbumModal";
import NavBar from "../NavBar/Navbar.js";

function Player({
  spotify,
  todaysDate,
  currentDaysData,
  setRerender,
  newRandomAlbum,
  generateNewRandomAlbum,
  refresh,
  rerender,
  doRefresh
}) {
  const [currentDayID, setCurrentDayID] = useState([]);
  const userDays = currentDaysData.map((a) => a.date);
  const currentDate = moment().format("YYYY-MM-DD");
  const [isOpen, setIsOpen] = React.useState(false);
  const [albumInfoForModalForm, setAlbumInfoForModalForm] = useState([]);
  const [isOpen2, setIsOpen2] = React.useState(false);

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  const showModal2 = () => {
    setIsOpen2(true);
  };

  const hideModal2 = () => {
    setIsOpen2(false);
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
      <div className="player">
        <div className="player__body">
          <NavBar />
          <Calendar
            rerender={rerender}
            spotify={spotify}
            todaysDate={todaysDate}
            currentDayID={currentDayID}
            currentDaysData={currentDaysData}
            showModal={showModal}
            setAlbumInfoForModalForm={setAlbumInfoForModalForm}
            setRerender={setRerender}
            newRandomAlbum={newRandomAlbum}
            hideModal={hideModal}
            refresh={refresh}
            doRefresh={doRefresh}
          />
        </div>
        <SeeAlbumInfoModal
          showModal={showModal}
          hideModal={hideModal}
          isOpen={isOpen}
          albumInfoForModalForm={albumInfoForModalForm}
          showModal2={showModal2}
          setAlbumInfoForModalForm={setAlbumInfoForModalForm}
          setRerender={setRerender}
          generateNewRandomAlbum={generateNewRandomAlbum}
          currentDayID={currentDayID}
        ></SeeAlbumInfoModal>
        <UpdateAlbumModal
          showModal={showModal}
          showModal2={showModal2}
          hideModal2={hideModal2}
          isOpen2={isOpen2}
          albumInfoForModalForm={albumInfoForModalForm}
          setRerender={setRerender}
        ></UpdateAlbumModal>
      </div>
    );
  }
}

export default Player;
