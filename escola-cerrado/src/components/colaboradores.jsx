import React, { useState, useEffect } from "react";
import "./colaboradores.css";

const Colaboradores = () => {
  const [colaboradores, setColaboradores] = useState([]);
  const [form, setForm] = useState({ nome: "", profissao: "", foto: null });
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:5000/funcionarios", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setColaboradores(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === "file") {
      const file = e.target.files ? e.target.files[0] : null;
      if (file) {
        setForm({ ...form, foto: file, preview: URL.createObjectURL(file) });
      }
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleAddColaborador = () => {
    if (!form.nome || !form.profissao || !form.foto) return;
    const formData = new FormData();
    formData.append("nome", form.nome);
    formData.append("profissao", form.profissao);
    formData.append("foto", form.foto);

    fetch("http://localhost:5000/funcionarios", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setColaboradores([...colaboradores, data]);
        setForm({ nome: "", profissao: "", foto: null, preview: null });
        URL.revokeObjectURL(form.preview);
      })
      .catch((err) => alert(err.message));
  };
  const handleDelete = (id) => {
    const token = localStorage.getItem("token");
  
    fetch(`http://localhost:5000/funcionarios/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao excluir funcionário");
  
        // Se a resposta não tem conteúdo, apenas retorna uma mensagem fixa
        return res.status === 204 ? { message: "Funcionário excluído" } : res.json();
      })
      .then(() => {
        setColaboradores(colaboradores.filter((colab) => colab.id !== id));
      })
      .catch((err) => alert(err.message));
  };
  return (
    <div className="container">
      <h2 className="title">Colaboradores</h2>
      <div className="form-container">
        <input type="text" name="nome" placeholder="Nome Completo" value={form.nome} onChange={handleChange} />
        <input type="text" name="profissao" placeholder="Profissão" value={form.profissao} onChange={handleChange} />
        <input type="file" name="foto" accept="image/*" onChange={handleChange} />
        <button className="add-submit" onClick={handleAddColaborador}>Adicionar</button>
      </div>
      {loading ? (
        <p>Carregando funcionários...</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Foto</th>
              <th>Nome</th>
              <th>Profissão</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {colaboradores.map((colab) => (
              <tr key={colab.id}>
                <td>{colab.foto ? <img src={`http://localhost:5000${colab.foto}`} alt={colab.nome} className="foto-colaborador" /> : "📷"}</td>
                <td>{colab.nome}</td>
                <td>{colab.profissao}</td>
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(colab.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Colaboradores;
