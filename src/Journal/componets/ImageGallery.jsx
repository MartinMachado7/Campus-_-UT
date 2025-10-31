import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

export const ImageGallery = ({images}) => {
  return (
    <ImageList sx={{width:'100%', height: '100%'}} cols={3} rowHeight='auto'>
      {images.map((image) => (
        <ImageListItem key={image}>
          <img
            src={`${image}?w=248&fit=crop&auto=format`}
            srcSet={`${image}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt='Imagen de la nota'
            loading="lazy"
          />
          {/* <ImageListItemBar
            title={image}
            subtitle={image}

          /> */}
        </ImageListItem>
      ))}
    </ImageList>
  );
}


