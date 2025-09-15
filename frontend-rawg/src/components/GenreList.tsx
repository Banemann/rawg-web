import useGenres from '../hooks/useGenres';
import { Link } from '@chakra-ui/react';

const GenreList = () => {
  const { data: genres, error, isLoading } = useGenres();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', fontSize: '1.2rem', gap: '0.5rem' }}>
      {genres.map((genre) => (
        <Link key={genre.id}>{genre.name}</Link>
      ))}
    </div>
  )
}

export default GenreList