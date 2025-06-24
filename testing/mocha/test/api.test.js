const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;

chai.use(chaiHttp);

const API_URL = 'http://localhost:5000';

describe('API Tests with Mocha', () => {

  describe('Books API', () => {
    it('should GET all books', (done) => {
      chai.request(API_URL)
        .get('/api/books')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });

    it('should GET a specific book by ID', (done) => {
      const bookId = 1; // Asumiendo que existe un libro con ID 1
      chai.request(API_URL)
        .get(`/api/books/${bookId}`)
        .end((err, res) => {
          if (res.status === 200) {
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('book_id');
          } else {
            expect(res.status).to.be.oneOf([404, 500]);
          }
          done();
        });
    });
  });

  describe('Users API', () => {
    it('should GET all users', (done) => {
      chai.request(API_URL)
        .get('/api/users')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });

    it('should handle invalid user login', (done) => {
      chai.request(API_URL)
        .post('/api/users/login')
        .send({
          email: 'invalid@email.com',
          password: 'wrongpassword'
        })
        .end((err, res) => {
          expect(res.status).to.be.oneOf([400, 401, 404]);
          done();
        });
    });
  });

  describe('Categories API', () => {
    it('should GET all categories', (done) => {
      chai.request(API_URL)
        .get('/api/categories')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });

  describe('Error Handling', () => {
    it('should return 404 for non-existent endpoint', (done) => {
      chai.request(API_URL)
        .get('/api/nonexistent')
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });

}); 