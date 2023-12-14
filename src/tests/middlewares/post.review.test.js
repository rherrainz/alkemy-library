import chai from 'chai';
import sinon from 'sinon';
import chaiAsPromised from 'chai-as-promised';
import { ReviewMiddleware } from '../../middlewares/review.middleware.js';

chai.use(chaiAsPromised);
chai.should();

let testData =
{
    reviewText: 'Its Great!',
    rating: 4,
    bookId: '777fcec1-7d64-42c1-be38-562232038dc8',
}

describe('Review Middleware - add function', () => {
    it('La estructura es correcta', () => {
        const mockRequest = { body: testData };
        const mockResponse = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };
        const mockNext = sinon.stub();

        // Ejecuta la función add del MIDDLEWARE
        ReviewMiddleware.validateCreate(mockRequest, mockResponse, mockNext);

        // Verifica que la función next FUE LLAMADA (ya que la operación fue exitosa)
        mockNext.called.should.be.true;
    });

    it('Forzando error (reviewText)', () => {

        //SE FUERZA EL ERROR
        testData.reviewText = '';

        const mockRequest = { body: testData };
        const mockResponse = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub()
        };
        const mockNext = sinon.stub();

        //Ejecuta la función add del MIDDLEWARE
        ReviewMiddleware.validateCreate(mockRequest, mockResponse, mockNext);

        //Verificar el status que responde el error
        mockResponse.status.calledWith(409);

        //Verifica que la función next NO FUE llamada
        mockNext.called.should.be.false;
    });

    it('Forzando error (rating)', () => {

        //SE FUERZA EL ERROR
        testData.rating = '09aas';

        const mockRequest = { body: testData };
        const mockResponse = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub()
        };
        const mockNext = sinon.stub();

        //Ejecuta la función add del MIDDLEWARE
        ReviewMiddleware.validateCreate(mockRequest, mockResponse, mockNext);

        //Verificar el status que responde el error
        mockResponse.status.calledWith(409);

        //Verifica que la función next NO FUE llamada
        mockNext.called.should.be.false;
    });
});
