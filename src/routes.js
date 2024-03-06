import Home from "./components/Home/Home"
import FormRegister from "./components/Form/Form"
import Users from "./components/Users/Users"

let routes = [
    { path: '/', element: <Home /> },
    { path: '/form', element: <FormRegister /> },
    { path: '/users', element: <Users /> }
]

export default routes;