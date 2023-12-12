import chai from "chai";
import chaiHttp from 'chai-http';
import indexRouter from '../routes/index.route.js'
import express from "express";

const app = express();
app.use(express.json());
app.use("/api", indexRouter);

chai.use(chaiHttp);

//SEND TO sv
let userTestData = {
    firstName: 'Test',
    lastName: 'Test',
    email: 'test@outlook.com',
    password: '12345678'
};

describe('User Route', () => {
    describe('create', () => {
        const agent = chai.request.agent(app);

        //CASE 1: Todo OK
        it('Usuario creado', async () => {
            const res = await agent.post('/api/user').send(userTestData);
            chai.expect(res).to.have.status(201);
        });

        //CASE 2: Correo ya registrado
        it('El correo ingresado ya se encuentra registrado', async () => {
            userTestData.email = 'test@example.com';
            const res = await agent.post('/api/user').send(userTestData);
            chai.expect(res).to.have.status(409);
        })

        //CASE 3: Se envía un objeto vacío desde el cliente | Función del DTO
        it('Debe enviar un usuario válido', async () => {
            userTestData.firstName = '';
            userTestData.lastName = '';
            userTestData.email = '';
            userTestData.password = '';

            const res = await agent.post('/api/user').send(userTestData);
            chai.expect(res).to.have.status(422);
        })
    })
});

