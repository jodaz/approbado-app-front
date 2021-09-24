//@ts-nocheck
import Knex from 'knex'
import { USER } from '../config'
import bcrypt from 'bcrypt'

export async function seed(knex) {
  const bcryptPassword = await bcrypt.hash(USER.password, 10);

  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          names: USER.name,
          email: USER.email,
          password: bcryptPassword,
          is_registered: false,
          rol: 'Administrador',
        },
      ]);
    });
};