export const initiaState = {
    status: 'checking', // 'checking', 'not-authenticated', 'authenticated'
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,

};
export const aunthenticatedState = {
    status: 'authenticated', // 'checking', 'not-authenticated', 'authenticated'
    uid: '21212121',
    email: 'atomic@gmail.com',
    displayName: 'no te creas',
    photoURL: 'https://demo.jpg',
    errorMessage: null,

};
export const notAunthenticatedState = {
    status: 'not-authenticated', // 'checking', 'not-authenticated', 'authenticated'
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,

};

export const demoUser ={
    uid: '1212222 ',
    email:'master@gmail.com',
    displayName: 'pocoNob777',
    photoURL: 'https://mart.jpg',
}