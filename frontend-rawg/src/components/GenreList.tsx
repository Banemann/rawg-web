import useGenres from '../hooks/useGenres';
import { List, ListItem, Image, HStack, Text } from '@chakra-ui/react';
import getCroppedImageUrl from '../services/image-url';

const GenreList = () => {
  const { data: genres, error } = useGenres();

  if (error) return <div>{error}</div>;

  return (
    <List>
      {genres.map((genre) => (
        <ListItem key={genre.id} padding="5px">
          <HStack>
            <Image src={getCroppedImageUrl(genre.image_background)} alt={genre.name} boxSize="32px" borderRadius={8} objectFit="cover"/>
            <Text fontSize="lg">{genre.name}</Text>
          </HStack> 
          </ListItem>
      ))}
    </List>
  )
}

export default GenreList