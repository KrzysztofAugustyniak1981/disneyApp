import styled from "styled-components";

const CardWrapper = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  color: ${({ theme }) => theme.text};
  border: solid black 1px;
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  transition: 0.3s;

  &:hover {
    transform: scale(1.03);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
`;

const Button = styled.button`
  margin-top: 10px;
  padding: 8px 12px;
  background: ${({ theme }) => theme.buttonBackground};
  color: ${({ theme }) => theme.text};
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    transform: scale(1.05);
    opacity: 0.9;
  }
`;

function CharacterCard({ character, onDetails }) {
  return (
    <CardWrapper>
      <Image
        src={character.imageUrl || "https://via.placeholder.com/200"}
        alt={character.name}
        onError={(e) => (e.target.src = "https://via.placeholder.com/200")}
      />
      <h3>{character.name}</h3>
      <Button onClick={() => onDetails(character._id)}>Learn More</Button>
    </CardWrapper>
  );
}

export default CharacterCard;