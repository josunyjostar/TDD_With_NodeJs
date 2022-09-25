import {app} from '../../index.js';
import request from 'supertest';
import should from 'should';

describe('PUT /users/:id', () => {
  describe('성공시', () => {
    it('변경된 name를 응답한다', done => {
      request(app)
        .put('/users/3')
        .send({name: 'den'})
        .end((err, res) => {
          res.body.should.have.property('name', 'den');
          done();
        });
    });
  });
  describe('실패시', () => {
    it('id가 정수가 아닌경우 400 응답', done => {
      request(app).put('/users/three').send({name: 'test'}).expect(400).end(done);
    });
    it('name이 없을 경우 400 응답', done => {
      request(app).put('/users/3').send({}).expect(400).end(done);
    });
    it('없는 유저일 경우 404 응답', done => {
      request(app).put('/users/4').send({name: '!@#'}).expect(404).end(done);
    });
    it('이름이 중복일 경우 409 응답', done => {
      request(app).put('/users/3').send({name: 'bek'}).expect(409).end(done);
    });
  });
});
