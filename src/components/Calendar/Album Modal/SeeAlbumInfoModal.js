import React, { useState, useEffect } from "react";
import "./AlbumFormModal.css";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDataLayerValue } from "../../DataLayer.js";

const AlbumFormModal = ({
  hideModal,
  showModal,
  isOpen,
  albumInfoForModalForm,
  setRerender,
  showAlbumRatingModal,
  generateNewRandomAlbum,
  currentDayID,
  albumSongsInfoForModalForm,
}) => {
  const [{ albumTracks }, dispatch] = useDataLayerValue();

  function openSpotifyLink() {
    window.open(albumInfoForModalForm.spotify_link);
  }

  function handleNextModal() {
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

  console.log("albumInfoForModalForm", albumSongsInfoForModalForm);

  var cards = albumSongsInfoForModalForm.map(function (card) {
    return <li>{card.title}</li>;
  });

  return (
    <>
      <Modal
        size="small"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={isOpen}
        onHide={hideModal}
        style={{ color: "gray" }}
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
        </Modal.Body>

        <Modal.Header>
           <p>{cards}</p>
        </Modal.Header>

        <Modal.Footer>
          <Button onClick={openSpotifyLink}>Spotify</Button>

          {checkForAlbumRefreshButton() ? (
            <Button onClick={generateNewRandomAlbumHelper}>
              Get New Album
            </Button>
          ) : null}

          <Button onClick={handleNextModal}>Add or Update Review</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AlbumFormModal;
