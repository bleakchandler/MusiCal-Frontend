import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Modal.css";

const SongsReviewListModal = ({
  hideSongsRatingModal,
  showModal,
  songsRatingModalIsOpen,
  chosenSongToBeReviewed,
  setActivateRerender,
}) => {
  const [starRating, setStarRating] = useState("");
  const [comment, setComment] = useState("");
  const handleSongReview = ({ starRating, comment }) => {
    console.log(starRating, comment);
    fetch(`http://localhost:3000/songs/${chosenSongToBeReviewed.id}`, {
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
      .then((data) => setActivateRerender(data));
  };

  const songReviewSubmitHandler = (e) => {
    e.preventDefault();
    handleSongReview({ starRating, comment });
    hideSongsRatingModal();
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
        onSubmit={songReviewSubmitHandler}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Review {chosenSongToBeReviewed.title}
          </Modal.Title>
        </Modal.Header>

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

        <Modal.Footer>
          <Button onClick={handlePreviousModal}>Back to Album Info</Button>
          <Button
            type="submit"
            color="purple"
            onClick={songReviewSubmitHandler}
          >
            Submit Review
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SongsReviewListModal;
