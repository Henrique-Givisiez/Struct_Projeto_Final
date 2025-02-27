import mongoose from 'mongoose';

const connectMongo = async () => {
    try {
        const MONGO_URI = process.env.MONGO_URI;

        console.log(' MONGO_URI:', MONGO_URI); // Depuração

        if (!MONGO_URI) {
            throw new Error(' A variável de ambiente MONGO_URI não está definida.');
        }

        // Conecta ao MongoDB
        const { connection } = await mongoose.connect(MONGO_URI, {
            dbName: 'NextjsCrud', // Substitua pelo nome do seu banco de dados
        });

        if (connection.readyState === mongoose.ConnectionStates.connected) {
            console.log('Conectado ao MongoDB');
        }
    } catch (error) {
        console.error('Erro ao conectar ao MongoDB:', error);

        return Promise.reject(error instanceof Error ? new Error(error.message) : new Error('Erro desconhecido.'));
    }
};

export default connectMongo;
