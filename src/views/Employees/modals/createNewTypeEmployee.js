import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Col,
  Input,
  Button,
} from "reactstrap";
const NewTypeEmployee = ({ toggle, isOpen, handleChange, handleSubmit }) => {
  return (
    <>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Nuevo tipo </ModalHeader>
        <ModalBody>
          <Form onSubmit={(e) => handleSubmit(e)} id="type">
            <FormGroup row>
              <Label for="name" sm={2}>
                Tipo
              </Label>
              <Col sm={10}>
                <Input
                  id="name"
                  name="type"
                  placeholder="Tipo de empleado"
                  type="text"
                  onChange={(e) => handleChange(e)}
                  required
                />
              </Col>
            </FormGroup>
            <FormGroup check row>
              <Col
                sm={{
                  offset: 2,
                  size: 10,
                }}
              >
                <Button>Submit</Button>
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default NewTypeEmployee;
