import chai from 'chai';
import sinon from 'sinon';
import chaiAsPromised from 'chai-as-promised';
import { LanguageMiddleware } from '../../middlewares/language.middleware.js';

chai.use(chaiAsPromised);
chai.should();

let testData =
{
    language: 'Spanish',
}

describe('Language Middleware - add function', () => {
    it('La estructura es correcta', () => {
        const mockRequest = { body: testData };
        const mockResponse = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };
        const mockNext = sinon.stub();

        // Ejecuta la función add del MIDDLEWARE
        LanguageMiddleware.validateCreate(mockRequest, mockResponse, mockNext);


        // Verifica que la función next FUE LLAMADA (ya que la operación fue exitosa)
        mockNext.called.should.be.true;
    });


    it('Forzando error (language)', () => {
        //SE FUERZA EL ERROR
        testData.language = '';

        const mockRequest = { body: testData };
        const mockResponse = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub()
        };
        const mockNext = sinon.stub();

        //Ejecuta la función add del MIDDLEWARE
        LanguageMiddleware.validateCreate(mockRequest, mockResponse, mockNext);

        //Verificar el status que responde el error
        mockResponse.status.calledWith(409);

        //Verifica que la función next NO FUE llamada
        mockNext.called.should.be.false;
    });
});
