import { getData } from "Helpers/Helpers";
import Header from "components/Headers/Header";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Label,
  Table,
} from "reactstrap";
const TicketsView = () => {
  const [listItems, setListItems] = useState([]);
  const [data, setData] = useState([]);
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        // Verifica si id tiene un valor antes de hacer la solicitud
        const result = await getData("http://localhost:8080/api/ticket/" + id);
        const resultTicketInventory = await getData(
          "http://localhost:8080/api/ticketInventory/" + id
        );
        setData(result);
        setListItems(resultTicketInventory);
      }
    };

    fetchData();
    console.log(data);
  }, [id]);

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-4 mb-xl-0" xl="12">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col-6 col-xl-6">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Cliente
                    </h6>
                    <h2 className="text-white mb-0">Informacion del cliente</h2>
                  </div>
                  <div className="col-6 col-xl-6 text-right">
                    {/* Agrega contenido adicional aquí si es necesario */}
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Formulario */}

                <Form>
                  <Row>
                    <Col xl="6">
                      <FormGroup>
                        <Label for="name">Nombre</Label>
                        <Input
                          type="text"
                          name="name"
                          id="name"
                          value={data.name}
                          disabled
                        />
                      </FormGroup>
                    </Col>
                    <Col xl="6">
                      <FormGroup>
                        <Label for="surnames">Apellido</Label>
                        <Input
                          type="text"
                          name="surnames"
                          id="surnames"
                          value={data.surnames}
                          disabled
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col xl="6">
                      <FormGroup>
                        <Label for="dni">DNI</Label>
                        <Input
                          type="text"
                          name="dni"
                          id="dni"
                          value={data.dni}
                          disabled
                        />
                      </FormGroup>
                    </Col>
                    <Col xl="6">
                      <FormGroup>
                        <Label for="phone">Telefono</Label>
                        <Input
                          type="text"
                          name="phone"
                          id="phone"
                          value={data.phone}
                          disabled
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row className="align-items-center">
                    <div className="col-6 col-xl-6">
                      <h6 className="text-uppercase text-light ls-1 mb-1">
                        Vehiculo
                      </h6>
                      <h2 className="text-white mb-0">Sales value</h2>
                    </div>
                    <div className="col-6 col-xl-6 text-right">
                      {/* Agrega contenido adicional aquí si es necesario */}
                    </div>
                  </Row>
                  <Row>
                    <Col xl="6">
                      <FormGroup>
                        <Label for="plate">Placa</Label>
                        <Input
                          type="text"
                          name="plate"
                          id="plate"
                          value={data.plate}
                          disabled
                        />
                      </FormGroup>
                    </Col>
                    <Col xl="6">
                      <FormGroup>
                        <Label for="brand">Marca</Label>
                        <Input
                          type="text"
                          name="brand"
                          id="brand"
                          value={data.brand}
                          disabled
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col xl="6">
                      <FormGroup>
                        <Label for="model">Modelo</Label>
                        <Input
                          type="text"
                          name="model"
                          id="model"
                          value={data.model}
                          disabled
                        />
                      </FormGroup>
                    </Col>
                    <Col xl="6">
                      <FormGroup>
                        <Label for="color">Color</Label>
                        <Input
                          type="text"
                          name="color"
                          id="color"
                          value={data.color}
                          disabled
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row className="align-items-center">
                    <div className="col-6 col-xl-6">
                      <h6 className="text-uppercase text-light ls-1 mb-1">
                        Informacion del trabajo
                      </h6>
                      <h2 className="text-white mb-0">Sales value</h2>
                    </div>
                    <div className="col-6 col-xl-6 text-right">
                      {/* Agrega contenido adicional aquí si es necesario */}
                    </div>
                  </Row>
                  <Row>
                    <Col xl="12">
                      <FormGroup>
                        <Label for="employee">Empleado</Label>
                        <Input
                          type="text"
                          name="employee"
                          id="employee"
                          value={
                            data.name_employee + " " + data.surnames_employee
                          }
                          disabled
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row className="align-items-center">
                    <div className="col-6 col-xl-6">
                      <h6 className="text-uppercase text-light ls-1 mb-1">
                        Articulos a usar
                      </h6>
                      <h2 className="text-white mb-0">Sales value</h2>
                    </div>
                    <div className="col-6 col-xl-6 text-right">
                      {/* Agrega contenido adicional aquí si es necesario */}
                    </div>
                  </Row>
                  <Row>
                    <Col xl="12">
                      <FormGroup>
                        <Label for="description">Descripcion</Label>
                        <Input
                          id="description"
                          name="description"
                          rows="3"
                          type="textarea"
                          value={data.description}
                          disabled
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col xl="12">
                      <Card className="shadow">
                        <CardHeader className="border-0">
                          <h3 className="mb-0">Articulos</h3>
                        </CardHeader>
                        <Table
                          className="align-items-center table-flush"
                          responsive
                        >
                          <thead className="thead-light">
                            <tr>
                              <th scope="col">ID</th>
                              <th scope="col">Item</th>
                              <th scope="col">Cantidad</th>
                            </tr>
                          </thead>
                          <tbody>
                            {listItems.map((i) => (
                              <tr>
                                <td>{i.inventory_id}</td>
                                <td>{i.inventory_name}</td>
                                <td>{i.ticket_inventory_quantity}</td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </Card>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default TicketsView;
