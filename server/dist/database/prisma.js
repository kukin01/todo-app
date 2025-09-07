"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const borgen_1 = require("borgen");
const client_1 = require("@prisma/client");
const globalForPrisma = global;
const prisma = globalForPrisma.prisma ??
    new client_1.PrismaClient({
        log: ['info', 'warn', 'error'], // Enable Prisma logs
    });
exports.prisma = prisma;
if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma;
}
// Test connection
async function testConnection() {
    try {
        await prisma.$connect();
        borgen_1.Logger.info({
            message: '✅ Prisma connected to the database successfully!',
        });
    }
    catch (error) {
        borgen_1.Logger.error({ message: '❌ Error connecting to the database: ' + error });
        process.exit(1);
    }
}
testConnection();
// Graceful shutdown
process.on('SIGINT', async () => {
    await prisma.$disconnect();
    borgen_1.Logger.error({ message: '🚪 Prisma disconnected.' });
    process.exit(0);
});
//# sourceMappingURL=prisma.js.map