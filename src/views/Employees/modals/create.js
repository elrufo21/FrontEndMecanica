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
const EmployeeModalCreate = ({ toggle, isOpen,handleChange,handleSubmit,data }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Nuevo empleado</ModalHeader>
      <ModalBody>
        <Form onSubmit={(e) => handleSubmit(e)} id="create">
          <FormGroup row>
            <Label for="name" sm={2}>
              Nombre
            </Label>
            <Col sm={10}>
              <Input
                id="name"
                name="name"
                placeholder="Nombres"
                type="text"
                onChange={(e) => handleChange(e)}
                required
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="surnames" sm={2}>
              Apellidos
            </Label>
            <Col sm={10}>
              <Input
                id="surnames"
                name="surnames"
                placeholder="Apellidos"
                type="text"
                onChange={(e) => handleChange(e)}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="salary" sm={2}>
              Salario
            </Label>
            <Col sm={10}>
              <Input
                id="salary"
                name="salary"
                placeholder="Salario"
                type="number"
                onChange={(e) => handleChange(e)}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="rol" sm={2}>
              Rol
            </Label>
            <Col sm={10}>
              <Input
                id="id_rol"
                name="id_rol"
                placeholder="id_rol"
                type="select"
                onChange={(e) => handleChange(e)}
              >
                <option value={0}>Selecciona</option>
                {data.map(d=>(
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </Input>
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
  );
};
export default EmployeeModalCreate;
