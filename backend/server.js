const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();
app.use(express.json());
app.use(cors());

const SECRET_KEY = "secret_key"; // Nunca deixe isso exposto em produção!

// Rota para login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.administrador.findUnique({ where: { email } });

  if (!user) return res.status(400).json({ error: "Usuário não encontrado!" });

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) return res.status(400).json({ error: "Senha incorreta!" });

  const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
    expiresIn: "1h",
  });

  res.json({ message: "Login bem-sucedido!", token });
});

// Iniciar o servidor
app.listen(5000, () => console.log("Servidor rodando na porta 5000"));
