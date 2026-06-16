import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './entities/service.entity';
import { UsersService } from '../users/users.service';
import { CreateServiceDto } from './dto/create-service.dto';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
    private readonly usersService: UsersService,
  ) {}

  async create(createServiceDto: CreateServiceDto, providerId: number): Promise<Service> {
    const provider = await this.usersService.findById(providerId);
    if (!provider) {
      throw new NotFoundException('Proveedor no encontrado');
    }

    const service = this.serviceRepository.create({
      ...createServiceDto,
      provider,
    });

    const savedService = await this.serviceRepository.save(service);
    
    // Omit provider details we don't want to leak (like password) in response
    delete (savedService.provider as any).password;
    return savedService;
  }

  async findAllPublic() {
    const services = await this.serviceRepository.find({
      relations: { provider: true },
    });

    return services.map((s) => ({
      id: s.id,
      title: s.title,
      category: s.category,
      description: s.description,
      price: s.price,
      freelancer: s.provider ? s.provider.name : 'Desconocido',
    }));
  }
}
