import chai from 'chai';
import sinon from 'sinon';
import chaiAsPromised from 'chai-as-promised';
import { authenticationController } from '../../controllers/authentication.controller.js';


chai.use(chaiAsPromised);
chai.should();

const data =
{
    email: 'test@outlook.com',
    password: '3876hLK0S'
}


describe('Login Controller - login function', () => {
    //TODO OK
    it('Login', async () => {
        const mockRequest = { body: data };
        const mockResponse = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };
        const mockNext = sinon.stub();

        // Mock del servicio para simular la creación exitosa
        const mockCreate = sinon.stub().resolves(data);

        // Ejecuta la función add del controlador
        await authenticationController.login(mockRequest, mockResponse, mockNext, mockCreate);

        // Verifica que la respuesta sea correcta
        mockResponse.status.calledWith(200);


        // Verifica que la función del servicio fue llamada correctamente
        mockCreate.calledWith(mockRequest.body);

        // Verifica que la función next no fue llamada (ya que la operación fue exitosa)
        mockNext.called.should.be.false;
    });

    //ERROR
    it('Error al intentar logear', async() => {
        const mockRequest = { body: data };
        const mockResponse = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };
        const mockNext = sinon.stub();

        // Mock del servicio para simular la creación exitosa
        const mockCreate = sinon.stub().rejects(new Error('Error. No se ha podido logearse en el sistema'));

        await authenticationController.login(mockRequest, mockResponse, mockNext, mockCreate);

        sinon.assert.calledWith(mockNext, sinon.match.instanceOf(Error).and(sinon.match.has('message', 'Error. No se ha podido logearse en el sistema')))
    })
});
