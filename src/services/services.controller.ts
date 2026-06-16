import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('servicios')
@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Publicar un nuevo servicio (requiere autenticación)' })
  @ApiResponse({ status: 201, description: 'El servicio ha sido creado con éxito.' })
  @ApiResponse({ status: 401, description: 'Token de acceso ausente o inválido.' })
  async create(@Body() createServiceDto: CreateServiceDto, @Req() req: any) {
    const providerId = req.user.sub;
    return this.servicesService.create(createServiceDto, providerId);
  }
}
