import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import server from '../../app';
import models from '../../models';
import { LessonControllers, AuthControllers } from '../../controllers';
import {
  status, messages, Jwt, bcrypt,
} from '../../utils';

import fakerSpec from '../crossVariables'

chai.use(sinonChai);
chai.use(chaiHttp);
chai.should();
const { expect } = chai;
const { signUpUser } = AuthControllers;

const signUpRoute = '/api/v1/auth/signup';
const getAllLessonsRoute = '/api/v1/lessons/get_all_lessons';

afterEach(() => sinon.restore());

// Learners' Lessons test
describe("Learners' Lessons test", () => {
  it('Gets Learners Lessons successfully with attached token', function(done){
     this.timeout(20000);
    chai.request(server).get(getAllLessonsRoute)
    .set('authorization', `Bearer ${fakerSpec.token}`)
    .set('Accept', 'application.json')
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .end((error, response) => {
        response.body.should.be.a('object');
        response.body.statusCode.should.eql(200);
        response.body.should.have.property('status');
        response.body.should.have.property('message');
        response.body.data.should.be.a('array');
        response.body.data[0].should.be.a('object');
        response.body.data[0].should.have.property('id');
        response.body.data[0].should.have.property('subjectName');
        response.body.data[0].should.have.property('durationMinutes');
        response.body.data[0].should.have.property('grade');
      done();
    })
  });
});


