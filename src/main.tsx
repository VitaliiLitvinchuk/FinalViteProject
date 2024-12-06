import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from './store/index.ts'
import { getUserFromLocalStorage } from './utils/user-specific/localStorage.tsx'
import { ILoginUser, LoginActionTypes } from './features/user-pages/login/types.ts'

const user = getUserFromLocalStorage();

if (user) {
    const currentUser: ILoginUser = JSON.parse(user);

    store.dispatch({ type: LoginActionTypes.LOGIN, payload: currentUser });
}

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </StrictMode>,
)
