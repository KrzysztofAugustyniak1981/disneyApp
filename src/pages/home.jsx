import { useState } from "react";
import styled from "styled-components";
import { useCharacters } from "../hooks/useCharacters";
import CharacterCard from "../components/card/characterCard";
import CharacterModal from "../components/modal/characterModal";
import Loader from "../components/loader/loader";

// 🔹 layout
const Container = styled.div`
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  min-height: 100vh;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
`;

// 🔹 paginacja
const Pagination = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  gap: 8px;
`;

const PageButton = styled.button`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 1px solid #ccc;
  background: ${({ $active, theme }) =>
    $active ? theme.buttonBackground : "transparent"};
  color: ${({ $active, theme }) =>
    $active ? "#fff" : theme.text};
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: ${({ theme }) => theme.buttonBackground};
    color: #fff;
  }
`;

const NavButton = styled.button`
  padding: 6px 10px;
  border-radius: 8px;
  border: none;
  background: ${({ theme }) => theme.cardBackground};
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Dots = styled.span`
  padding: 8px;
`;

function Home({ toggleTheme }) {
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState(null);

  const { characters, loading, error, totalPages } = useCharacters(page);

  // 🔥 inteligentna paginacja
  const getPages = () => {
    const pages = [];

    if (!totalPages) return [];

    if (totalPages <= 10) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    if (page > 3) {
      pages.push("...");
    }

    for (let i = page - 2; i <= page + 2; i++) {
      if (i > 1 && i < totalPages) {
        pages.push(i);
      }
    }

    if (page < totalPages - 2) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  };

  const pages = getPages();

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  return (
    <Container>
      {/* HEADER */}
      <Header>
        <button onClick={toggleTheme}>Theme</button>
      </Header>

      {/* GRID */}
      <Grid>
        {characters.map((char) => (
          <CharacterCard
            key={char._id}
            character={char}
            onDetails={(id) => setSelectedId(id)}
          />
        ))}
      </Grid>

      {/* PAGINACJA */}
      <Pagination>
        <NavButton
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </NavButton>

        {pages.map((p, index) =>
          p === "..." ? (
            <Dots key={`dots-${index}`}>...</Dots>
          ) : (
            <PageButton
              key={`page-${p}`}
              onClick={() => setPage(p)}
              $active={page === p}
            >
              {p}
            </PageButton>
          )
        )}

        <NavButton
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </NavButton>
      </Pagination>

      {/* MODAL */}
      {selectedId && (
        <CharacterModal
          id={selectedId}
          onClose={() => setSelectedId(null)}
        />
      )}
    </Container>
  );
}

export default Home;