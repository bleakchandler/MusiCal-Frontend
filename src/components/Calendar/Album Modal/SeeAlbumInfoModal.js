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
  showModal2,
  generateNewRandomAlbum,
  currentDayID,
}) => {
  
  function openSpotifyLink() {
    window.open(albumInfoForModalForm.album.spotify_link);
  }

  console.log("current days data", albumInfoForModalForm)

  function handleNextModal() {
    showModal2();
    hideModal();
  }

  function generateNewRandomAlbumHelper() {
    generateNewRandomAlbum();
  }

  function checkForAlbumRefreshButton() {
    if (albumInfoForModalForm.album.id == currentDayID) {
      return true;
    }
  }

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
            {albumInfoForModalForm.album.title} by {albumInfoForModalForm.album.artist}
            <Form.Text className="text-muted">
              Released {albumInfoForModalForm.album.release_date}
              <br />
            </Form.Text>
          </Modal.Title>
        </Modal.Header>

        {albumInfoForModalForm.album.rating ? (
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              {albumInfoForModalForm.album.rating ? (
                <Form.Text className="font-weight-bold">
                  {albumInfoForModalForm.album.rating} Stars
                </Form.Text>
              ) : null}
              <Form.Text className="font-weight-normal">
                {albumInfoForModalForm.album.comment}
              </Form.Text>
            </Modal.Title>
          </Modal.Header>
        ) : null}

        <Modal.Body>
          <img class="w-100" src={albumInfoForModalForm.album.album_art} />
          {/* <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros.
          </p> */}
        </Modal.Body>

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
