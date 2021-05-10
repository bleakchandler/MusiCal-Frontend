import React, { useState, useEffect } from "react";
import "./AlbumFormModal.css";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const SongReviewModal = ({
  albumInfoForModalForm,
  albumSongsInfoForModalForm,
  hideSongsRatingModal,
  setRerender,
  showModal,
  songsRatingModalIsOpen,
}) => {
  const [starRating, setStarRating] = useState("");
  const [comment, setComment] = useState("");

  const handleAlbumReview = ({ starRating, comment }) => {
    console.log(starRating, comment);
    fetch(`http://localhost:3000/albums/${albumInfoForModalForm.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        rating: starRating,
        comment: comment,
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((r) => r.json())
      .then((data) => setRerender(data));
  };

  var cards = albumSongsInfoForModalForm.map(function (card) {
    return (
      <li>
        {card.title}
        <Modal.Body>
          <Form>
            {["radio"].map((type) => (
              <div key={`inline-${type}`} className="mb-3">
                <Form.Check
                  inline
                  label="1"
                  name="group1"
                  type={type}
                  id={`inline-${type}-1`}
                  value={starRating}
                  onChange={(e) => setStarRating(1)}
                />
                <Form.Check
                  inline
                  label="2"
                  name="group1"
                  type={type}
                  id={`inline-${type}-2`}
                  value={starRating}
                  onChange={(e) => setStarRating(2)}
                />
                <Form.Check
                  inline
                  label="3"
                  name="group1"
                  type={type}
                  id={`inline-${type}-3`}
                  value={starRating}
                  onChange={(e) => setStarRating(3)}
                />
                <Form.Check
                  inline
                  label="4"
                  name="group1"
                  type={type}
                  id={`inline-${type}-4`}
                  value={starRating}
                  onChange={(e) => setStarRating(4)}
                />
                <Form.Check
                  inline
                  label="5"
                  name="group1"
                  type={type}
                  id={`inline-${type}-5`}
                  value={starRating}
                  onChange={(e) => setStarRating(5)}
                />
                <br />
                <br />
                <Form.Group controlId="exampleForm">
                  <Form.Label>Comment</Form.Label>
                  <Form.Control
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </Form.Group>
              </div>
            ))}
          </Form>
        </Modal.Body>
      </li>
    );
  });

  const albumReviewSubmitHandler = (e) => {
    hideSongsRatingModal();
    e.preventDefault();
    handleAlbumReview({ starRating, comment });
    setRerender(e);
  };

  function handlePreviousModal() {
    showModal();
    hideSongsRatingModal();
  }

  return (
    <>
      <Modal
        size="small"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={songsRatingModalIsOpen}
        onHide={hideSongsRatingModal}
        onSubmit={albumReviewSubmitHandler}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Review Songs from {albumInfoForModalForm.title} by{" "}
            {albumInfoForModalForm.artist}
            <br />
          </Modal.Title>
        </Modal.Header>

        <Modal.Header>
          <p>{cards}</p>
        </Modal.Header>

        <Modal.Footer>
          <Button onClick={handlePreviousModal}>Back to Album Info</Button>
          <Button
            type="submit"
            color="purple"
            onClick={albumReviewSubmitHandler}
          >
            Submit Review
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SongReviewModal;
