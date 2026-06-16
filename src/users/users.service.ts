import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService implements OnModuleInit {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async onModuleInit() {
    const emailToSeed = 'freelancerEsenMarco@example.com';
    const exists = await this.userRepository.findOne({ where: { email: emailToSeed } });
    
    if (!exists) {
      this.logger.log(`No se encontró el usuario ${emailToSeed}. Sembrando...`);
      const defaultUser = this.userRepository.create({
        email: emailToSeed,
        name: 'Marco Mazzini',
        password: 'Pepe123',
      });
      await this.userRepository.save(defaultUser);
      this.logger.log(`Usuario sembrado con éxito: ${emailToSeed} / Pepe123`);
    } else {
      this.logger.log(`El usuario ${emailToSeed} ya existe en la base de datos.`);
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findById(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }
}
