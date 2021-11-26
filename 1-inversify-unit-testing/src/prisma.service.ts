import { PrismaClient } from ".prisma/client"
import { injectable, decorate } from "inversify"

decorate(injectable(), PrismaClient)

@injectable()
export class PrismaService extends PrismaClient {}
