import chai from 'chai';
import sinon from 'sinon';
import chaiAsPromised from 'chai-as-promised';
import { LoanMiddleware } from '../../middlewares/loan.middleware.js';

chai.use(chaiAsPromised);
chai.should();


let testData =
{
    startDate: '2023-12-14',
    dueDate: '2023-12-23',
    bookId: '777fcec1-7d64-42c1-be38-562232038dc8',
}


describe('Loan Middleware - add function', () => {
    it('La estructura es correcta', () => {
        const mockRequest = { body: testData };
        const mockResponse = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };
        const mockNext = sinon.stub();

        // Ejecuta la función add del MIDDLEWARE
        LoanMiddleware.validateCreate(mockRequest, mockResponse, mockNext);

        // Verifica que la función next FUE LLAMADA (ya que la operación fue exitosa)
        mockNext.called.should.be.true;
    });

    it('Forzando error (startDate)', () => {
        // Obtener la fecha actual
        const currentDate = new Date();

        // Restar un día
        const yesterday = new Date(currentDate);
        yesterday.setDate(currentDate.getDate() + 1);

        //SE FUERZA EL ERROR
        testData.startDate = yesterday;

        const mockRequest = { body: testData };
        const mockResponse = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub()
        };
        const mockNext = sinon.stub();

        //Ejecuta la función add del MIDDLEWARE
        LoanMiddleware.validateCreate(mockRequest, mockResponse, mockNext);

        //Verificar el status que responde el error
        mockResponse.status.calledWith(409);

        //Verifica que la función next NO FUE llamada
        mockNext.called.should.be.false;
    });

    it('Forzando error (bookId)', () => {

        //SE FUERZA EL ERROR
        testData.bookId = '';

        const mockRequest = { body: testData };
        const mockResponse = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub()
        };
        const mockNext = sinon.stub();

        //Ejecuta la función add del MIDDLEWARE
        LoanMiddleware.validateCreate(mockRequest, mockResponse, mockNext);

        //Verificar el status que responde el error
        mockResponse.status.calledWith(409);

        //Verifica que la función next NO FUE llamada
        mockNext.called.should.be.false;
    });
});
