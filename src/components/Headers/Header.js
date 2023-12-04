import { getData } from "Helpers/Helpers";
import { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

const Header = () => {
  const [data, setData] = useState([]);
  const [customerP, setCustomerP] = useState(0);
  const [profits, setProfits] = useState({
    data: { costo_mes_actual: 0, costo_mes_anterior: 0 },
  });
  const [dataEmployee, setDataEmployee] = useState({data:{}});
  useEffect(() => {
    const fetchData = async () => {
      setData(await getData("http://backendmecanica-production.up.railway.app/api/customers/count"));
      if (data.mesAnterior === 0) {
        setCustomerP(data.actual * 100);
      } else {
        setCustomerP((data.actual * 100) / data.mesAnterior);
      }
      setProfits(await getData("http://backendmecanica-production.up.railway.app/api/analytics/incoming"));
      setDataEmployee(
        await getData("http://backendmecanica-production.up.railway.app/api/analytic/employee")
      );
    };
    fetchData();

    console.log(data);
  }, []);

  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Clientes
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {data.actual}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-chart-bar" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fa fa-arrow-up" /> {customerP}%
                      </span>{" "}
                      <span className="text-nowrap">Ganancia mensual</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Ingresos
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {profits.data.costoMesActual}%
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="fas fa-chart-pie" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span
                        className={
                          profits.data.porcentajeGananciaPerdida >= 0
                            ? "text-success mr-2"
                            : "text-danger mr-2"
                        }
                      >
                        <i
                          className={
                            profits.data.porcentajeGananciaPerdida >= 0
                              ? "fas fa-arrow-up"
                              : "fas fa-arrow-down"
                          }
                        />
                        {profits.data.porcentajeGananciaPerdida}%
                      </span>
                      <span className="text-nowrap">Ganancia/Perdida</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Tickets
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">10</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                          <i className="fas fa-users" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-warning mr-2">
                        <i className="fas fa-arrow-down" /> 1.10%
                      </span>{" "}
                      <span className="text-nowrap">Perdida/Ganancia</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Empleado del mes
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">x</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="fas fa-percent" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        2
                      </span>{" "}
                      <span className="text-nowrap">Trabajos al mes</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
