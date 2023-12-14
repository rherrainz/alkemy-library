import chai from 'chai';
import sinon from 'sinon';
import chaiAsPromised from 'chai-as-promised';
import { GenreMiddleware } from '../../middlewares/genre.middleware.js';

chai.use(chaiAsPromised);
chai.should();

let testData =
{
    genre: 'Dark',
}

describe('Genre Middleware - add function', () => {
    it('La estructura es correcta', () => {
        const mockRequest = { body: testData };
        const mockResponse = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };
        const mockNext = sinon.stub();


        // Ejecuta la función add del MIDDLEWARE
        GenreMiddleware.validateCreate(mockRequest, mockResponse, mockNext);


        // Verifica que la función next FUE LLAMADA (ya que la operación fue exitosa)
        mockNext.called.should.be.true;
    });

    it('Forzando error (genre)', () => {

        //SE FUERZA EL ERROR
        testData.genre = '';

        const mockRequest = { body: testData };
        const mockResponse = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub()
        };
        const mockNext = sinon.stub();

        //Ejecuta la función add del MIDDLEWARE
        GenreMiddleware.validateCreate(mockRequest, mockResponse, mockNext);

        //Verificar el status que responde el error
        mockResponse.status.calledWith(409);

        //Verifica que la función next NO FUE llamada
        mockNext.called.should.be.false;
    });
});
