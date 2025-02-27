import { useState } from "react";
import Header from "../components/header";
import "./login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dados de login:", formData);
    alert("Login realizado com sucesso!");
  };

  return (
    <div className="login-container">
        <Header />
        <div className="login-background">
            <div className="login-box">
                <h2>Fazer Login</h2>
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
                        name="senha"
                        placeholder="Digite sua senha"
                        value={formData.senha}
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
