import React, { useState, useEffect } from "react";
import "./AlbumFormModal.css";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const AlbumFormModal = ({
  hideModal,
  showModal,
  isOpen,
  albumInfoForModalForm,
  setRerender,
  showModal2,
}) => {
  const [starRating, setStarRating] = useState("");
  const [comment, setComment] = useState("");

  // if (albumInfoForModalForm.length > 0) {
  //   const releaseDate = albumInfoForModalForm.release_date;
  //   // debugger;
  //   console.log(albumInfoForModalForm);
  // }

  function openSpotifyLink() {
    window.open(albumInfoForModalForm.spotify_link);
  }

  function handleNextModal() {
    showModal2();
    hideModal();
  }


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
            {/* <br /> */}
            <Form.Text className="text-muted">
              Released {albumInfoForModalForm.release_date}
              <br />
              {/* Genre: {albumInfoForModalForm.genre} */}
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
        </Modal.Header>) : null}

        <Modal.Body>
          <img class="w-100" src={albumInfoForModalForm.album_art} />
          {/* <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros.
          </p> */}
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={openSpotifyLink}>Spotify</Button>
          <Button onClick={hideModal}>Get New Album</Button>
          <Button onClick={handleNextModal}>Add Review</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AlbumFormModal;
