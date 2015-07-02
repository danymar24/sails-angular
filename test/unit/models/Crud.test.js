describe('CrudModel', function () {
	describe('#find()', function(){
		it('should check find function', function(done){
			Crud.find()
				.then(function(results){
					done();
				})
				.catch(done);
		});
	});
});