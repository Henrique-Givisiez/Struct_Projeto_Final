import { useState } from "react";
import Header from "../components/header";
import "./login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "", // Corrigindo a chave para coincidir com o backend
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao realizar login");
      }

      // Armazena o token no localStorage
      localStorage.setItem("token", data.token);

      alert("Login realizado com sucesso!");
      // Redirecionar para outra página se necessário
      window.location.href = "/CRUD/funcionarios"; // Ajuste conforme necessário
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="login-container">
      <Header />
      <div className="login-background">
        <div className="login-box">
          <h2>Fazer Login</h2>
          {errorMessage && <p className="error">{errorMessage}</p>}
          <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Digite seu email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label>Senha</label>
            <input
              type="password"
              name="password" // Alterado para corresponder ao backend
              placeholder="Digite sua senha"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <button type="submit">Entrar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
