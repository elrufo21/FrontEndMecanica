import { Alert } from "reactstrap";
const AlertsComponents = ({ data }) => {
  return (
    <>
      <Alert className={data.typeAlert }>
        <strong>{data.statusMessage}</strong>{data.message}      </Alert>
    </>
  );
};
export default AlertsComponents;
