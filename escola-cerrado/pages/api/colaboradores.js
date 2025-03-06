import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    const funcionarios = await prisma.funcionario.findMany();
    return res.status(200).json(funcionarios);
  }

  if (req.method === "POST") {
    const { nome, profissao, foto } = req.body;
    if (!nome || !profissao) {
      return res.status(400).json({ error: "Nome e profissão são obrigatórios" });
    }
    
    const novoFuncionario = await prisma.funcionario.create({
      data: { nome, profissao, foto },
    });

    return res.status(201).json(novoFuncionario);
  }

  if (req.method === "DELETE") {
    const { id } = req.body;
    if (!id) return res.status(400).json({ error: "ID é obrigatório" });

    await prisma.funcionario.delete({ where: { id } });

    return res.status(204).end();
  }

  return res.status(405).json({ error: "Método não permitido" });
}
