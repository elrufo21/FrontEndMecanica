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
  ModalFooter,
} from "reactstrap";
const CreateItemModal = ({
  toggle,
  isOpen,
  handleSubmit,
  handleChange,
  selectHandleChange,
  types,
  newType,
  isPaint,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      size="lg"
      className="modal-dialog-centered modal-dialog-scrollable"
    >
      <ModalHeader>Nuevo Articulo</ModalHeader>
      <ModalBody>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <FormGroup row>
            <Label for="name" sm={12}>
              Nombre
            </Label>
            <Col sm={12}>
              <Input
                id="name"
                name="name"
                placeholder="Nombre"
                type="text"
                onChange={(e) => handleChange(e)}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="type" sm={12}>
              Tipo
            </Label>
            <Col sm={12}>
              <Input
                id="type"
                name="item_type_id"
                type="select"
                onChange={(e) => selectHandleChange(e)}
              >
                <option value={0}>Tipo</option>
                {types.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
                <option value={"nuevo"}>Nuevo</option>
              </Input>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="new_type" sm={12}>
              Nuevo Tipo
            </Label>
            <Col sm={12}>
              <Input
                id="new_type"
                name="new_type"
                placeholder="Tipo"
                type="text"
                disabled={newType}
                onChange={(e) => handleChange(e)}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="color" sm={12}>
              Color
            </Label>
            <Col sm={12}>
              <Input
                id="color"
                name="color"
                placeholder="Color"
                type="text"
                disabled={isPaint}
                onChange={(e) => handleChange(e)}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="quantity" sm={12}>
              Cantidad
            </Label>
            <Col sm={12}>
              <Input
                id="quantity"
                name="quantity"
                placeholder="Cantidad"
                type="number"
                onChange={(e) => handleChange(e)}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="price" sm={12}>
              Precio
            </Label>
            <Col sm={12}>
              <Input
                id="price"
                name="price"
                placeholder="Precio"
                type="number"
                step={0.1}
                onChange={(e) => handleChange(e)}
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Label for="description">Descripción</Label>
            <Input
              id="description"
              name="description"
              type="textarea"
              onChange={(e) => handleChange(e)}
            />
          </FormGroup>
          <FormGroup check row>
            <Col sm={{ size: 12 }}>
              <Button color="primary" block>
                Crear
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default CreateItemModal;
