Todos.setupForTesting();
Todos.injectTestHelpers();
emq.globalize();
setResolver(Ember.DefaultResolver.create({namespace: Todos}));
