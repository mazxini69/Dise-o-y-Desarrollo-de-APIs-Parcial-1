import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('services')
export class Service {
  @ApiProperty({ example: 1, description: 'ID autogenerado del servicio' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Diseño de logo profesional', description: 'Nombre del servicio' })
  @Column()
  title: string;

  @ApiProperty({ example: 'Diseño', description: 'Categoría del servicio (ej. Diseño, Desarrollo, Marketing, Redacción)' })
  @Column()
  category: string;

  @ApiProperty({ example: 'Servicio completo de diseño de logotipo para tu marca', description: 'Descripción detallada' })
  @Column()
  description: string;

  @ApiProperty({ example: 150.00, description: 'Precio estimado en dólares' })
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value),
    },
  })
  price: number;

  @ManyToOne(() => User, (user) => user.services)
  provider: User;
}
