import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import Customers from "views/Customers/Customers";
import Employees from "views/Employees/employees";
import Tickets from "views/tickets/tickets";
import CreateTicket from "views/tickets/Modals/Create";
import Inventory from "views/inventory/inventory";
import TicketsView from "views/tickets/Modals/view";
import Customer from "views/Customers/Views/Customer";
import EditTicket from "views/tickets/Modals/Edit";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
  },
  {
    path: "/tickets",
    name: "Tickets",
    icon: "ni ni-pin-3 text-orange",
    component: <Tickets />,
    layout: "/admin",
  },
  {
    path: "/inventory",
    name: "Inventario",
    icon: "ni ni-planet text-blue",
    component: <Inventory />,
    layout: "/admin",
  },
  {
    path: "/employees",
    name: "Empleados",
    icon: "ni ni-single-02 text-yellow",
    component: <Employees />,
    layout: "/admin",
  } /*
  {
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-red",
    component: <Tables />,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: <Login />,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: <Register />,
    layout: "/auth",
  },*/,
  {
    path: "/icons",
    name: "Iconos",
    icon: "ni ni-circle-08 text-pink",
    component: <Icons />,
    layout: "/auth",
  },
  {
    path: "/customers",
    name: "Clientes",
    icon: "ni ni-user-run",
    component: <Customers />,
    layout: "/admin",
  },
  {
    path: "/tickets/create",
    component: <CreateTicket />,
    layout: "/admin",
  },
  {
    path: "/tickets/edit/:id",
    component: <EditTicket />,
    layout: "/admin",
  },
  {
    path: "/tickets/view/:id",
    component: <TicketsView />,
    layout: "/admin",
  },
  {
    path: "/customers/customer/:id",
    component: <Customer />,
    layout: "/admin",
  },
];
export default routes;
