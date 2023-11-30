import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
  Button,
  Col,
  ButtonGroup,
} from "reactstrap";
import { useEffect, useState } from "react";
import { getData, sendData } from "Helpers/Helpers";
import Header from "components/Headers/Header";
import TicketsView from "./Modals/view";
import DataTable from "react-data-table-component";
import AlertsComponents from "components/AlertsComponent";
const Tickets = () => {
  const [data, setData] = useState([]);
  const [dataModalView, setDataModalView] = useState([
    {
      id: 1,
      status: 2,
      description: "Reparación de motor",
      creation_date: "2023-09-19T15:00:00.000Z",
      last_update_date: "2023-09-20T19:30:00.000Z",
      customer_id: 1,
      name: "John Doe",
      surnames: "Doe",
      dni: "123456789",
      phone: "+51 999 999 999",
      employee_id: 1,
      name_employee: "Sarah",
      surnames_employee: "Connor 123",
      vehicle_id: 1,
      plate: "ABC123",
      brand: "Toyota",
      model: "Camry",
      color: "Blue",
    },
  ]);
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  useEffect(() => {
    const fetchData = async () => {
      setData(await getData("http://localhost:8080/api/tickets"));
    };
    fetchData();
    console.log(data);
  }, []);

  const handleFilter = (id, data) => {
    const filter = data.filter((d) => d.id === id);
    return filter;
  };
  const handleClickStatus = (status, id) => {
    switch (status) {
      case 0:
        sendData(
          { status: 1, id: id },
          "http://localhost:8080/api/tickets/" + id,
          false,
          "PUT"
        );
        setData((prevData) =>
          prevData.map((item) =>
            item.id === id ? { ...item, status: 1 } : item
          )
        );
        break;
      case 1:
        sendData(
          { status: 2, id: id },
          "http://localhost:8080/api/tickets/" + id,
          false,
          "PUT"
        ).then((data) => {
          setData((prevData) =>
          prevData.map((item) =>
            item.id === id ? { ...item, status: 2 } : item
          )
        );
        });
        break;

      default:
        break;
    }
  };
  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
    },
    {
      name: "Servicio",
      selector: (row) => row.description,
    },
    {
      name: "Vehiculo",
      selector: (row) => row.brand + " " + row.model,
    },
    {
      name: "Registro",
      selector: (row) => row.creation_date,
    },
    {
      name: "Estado",
      cell: (row) => {
        const estado = row.status; // Asume que el estado está en la propiedad 'status' del objeto 'row'
        let cellStyles = {};

        // Define los estilos condicionales basados en el estado
        if (estado === 0) {
          cellStyles = {
            color: "warning",
          };
        } else if (estado === 1) {
          cellStyles = {
            color: "success",
          };
        } else if (estado === 2) {
          cellStyles = {
            color: "danger",
          };
        }

        return (
          <Badge color={cellStyles.color}>
            {row.status === 0
              ? "Por iniciar"
              : row.status === 1
              ? "Iniciado"
              : row.status === 2
              ? "En Terminado"
              : ""}
          </Badge>
          /*<div style={{ color: cellStyles.color }}>
            
          </div>*/
        );
      },
    },
    {
      name: "Acciones",
      cell: (row) => {
        let btn;
        if (row.status === 0) {
          btn = (
            <Button
              color="success"
              className="dropdown-toggle text-overflow-ellipsis"
              onClick={(e) => handleClickStatus(row.status, row.id)}
            >
              Iniciar
            </Button>
          );
        } else if (row.status === 1) {
          btn = (
            <Button
              color="default"
              className="dropdown-toggle text-overflow-ellipsis"
              onClick={(e) => handleClickStatus(row.status, row.id)}
            >
              Terminar
            </Button>
          );
        } else if (row.status === 2) {
          btn = (
            <Button
              color="danger"
              className="dropdown-toggle text-overflow-ellipsis"
              onClick={(e) => handleClickStatus(row.status)}
            >
              Eliminar
            </Button>
          );
        }
        return (
          <Row>
            <Col xl="6" className="d-flex justify-content-center">
              <ButtonGroup>
                <Button
                  color="warning"
                  className="dropdown-toggle text-overflow-ellipsis"
                  href={"tickets/edit/" + row.id}
                >
                  Editar
                </Button>
                <Button
                  color="success"
                  className="dropdown-toggle text-overflow-ellipsis"
                  href={"tickets/view/" + row.id}
                >
                  Ver
                </Button>
                {btn}
              </ButtonGroup>
            </Col>
          </Row>
        );
      },
    },
  ];
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Empleados</h3>
                  </div>
                  <div className="col text-right">
                    <Button color="primary" href="tickets/create" size="sm">
                      Crear Ticket
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <DataTable data={data} columns={columns} pagination responsive />
              {/*<Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Cliente</th>
                    <th scope="col">Telefono</th>
                    <th scope="col">Empleado</th>
                    <th scope="col">Placa</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((d) => (
                    <tr>
                      <td>{d.id}</td>
                      <td>{d.name + " " + d.surnames}</td>
                      <td>{d.phone} </td>
                      <td>{d.name_employee + " " + d.surnames_employee}</td>
                      <td>{d.plate} </td>
                      <td>
                        {d.status === 0 && (
                          <Badge color="" className="badge-dot">
                            <i className="bg-info" />
                            Por iniciar
                          </Badge>
                        )}
                        {d.status === 1 && (
                          <Badge color="" className="badge-dot mr-4">
                            <i className="bg-warning" />
                            En proceso
                          </Badge>
                        )}
                        {d.status === 2 && (
                          <Badge color="" className="badge-dot mr-4">
                            <i className="bg-success" />
                            Finalizado
                          </Badge>
                        )}
                      </td>
                      <td className="text-right">
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
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem href={"tickets/view/" + d.id}>
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
              </Table> */}
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Tickets;
