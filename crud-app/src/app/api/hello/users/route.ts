import type { NextRequest } from 'next/server';
import connectMongo from '~/app/_components/database/conn';
import { getUsers, postUsers, putUsers, deleteUsers } from '~/app/_components/database/controlller';

// GET
export async function GET(req: NextRequest) {
    try {
        await connectMongo();
        return await getUsers(req); // Agora retorna corretamente a Response da função
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Error in the Connection' }), { status: 404 });
    }
}

// POST
export async function POST(req: NextRequest) {
    try {
        await connectMongo(); // Conecta ao MongoDB antes de inserir dados
        return await postUsers(req); // chama a função postUsers
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Error in the Connection' }), { status: 404 });
    }
}

// PUT
export async function PUT(req: NextRequest) {
    try {
        await connectMongo(); // Conecta ao MongoDB antes de inserir dados
        return await putUsers(req); // chama a função postUsers
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Error in the Connection' }), { status: 404 });
    }
}

// DELETE
export async function DELETE(req: NextRequest) {
    try {
        await connectMongo(); // Conecta ao MongoDB antes de inserir dados
        return await deleteUsers(req); // chama a função postUsers
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Error in the Connection' }), { status: 404 });
    }
}

export async function OPTIONS() {
    return new Response(null, {
        status: 204,
        headers: {
            "Allow": "GET, POST, PUT, DELETE"
        }
    });
}