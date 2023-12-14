import chai from 'chai';
import sinon from 'sinon';
import chaiAsPromised from 'chai-as-promised';
import { UserController } from '../../controllers/user.controller.js';


chai.use(chaiAsPromised);
chai.should();

const data =
{
    firstName: 'Fernando',
    lastName: 'Dominguez',
    email: 'test@outlook.com',
    password: '3876hLK0S',
}


describe('User Controller - add function', () => {
    //TODO OK
    it('Usuario creado con éxito', async () => {
        const mockRequest = { body: data };
        const mockResponse = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };
        const mockNext = sinon.stub();

        // Mock del servicio para simular la creación exitosa
        const mockCreate = sinon.stub().resolves(data);

        // Ejecuta la función add del controlador
        await UserController.create(mockRequest, mockResponse, mockNext, mockCreate);

        // Verifica que la respuesta sea correcta
        mockResponse.status.calledWith(201);


        // Verifricar que se llamó a json desde el controller
        sinon.assert.calledWith(mockResponse.json, sinon.match.object);

        // Verifica que la función del servicio fue llamada correctamente
        mockCreate.calledWith(mockRequest.body);

        // Verifica que la función next no fue llamada (ya que la operación fue exitosa)
        mockNext.called.should.be.false;

        // Verifica el contenido específico de la respuesta JSON
        sinon.assert.calledWithMatch(mockResponse.json, {
            data
        });
    });

    //MAIL REPETIDO
    it('El correo ya se encuentra registrado', async() => {
        const mockRequest = { body: data };
        const mockResponse = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        const mockNext = sinon.stub();

        // Mock del servicio para simular un error de correo electrónico repetido
        const mockCreate = sinon.stub().rejects({ name: 'SequelizeUniqueConstraintError' });

        await UserController.create(mockRequest, mockResponse, mockNext, mockCreate);

        // Verifica que se llamó a status y json con los valores correctos
        sinon.assert.calledWith(mockResponse.status, 409); // Código del status enviado por el sv
        sinon.assert.calledWith(mockResponse.json, { error: 'El correo electrónico ya se encuentra registrado' });

        // Verifica que la función del servicio fue llamada correctamente
        mockCreate.calledWith(mockRequest.body);
    })

    //ERROR
    it('Error al crear el Usuario', async() => {
        const mockRequest = { body: data };
        const mockResponse = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };
        const mockNext = sinon.stub();

        // Mock del servicio para simular la creación exitosa
        const mockCreate = sinon.stub().rejects(new Error('El correo electrónico ya se encuentra registrado'));

        await UserController.create(mockRequest, mockResponse, mockNext, mockCreate);

        sinon.assert.calledWith(mockNext, sinon.match.instanceOf(Error).and(sinon.match.has('message', 'El correo electrónico ya se encuentra registrado')))
    })
});
