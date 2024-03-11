import Home from "./components/Home/Home"
import FormRegister from "./components/Form/Form"
import Users from "./components/Users/Users"

let routes = [
    { path: '/Ticket-manager/', element: <Home /> },
    { path: '/Ticket-manager/form', element: <FormRegister /> },
    { path: '/Ticket-manager/users', element: <Users /> }
]

export default routes;