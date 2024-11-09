import { Routes } from 'react-router';
import './App.css';
import { Navigate, Route } from 'react-router-dom'
import rootPath, { routes } from './routes'
import Layout from './components/layout'
import rolesAccess from './utils/user-specific/roles-access';

const accessLevel = rolesAccess.guest;
const App = () => {
  return (
    <Routes>
      <Route path={rootPath} element={<Layout />}>
        {
          routes.map(x =>
            accessLevel.includes(x.accessLevel) &&
            (
              x.nested ? x.nested.map(x2 =>
                accessLevel.includes(x2.accessLevel) &&
                (
                  x2.component && (
                    <Route
                      key={`${x2.path}`}
                      path={`${x.path}${x2.path}`}
                      element={<x2.component />} />
                  )
                ))
                :
                x.component &&
                <Route
                  key={x.path}
                  path={x.path}
                  element={<x.component />} />
            )
          )
        }
      </Route>
      <Route path='*' element={<Navigate to={rootPath} />} />
    </Routes>
  );
}

export default App
