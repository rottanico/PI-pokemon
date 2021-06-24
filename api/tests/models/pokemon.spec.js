const { Pokemon, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Pokemon model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Pokemon.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Pokemon.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Pokemon.create({Nombre: 'Pikachu' })
        .then(() => expect(Pokemon.Nombre).to.equal('Pikachu'))
          
      });
      describe('validate an error ',()=>{
        it('should throw an error if img is null', function(done) {
         Pokemon.create({
            Nombre: 'hola',
          })
          .then(() => done('No deberia haberse creado'))
          .catch(() => done());
      })

  })
    });
  });
});
