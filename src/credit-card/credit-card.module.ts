import { Module } from '@nestjs/common';
import { CreditCardService } from './credit-card.service';
import { CreditCardController } from './credit-card.controller';
import { ClientsModule, Transport } from '@nestjs/microservices'; // Importando o Transport
import { PrismaService } from 'src/prisma_service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NOTIFICATION_SERVICE',
        transport: Transport.RMQ, // Usando o transport para RMQ
        options: {
          urls: ['amqp://admin:123456@localhost'],
          queue: 'notification',
          noAck: true,
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [CreditCardController],
  providers: [CreditCardService, PrismaService],
})
export class CreditCardModule {}
