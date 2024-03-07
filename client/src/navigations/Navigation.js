import React from 'react'
import { BrowserRouter , Routes , Route} from "react-router-dom"
import ROUTES from './Routes'
function Navigation() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path={ROUTES.about.name} element={ROUTES.about.component}></Route>
        <Route path={ROUTES.contact.name} element={ROUTES.contact.component}></Route>
        <Route path={ROUTES.department.name} element={ROUTES.department.component}></Route>
        <Route path={ROUTES.departmentAdmin.name} element={ROUTES.departmentAdmin.component}></Route>
        <Route path={ROUTES.home.name} element={ROUTES.home.component}></Route>
        <Route path={ROUTES.login.name} element={ROUTES.login.component}></Route>
        <Route path={ROUTES.product.name} element={ROUTES.product.component}></Route>
        <Route path={ROUTES.productAdmin.name} element={ROUTES.productAdmin.component}></Route>
        <Route path={ROUTES.register.name} element={ROUTES.register.component}></Route>
        <Route path={ROUTES.support.name} element={ROUTES.support.component}></Route>
        <Route path={ROUTES.universityAdmin.name} element={ROUTES.universityAdmin.component}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default Navigation