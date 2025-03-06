import React, { useState, useEffect } from "react";

const Cases = () => {
  const [cases, setCases] = useState([]);
  const [form, setForm] = useState({ evento: "", data: "", foto_evento: null });
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:5000/cases", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setCases(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === "file") {
      const file = e.target.files ? e.target.files[0] : null;
      if (file) {
        setForm({ ...form, foto_evento: file, preview: URL.createObjectURL(file) });
      }
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleAddEvent = () => {
    if (!form.evento || !form.data_evento) return;
    const formData = new FormData();
    formData.append("evento", form.evento);
    formData.append("data_evento", form.data_evento);
    formData.append("foto_evento", form.foto_evento);

    fetch("http://localhost:5000/cases", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setCases([...cases, data]);
        setForm({ evento: "", data_evento: "", foto_evento: null, preview: null });
        URL.revokeObjectURL(form.preview);
      })
      .catch((err) => alert(err.message));
  };
  const handleDelete = (id) => {
    const token = localStorage.getItem("token");
  
    fetch(`http://localhost:5000/cases/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao excluir evento");
  
        return res.status === 204 ? { message: "Evento excluído" } : res.json();
      })
      .then(() => {
        setCases(cases.filter((evento) => evento.id !== id));
      })
      .catch((err) => alert(err.message));
  };
  const formatarData = (dataIso) => {
    const dataUtc = new Date(dataIso); // Converte a string ISO para um objeto Date
    dataUtc.setMinutes(dataUtc.getMinutes() + dataUtc.getTimezoneOffset()); // Ajuste para UTC
  
    return dataUtc.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };
  
  
  
  return (
    <div className="container">
      <h2 className="title">Cases</h2>
      <div className="form-container">
        <input type="text" name="evento" placeholder="Nome do Evento" value={form.evento} onChange={handleChange} />
        <input type="date" name="data_evento" value={form.data_evento} onChange={handleChange} />
        <input type="file" name="foto_evento" accept="image/*" onChange={handleChange} />
        <button className="add-submit" onClick={handleAddEvent}>Adicionar</button>
      </div>
      {loading ? (
        <p>Carregando eventos...</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Foto</th>
              <th>Evento</th>
              <th>Data Evento</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {cases.map((evento) => (
              <tr key={evento.id}>
                <td>{evento.foto_evento ? <img src={`http://localhost:5000${evento.foto_evento}`} alt={evento.evento} className="foto-colaborador" /> : "📷"}</td>
                <td>{evento.evento}</td>
                <td>{formatarData(evento.data)}</td>
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(evento.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Cases;
