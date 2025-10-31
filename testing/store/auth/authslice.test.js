import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { aunthenticatedState, demoUser, initiaState, notAunthenticatedState } from "../../fixtures/authFixtures";

describe('Pruebas en el authSlice.', () => { 

    test('Debe de regresar el estado inicial y llamarse "auth".', () => { 
        const state = authSlice.reducer(initiaState, {});
        
        expect(state).toEqual(initiaState);
        expect(authSlice.name).toBe('auth');

    });

    test('Debe de realizar la autenticación.', () => { 
        // console.log(login(demoUser));
        
        const state = authSlice.reducer(initiaState, login(demoUser) );
        expect(state).toEqual({
            status: 'authenticated', // 'checking', 'not-authenticated', 'authenticated'
            uid: demoUser.uid,
            email: demoUser.email,
            displayName: demoUser.displayName,
            photoURL: demoUser.photoURL,
            errorMessage: null,
        }) 
    });

    test('Debe de realizar el loguot sin argumentos.', () => { 
        // console.log(logout(notAunthenticatedState));

        const state = authSlice.reducer(aunthenticatedState, logout());

        expect(state).toEqual({
            status: 'not-authenticated', 
            uid: null,
            email:null,
            displayName:null,
            photoURL:null,
            errorMessage: undefined,
        })
    });

    
    test('Debe de realizar el loguot y mostrar un mensaje de error.', () => { 
        const errorMessage ='Credenciales no son correctas. ';
        const state = authSlice.reducer(aunthenticatedState, logout({errorMessage}));

        expect(state).toEqual({
            status: 'not-authenticated', 
            uid: null,
            email:null,
            displayName:null,
            photoURL:null,
            errorMessage: errorMessage,
        })

    });

    test('debe de cambiar el estado a checking', () => { 
        const state = authSlice.reducer(aunthenticatedState, checkingCredentials());

        expect(state.status).toBe('checking');

    })

});