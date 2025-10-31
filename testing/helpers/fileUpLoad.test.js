import { v2 as cloudinary } from 'cloudinary'
import { fileUpLoad } from "../../src/helpers/fileUpLoad";

cloudinary.config({
    cloud_name: 'dxogghbsv',
    api_key:'526622774239951',
    api_secret:'iCaFt2QPh5FRIrxZmX7nXc_XfJM',
    secure: true
})

describe('pruebas en el file upload(carga de archivos)', () => { 
    
    test('debe de subir el archivo correctamente a claudinary', async() => {
        
        const imagenUrl='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1IeYBN05o8IgBtr0rdj4MgMeo6HW3g1FmKA&usqp=CAU';
        const resp =await fetch(imagenUrl);
        const blob = await resp.blob();
        const file = new File([blob], 'foto.jpg'); 

        const url = await fileUpLoad(file);

        expect(typeof url).toBe('string');
        // console.log(url);
        const segments = url.split('/');    
        // console.log(segments);
        const imageId = segments[segments.length -1].replace('.jpg','');  
        // console.log({imageId});
        const  cloudResp =await cloudinary.api.delete_resources(['journal-_-/' + imageId], {
            resource_type: 'image'
        });
        // console.log({cloudResp});
        

    });

    test('debe de retornar Null', async() => { 
        const file = new File([], 'foto.jpg');

        const url = await fileUpLoad(file)
        expect(url).toBe(null); 
    });


});