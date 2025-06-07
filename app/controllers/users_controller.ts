import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { DateTime } from 'luxon'

export default class UsersController {
  /**
   * List all users (excluding soft-deleted)
   */
  async index({ response }: HttpContext) {
    const users = await User.all()
    return response.ok(users)
  }

  /**
   * Create a new user
   */
  async store({ request, response }: HttpContext) {
    const data = request.only([
      'nombreCompleto',
      'especialidad',
      'registroProfesional',
      'diasDisponibles',
      'activo',
    ])
    // Si diasDisponibles viene como array, conviértelo a JSON
    if (Array.isArray(data.diasDisponibles)) {
      data.diasDisponibles = JSON.stringify(data.diasDisponibles)
    }
    const user = await User.create(data)
    return response.created(user)
  }

  /**
   * Show individual user (excluding soft-deleted)
   */
  async show({ params, response }: HttpContext) {
    const user = await User.query()
      .where('id', params.id)
      .whereNull('deleted_at')
      .first()
    if (!user) {
      return response.notFound({ message: 'User not found' })
    }
    return user
  }

  /**
   * Update user
   */
  async update({ params, request, response }: HttpContext) {
    const user = await User.query()
      .where('id', params.id)
      .whereNull('deleted_at')
      .first()
    if (!user) {
      return response.notFound({ message: 'User not found' })
    }
    const data = request.only([
      'nombreCompleto',
      'especialidad',
      'registroProfesional',
      'diasDisponibles',
      'activo',
    ])
    if (Array.isArray(data.diasDisponibles)) {
      data.diasDisponibles = JSON.stringify(data.diasDisponibles)
    }
    user.merge(data)
    await user.save()
    return user
  }

  /**
   * Soft delete user (set deleted_at)
   */
  async destroy({ params, response }: HttpContext) {
    const user = await User.query()
      .where('id', params.id)
      .whereNull('deleted_at')
      .first()
    if (!user) {
      return response.notFound({ message: 'User not found' })
    }
    user.deletedAt = DateTime.now()
    await user.save()
    return response.noContent()
  }

  /**
   * Restore a soft-deleted user
   */
  async restore({ params, response }: HttpContext) {
    const user = await User.query()
      .where('id', params.id)
      .whereNotNull('deleted_at')
      .first()
    if (!user) {
      return response.notFound({ message: 'User not found or not deleted' })
    }
    user.deletedAt = null
    await user.save()
    return user
  }

  /**
   * Permanently delete a user (force delete)
   */
  async forceDelete({ params, response }: HttpContext) {
    const user = await User.find(params.id)
    if (!user) {
      return response.notFound({ message: 'User not found' })
    }
    await user.delete()
    return response.noContent()
  }
}
