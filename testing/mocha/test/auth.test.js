const { expect } = require('chai');
const sinon = require('sinon');

// Simulación de sistema de autenticación
const auth = {
  users: [
    { id: 1, email: 'admin@bookloop.com', password: 'hashed_password', role: 'admin' },
    { id: 2, email: 'user@bookloop.com', password: 'hashed_password', role: 'user' }
  ],

  hashPassword: (password) => {
    return `hashed_${password}`;
  },

  validatePassword: (inputPassword, hashedPassword) => {
    return `hashed_${inputPassword}` === hashedPassword;
  },

  findUserByEmail: (email) => {
    return auth.users.find(user => user.email === email);
  },

  generateToken: (user) => {
    return `token_${user.id}_${Date.now()}`;
  },

  validateToken: (token) => {
    return token && token.startsWith('token_');
  },

  login: (email, password) => {
    const user = auth.findUserByEmail(email);
    if (!user) return { success: false, message: 'Usuario no encontrado' };
    
    if (!auth.validatePassword(password, user.password)) {
      return { success: false, message: 'Contraseña incorrecta' };
    }

    const token = auth.generateToken(user);
    return { 
      success: true, 
      token, 
      user: { id: user.id, email: user.email, role: user.role } 
    };
  },

  register: (email, password, role = 'user') => {
    if (auth.findUserByEmail(email)) {
      return { success: false, message: 'Email ya registrado' };
    }

    const newUser = {
      id: auth.users.length + 1,
      email,
      password: auth.hashPassword(password),
      role
    };

    auth.users.push(newUser);
    return { success: true, user: { id: newUser.id, email: newUser.email, role: newUser.role } };
  }
};

describe('Authentication Tests with Mocha', () => {

  beforeEach(() => {
    // Restaurar usuarios originales antes de cada test
    auth.users = [
      { id: 1, email: 'admin@bookloop.com', password: 'hashed_password', role: 'admin' },
      { id: 2, email: 'user@bookloop.com', password: 'hashed_password', role: 'user' }
    ];
  });

  describe('hashPassword', () => {
    it('should hash password correctly', () => {
      const password = 'mypassword123';
      const hashed = auth.hashPassword(password);
      
      expect(hashed).to.equal('hashed_mypassword123');
      expect(hashed).to.not.equal(password);
    });
  });

  describe('validatePassword', () => {
    it('should validate correct password', () => {
      const password = 'mypassword123';
      const hashed = auth.hashPassword(password);
      
      const isValid = auth.validatePassword(password, hashed);
      expect(isValid).to.be.true;
    });

    it('should reject incorrect password', () => {
      const password = 'mypassword123';
      const wrongPassword = 'wrongpassword';
      const hashed = auth.hashPassword(password);
      
      const isValid = auth.validatePassword(wrongPassword, hashed);
      expect(isValid).to.be.false;
    });
  });

  describe('login', () => {
    it('should login successfully with correct credentials', () => {
      const result = auth.login('admin@bookloop.com', 'password');
      
      expect(result.success).to.be.true;
      expect(result).to.have.property('token');
      expect(result.user.role).to.equal('admin');
    });

    it('should fail login with incorrect email', () => {
      const result = auth.login('nonexistent@email.com', 'password');
      
      expect(result.success).to.be.false;
      expect(result.message).to.equal('Usuario no encontrado');
    });

    it('should fail login with incorrect password', () => {
      const result = auth.login('admin@bookloop.com', 'wrongpassword');
      
      expect(result.success).to.be.false;
      expect(result.message).to.equal('Contraseña incorrecta');
    });
  });

  describe('register', () => {
    it('should register new user successfully', () => {
      const result = auth.register('newuser@bookloop.com', 'newpassword');
      
      expect(result.success).to.be.true;
      expect(result.user.email).to.equal('newuser@bookloop.com');
      expect(auth.users).to.have.length(3);
    });

    it('should fail to register existing email', () => {
      const result = auth.register('admin@bookloop.com', 'password');
      
      expect(result.success).to.be.false;
      expect(result.message).to.equal('Email ya registrado');
    });
  });

  describe('token validation', () => {
    it('should validate correct token format', () => {
      const user = { id: 1, email: 'test@test.com' };
      const token = auth.generateToken(user);
      
      const isValid = auth.validateToken(token);
      expect(isValid).to.be.true;
    });

    it('should reject invalid token', () => {
      const invalidToken = 'invalid_token';
      
      const isValid = auth.validateToken(invalidToken);
      expect(isValid).to.be.false;
    });
  });

  describe('with Sinon mocks', () => {
    it('should call hashPassword when registering', () => {
      const hashSpy = sinon.spy(auth, 'hashPassword');
      
      auth.register('spy@test.com', 'password123');
      
      expect(hashSpy.calledOnce).to.be.true;
      expect(hashSpy.calledWith('password123')).to.be.true;
      
      hashSpy.restore();
    });

    it('should call findUserByEmail when logging in', () => {
      const findSpy = sinon.spy(auth, 'findUserByEmail');
      
      auth.login('admin@bookloop.com', 'password');
      
      expect(findSpy.calledOnce).to.be.true;
      expect(findSpy.calledWith('admin@bookloop.com')).to.be.true;
      
      findSpy.restore();
    });
  });

}); 