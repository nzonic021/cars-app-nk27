import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Preview(props) {
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Car preview
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Brand: {props.brand}</p>
        <p>Model: {props.model}</p>
        <p>Year: {props.year}</p>
        <p>Max speed: {props.maxspeed}</p>
        <p>Automatic: {props.isautomatic}</p>
        <p>Engine: {props.engine}</p>
        <p>Number of doors: {props.numberofdoors}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default Preview;
