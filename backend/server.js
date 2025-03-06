const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const prisma = new PrismaClient();
const app = express();
app.use(express.json());
app.use(cors());

const SECRET_KEY = "secret_key"; // Nunca exponha isso em produção!

const verificarToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Acesso negado! Token não encontrado ou mal formatado." });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Token inválido ou expirado!" });
    }

    req.user = decoded;
    next();
  });
};


// Rota para login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.administrador.findUnique({ where: { email } });

  if (!user) return res.status(400).json({ error: "Usuário não encontrado!" });

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) return res.status(400).json({ error: "Senha incorreta!" });

  const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });

  res.json({ message: "Login bem-sucedido!", token });
});

app.get("/funcionarios", async (req, res) => {
  try {
    const funcionarios = await prisma.funcionario.findMany();
    res.json(funcionarios);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar funcionários" });
  }
});

app.post("/funcionarios", verificarToken, upload.single("foto"), async (req, res) => {
  const { nome, profissao } = req.body;
  if (!nome || !profissao) return res.status(400).json({ error: "Nome e profissão são obrigatórios" });

  try {
    const novoFuncionario = await prisma.funcionario.create({
      data: {
        nome,
        profissao,
        foto: req.file ? `/uploads/${req.file.filename}` : null, // Salva a URL da imagem
      },
    });

    res.status(201).json(novoFuncionario);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar funcionário" });
  }
});


app.delete("/funcionarios/:id", verificarToken, async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.funcionario.delete({ where: { id } });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir funcionário" });
  }
});

app.get("/cases", async (req, res) => {
  try {
    const cases = await prisma.cases.findMany();
    res.json(cases);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar cases de sucesso" });
  }
});

app.post("/cases", verificarToken, upload.single("foto_evento"), async (req, res) => {
  console.log(req.body);
  const { evento, data_evento } = req.body;

  if (!evento || !data_evento) {
    return res.status(400).json({ error: "Nome do evento e data são obrigatórios" });
  }

  const dataFormatada = new Date(data_evento); // ⬅️ Converte para DateTime no formato correto
  console.log("Data formatada:", dataFormatada);

  try {
    const novoEvento = await prisma.cases.create({
      data: {
        evento,
        data: dataFormatada, // ⬅️ Agora usa "data" corretamente
        foto_evento: req.file ? `/uploads/${req.file.filename}` : null,
      },
    });

    res.status(201).json(novoEvento);
  } catch (error) {
    console.error("Erro ao criar case de sucesso:", error);
    res.status(500).json({ error: "Erro ao criar case de sucesso" });
  }
});


app.delete("/cases/:id", verificarToken, async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.cases.delete({ where: { id } });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir case de sucesso" });
  }
});

app.post("/cadastro", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email e senha são obrigatórios!" });
  }

  try {
    // Hash da senha antes de salvar no banco
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar usuário no banco usando Prisma
    const novoUsuario = await prisma.administrador.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: "Usuário cadastrado com sucesso!", usuario: novoUsuario });
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(400).json({ error: "Email já cadastrado!" });
    }
    res.status(500).json({ error: "Erro ao cadastrar usuário!" });
  }
});
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Iniciar o servidor
app.listen(5000, () => console.log("Servidor rodando na porta 5000 🚀"));
