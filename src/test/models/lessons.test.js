import chai from 'chai';
import {
  sequelize, dataTypes, checkModelName, checkPropertyExists,
} from 'sequelize-test-helpers';

import LessonModel from '../../models/lesson';

const { expect } = chai;
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

describe('Learner Model', () => {
  const Lesson = LessonModel(sequelize, dataTypes);
  const lessons = new Lesson();

  checkModelName(Lesson)('lessons');

  context('properties', () => {
     ['subjectName', 'startdate', 'durationMinutes', 'grade'].forEach(checkPropertyExists(lessons));
  });
});