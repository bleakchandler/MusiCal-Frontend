import React from "react";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Modal.css";

const AlbumFormModal = ({
  albumInfoForModalForm,
  showModal,
  showSongsRatingModal,
  albumSongsInfoForModalForm,
  setChosenSongToBeReviewed,
  songsRatingListModalIsOpen,
  hideSongsRatingListModal,
}) => {
  function handleClickToSongReview(data) {
    setChosenSongToBeReviewed(data);
    showSongsRatingModal();
    hideSongsRatingListModal();
  }

  function handlePreviousModal() {
    showModal();
    hideSongsRatingListModal();
  }

  function numberOfStars(rating) {
    if (rating == 1) {
      return "⭑";
    } else if (rating == 2) {
      return "⭑⭑";
    } else if (rating == 3) {
      return "⭑⭑⭑";
    } else if (rating == 4) {
      return "⭑⭑⭑⭑";
    } else if (rating == 5) {
      return "⭑⭑⭑⭑⭑";
    }
  }

  var cards = albumSongsInfoForModalForm.map(function (card) {
    return (
      <li type="1">
        {card.title}

        {card.rating || card.comment ? (
          <p>
            {card.rating ? (
              <p className="font-weight-bold">{numberOfStars(card.rating)}</p>
            ) : null}
            <p className="font-weight-normal">{card.comment}</p>
          </p>
        ) : null}

        <Button
          onClick={() => handleClickToSongReview(card)}
          style={{ marginLeft: 390, marginTop: -40 }}
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

        <Modal.Body>{cards}</Modal.Body>

        <Modal.Footer>
          <Button onClick={handlePreviousModal}>Back to Album Info</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AlbumFormModal;
