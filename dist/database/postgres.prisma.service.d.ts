import { OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { PrismaClient as PostgresPrismaClient } from "@prisma/client";
export declare class PostgresPrismaService extends PostgresPrismaClient implements OnModuleInit, OnModuleDestroy {
    private readonly logger;
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
}
