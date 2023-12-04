import { getData } from "Helpers/Helpers";
import Header from "components/Headers/Header";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Col,
  Container,
  Row,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Input,
} from "reactstrap";

const Customer = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        // Verifica si id tiene un valor antes de hacer la solicitud
        const result = await getData(
          "http://backendmecanica-production.up.railway.app/api/customer/" + id
        );

        setData(result[0]);
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
            <Row>
              <div className="col">
                <Card className="shadow ">
                  <CardHeader className="border-0">
                    <h3 className="mb-0">{data.name + " " + data.surnames}</h3>
                  </CardHeader>
                  <CardBody>
                    <Row className="mt-5">
                      <Col className="mb-5 mb-xl-0" xl="4">
                        <Card className="shadow bg-default">
                          <CardHeader className="border-0">Cliente</CardHeader>
                          <CardBody>
                            <Row className="d-flex justify-content-center">
                              <FormGroup>
                                <Input
                                  disabled
                                  value={data.name + " " + data.surnames}
                                ></Input>
                              </FormGroup>
                              <FormGroup>
                                <Input disabled value={data.dni}></Input>
                              </FormGroup>
                              <FormGroup>
                                <Input disabled value={data.phone}></Input>
                              </FormGroup>
                              <FormGroup>
                                <Input
                                  disabled
                                  value={data.registration_date}
                                ></Input>
                              </FormGroup>
                            </Row>
                          </CardBody>
                        </Card>
                      </Col>
                      <Col xl="8">
                        <Card className="shadow bg-default">
                          <CardHeader className="border-0">Vehiculo</CardHeader>
                          <CardBody>
                            <Row>
                              <Col xl="6">
                                <FormGroup>
                                  <Input disabled value={data.plate}></Input>
                                </FormGroup>
                              </Col>
                              <Col xl="6">
                                <FormGroup>
                                  <Input disabled value={data.brand}></Input>
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col xl="6">
                                <FormGroup>
                                  <Input disabled value={data.model}></Input>
                                </FormGroup>
                              </Col>
                              <Col xl="6">
                                <FormGroup>
                                  <Input disabled value={data.color}></Input>
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col xl="6" className="text-center">
                                <img
                                  src="https://www.streamscheme.com/wp-content/uploads/2022/02/sadge-600.png"
                                  alt="img"
                                  width={100}
                                  height={100}
                                  className="mx-auto"
                                />
                              </Col>
                              <Col xl="6" className="text-center">
                                <img
                                  src="https://www.streamscheme.com/wp-content/uploads/2022/02/sadge-600.png"
                                  alt="img"
                                  width={100}
                                  height={100}
                                  className="mx-auto"
                                />
                              </Col>
                            </Row>
                            <Row>
                              <Col xl="6" className="text-center">
                                <img
                                  src="https://www.streamscheme.com/wp-content/uploads/2022/02/sadge-600.png"
                                  alt="img"
                                  width={100}
                                  height={100}
                                  className="mx-auto"
                                />
                              </Col>
                              <Col xl="6" className="text-center">
                                <img
                                  src="https://www.streamscheme.com/wp-content/uploads/2022/02/sadge-600.png"
                                  alt="img"
                                  width={100}
                                  height={100}
                                  className="mx-auto"
                                />
                              </Col>
                            </Row>
                            <Row>
                              <Col xl="6" className="text-center">
                                <img
                                  src="https://www.streamscheme.com/wp-content/uploads/2022/02/sadge-600.png"
                                  alt="img"
                                  width={100}
                                  height={100}
                                  className="mx-auto"
                                />
                              </Col>
                              <Col xl="6" className="text-center">
                                <a
                                  target="_blank"
                                  href="https://www.streamscheme.com/wp-content/uploads/2022/02/sadge-600.png"
                                >
                                  <img
                                    src="https://www.streamscheme.com/wp-content/uploads/2022/02/sadge-600.png"
                                    alt="img"
                                    width={100}
                                    height={100}
                                    className="mx-auto"
                                  />
                                </a>
                              </Col>
                            </Row>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </div>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Customer;
