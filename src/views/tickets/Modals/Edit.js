import { sendData } from "Helpers/Helpers";
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
  Button,
  
} from "reactstrap";
const EditTicket = () => {
  const [listItems, setListItems] = useState([]);
  const [data, setData] = useState([]);
  const [items, setItems] = useState([]);
  const [itemsFilter, setItemsFilter] = useState([]);
  const [itemTemporary, setItemTemporary] = useState({});
  const [itemsInventory, setItemsInventory] = useState([]);


  const [type, setType] = useState([]);
  const [stock, setStock] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        // Verifica si id tiene un valor antes de hacer la solicitud
        const result = await getData("http://backendmecanica-production.up.railway.app/api/ticket/" + id);
        const resultTicketInventory = await getData(
          "http://backendmecanica-production.up.railway.app/api/ticketInventory/" + id
        );
        setType(await getData("http://backendmecanica-production.up.railway.app/api/types"));
        setItems(await getData("http://backendmecanica-production.up.railway.app/api/inventory", false));
        setData(result);
        setListItems(resultTicketInventory);
      }
    };

    fetchData();
  }, [id]);
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
            inventory_name: itemsFilter.filter(
              (i) => i.id === parseInt(e.target.value)
            )[0].name,
            inventory_id: e.target.value,
          });
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
    setItemsInventory([...itemsInventory, itemTemporary]);
    reduceQuantity(parseInt(itemTemporary.inventory_id));
  };
  const reduceQuantity = (id) => {
    const updateItem = items.map((i) => {
      if (i.id === id) {
        return {
          ...i,
          quantity:
            i.quantity - parseInt(itemTemporary.ticket_inventory_quantity),
        };
      }
      return i;
    });

    setItemsFilter([]);
    setItems(updateItem);
    setStock(0);
    setItemTemporary({});
  };
  const handleChange = (e) => {
    if (e.target.name === "quantity") {
      setItemTemporary({
        ...itemTemporary,
        ticket_inventory_quantity: e.target.value,
      });
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    sendData(
      { description: data.description, cost: data.cost },
      "http://backendmecanica-production.up.railway.app/api/updateTicket/" + id,
      false,
      "PUT"
    ).then((dataTicket) => {
      if (itemsInventory.length > 0) {
        const rs = itemsInventory.map((i) => {
          return {
            ticket_id: data.id,
            id: i.inventory_id,
            quantity: i.ticket_inventory_quantity,
          };
        });
        const dataTicketInventory = {
          items: rs,
          ticket_id: id,
        };
        console.log(dataTicketInventory);
        sendData(
          dataTicketInventory,
          "http://backendmecanica-production.up.railway.app/api/ticketsInventory",
          false,
          "POST"
        ).then((response) => {
         
        });
      } else {
     
      }
    });
  };
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

                <Form onSubmit={(e) => handleSubmit(e)}>
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
                    <Col xl="8">
                      <FormGroup>
                        <Label for="description">Descripcion</Label>
                        <Input
                          id="description"
                          name="description"
                          rows="3"
                          type="textarea"
                          value={data.description}
                          onChange={(e) => handleChange(e)}
                        />
                      </FormGroup>
                    </Col>
                    <Col xl="4">
                      <Label>Costo</Label>
                      <Input
                        type="number"
                        name="cost"
                        id="cost"
                        value={data.cost}
                        onChange={(e) => handleChange(e)}
                      />
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
                          onChange={(e) => handleChange(e)}
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
                  <Row className="mt-3">
                    <Col xs="6">
                      <Button
                        color="primary"
                        type="button"
                        onClick={(e) => handleSubmit(e)}
                      >
                        Actualizar
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
export default EditTicket;
