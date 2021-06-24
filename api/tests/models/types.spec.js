const { Type, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Type model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Type.sync({ force: true }));
    describe('validate an error', () => {
      it('should throw an error if name is null', (done) => {
        Type.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });})
      describe('validate a pass', () => {
      it('should work when its a valid name', () => {
        Type.create({Nombre: 'Shadow' })
        .then(() => expect(Type.Nombre).to.equal('Shadow'))
          
      });
      })
    })
})