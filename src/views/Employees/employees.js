import {
  Badge,
  Card,
  CardHeader,
  Container,
  Row,
  Button,
  Col,
  ButtonGroup,
} from "reactstrap";
import { useEffect, useState } from "react";
import { getData } from "Helpers/Helpers";
import Header from "components/Headers/Header";
import { sendData } from "Helpers/Helpers";
import EmployeeModalCreate from "./modals/create";
import NewTypeEmployee from "./modals/createNewTypeEmployee";
import DataTable from "react-data-table-component";
const Employees = () => {
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [datos, setDatos] = useState([]);
  const [modalType, setModalType] = useState(false);
  const [dataTypeEmployee, setDataTypeEmployee] = useState({});
  const [employeeType, setemployeeType] = useState([]);
  const [DataForm, setDataForm] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    let url = "";
    if (e.target.id === "create") {
      setDatos([
        ...datos,
        {
          name: DataForm.name,
          surnames: DataForm.surnames,
          salary: DataForm.salary,
          rol: DataForm.rol,
        },
      ]);
      url = "http://localhost:8080/api/employee";
      sendData(DataForm, url, false, "POST");
    } else if (e.target.id === "type") {
      url = "http://localhost:8080/api/typeEmployee";
      sendData(dataTypeEmployee, url, false, "POST");
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "type") {
      setDataTypeEmployee({ name: e.target.value });
    } else {
      setDataForm({
        ...DataForm,
        [e.target.name]: e.target.value,
      });
    }
  };

  const toggle = () => {
    setModal(!modal);
  };
  const toggleType = () => {
    setModalType(!modalType);
  };
  useEffect(() => {
    const fetchData = async () => {
      setData(await getData("http://localhost:8080/api/employees"));
      setemployeeType(await getData("http://localhost:8080/api/employeeType"));
    };
    fetchData();
    console.log(data);
  }, []);
  const handleToggle = () => {
    toggle();
  };
  const columns = [
    { name: "id", selector: (datos) => datos.name, sortable: true },
    { name: "surnames", selector: (datos) => datos.surnames, sortable: true },
    { name: "salary", selector: (datos) => datos.salary, sortable: true },
    { name: "rol", selector: (datos) => datos.typeEmployee, sortable: true },
    {
      name: "Estado",
      cell: (row) => {
        const estado = row.status;
        let cellStyles = {};

        if (estado === 1) {
          cellStyles = {
            color: "primary",
          };
        } else if (estado === 0) {
          cellStyles = {
            color: "danger",
          };
        }
        return (
          <Badge color={cellStyles.color}>
            {row.status === 1 ? "Activo" : row.status === 0 ? "No Activo" : ""}
          </Badge>
        );
      },
    },
    {
      name: "acciones",
      cell: (datos) => [
        <Row>
          <Col xl="6" className="d-flex justify-content-center">
            <ButtonGroup>
              <Button
                color="warning"
                className="dropdown-toggle text-overflow-ellipsis"
              >
                Editar
              </Button>
              <Button
                color="success"
                className="dropdown-toggle text-overflow-ellipsis"
              >
                Ver
              </Button>
            </ButtonGroup>
          </Col>
        </Row>,
      ],
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
                    <Button
                      color="primary"
                      onClick={(e) => handleToggle()}
                      size="sm"
                    >
                      Nuevo empleado
                    </Button>
                  </div>
                  <div className="col text-right">
                    <Button color="primary" onClick={toggleType} size="sm">
                      Nuevo tipo de empleado
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <DataTable columns={columns} data={data} responsive pagination  />
            
            </Card>
          </div>
        </Row>
      </Container>
      <EmployeeModalCreate
        toggle={toggle}
        isOpen={modal}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        data={employeeType}
      />
      <NewTypeEmployee
        toggle={toggleType}
        isOpen={modalType}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default Employees;
