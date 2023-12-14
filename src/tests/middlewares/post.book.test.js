import chai from 'chai';
import sinon from 'sinon';
import chaiAsPromised from 'chai-as-promised';
import { BookMiddleware } from '../../middlewares/book.middleware.js';

chai.use(chaiAsPromised);
chai.should();

let testData =
{
    title: 'La llamada de Cthullu',
    ISBN: '290921',
    edition: '02',
    year: 1928,
    numberOfPages: 100,
    publisher: 'Chaosium',
    authorId: ['777fcec1-7d64-42c1-be38-562232038db4'],
    genreId: ['777fcec1-7d64-42c1-be38-562232038db5'],
    languageId: ['777fcec1-7d64-42c1-be38-562232038db6']
}

describe('Book Middleware - add function', () => {
    it('La estructura es correcta', () => {
        const mockRequest = { body: testData };
        const mockResponse = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };
        const mockNext = sinon.stub();


        // Ejecuta la función add del MIDDLEWARE
        BookMiddleware.validateCreate(mockRequest, mockResponse, mockNext);


        // Verifica que la función next FUE LLAMADA (ya que la operación fue exitosa)
        mockNext.called.should.be.true;
    });

    it('Forzando error (edition)', () => {

        //SE FUERZA EL ERROR
        testData.edition = '0';

        const mockRequest = { body: testData };
        const mockResponse = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub()
        };
        const mockNext = sinon.stub();

        //Ejecuta la función add del MIDDLEWARE
        BookMiddleware.validateCreate(mockRequest, mockResponse, mockNext);

        //Verificar el status que responde el error
        mockResponse.status.calledWith(409);

        //Verifica que la función next NO FUE llamada
        mockNext.called.should.be.false;
    });

    it('Forzando error (numberOfPages)', () => {

        //SE FUERZA EL ERROR
        testData.title = 90;

        const mockRequest = { body: testData };
        const mockResponse = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub()
        };
        const mockNext = sinon.stub();

        //Ejecuta la función add del MIDDLEWARE
        BookMiddleware.validateCreate(mockRequest, mockResponse, mockNext);

        //Verificar el status que responde el error
        mockResponse.status.calledWith(409);

        //Verifica que la función next NO FUE llamada
        mockNext.called.should.be.false;
    });

    it('Forzando error (authorId, genreId, languageId)', () => {

        //SE FUERZA EL ERROR
        testData.authorId = '777fcec1-7d64-42c1-be38-562232038db4';
        testData.genreId = '777fcec1-7d64-42c1-be38-562232038db4';
        testData.languageId = '777fcec1-7d64-42c1-be38-562232038db4';

        const mockRequest = { body: testData };
        const mockResponse = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub()
        };
        const mockNext = sinon.stub();

        //Ejecuta la función add del MIDDLEWARE
        BookMiddleware.validateCreate(mockRequest, mockResponse, mockNext);

        //Verificar el status que responde el error
        mockResponse.status.calledWith(409);

        //Verifica que la función next NO FUE llamada
        mockNext.called.should.be.false;
    });
});
