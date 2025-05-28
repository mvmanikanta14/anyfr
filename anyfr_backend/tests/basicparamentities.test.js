const request = require('supertest');
const app = require('../src/app'); // Adjust path as needed
const jwt = require('jsonwebtoken');

// Mock models
const mockModels = {
  basicParamEntitiesRaw: {
    create: jest.fn(),
    edit: jest.fn(),
    softDelete: jest.fn(),
    getAll: jest.fn(),
    getById: jest.fn(),
    search: jest.fn()
  },
  basicMasterUsersRaw: {}
};

// Mock middleware functions
jest.mock('../src/middlewares/authMiddleware', () => {
  return (req, res, next) => {
    // Add mock models to request object
    req.models = mockModels;
    // Add mock user data
    req.user = { id: 1, username: 'testuser' };
    next();
  };
});

jest.mock('../src/utils/entityValidation', () => ({
  validateEntity: (req, res, next) => next()
}));

// Helper function to create a valid JWT token for testing
function generateTestToken() {
  return jwt.sign({ id: 1, username: 'testuser' }, 'your_jwt_secret_key', { expiresIn: '1h' });
}

describe('Basic Parameter Entities API', () => {
  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /basicparamentities/create', () => {
    it('should create a new entity successfully', async () => {
      const newEntity = {
        name: 'Test Entity',
        code: 'TEST',
        description: 'Test Description'
      };

      mockModels.basicParamEntitiesRaw.create.mockResolvedValue({
        id: 1,
        ...newEntity
      });

      const response = await request(app)
        .post('/basicparamentities/create')
        .set('Authorization', `Bearer ${generateTestToken()}`)
        .send(newEntity);

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Entity created successfully');
      expect(response.body.entity).toHaveProperty('id', 1);
      expect(mockModels.basicParamEntitiesRaw.create).toHaveBeenCalledWith(newEntity);
    });

    it('should handle duplicate entry error', async () => {
      const duplicateEntity = {
        name: 'Duplicate Entity',
        code: 'DUP',
        description: 'Duplicate Description'
      };

      const sequelizeError = {
        name: 'SequelizeUniqueConstraintError',
        errors: [{ path: 'code' }]
      };

      mockModels.basicParamEntitiesRaw.create.mockRejectedValue(sequelizeError);

      const response = await request(app)
        .post('/basicparamentities/create')
        .set('Authorization', `Bearer ${generateTestToken()}`)
        .send(duplicateEntity);

      expect(response.status).toBe(400);
      expect(response.body.error).toContain('Duplicate entry');
      expect(mockModels.basicParamEntitiesRaw.create).toHaveBeenCalledWith(duplicateEntity);
    });
  });

  describe('PUT /basicparamentities/edit/:id', () => {
    it('should edit an entity successfully', async () => {
      const entityId = '1';
      const updatedEntity = {
        name: 'Updated Entity',
        description: 'Updated Description'
      };

      mockModels.basicParamEntitiesRaw.edit.mockResolvedValue({
        id: parseInt(entityId),
        ...updatedEntity
      });

      const response = await request(app)
        .put(`/basicparamentities/edit/${entityId}`)
        .set('Authorization', `Bearer ${generateTestToken()}`)
        .send(updatedEntity);

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Entity created successfully');
      expect(response.body.entity).toHaveProperty('id', 1);
      expect(mockModels.basicParamEntitiesRaw.edit).toHaveBeenCalledWith(entityId, updatedEntity);
    });

    it('should handle duplicate entry error when editing', async () => {
      const entityId = '1';
      const duplicateEntity = {
        name: 'Duplicate Entity'
      };

      const sequelizeError = {
        name: 'SequelizeUniqueConstraintError',
        errors: [{ path: 'name' }]
      };

      mockModels.basicParamEntitiesRaw.edit.mockRejectedValue(sequelizeError);

      const response = await request(app)
        .put(`/basicparamentities/edit/${entityId}`)
        .set('Authorization', `Bearer ${generateTestToken()}`)
        .send(duplicateEntity);

      expect(response.status).toBe(400);
      expect(response.body.error).toContain('Duplicate entry');
      expect(mockModels.basicParamEntitiesRaw.edit).toHaveBeenCalledWith(entityId, duplicateEntity);
    });
  });

  describe('DELETE /basicparamentities/delete/:id', () => {
    it('should delete an entity successfully', async () => {
      const entityId = '1';
      const deletedEntity = { id: 1, deleted: true };

      mockModels.basicParamEntitiesRaw.softDelete.mockResolvedValue(deletedEntity);

      const response = await request(app)
        .delete(`/basicparamentities/delete/${entityId}`)
        .set('Authorization', `Bearer ${generateTestToken()}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(deletedEntity);
      expect(mockModels.basicParamEntitiesRaw.softDelete).toHaveBeenCalledWith(entityId);
    });

    it('should handle error when entity deletion fails', async () => {
      const entityId = '999';
      const errorMessage = 'Entity not found';

      mockModels.basicParamEntitiesRaw.softDelete.mockRejectedValue(new Error(errorMessage));

      const response = await request(app)
        .delete(`/basicparamentities/delete/${entityId}`)
        .set('Authorization', `Bearer ${generateTestToken()}`);

      expect(response.status).toBe(500);
      expect(response.body.error).toBe(errorMessage);
      expect(mockModels.basicParamEntitiesRaw.softDelete).toHaveBeenCalledWith(entityId);
    });
  });

  describe('GET /basicparamentities/view', () => {
    it('should get all entities with pagination', async () => {
      const mockEntities = {
        data: [
          { id: 1, name: 'Entity 1' },
          { id: 2, name: 'Entity 2' }
        ],
        page: 1,
        limit: 10,
        totalItems: 2,
        totalPages: 1
      };

      mockModels.basicParamEntitiesRaw.getAll.mockResolvedValue(mockEntities);

      const response = await request(app)
        .get('/basicparamentities/view')
        .set('Authorization', `Bearer ${generateTestToken()}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toEqual(mockEntities.data);
      expect(mockModels.basicParamEntitiesRaw.getAll).toHaveBeenCalledWith(1, 10);
    });

    it('should handle pagination parameters', async () => {
      const page = 2;
      const limit = 5;
      const mockEntities = {
        data: [
          { id: 6, name: 'Entity 6' },
          { id: 7, name: 'Entity 7' }
        ],
        page,
        limit,
        totalItems: 7,
        totalPages: 2
      };

      mockModels.basicParamEntitiesRaw.getAll.mockResolvedValue(mockEntities);

      const response = await request(app)
        .get(`/basicparamentities/view?page=${page}&limit=${limit}`)
        .set('Authorization', `Bearer ${generateTestToken()}`);

      expect(response.status).toBe(200);
      expect(response.body.page).toBe(page);
      expect(response.body.limit).toBe(limit);
      expect(mockModels.basicParamEntitiesRaw.getAll).toHaveBeenCalledWith(page, limit);
    });

    it('should handle error when models are not initialized', async () => {
      // Temporarily override the mock to simulate missing models
      const originalModels = {...req.models};
      req.models = null;

      const response = await request(app)
        .get('/basicparamentities/view')
        .set('Authorization', `Bearer ${generateTestToken()}`);

      expect(response.status).toBe(500);
      expect(response.body.error).toBe('❌ Models not initialized properly.');

      // Restore models
      req.models = originalModels;
    });
  });

  describe('GET /basicparamentities/view/:id', () => {
    it('should get an entity by ID', async () => {
      const entityId = 1;
      const mockEntity = { id: entityId, name: 'Test Entity', code: 'TEST' };

      mockModels.basicParamEntitiesRaw.getById.mockResolvedValue(mockEntity);

      const response = await request(app)
        .get(`/basicparamentities/view/${entityId}`)
        .set('Authorization', `Bearer ${generateTestToken()}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toEqual(mockEntity);
      expect(mockModels.basicParamEntitiesRaw.getById).toHaveBeenCalledWith(entityId.toString());
    });

    it('should return 404 when entity is not found', async () => {
      const entityId = 999;

      mockModels.basicParamEntitiesRaw.getById.mockResolvedValue(null);

      const response = await request(app)
        .get(`/basicparamentities/view/${entityId}`)
        .set('Authorization', `Bearer ${generateTestToken()}`);

      expect(response.status).toBe(404);
      expect(response.body.error).toBe('❌ Entity not found.');
      expect(mockModels.basicParamEntitiesRaw.getById).toHaveBeenCalledWith(entityId.toString());
    });

    it('should handle invalid ID parameter', async () => {
      const response = await request(app)
        .get('/basicparamentities/view/invalid')
        .set('Authorization', `Bearer ${generateTestToken()}`);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('❌ Invalid entity ID.');
    });
  });

  describe('GET /basicparamentities/search', () => {
    it('should search entities by query', async () => {
      const searchQuery = 'test';
      const mockResults = [
        { id: 1, name: 'Test Entity 1' },
        { id: 2, name: 'Test Entity 2' }
      ];

      mockModels.basicParamEntitiesRaw.search.mockResolvedValue(mockResults);

      const response = await request(app)
        .get(`/basicparamentities/search?query=${searchQuery}`)
        .set('Authorization', `Bearer ${generateTestToken()}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResults);
      expect(mockModels.basicParamEntitiesRaw.search).toHaveBeenCalledWith(searchQuery);
    });

    it('should handle error when search fails', async () => {
      const searchQuery = 'invalid';
      const errorMessage = 'Search failed';

      mockModels.basicParamEntitiesRaw.search.mockRejectedValue(new Error(errorMessage));

      const response = await request(app)
        .get(`/basicparamentities/search?query=${searchQuery}`)
        .set('Authorization', `Bearer ${generateTestToken()}`);

      expect(response.status).toBe(500);
      expect(response.body.error).toBe(errorMessage);
      expect(mockModels.basicParamEntitiesRaw.search).toHaveBeenCalledWith(searchQuery);
    });
  });
});