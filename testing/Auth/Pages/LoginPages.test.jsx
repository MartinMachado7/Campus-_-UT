import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { fireEvent, render, screen } from "@testing-library/react";

import { LoginPage } from "../../../src/Auth/Pages/LoginPage";
import { authSlice} from "../../../src/store/auth";
import { startGoogleSingIn } from "../../../src/store/auth/Thunks";
import { notAunthenticatedState } from "../../fixtures/authFixtures";


const mockstartGoogleSingIn = jest.fn();
const mockstartLoginWithEmailPassword = jest.fn();

jest.mock('../../../src/store/auth/Thunks', ()=>({
    startGoogleSingIn: () => mockstartGoogleSingIn,
    startLoginWithEmailPassword: ({email, password})=> {
        return () => mockstartLoginWithEmailPassword({email, password});
    }, 
}));

jest.mock('react-redux', ()=> ({
    ...jest.requireActual('react-redux'),
    useDispatch: ()=> (fn) => fn(),
}));

const store = configureStore({
    reducer: {
     auth: authSlice.reducer
    },
    preloadedState:{
     auth: notAunthenticatedState
    }
});



describe('pruebas en el LoginPages', () => { 

    beforeEach(()=> jest.clearAllMocks());

    test('debe de mostrar el componente correctamente', () => {
        render(

            <Provider store={store}>
            <MemoryRouter>
                <LoginPage/>
            </MemoryRouter>
            </Provider>
            );

        expect( screen.getAllByText('login').length ).toBeGreaterThanOrEqual(1);     
    });

    test('debe de llamar el startGoogleSingIn', () => { 
        
        render(
        <Provider store={store}>
        <MemoryRouter>
            <LoginPage/>
        </MemoryRouter>
        </Provider>
        );

       const googleBtn = screen.getByLabelText('google-btn');
       fireEvent.click(googleBtn);

       expect(mockstartGoogleSingIn).toHaveBeenCalled();
       
    });

    test('subnit debe de llamar el startLoginWithEmailPassword ', () => { 
    
        const email ='martin@gmail.com';
        const password = '123456';

        render(
            <Provider store={store}>
            <MemoryRouter>
                <LoginPage/>
            </MemoryRouter>
            </Provider>
        );

        const emailFiel = screen.getByRole('textbox', {name:'CORREO'});
        fireEvent.change(emailFiel, {target: {name: 'email', value: email}});

        const passwordFiel = screen.getByTestId('password');
        fireEvent.change(passwordFiel, {target: {name: 'password', value: password}});

        const LoginForm = screen.getByLabelText('sumit-form');
        fireEvent.submit(LoginForm);

        expect( mockstartLoginWithEmailPassword).toHaveBeenCalledWith({
        email: email,
        password: password
        })

    });
});