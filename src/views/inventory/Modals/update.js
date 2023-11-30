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
const InventoryModalUpdate = ({
  data,
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
                value={data.name}
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
                  <option
                    key={t.id}
                    value={t.id}
                    selected={data.item_type_id === t.id ? true : false}
                  >
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
                disabled={data.id_type==2?false:true}
                value={data.color}
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
                value={data.quantity}
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
                value={data.price}
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

              value={data.description}
              onChange={(e) => handleChange(e)}
            />
          </FormGroup>
          <FormGroup check row>
            <Col sm={{ size: 12 }}>
              <Button color="primary" block>
                Actualizar
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default InventoryModalUpdate;
