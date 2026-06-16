import { Controller, Get } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('público')
@Controller('public')
export class PublicController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get('services')
  @ApiOperation({ summary: 'Obtener todos los servicios con el nombre del freelancer (sin autenticación)' })
  @ApiResponse({ status: 200, description: 'Retorna la lista de servicios con información pública.' })
  async findAll() {
    return this.servicesService.findAllPublic();
  }
}
