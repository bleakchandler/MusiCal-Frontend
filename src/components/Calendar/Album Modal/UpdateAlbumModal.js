import React, { useState, useEffect } from "react";
import "./AlbumFormModal.css";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const UpdateAlbumModal = ({
  hideModal2,
  showModal2,
  isOpen2,
  albumInfoForModalForm,
  setRerender,
  showModal,
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

  function albumDeleteHandler() {
    fetch(`http://localhost:3000/albums/${albumInfoForModalForm.id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        setRerender(data);
      });
  }

  const albumReviewSubmitHandler = (e) => {
    hideModal2();
    e.preventDefault();
    handleAlbumReview({ starRating, comment });
    setRerender(e);
  };

  function openSpotifyLink() {
    window.open(albumInfoForModalForm.spotify_link);
  }

  function handlePreviousModal() {
    showModal();
    hideModal2();
  }



  return (
    <>
      <Modal
        size="small"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={isOpen2}
        onHide={hideModal2}
        onSubmit={albumReviewSubmitHandler}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Review {albumInfoForModalForm.title} by {albumInfoForModalForm.artist} 
            <br />
        
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
                <br />
                <br />
                <Form.Group controlId="exampleForm">
                  <Form.Label>Comment</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={albumInfoForModalForm.comment}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <Form.Text className="text-muted">
                    {/* Enter a comment about the album! */}
                  </Form.Text>
                </Form.Group>
              </div>
            ))}
          </Form>
          {/* <img class="w-100" src={albumInfoForModalForm.album_art} /> */}
          {/* <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros.
          </p> */}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={albumDeleteHandler}>Delete</Button>
          {/* <Button onClick={openSpotifyLink}>Spotify</Button> */}
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

export default UpdateAlbumModal;
