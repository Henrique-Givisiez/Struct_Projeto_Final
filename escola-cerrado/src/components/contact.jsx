import { useState } from "react";
import "./contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    mensagem: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Mensagem enviada!");
    console.log("Dados do formulário:", formData);
  };

  return (
    <section className="contato-container" id="contato">
      <h2 className="contato-title">Contato</h2>
      <form className="contato-form" onSubmit={handleSubmit}>
        <label htmlFor="nome">Nome</label>
        <input type="text" id="nome" name="nome" placeholder="Digite seu nome" value={formData.nome} onChange={handleChange} required />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" placeholder="Digite seu email" value={formData.email} onChange={handleChange} required />

        <label htmlFor="telefone">Telefone</label>
        <input type="tel" id="telefone" name="telefone" placeholder="(99) 99999-9999" value={formData.telefone} onChange={handleChange} required />

        <label htmlFor="mensagem">Mensagem</label>
        <textarea id="mensagem" name="mensagem" placeholder="Digite aqui sua mensagem" value={formData.mensagem} onChange={handleChange} required />

        <button type="submit">Enviar</button>
      </form>
    </section>
  );
};

export default Contact;
