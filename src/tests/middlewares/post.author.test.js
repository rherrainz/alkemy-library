import chai from 'chai';
import sinon from 'sinon';
import chaiAsPromised from 'chai-as-promised';
import { AuthorMiddleware } from '../../middlewares/author.middleware.js';

chai.use(chaiAsPromised);
chai.should();

let testData =
{
    firstName: 'Mónica',
    lastName: 'Florez',
    birthDate: '1998-11-03',
    nationality: 'Argentina',
}


describe('Author Middleware - add function', () => {
    it('La estructura es correcta', () => {
        const mockRequest = { body: testData };
        const mockResponse = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };
        const mockNext = sinon.stub();

        // Ejecuta la función add del MIDDLEWARE
        AuthorMiddleware.validateCreate(mockRequest, mockResponse, mockNext);

        // Verifica que la función next FUE LLAMADA (ya que la operación fue exitosa)
        mockNext.called.should.be.true;
    });

    it('Forzando error (name/surname)', () => {

        //SE FUERZA EL ERROR
        testData.firstName = 12982;

        const mockRequest = { body: testData };
        const mockResponse = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub()
        };
        const mockNext = sinon.stub();

        //Ejecuta la función add del MIDDLEWARE
        AuthorMiddleware.validateCreate(mockRequest, mockResponse, mockNext);

        //Verificar el status que responde el error
        mockResponse.status.calledWith(409);

        //Verifica que la función next NO FUE llamada
        mockNext.called.should.be.false;
    });

    it('Forzando error (birthDate)', () => {

        //SE FUERZA EL ERROR
        testData.birthDate = '';

        const mockRequest = { body: testData };
        const mockResponse = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub()
        };
        const mockNext = sinon.stub();

        //Ejecuta la función add del MIDDLEWARE
        AuthorMiddleware.validateCreate(mockRequest, mockResponse, mockNext);

        //Verificar el status que responde el error
        mockResponse.status.calledWith(409);

        //Verifica que la función next NO FUE llamada
        mockNext.called.should.be.false;
    });
});
