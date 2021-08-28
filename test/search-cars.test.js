const chai = require('chai');
const chaiHttp = require('chai-http');
const { config } = require('../config');
const { SearchTestsData } = require('../config/test/searchTestData');

chai.should();
chai.use(chaiHttp);

const searchTest = new SearchTestsData();

describe('Search vehicles', () => {
  it('it should GET cars by city and dates (in/out) params', (done) => {
    chai
      .request(config.apiUrl)
      .get(
        `/search/by-city/${searchTest.getQueryCity()}/${searchTest.getQueryIn()}/${searchTest.getQueryOut()}`
      )
      .end((_, res) => {
        res.should.have.status(200);
        res.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('data');
        res.body.should.have.property('message').eql('List Cars by city');
        res.body.should.have.property('data').to.be.an('array');
        done();
      });
  });

  it('it should GET cars by city and dates (in/out) params', (done) => {
    chai
      .request(config.apiUrl)
      .get(
        `/search/by-city/${searchTest.getQueryCartagena()}/${searchTest.getQueryIn()}/${searchTest.getQueryOut()}`
      )
      .end((_, res) => {
        res.should.have.status(200);
        res.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('data');
        res.body.should.have.property('message').eql('List Cars by city');
        res.body.should.have.property('data').to.be.an('array');
        done();
      });
  });

  it('it should GET cars by city and dates (in/out) params', (done) => {
    chai
      .request(config.apiUrl)
      .get(
        `/search/by-city/${searchTest.getQueryMedellin()}/${searchTest.getQueryIn()}/${searchTest.getQueryOut()}`
      )
      .end((_, res) => {
        res.should.have.status(200);
        res.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('data');
        res.body.should.have.property('message').eql('List Cars by city');
        res.body.should.have.property('data').to.be.an('array');
        done();
      });
  });

  it('it should GET cars by city and dates (in/out) params', (done) => {
    chai
      .request(config.apiUrl)
      .get(
        `/search/by-city/${searchTest.getQueryBarranquilla()}/${searchTest.getQueryIn()}/${searchTest.getQueryOut()}`
      )
      .end((_, res) => {
        res.should.have.status(200);
        res.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('data');
        res.body.should.have.property('message').eql('List Cars by city');
        res.body.should.have.property('data').to.be.an('array');
        done();
      });
  });

  it('it should GET cars by city and dates (in/out) params, but empty results because in the search city there is no Huru coverage', (done) => {
    chai
      .request(config.apiUrl)
      .get(
        `/search/by-city/${searchTest.getQueryManizales()}/${searchTest.getQueryIn()}/${searchTest.getQueryOut()}`
      )
      .end((_, res) => {
        res.should.have.status(200);
        res.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('data');
        res.body.should.have.property('message').eql('List Cars by city');
        res.body.should.have.property('data').to.be.a('object').that.is.empty;
        done();
      });
  });

  it('it should GET cars by city and dates (in/out) params, but empty results because in the search city there is no Huru coverage', (done) => {
    chai
      .request(config.apiUrl)
      .get(
        `/search/by-city/${searchTest.getQueryPereira()}/${searchTest.getQueryIn()}/${searchTest.getQueryOut()}`
      )
      .end((_, res) => {
        res.should.have.status(200);
        res.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('data');
        res.body.should.have.property('message').eql('List Cars by city');
        res.body.should.have.property('data').to.be.a('object').that.is.empty;
        done();
      });
  });

  it('it should GET cars by city and dates (in/out) params, but empty results because in the search city there is no Huru coverage', (done) => {
    chai
      .request(config.apiUrl)
      .get(
        `/search/by-city/${searchTest.getQueryPasto()}/${searchTest.getQueryIn()}/${searchTest.getQueryOut()}`
      )
      .end((_, res) => {
        res.should.have.status(200);
        res.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('data');
        res.body.should.have.property('message').eql('List Cars by city');
        res.body.should.have.property('data').to.be.a('object').that.is.empty;
        done();
      });
  });
});
