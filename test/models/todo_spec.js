moduleForModel('todo', 'Todo Model');

test('creating record sets attributes correctly', function(){
  var todo = this.subject({
    title: "Test Title",
    isCompleted: true
  });

  var modelTitle = todo.get('title');
  var modelIsCompleted = todo.get('isCompleted');

  equal(modelTitle, 'Test Title', 'Title was ' + modelTitle);
  equal(modelIsCompleted, true, 'isCompleted was ' + modelIsCompleted);
});
