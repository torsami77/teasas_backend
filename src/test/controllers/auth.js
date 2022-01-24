import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from '@faker-js/faker';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import server from '../../app';
import models from '../../models';
import { AuthControllers } from '../../controllers';
import {
  status, messages, Jwt, bcrypt,
} from '../../utils';

import fakerSpec from '../crossVariables'

chai.use(sinonChai);
chai.use(chaiHttp);
chai.should();
const { expect } = chai;
const { signUpUser, signInUser } = AuthControllers;

const signUpRoute = '/api/v1/auth/sign_up';
const signInRoute = '/api/v1/auth/sign_in';

const password = faker.internet.password();
const grades = ['grade1', 'grade2', 'grade3', 'grade4', 'grade5', 'grade6', 'grade7', 'grade8', 'grade9', 'grade10', 'grade11', 'grade12']

const dummyUser = {
  childName: faker.name.firstName(),
  email: faker.internet.email(),
  phoneNumber: Math.floor(Math.random() * 999999999) + 1,
  countryCode: Math.floor(Math.random() * 999) + 1,
  grade: grades[Math.floor(Math.random() * grades.length)],
  password
};

afterEach(() => sinon.restore());

// User Registration Validation test
describe('Learner Registration test', () => {
  it('Should return error for invalid Learner Registration data', (done) => {
    const user = {
      childName: faker.name.firstName(),
      email: 'invalidMail',
      password: faker.internet.password(),
    };
    chai.request(server).post(signUpRoute).send(user).end((error, response) => {
      if (error) throw Error(`Error making test request ${signUpRoute}`);
      response.should.have.status(status.unprocessable);
      response.body.should.have.property('errors');
      const hasEmailErr = !!response.body.errors.email;
      hasEmailErr.should.equal(true);
      done();
    });
  });
  it('Should remove white spaces in childName', (done) => {
    const user = {
      childName: '             ',
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    chai.request(server).post(signUpRoute).send(user).end((error, response) => {
      if (error) throw Error(`Error making test request ${signUpRoute}`);
      response.should.have.status(status.unprocessable);
      response.body.should.have.property('errors');
      const hasFirstNameProp = !!response.body.errors.childName;
      hasFirstNameProp.should.equal(true);
      done();
    });
  });
  it('Should return error for missing parameters', (done) => {
    const user = {
      childName: faker.name.firstName(),
      grade: faker.name.lastName()
    };
    chai.request(server).post(signUpRoute).send(user).end((error, response) => {
      if (error) throw Error(`Error making test request ${signUpRoute}`);
      response.should.have.status(status.unprocessable);
      response.body.should.have.property('errors');
      done();
    });
  });
  it('fakes successful learner signup', function(done){
    this.timeout(20000);
    chai.request(server).post(signUpRoute).send(dummyUser).end((error, response) => {
        response.should.have.status(status.created);
        fakerSpec.token = response.body.token;
        done();
    })
  });
  it('fakes a conflict when learner already exist', async () => {
    const req = {
      body: dummyUser
    };
    const res = {
      status: () => { },
      json: () => { },
    };

    sinon.stub(res, 'status').returnsThis();
    sinon.stub(models.users, 'findOne').returns(true);

    await signUpUser(req, res);
    expect(res.status).to.have.been.calledWith(status.conflict);
  });
  it('fakes a server error during learner registration', async () => {
    const req = {
      body: dummyUser
    };
    const res = {
      status: () => { },
      json: () => { },
    };
    sinon.stub(res, 'status').returnsThis();
    sinon.stub(models.users, 'findOne').throws();

    await signUpUser(req, res);
    expect(res.status).to.have.been.calledWith(500);
  });
});

describe('Learner Sign In test', () => {
    it('Should return error for invalid learner Sign In data', (done) => {
      const user = {
        email: 'invalidMail',
        password: faker.internet.password(),
      };
      chai.request(server).post(signInRoute).send(user).end((error, response) => {
        if (error) throw Error(`Error making test request ${signInRoute}`);
        response.should.have.status(status.unprocessable);
        response.body.should.have.property('errors');
        const hasEmailErr = !!response.body.errors.email;
        hasEmailErr.should.equal(true);
        done();
      });
    });
  
    it('Should return error for missing parameters', (done) => {
      const user = {
        email: faker.internet.email(),
      };
      chai.request(server).post(signInRoute).send(user).end((error, response) => {
        if (error) throw Error(`Error making test request ${signInRoute}`);
        response.should.have.status(status.unprocessable);
        response.body.should.have.property('errors');
        done();
      });
    });
    it('it should return a response if learner is not found', (done) => {
      const user = {
        email: faker.internet.email(),
        password: faker.internet.password()
      };
      chai.request(server)
        .post(signInRoute)
        .send(user)
        .end((err, res) => {
          res.should.have.status(status.unauthorized);
          res.body.should.be.a('object');
          res.body.should.have.property('statusCode').eql(401);
          done(err);
        });
    });
  
    it('it fakes response if learner password is not valid', async () => {
      const req = {
        body: dummyUser
      };
      const res = {
        status: () => { },
        json: () => { },
      };
      const user = {
        password: faker.internet.password(),
        email: dummyUser.email,
      };
      sinon.stub(res, 'status').returnsThis();
      sinon.stub(models.users, 'findOne').returns(user);
      await signInUser(req, res);
      expect(res.status).to.have.been.calledWith(status.unauthorized);
    });
    it('fakes a successful learner sign in', async () => {
      const req = {
        body: dummyUser
      };
      const res = {
        status: () => { },
        json: () => { },
      };
      const user = {
        password: dummyUser.password,
        email: dummyUser.email,
      };
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ';
      sinon.stub(res, 'status').returnsThis();
      sinon.stub(models.users, 'findOne').returns(user);
      sinon.stub(bcrypt, 'comparePassword').returns(true);
      sinon.stub(Jwt, 'generateToken').returns(token);
      await signInUser(req, res);
      expect(res.status).to.have.been.calledWith(status.success);
    });
    it('fakes a server error during learner sign in', async () => {
      const req = {
        body: dummyUser
      };
      const res = {
        status: () => { },
        json: () => { },
      };
      sinon.stub(res, 'status').returnsThis();
      sinon.stub(models.users, 'findOne').throws();
  
      await signInUser(req, res);
      expect(res.status).to.have.been.calledWith(status.error);
    });
  });
  
// Learner Sign In Validation test
