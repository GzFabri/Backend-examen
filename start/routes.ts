/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import UsersController from '#controllers/users_controller'
import router from '@adonisjs/core/services/router'

router.group(() => {
  router.get('/', [UsersController, 'index'])
  router.post('/', [UsersController, 'store'])
  router.get('/:id', [UsersController,'show'])
  router.put('/:id', [UsersController,'update'])
  router.delete('/:id', [UsersController,'destroy'])
  router.post('/:id/restore', [UsersController,'restore'])
  router.delete('/:id/force', [UsersController,'forceDelete'])
}).prefix('/api/users')
