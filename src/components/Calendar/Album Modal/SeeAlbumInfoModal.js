import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDataLayerValue } from "../../DataLayer.js";
import "./Modal.css";

const AlbumFormModal = ({
  hideModal,
  showModal,
  isOpen,
  albumInfoForModalForm,
  setRerender,
  showAlbumRatingModal,
  showSongsRatingModal,
  generateNewRandomAlbum,
  currentDayID,
  albumSongsInfoForModalForm,
  rerender,
  setChosenSongToBeReviewed,
  chosenSongToBeReviewed,
}) => {
  function openSpotifyLink() {
    window.open(albumInfoForModalForm.spotify_link);
  }

  function handleClickToSongReview(data) {
    setChosenSongToBeReviewed(data);
    showSongsRatingModal();
    hideModal();
  }

  function handleGoToAlbumReviewModal() {
    showAlbumRatingModal();
    hideModal();
  }

  function generateNewRandomAlbumHelper() {
    generateNewRandomAlbum();
  }

  function checkForAlbumRefreshButton() {
    if (albumInfoForModalForm.id == currentDayID) {
      return true;
    }
  }

  var cards = albumSongsInfoForModalForm.map(function (card) {
    return (
      <li type="1">
        {card.title}

        {card.rating || card.comment ? (
          <p>
            {card.rating ? (
              <p className="font-weight-bold">
                {card.rating} Stars
              </p>
            ) : null}
            <p className="font-weight-normal">{card.comment}</p>
          </p>
        ) : null}

        <Button
          onClick={() => handleClickToSongReview(card)}
          style={{ marginLeft: 390 }}
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
        show={isOpen}
        onHide={hideModal}
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

        <Modal.Body>
          <img class="w-100" src={albumInfoForModalForm.album_art} />
          {/* <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros.
          </p> */}
          <p>
            <br />
            {cards}
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={openSpotifyLink}>Spotify</Button>

          {checkForAlbumRefreshButton() ? (
            <Button onClick={generateNewRandomAlbumHelper}>New Album</Button>
          ) : null}

          <Button onClick={handleGoToAlbumReviewModal}>Review Album</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AlbumFormModal;
