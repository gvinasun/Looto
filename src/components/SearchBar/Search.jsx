import React from "react";
import { Form, FormControl, Button } from "react-bootstrap";

// Buscador creado como un componente independiente para que se pueda usar en otros

// Permite buscar al pulsar Enter
const Search = ({ search, setSearch, onSearch }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSearch();
    }
  };

  return (
    <Form
      className="d-flex mx-auto"
      onSubmit={(e) => {
        e.preventDefault();
        onSearch();
      }}
    >
      <FormControl
        type="search"
        placeholder="Buscar"
        className="me-2"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button variant="outline-dark" type="submit">
        BUSCAR
      </Button>
    </Form>
  );
};

export default Search;
