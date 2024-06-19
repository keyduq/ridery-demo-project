const supertest = require('supertest');
const { app, server } = require('../app');
const request = supertest(app);

const db = require('../db');
const User = require('../models/user.model');
const Vehiculo = require('../models/vehiculo.model');

/**
 * Tests para verificar que el proyecto funcione correctamente y validar que cumpla el requerimiento
 */
describe('Validar requerimientos', () => {
  let token = null;
  let espectacularTotal = 0;
  let pickupTotal = 0;
  let economicoTotal = 0;
  beforeAll(async () => {
    await db.connect();
  })
  afterAll(async () => {
    await db.disconnect();
    server.close();
  })
  describe('Crear y autenticar usuario', () => {
    it('Crear usuario de prueba', async () => {
      const mockUser = new User({
        username: 'test',
        password: 'test',
      });
      await mockUser.save();
      expect(mockUser.isNew).toBe(false);
    })
    it('Autenticar usuario de prueba', async () => {
      const response = await request.post('/api/login').send({
        username: 'test',
        password: 'test',
      });
      token = response.body.token
      expect(response.status).toBe(200);
      expect(token).toBeDefined();
    });
  })
  describe('Crear vehículos y validar condiciones', () => {
    it('Crear vehículos espectaculares', async () => {
      const data = [
        { marca: 'Chevrolet', modelo: 'Aveo', anio: 2020 },
        { marca: 'Chevrolet', modelo: 'Optra', anio: 2018 },
      ]
      for (const vehiculo of data) {
        const response = await request.post('/api/vehiculos').send(vehiculo).set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(201);
        expect(response.body.flota).toBe('espectacular');
        espectacularTotal++;
      }
    })

    it ('Crear vehículos pickup', async () => {
      const data = [
        { marca: 'Toyota', modelo: 'Hilux', anio: 2018 },
        { marca: 'Toyota', modelo: 'Fortunner', anio: 2021 },
        { marca: 'Toyota', modelo: 'Prado', anio: 2015 },
      ]
      for (const vehiculo of data) {
        const response = await request.post('/api/vehiculos').send(vehiculo).set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(201);
        expect(response.body.flota).toBe('pickup');
        pickupTotal++;
      }
    });
    it ('Crear vehículos económicos', async () => {
      const data = [
        { marca: 'Toyota', modelo: 'Corolla', anio: 2018 },
        { marca: 'Chevrolet', modelo: 'Optra', anio: 2015 },
        { marca: 'Chevrolet', modelo: 'Spark', anio: 2018 },
        { marca: 'Toyota', modelo: 'Fortunner', anio: 2012 },
      ]
      for (const vehiculo of data) {
        const response = await request.post('/api/vehiculos').send(vehiculo).set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(201);
        expect(response.body.flota).toBe('economico');
        economicoTotal++;
      }
    });
  })
  describe('Obtener vehículos', () => {
    it('Obtener todos los vehículos', async () => {
      const response = await request.get('/api/vehiculos').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(espectacularTotal + pickupTotal + economicoTotal);
    });
    it('Obtener vehículos espectaculares', async () => {
      const response = await request.get('/api/vehiculos/espectacular').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(espectacularTotal);
    });
    it('Obtener vehículos pickup', async () => {
      const response = await request.get('/api/vehiculos/pickup').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(pickupTotal);
    });
    it('Obtener vehículos económicos', async () => {
      const response = await request.get('/api/vehiculos/economico').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(economicoTotal);
    });
  });
});