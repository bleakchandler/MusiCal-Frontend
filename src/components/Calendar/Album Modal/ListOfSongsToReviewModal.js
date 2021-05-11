import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDataLayerValue } from "../../DataLayer.js";
import "./Modal.css";

const AlbumFormModal = ({
  hideModal,
  albumInfoForModalForm,
  setRerender,
  showModal,
  showAlbumRatingModal,
  showSongsRatingModal,
  generateNewRandomAlbum,
  currentDayID,
  albumSongsInfoForModalForm,
  setChosenSongToBeReviewed,
  songsRatingListModalIsOpen,
  hideSongsRatingListModal,
}) => {
  function openSpotifyLink() {
    window.open(albumInfoForModalForm.spotify_link);
  }

  function handleClickToSongReview(data) {
    setChosenSongToBeReviewed(data);
    showSongsRatingModal();
    hideSongsRatingListModal();
  }

  // function checkForAlbumRefreshButton() {
  //   if (albumInfoForModalForm.id == currentDayID) {
  //     return true;
  //   }
  // }


  function handlePreviousModal() {
    showModal();
    hideSongsRatingListModal();
  }

  var cards = albumSongsInfoForModalForm.map(function (card) {
    return (
      <li type="1">
        {card.title}

        <Button
          onClick={() => handleClickToSongReview(card)}
          style={{ marginLeft: 390, marginTop:-40 }}
        >
          Review
        </Button>
      </li>
    );
  });

  return (
    <>
      <Modal
        size="small"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={songsRatingListModalIsOpen}
        onHide={hideSongsRatingListModal}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {albumInfoForModalForm.title} by {albumInfoForModalForm.artist}
            <Form.Text className="text-muted">
              Released {albumInfoForModalForm.release_date}
            </Form.Text>
          </Modal.Title>
        </Modal.Header>

        {albumInfoForModalForm.rating ? (
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              {albumInfoForModalForm.rating ? (
                <Form.Text className="font-weight-bold">
                  {albumInfoForModalForm.rating} Stars
                </Form.Text>
              ) : null}
              <Form.Text className="font-weight-normal">
                {albumInfoForModalForm.comment}
              </Form.Text>
            </Modal.Title>
          </Modal.Header>
        ) : null}

        <Modal.Body>{cards}</Modal.Body>

        <Modal.Footer>
          <Button onClick={handlePreviousModal}>Back to Album Info</Button>
          {/* <Button
            type="submit"
            color="purple"
            onClick={songReviewSubmitHandler}
          >
            Submit Review
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AlbumFormModal;
