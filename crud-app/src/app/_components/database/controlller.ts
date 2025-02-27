import type { NextRequest } from "next/server";
import Users from "model/user";

// Removido 'useStyleRegistry' pois não está sendo utilizado

// GET: http://localhost:3000/api/hello/users
export async function getUsers(_req: NextRequest) {
    try {
        const users = await Users.find({}).exec(); // Uso de exec() para garantir um retorno adequado

        if (!users || users.length === 0) {
            return new Response(
                JSON.stringify({ error: "No Data Found" }),
                { status: 404, headers: { "Content-Type": "application/json" } }
            );
        }

        return new Response(
            JSON.stringify(users),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        return new Response(
            JSON.stringify({ error: error instanceof Error ? error.message : "Erro desconhecido" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}

// GET: Busca um usuário por ID
export async function getUser(req: NextRequest) {
    try {
        const userId = req.nextUrl.searchParams.get("userId");

        if (!userId) {
            return new Response(
                JSON.stringify({ error: "ID do usuário não fornecido" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        const user = await Users.findById(userId).exec();
        if (!user) {
            return new Response(
                JSON.stringify({ error: "Usuário não encontrado" }),
                { status: 404, headers: { "Content-Type": "application/json" } }
            );
        }

        return new Response(
            JSON.stringify(user),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );

    } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        return new Response(
            JSON.stringify({ error: "Erro interno ao buscar usuário" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}

// POST: http://localhost:3000/api/hello/users
export async function postUsers(req: NextRequest) {
    try {
        const formData: unknown = await req.json();

        if (typeof formData !== "object" || formData === null) {
            return new Response(
                JSON.stringify({ error: "Dados inválidos" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        const newUser = await Users.create(formData);
        return new Response(
            JSON.stringify(newUser),
            { status: 201, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error("Erro ao criar usuário:", error);
        return new Response(
            JSON.stringify({ error: error instanceof Error ? error.message : "Erro desconhecido" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}

// PUT: http://localhost:3000/api/hello/users/id
export async function putUsers(req: NextRequest) {
    try {
        const userId = req.nextUrl.searchParams.get("userId");
        const formData: unknown = await req.json();

        if (!userId || typeof formData !== "object" || formData === null) {
            return new Response(
                JSON.stringify({ error: "Parâmetros inválidos" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        const user = await Users.findByIdAndUpdate(userId, formData, { new: true }).exec();

        if (!user) {
            return new Response(
                JSON.stringify({ error: "Usuário não encontrado" }),
                { status: 404, headers: { "Content-Type": "application/json" } }
            );
        }

        return new Response(
            JSON.stringify(user),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
        return new Response(
            JSON.stringify({ error: error instanceof Error ? error.message : "Erro ao atualizar usuário" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}

// DELETE: http://localhost:3000/api/hello/users/id
export async function deleteUsers(req: NextRequest) {
    try {
        const userId = req.nextUrl.searchParams.get("userId");

        if (!userId) {
            return new Response(
                JSON.stringify({ error: "Parâmetro 'userId' é obrigatório" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        const user = await Users.findByIdAndDelete(userId).exec();

        if (!user) {
            return new Response(
                JSON.stringify({ error: "Usuário não encontrado" }),
                { status: 404, headers: { "Content-Type": "application/json" } }
            );
        }

        return new Response(
            JSON.stringify({ message: `Usuário ${userId} deletado com sucesso`, data: user }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );

    } catch (error) {
        console.error("Erro ao deletar usuário:", error);
        return new Response(
            JSON.stringify({ error: error instanceof Error ? error.message : "Erro ao deletar usuário" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}

        


