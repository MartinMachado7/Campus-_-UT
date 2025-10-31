import { LogoutFirebase, loginWithEmailPassword, registerUserWithEmailPassword, singInWithGoogle } from "../../../src/firebase/Providers";
import { checkingCredentials, login, logout } from "../../../src/store/auth";
import { checkingAuthentication, startCreatingUserWithEmailPassword, startGoogleSingIn, startLoginWithEmailPassword, startLogout } from "../../../src/store/auth/Thunks";
import { clearNotesLougout } from "../../../src/store/journal/journalSlice";
import { demoUser, notAunthenticatedState } from "../../fixtures/authFixtures";
jest.mock('../../../src/firebase/Providers');

describe('Pruebas en los AuthThunks.', () => { 

    const dispatch = jest.fn();

    beforeEach(()=> jest.clearAllMocks());

    test('debe de invocar el chekingCredentials.', async() => {

        
        await checkingAuthentication()(dispatch);
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials()); 

    });

    test('startGoogleSingIn debe de llamar el chekingCreadentials y login.', async() => { 
       
        const loginDate = {ok: true, ...demoUser};

        await singInWithGoogle.mockResolvedValue(loginDate);
        await startGoogleSingIn()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login(loginDate));

    
    });
    test('startGoogleSingIn debe de llamar el chekingCreadentials y loguot.', async() => { 
       
        const loguotDate = {ok: false, errorMessage: 'Google error'};

        await singInWithGoogle.mockResolvedValue(loguotDate);
        await startGoogleSingIn()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout(loguotDate.errorMessage));

    
    });

    test('startLoginWithEmailPassword debe de llamar chekingCredentials y login-exito', async() => { 
        const LoginData = {ok: true, ...demoUser};
        const formData = {email: demoUser.email, password: '12w@345'};

        await loginWithEmailPassword.mockResolvedValue(LoginData);

        await startLoginWithEmailPassword(formData)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials()); 
        expect(dispatch).toHaveBeenCalledWith(login(LoginData)); 

    });
    test('startLoginWithEmailPassword debe de llamar chekingCredentials y logout-false', async() => { 
        const loguotDate = {ok: false, errorMessage: 'error en starloginwithemailandpassword'};

        await loginWithEmailPassword.mockResolvedValue(loguotDate);
        await startLoginWithEmailPassword(logout)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout(loguotDate));
    
    });
    

    test('startLogout debe de llamar logoutFirebase, clearNotes y logout', async() => { 
        
        await startLogout()(dispatch);
        
        expect(LogoutFirebase).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledWith(clearNotesLougout());
        expect(dispatch).toHaveBeenCalledWith(logout());
        
    });
    test('startCreatingUserWithEmailPassword debe de llamar checkingCredentials y login.exito', async() => { 
        const LoginData = {ok: true, ...demoUser};
        const formData = {email: demoUser.email, password: '12w@345', displayName:'Martin'};

        await registerUserWithEmailPassword.mockResolvedValue(LoginData);

        await startCreatingUserWithEmailPassword(formData)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login(LoginData)) 

    });
    test('startCreatingUserWithEmailPassword debe de llamar chekingCredentials y logout-false', async() => { 
        const loguotDate = {ok: false, errorMessage: 'error en startCreatingUserWithEmailPassword'};

        await registerUserWithEmailPassword.mockResolvedValue(loguotDate);
        await startCreatingUserWithEmailPassword(logout)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout(loguotDate.errorMessage));
    
    });
});