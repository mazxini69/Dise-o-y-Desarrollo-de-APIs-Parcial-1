import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Service } from '../../services/entities/service.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @ApiProperty({ example: 1, description: 'ID autogenerado del usuario' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'freelancer@example.com', description: 'Correo electrónico único del freelancer' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ example: 'Juan Pérez', description: 'Nombre completo' })
  @Column()
  name: string;

  @ApiProperty({ example: 'password123', description: 'Contraseña en texto plano para simulación' })
  @Column()
  password: string;

  @OneToMany(() => Service, (service) => service.provider)
  services: Service[];
}
