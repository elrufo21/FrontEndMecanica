import {
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
import CreateItemModal from "./Modals/create";
import { sendData } from "Helpers/Helpers";
import DataTable from "react-data-table-component";
import InventoryModalUpdate from "./Modals/update";
const Inventory = () => {
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [dataModalUpdate, setDataModalUpdate] = useState({});
  const [types, setType] = useState([]);
  const [modalType, setModalType] = useState();
  const [isPaint, setIsPaint] = useState(true);
  const [dataForm, setDataForm] = useState({});
  const [newType, setNewType] = useState(true);

  const toggle = () => {
    setModal(!modal);
  };
  const toggleUpdate = () => {
    setModalUpdate(!modalUpdate);
    console.log(data);
  };
  useEffect(() => {
    const fetchData = async () => {
      setData(await getData("http://backendmecanica-production.up.railway.app/api/inventory"));
      setType(await getData("http://backendmecanica-production.up.railway.app/api/types"));
    };
    fetchData();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    let rs = {};
    if (newType === false) {
      setType([...types, { id: types.length, name: dataForm.new_type }]);
      sendData(
        { name: dataForm.new_type },
        "http://backendmecanica-production.up.railway.app/api/types",
        false,
        "POST"
      );
      rs = {
        item_type_id: types.length + 1,
        name: dataForm.name,
        description: dataForm.description,
        quantity: dataForm.quantity,
        price: dataForm.price,
        color: dataForm.color,
      };
      sendData(rs, "http://backendmecanica-production.up.railway.app/api/inventory", false, "POST");
      toggle();
    } else {
      rs = {
        item_type_id: dataForm.item_type_id,
        name: dataForm.name,
        description: dataForm.description,
        quantity: dataForm.quantity,
        price: dataForm.price,
        color: dataForm.color,
      };
      sendData(rs, "http://backendmecanica-production.up.railway.app/api/inventory", false, "POST");
    }

    setDataForm({});

    setData([
      ...data,
      {
        id: data.length + 1,
        item_type_id: parseInt(dataForm.type),
        name: dataForm.name,
        quantity: dataForm.quantity,
        price: dataForm.price,
        description: dataForm.description,
        color: dataForm.color,
      },
    ]);
  };
  const handleChange = (e) => {
    setDataForm({ ...dataForm, [e.target.name]: e.target.value });
  };
  const selectHandleChange = (e) => {
    setDataForm({ ...dataForm, [e.target.name]: e.target.value });

    if (e.target.value === "2") {
      setIsPaint(false);
      setNewType(true);
    } else if (e.target.value === "nuevo") {
      setNewType(false);
      setIsPaint(false);
    } else {
      setIsPaint(true);

      setNewType(true);
    }
  };
  const handleChangeUpdate = (e) => {
    setDataModalUpdate({ ...dataModalUpdate, [e.target.name]: e.target.value });
  };
  const selectHandleChangeUpdate = (e) => {
    setDataModalUpdate({ ...dataModalUpdate, [e.target.name]: e.target.value,id_type:e.target.value });
    console.log(dataModalUpdate)
  };
  const handleToggle = (e) => {
    e.preventDefault();
    toggle();
  };
  const handleToggleUpdate = (e, id) => {
    const d = data.find((i) => i.id == id);
    setDataModalUpdate(d);
    e.preventDefault();
    toggleUpdate();
  };
  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Tipo",
      cell: (row) => {
        const type = row.item_type_id;
        let content = {};
        if (type === 2) {
          content = {
            text: "Pintura " + row.color,
          };
        } else {
          content = {
            text: row.name,
          };
        }

        return <span>{content.text}</span>;
      },
    },
    {
      name: "Precio",
      selector: (row) => "S/." + row.price,
      sortable: true,
    },
    {
      name: "Descripcion",
      selector: (row) => row.description,
    },
    {
      name: "Cantidad",
      cell: (row) => {
        const type = row.item_type_id;
        let content = {};
        if (type === 2) {
          content = {
            text: row.quantity + "L",
          };
        } else {
          content = {
            text: row.quantity,
          };
        }

        return <span>{content.text}</span>;
      },
    },
    {
      name: "Acciones",
      cell: (row) => (
        <Row>
          <Col xl="6" className="d-flex justify-content-center">
            <ButtonGroup>
              <Button
                color="warning"
                className="dropdown-toggle text-overflow-ellipsis"
                onClick={(e) => handleToggleUpdate(e, row.id)}
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
        </Row>
      ),
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
                    <h3 className="mb-0">Inventario</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      onClick={(e) => handleToggle(e)}
                      size="sm"
                    >
                      Añadir articulo
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <DataTable
                data={data}
                columns={columns}
                pagination
                responsive
                pointerOnHover
              />
            </Card>
          </div>
        </Row>
      </Container>
      <CreateItemModal
        toggle={toggle}
        isOpen={modal}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        selectHandleChange={selectHandleChange}
        types={types}
        newType={newType}
        isPaint={isPaint}
      />
      <InventoryModalUpdate
        data={dataModalUpdate}
        toggle={toggleUpdate}
        isOpen={modalUpdate}
        handleSubmit={handleSubmit}
        handleChange={handleChangeUpdate}
        selectHandleChange={selectHandleChangeUpdate}
        types={types}
        newType={newType}
        isPaint={isPaint}
      />
    </>
  );
};

export default Inventory;
