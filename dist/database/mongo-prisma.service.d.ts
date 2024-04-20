import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient as MongoPrismaClient } from '@prisma/client';
export declare class MongoPrismaService extends MongoPrismaClient implements OnModuleInit, OnModuleDestroy {
    private readonly logger;
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
}
