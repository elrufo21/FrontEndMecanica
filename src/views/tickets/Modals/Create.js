import { useEffect, useState } from "react";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Table,
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import Header from "components/Headers/Header.js";
import { getData, sendData } from "Helpers/Helpers";

const CreateTicket = () => {
  const [Employees, setEmployees] = useState([]);
  const [type, setType] = useState([]);
  const [items, setItems] = useState([]);
  const [itemsFilter, setItemsFilter] = useState([]);
  const [stock, setStock] = useState(0);
  const [listItems, setListItems] = useState([]);
  const [itemTemporary, setItemTemporary] = useState({});
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      setEmployees(await getData("http://localhost:8080/api/activeEmploye"));
      setType(await getData("http://localhost:8080/api/types"));
      setItems(await getData("http://localhost:8080/api/inventory", false));
    };
    fetchData();
  }, []);

  const handleFileChange = (e) => console.log(e.target.files);

  const selectHandleChange = (e) => {
    //switch con el e.target.name

    switch (e.target.name) {
      case "type":
        setItemsFilter(
          items.filter((i) => i.item_type_id === parseInt(e.target.value))
        );
        setItemTemporary({ ...itemTemporary, type: e.target.value });
        break;
      case "item":
        try {
          setStock(
            itemsFilter.filter((i) => i.id === parseInt(e.target.value))[0]
              .quantity
          );
          setItemTemporary({
            name: itemsFilter.filter(
              (i) => i.id === parseInt(e.target.value)
            )[0].name,
            id: e.target.value,
          });
          console.log(itemTemporary);
        } catch (error) {
          setStock(0);
        }
        break;
      default:
        break;
    }
  };

  const handleClick = (e, id) => {
    setListItems([...listItems, itemTemporary]);
    console.log(listItems);
    reduceQuantity(itemTemporary.id);
  };
  const handleChange = (e) => {
    switch (e.target.name) {
      case "quantity":
        setItemTemporary({ ...itemTemporary, quantity: e.target.value });
        break;

      default:
        break;
    }
  };

  const reduceQuantity = (id) => {
    const updateItem = items.map((i) => {
      if (i.id === id) {
        return { ...i, quantity: i.quantity - itemTemporary.quantity };
      }
      return i;
    });
    setItemsFilter([]);
    setItems(updateItem);
    setStock(0);
    setItemTemporary({});
  };

  const formInputHandleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    const dataCustomer = {
      name: data.name,
      surnames: data.surnames,
      dni: data.dni,
      phone: data.phone,
    };
    sendData(dataCustomer, "http://localhost:8080/api/customers", false, "POST")
      .then((customerData) => {
        // Manejar los datos del cliente aquí
        console.log(customerData.id);

        const dataVehicle = {
          customer_id: customerData.id,
          plate: data.plate,
          brand: data.brand,
          model: data.model,
          color: data.color,
          vehicle_photos: [],
        };

        return sendData(
          dataVehicle,
          "http://localhost:8080/api/vehicles",
          false,
          "POST"
        );
      })
      .then((vehicleData) => {
        console.log(vehicleData);
        const dataTicket = {
          customer_id: vehicleData.customer_id,
          employee_id: data.employee,
          vehicle_id: vehicleData.id,
          status: 1,
          description: data.description,
          cost:data.cost
        };
        console.log(dataTicket);
        return sendData(
          dataTicket,
          "http://localhost:8080/api/tickets",
          false,
          "POST"
        );
      })
      .then((ticketData) => {
        const dataTicketInventory = {
          items: listItems,
          ticket_id: ticketData.id,
        };
        console.log(dataTicketInventory);
        return sendData(
          dataTicketInventory,
          "http://localhost:8080/api/ticketsInventory",
          false,
          "POST"
        );
      })

      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <>
      <Header />
      {/* Page content */}
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

                <Form
                  onSubmit={(e) => handleSubmit(e)}
                  encType="multipart/form-data"
                >
                  <Row>
                    <Col xl="6">
                      <FormGroup>
                        <Label for="name">Nombre</Label>
                        <Input
                          type="text"
                          name="name"
                          id="name"
                          onChange={(e) => formInputHandleChange(e)}
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
                          onChange={(e) => formInputHandleChange(e)}
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
                          onChange={(e) => formInputHandleChange(e)}
                        />
                      </FormGroup>
                    </Col>
                    <Col xl="6">
                      <FormGroup>
                        <Label for="phone">Telefono</Label>
                        <Input
                          type="number"
                          name="phone"
                          id="phone"
                          onChange={(e) => formInputHandleChange(e)}
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
                          onChange={(e) => formInputHandleChange(e)}
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
                          onChange={(e) => formInputHandleChange(e)}
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
                          onChange={(e) => formInputHandleChange(e)}
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
                          onChange={(e) => formInputHandleChange(e)}
                        />
                      </FormGroup>
                    </Col>
                    <Col xl="12">
                      <input
                        type="file"
                        multiple
                        onChange={(e) => handleFileChange(e)}
                      />
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
                          type="select"
                          name="employee"
                          id="employee"
                          onChange={(e) => formInputHandleChange(e)}
                        >
                          <option value="0">Seleccione un empleado</option>
                          {Employees.map((e) => (
                            <option value={e.id}>
                              {e.name + " " + e.surnames}
                            </option>
                          ))}
                        </Input>
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
                    <Col xl="8">
                      <FormGroup>
                        <Label for="description">Descripcion</Label>
                        <Input
                          id="description"
                          name="description"
                          placeholder=""
                          rows="3"
                          type="textarea"
                          onChange={(e) => formInputHandleChange(e)}
                        />
                      </FormGroup>
                    </Col>
                    <Col xl="4">
                      <Label>Costo</Label>
                      <Input type="number" name="cost" id="cost" onChange={e=>formInputHandleChange(e)} />
                    </Col>
                  </Row>
                  <Row>
                    <Col xl="6">
                      <FormGroup>
                        <Label for="type">Tipo</Label>
                        <Input
                          type="select"
                          name="type"
                          id="type"
                          onChange={(e) => selectHandleChange(e)}
                        >
                          <option value="0">Seleccione un tipo</option>
                          {type.map((t) => (
                            <option value={t.id}>{t.name}</option>
                          ))}
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col xl="6">
                      <FormGroup>
                        <Label for="item">Articulo</Label>
                        <Input
                          type="select"
                          name="item"
                          id="item"
                          onChange={(e) => selectHandleChange(e)}
                        >
                          <option value="0">Seleccione un articulo</option>
                          {itemsFilter.map((i) => (
                            <option value={i.id}>{i.name}</option>
                          ))}
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col xl="6">
                      <FormGroup>
                        <Label for="stock">Stock</Label>
                        <Input
                          type="number"
                          name="stock"
                          id="stock"
                          disabled={true}
                          value={stock}
                        />
                      </FormGroup>
                    </Col>
                    <Col xl="6">
                      <FormGroup>
                        <Label for="quantity">Cantidad</Label>
                        <Input
                          type="number"
                          name="quantity"
                          id="quantity"
                          onChange={(e) => handleChange(e)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col xl="2">
                      <Button
                        color="primary"
                        type="button"
                        onClick={(e) => handleClick(e)}
                      >
                        Añadir
                      </Button>
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
                              <th scope="col">N°</th>
                              <th scope="col">Item</th>
                              <th scope="col">Cantidad</th>
                              <th scope="col" />
                            </tr>
                          </thead>
                          <tbody>
                            {listItems.map((i) => (
                              <tr>
                                <td>{i.id}</td>
                                <td>{i.name}</td>
                                <td>{i.quantity}</td>
                                <td>
                                  <UncontrolledDropdown>
                                    <DropdownToggle
                                      className="btn-icon-only text-light"
                                      href="#pablo"
                                      role="button"
                                      size="sm"
                                      color=""
                                      onClick={(e) => e.preventDefault()}
                                    >
                                      <i className="fas fa-ellipsis-v" />
                                    </DropdownToggle>
                                    <DropdownMenu
                                      className="dropdown-menu-arrow"
                                      right
                                    >
                                      <DropdownItem
                                        href="#pablo"
                                        onClick={(e) => handleClick(e, i.id)}
                                      >
                                        Ver
                                      </DropdownItem>
                                      <DropdownItem
                                        href="#pablo"
                                        onClick={(e) => e.preventDefault()}
                                      >
                                        Another action
                                      </DropdownItem>
                                      <DropdownItem
                                        href="#pablo"
                                        onClick={(e) => e.preventDefault()}
                                      >
                                        Something else here
                                      </DropdownItem>
                                    </DropdownMenu>
                                  </UncontrolledDropdown>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </Card>
                    </Col>
                  </Row>

                  <Row className="mt-3">
                    <Col xs="6">
                      <Button
                        color="primary"
                        type="button"
                        onClick={(e) => handleSubmit(e)}
                      >
                        Registrar
                      </Button>
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

export default CreateTicket;
