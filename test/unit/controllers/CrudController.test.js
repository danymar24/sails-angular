var request = require('supertest');

describe('CrudController', function () {
	describe('#create()', function () {
		it('should create an element', function (done) {
			request(sails.hooks.http.app)
				.post('/crud')
				.send({ title: 'test', text: 'test' })
				.expect(201, done);
		});
	});
});