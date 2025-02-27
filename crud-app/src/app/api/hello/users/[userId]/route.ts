import type { NextRequest } from "next/server";
import connectMongo from "~/app/_components/database/conn"; 
import Users from "model/user" 

// ✅ GET: Busca um usuário por ID
export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
    try {
        await connectMongo();
        const userId = params?.userId; // ✅ Certifique-se de que `params` existe

        if (!userId) {
            return new Response(JSON.stringify({ error: "ID do usuário não fornecido" }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }

        const user = await Users.findById(userId).exec();
        if (!user) {
            return new Response(JSON.stringify({ error: "Usuário não encontrado" }), {
                status: 404,
                headers: { "Content-Type": "application/json" }
            });
        }

        return new Response(JSON.stringify(user), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });

    } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        return new Response(JSON.stringify({ error: "Erro interno no servidor" }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}

// ✅ PUT: Atualiza um usuário pelo ID
export async function PUT(req: NextRequest, { params }: { params: { userId: string } }) {
    try {
        await connectMongo();
        const userId = params?.userId;
        const formData = await req.json();

        if (!userId || typeof formData !== "object" || formData === null) {
            return new Response(JSON.stringify({ error: "Parâmetros inválidos" }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }

        const user = await Users.findByIdAndUpdate(userId, formData, { new: true }).exec();
        if (!user) {
            return new Response(JSON.stringify({ error: "Usuário não encontrado" }), {
                status: 404,
                headers: { "Content-Type": "application/json" }
            });
        }

        return new Response(JSON.stringify(user), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });

    } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
        return new Response(JSON.stringify({ error: "Erro interno no servidor" }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}

// ✅ DELETE: Remove um usuário pelo ID
export async function DELETE(req: NextRequest, { params }: { params: { userId: string } }) {
    try {
        await connectMongo();
        const userId = params?.userId;

        if (!userId) {
            return new Response(JSON.stringify({ error: "Parâmetro 'userId' é obrigatório" }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }

        const user = await Users.findByIdAndDelete(userId).exec();
        if (!user) {
            return new Response(JSON.stringify({ error: "Usuário não encontrado" }), {
                status: 404,
                headers: { "Content-Type": "application/json" }
            });
        }

        return new Response(JSON.stringify({ message: `Usuário ${userId} deletado com sucesso` }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });

    } catch (error) {
        console.error("Erro ao deletar usuário:", error);
        return new Response(JSON.stringify({ error: "Erro interno no servidor" }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}

// ✅ OPTIONS: Define métodos permitidos
export async function OPTIONS() {
    return new Response(null, {
        status: 204,
        headers: {
            "Allow": "GET, PUT, DELETE"
        }
    });
}
