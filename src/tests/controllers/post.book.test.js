import chai from 'chai';
import sinon from 'sinon';
import chaiAsPromised from 'chai-as-promised';
import { BookController } from '../../controllers/book.controller.js';


chai.use(chaiAsPromised);
chai.should();

const data =
{
    title: 'Harry Potter',
    ISBN: '290921',
    edition: '3',
    year: 1878,
    numberOfPages: 3900,
    publisher: 'El Planeta',
}


describe('Book Controller - add function', () => {
    it('Libro creado con éxito', async () => {
        const mockRequest = { body: data };
        const mockResponse = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };
        const mockNext = sinon.stub();

        // Mock del servicio para simular la creación exitosa
        const mockCreate = sinon.stub().resolves(data);
        const bookService = { create: mockCreate };

        // Ejecuta la función add del controlador
        await BookController.create(mockRequest, mockResponse, mockNext, bookService);

        // Verifica que la respuesta sea correcta
        mockResponse.status.calledWith(200);


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


    it('Error al crear el libro', async() => {
        const mockRequest = { body: data };
        const mockResponse = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };
        const mockNext = sinon.stub();

        // Mock del servicio para simular la creación exitosa
        const mockCreate = sinon.stub().rejects(new Error('Error. No se ha guardado el libro'));
        const bookService = { create: mockCreate };

        await BookController.create(mockRequest, mockResponse, mockNext, bookService);

        sinon.assert.calledWith(mockNext, sinon.match.instanceOf(Error).and(sinon.match.has('message', 'Error. No se ha guardado el libro')))
    })
});
