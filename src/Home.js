import React, { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";

const Home = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [sortOrder, setSortOrder] = useState({
    id: "asc",
    nome: "asc",
  });
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = () => {
    fetch("https://localhost:44364/api/usuarios")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao obter os usuários");
        }
        return response.json();
      })
      .then((data) => setUsuarios(data))
      .catch((error) => {
        console.error(error);
        // Aqui você pode definir um estado para indicar que ocorreu um erro
        // e mostrar uma mensagem de erro para o usuário
      });
  };

  const handleSort = (column) => {
    const newSortOrder = { ...sortOrder };
    newSortOrder[column] = newSortOrder[column] === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);

    const sortedUsuarios = [...usuarios].sort((a, b) => {
      if (column === "id") {
        return newSortOrder[column] === "asc" ? a.id - b.id : b.id - a.id;
      } else if (column === "nome") {
        return newSortOrder[column] === "asc"
          ? a.nome.localeCompare(b.nome)
          : b.nome.localeCompare(a.nome);
      } else {
        return 0;
      }
    });

    setUsuarios(sortedUsuarios);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  const filteredUsuarios = usuarios.filter((usuario) =>
    usuario.nome.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getSortIcon = (column) => {
    if (sortOrder[column] === "asc") {
      return <i className="fas fa-sort-up"></i>;
    } else {
      return <i className="fas fa-sort-down"></i>;
    }
  };

  return (
    <div>
      <header className="header">
        <nav className="navbar">
          <a href="#" className="nav-item">
            Home
          </a>
          <a href="#" className="nav-item">
            Usuários
          </a>
          <a href="#" className="nav-item">
            Configurações
          </a>
        </nav>
        <p className="header-title">ADMIN PAGE</p>
      </header>
      <h1>Lista de Usuários</h1>
      <div className="container">
        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar por nome"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <table className="user-table">
          {/* Renderize a tabela com base na lista filtrada */}
          <thead>
            <tr>
              <th onClick={() => handleSort("id")}>ID {getSortIcon("id")}</th>
              <th onClick={() => handleSort("nome")}>
                Nome {getSortIcon("nome")}
              </th>
              <th>CPF</th>
              <th>Celular</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td>{usuario.nome}</td>
                <td>{usuario.cpf}</td>
                <td>{usuario.contato?.celular}</td>
                <td>
                  <Link
                    to="/user"
                    className="action-button link-button"
                    title="Visualizar"
                  >
                    <i className="fas fa-eye"></i>
                  </Link>
                  <button className="action-button" title="Excluir">
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
