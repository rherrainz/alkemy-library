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
    email: 'test@outlook.com',
    password: '12345678'
};

describe('Login Route', () => {
    describe('login', () => {
        const agent = chai.request.agent(app);

        //CASE 1: Todo OK
        it('Login', async () => {
            const res = await agent.post('/api/login').send(userTestData);
            chai.expect(res).to.have.status(200);
        });

        //CASE 2: Bad credentials
        it('Credenciales incorrectas', async () => {
            userTestData.email = 'test@outlook.com';
            userTestData.password = '1234567890';
            const res = await agent.post('/api/login').send(userTestData);
            chai.expect(res).to.have.status(500);
        });

        //CASE 3: Bad body
        it('Debe ingresar una contraseña y correo válidos', async () => {
            userTestData.email = 'fake_outlook.com';
            userTestData.password = '1234567890';
            const res = await agent.post('/api/login').send(userTestData);
            chai.expect(res).to.have.status(422);
        });
    })
});

