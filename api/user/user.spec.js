import {app} from '../../index.js';
import request from 'supertest';
import should from 'should';
import dbSync from '../../bin/sync-db.js';
import {User} from '../../models.js';

function init() {
  const users = [
    {id: 1, name: 'chris'},
    {id: 2, name: 'hwasin'},
    {id: 3, name: 'yum'},
  ];

  before(() => dbSync());
  before(() => User.bulkCreate(users));
}

describe('GET /users는', () => {
  //
  init();
  //
  describe('성공시', () => {
    it('유저 객체를 담은 배열로 응답한다', done => {
      request(app)
        .get('/users')
        .end((err, res) => {
          res.body.should.be.instanceOf(Array);
          done();
        });
    });

    it('최대 limit 개수만큼 응답한다.', done => {
      request(app)
        .get('/users?limit=2')
        .end((err, res) => {
          res.body.should.have.lengthOf(2);
          done();
        });
    });

    describe('실패시', () => {
      it('limit이 숫자형이 아니면 400을 응답한다.', done => {
        request(app)
          .get('/users?limit=temp')
          .expect(400)
          .end((err, res) => {
            done();
          });
      });
    });
    //
  });
});

describe('GET /users/1는', () => {
  init();
  //
  describe('성공시', () => {
    it('id가 1인 유저 객체를 반환한다.', done => {
      request(app)
        .get('/users/1')
        .expect(200)
        .end((err, res) => {
          res.body.should.have.property('id', 1);
          done();
        });
    });
  });
  //
  describe('실패시', () => {
    it('id가 숫자가 아닐경우 400으로 응답한다.', done => {
      request(app).get('/users/one').expect(400).end(done);
    });
    //
    it('id를 찾을 수 없는 경우 404으로 응답한다.', done => {
      request(app).get('/users/999').expect(404).end(done);
    });
  });
  //
});

describe('DELETE /users/:id', () => {
  init();
  describe('성공시', () => {
    it('id를 찾은 경우', done => {
      request(app).delete('/users/1').expect(204).end(done);
    });
  });

  describe('실패시', () => {
    it('id가 숫자가 아닌 경우', done => {
      request(app).delete('/users/one').expect(400).end(done);
    });
  });
});

describe('POST /users', () => {
  init();
  describe('성공시', () => {
    //before
    let body = {};
    before(done => {
      request(app)
        .post('/users')
        .send({name: 'daniel'})
        .expect(201)
        .end((err, res) => {
          body = res.body;
          done();
        });
    });

    it('생성된 유저객체에 id속성이 있어야한다.', () => {
      body.should.have.property('id');
    });
    it('생성된 유저객체에 name속성이 있어야한다.', () => {
      body.should.have.property('name', 'daniel');
    });
    //
  });
  describe('실패시', () => {
    it('name 속성 누락시 400을 반환한다', done => {
      request(app).post('/users').send({}).expect(400).end(done);
    });
    it('name 값 중복시 409을 반환한다', done => {
      request(app).post('/users').send({name: 'daniel'}).expect(409).end();
      done();
    });
  });
});

describe.only('PUT /users/:id', () => {
  init();
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
      request(app).put('/users/3').send({name: 'bek'}).expect(409).end();
      done();
    });
  });
});
