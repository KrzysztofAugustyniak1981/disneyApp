import ReactDOM from "react-dom";
import styled from "styled-components";
import { useCharacter } from "../../hooks/useCharacter";

const Overlay = styled.div`
  position: fixed; top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex; justify-content: center; align-items: center;
`;

const Content = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  border-radius: 12px;
  width: 400px;
  max-width: 90%;
  text-align: center;
`;

const Image = styled.img`
  width: 150px; height: 150px;
  border-radius: 50%;
  object-fit: cover;
`;

const CloseButton = styled.button`
  margin-top: 25px;   /* 🔥 TU ustawiasz odstęp */
  padding: 8px 12px;
  border: none;
  border-radius: 8px;
  background: ${({ theme }) => theme.buttonBackground};
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

function CharacterModal({ id, onClose }) {
  const { character, loading, error } = useCharacter(id);

  if (loading) return null;
  if (error) return <p>{error}</p>;
  if (!character) return null;

  return ReactDOM.createPortal(
    <Overlay onClick={onClose}>
      <Content onClick={(e) => e.stopPropagation()}>
        <Image
          src={character.imageUrl || "https://via.placeholder.com/150"}
          alt={character.name}
          onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
        />
        <h2>{character.name}</h2>
        {character.films && character.films.length > 0 && (
          <div><strong>Films:</strong> {character.films.join(", ")}</div>
        )}

        {character.shortFilms && character.shortFilms.length > 0 && (
          <div><strong>Short Films:</strong> {character.shortFilms.join(", ")}</div>
        )}

        {character.tvShows && character.tvShows.length > 0 && (
          <div><strong>TV Shows:</strong> {character.tvShows.join(", ")}</div>
        )}

        {character.videoGames && character.videoGames.length > 0 && (
          <div><strong>Video Games:</strong> {character.videoGames.join(", ")}</div>
        )}
        <CloseButton onClick={onClose}>Close</CloseButton>
      </Content>
    </Overlay>,
    document.getElementById("modal-root")
  );
}

export default CharacterModal;