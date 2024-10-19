import { Injectable, Inject } from '@nestjs/common'; // Certifique-se de importar Inject
import { Prisma, CreditCard } from '@prisma/client';
import { randomUUID } from 'crypto';
import { PrismaService } from 'src/prisma_service';
import { ClientProxy } from '@nestjs/microservices'; // Importando ClientProxy

@Injectable()
export class CreditCardService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('NOTIFICATION_SERVICE') private rabbitClient: ClientProxy, // Adicionando o ClientProxy
  ) {}

  async create(data: Prisma.CreditCardCreateInput): Promise<CreditCard> {
    const creditCard = await this.prisma.creditCard.create({ data });

    this.sendRegisterPaymentNotification(JSON.stringify(creditCard));

    return creditCard;
  }

  sendRegisterPaymentNotification(message: string) {
    try {
      this.rabbitClient.emit('register', {
        id: randomUUID(),
        data: { notification: message },
      });
    } catch (error) {
      console.error(error);
    }
  }

  async processPayment(payment: CreditCard) {
    setTimeout(
      () => this.sendConfirmationPaymentNotification(JSON.stringify(payment)),
      10000,
    );
  }

  sendConfirmationPaymentNotification(message: string) {
    try {
      this.rabbitClient.emit('confirmation', {
        id: randomUUID(),
        data: { notification: message },
      });
    } catch (error) {
      console.error(error);
    }
  }
}
