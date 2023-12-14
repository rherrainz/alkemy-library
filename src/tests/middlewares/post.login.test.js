import chai from 'chai';
import { expect } from 'chai';
import sinon from 'sinon';
import chaiAsPromised from 'chai-as-promised';
import { isAuthenticated } from '../../middlewares/authorization.middleware.js';
import ApiError from '../../errors/api.error.js';

chai.use(chaiAsPromised);
chai.should();


let testData =
{
    authorization: '',
}


describe('Loan Middleware - add function', () => {
    it('Login Success', async() => {
        testData.authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI5MDBmMTI3LWZiMjAtNGI0NC05YTk1LWNmODYyNTQ3Mjk5OCIsImZpcnN0TmFtZSI6Ikpob24iLCJsYXN0TmFtZSI6IkRvZSIsImVtYWlsIjoidGVzdEBleGFtcGxlLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJHlDb0hXRzFYMlJWaGMwbGZtY2NOck91YlFXbmoyOWlzTnFWMnpVN2ZJVEQucEEyQ1R0UkdtIiwiaXNBY3RpdmUiOnRydWUsInJvbGUiOiJ1c2VyIiwibGFzdEF1dGhvciI6bnVsbCwibGFzdEdlbnJlIjpudWxsLCJjcmVhdGVkQXQiOiIyMDIzLTEyLTE0VDIyOjI0OjI3LjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIzLTEyLTE0VDIyOjI0OjI3LjAwMFoiLCJpYXQiOjE3MDI1OTMzOTN9.2eDczTPfX5XLjl5czPxxFl3QzY_yWHO8s_mlh8rWGDQ'
        const mockRequest = { headers: testData };
        const mockResponse = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };
        const mockNext = sinon.stub();

        // Ejecuta la función add del MIDDLEWARE
        await isAuthenticated(mockRequest, mockResponse, mockNext);

        expect(mockNext.calledOnce).to.be.true;

        expect(mockRequest.user)
    });
    

    it('Forzando error (Catch Error - Invalid token)', async() => {
        testData.authorization = 'Bearer invalid token'
        const mockRequest = { headers: testData };
        const mockResponse = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };
        const mockNext = sinon.stub();

        // Mock del servicio para simular un error de correo electrónico repetido
        sinon.stub().throws(new Error('Invalid token'));

        await isAuthenticated(mockRequest, mockResponse, mockNext);

        expect(mockNext.args[0][0]).to.be.an.instanceOf(ApiError);
        expect(mockNext.args[0][0].errorCode).to.equal(500);
    });

    it('Forzando error (Undefined Token)', async() => {
        testData.authorization = undefined
        const mockRequest = { headers: testData };
        const mockResponse = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };
        const mockNext = sinon.stub();

        // Ejecuta la función add del MIDDLEWARE
        await isAuthenticated(mockRequest, mockResponse, mockNext);

        expect(mockNext.args[0][0]).to.be.an.instanceOf(ApiError);
        expect(mockNext.args[0][0].errorCode).to.equal(401);
        //Verifica que se llamó al json
        // sinon.assert.calledWith(mockResponse.json, sinon.match.object);
    });

    it('Forzando error (Invalid Token - Mutated Token)', async() => {
        testData.authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI5MDBmMTI3LWZiMjAtNGI0NC05YTk1LWNmODYyNTQ3Mjk5OCIsImZpcnN0TmFtZSI6Ikpob24iLCJsYXN0TmFtZSI6IkRvZSIsImVtYWlsIjoidGVzdEBleGFtcGxlLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJHlDb0hXRzFYMlJWaGMwbGZtY2NOck91YlFXbmoyOWlzTnFWMnpVN2ZJVEQucEEyQ1R0UkdtIiwiaXNBY3RpdmUiOnRydWUsImxhc3RBdXRob3IiOm51bGwsImxhc3RHZW5yZSI6bnVsbCwiY3JlYXRlZEF0IjoiMjAyMy0xMi0xNFQyMjoyNDoyNy4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMy0xMi0xNFQyMjoyNDoyNy4wMDBaIiwiaWF0IjoxNzAyNTkzMzkzfQ._Z_F4EAhEYjr8JkGxnkUTZo-RAx-Lopicfnj1HI_L-k'
        const mockRequest = { headers: testData };
        const mockResponse = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };
        const mockNext = sinon.stub();

        // Ejecuta la función add del MIDDLEWARE
        await isAuthenticated(mockRequest, mockResponse, mockNext);

        expect(mockNext.args[0][0]).to.be.an.instanceOf(ApiError);
        expect(mockNext.args[0][0].errorCode).to.equal(404);
        //Verifica que se llamó al json
        // sinon.assert.calledWith(mockResponse.json, sinon.match.object);
    });
});
