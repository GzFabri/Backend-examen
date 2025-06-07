import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        nombreCompleto: 'Dra. Ana López',
        especialidad: 'Cardiología',
        registroProfesional: 'CARD12345',
        diasDisponibles: JSON.stringify(['lunes', 'miércoles', 'viernes']),
        activo: true,
        createdAt: DateTime.now(),
        updatedAt: DateTime.now(),
        deletedAt: null,
      },
      {
        nombreCompleto: 'Dr. Juan Pérez',
        especialidad: 'Pediatría',
        registroProfesional: 'PEDI67890',
        diasDisponibles: JSON.stringify(['martes', 'jueves']),
        activo: true,
        createdAt: DateTime.now(),
        updatedAt: DateTime.now(),
        deletedAt: null,
      },
      {
        nombreCompleto: 'Dra. María García',
        especialidad: 'Dermatología',
        registroProfesional: 'DERM54321',
        diasDisponibles: JSON.stringify(['lunes', 'jueves']),
        activo: false,
        createdAt: DateTime.now(),
        updatedAt: DateTime.now(),
        deletedAt: null,
      },
    ])
  }
}
