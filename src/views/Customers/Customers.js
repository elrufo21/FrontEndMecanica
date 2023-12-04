import {
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row,
  Col,
  ButtonGroup,
  Button,
} from "reactstrap";
import { useEffect, useState } from "react";
import { getData } from "Helpers/Helpers";
import Header from "components/Headers/Header";
import DataTable from "react-data-table-component";
const Customers = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setData(await getData("http://backendmecanica-production.up.railway.app/api/customers"));
    };
    fetchData();
    console.log(data);
  }, []);
  const columns = [
    { name: "ID", selector: (data) => data.id, sortable: true },
    { name: "Nombre", selector: (data) => data.name, sortable: true },
    { name: "Apellido", selector: (data) => data.surnames, sortable: true },
    { name: "DNI", selector: (data) => data.dni, sortable: true },
    { name: "Celular", selector: (data) => data.phone, sortable: true },
    {
      name: "Acciones",
      cell: (data) => [
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
                <h3 className="mb-0">Card tables</h3>
              </CardHeader>
              <DataTable columns={columns} data={data} responsive pagination />
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};
export default Customers;
