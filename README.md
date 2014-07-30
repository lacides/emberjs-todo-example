# emberjs-todo-example
Yet another todo list. I guess it also works as an emberjs app template.

## Getting Started

1. Clone repository
2. Install dependencies
  1. Run <code>bundle install</code> to install ruby gems. (At the moment of writing it was just sass).
  2. Run <code>npm install</code> to install node dependencies.

## Grunt tasks
### grunt build
It will compile sass files, concatenate js files and copy relevant files. It will copy the build results to the /generated folder.

### grunt execute:server
It will raise a simple expressjs server that serves the build results.

### grunt run
It will run both <code>grunt build</code> and <code>grunt execute:server</code>.

### grunt watch:build
It will watch for changes on your source code to rebuild the project.

## Workflow
Just run <code>grunt run</code> on a terminal window and <code>grunt watch:build</code> on another.

## Deploying to heroku
You need to use multibuild packs to deploy this application to heroku.
Run <code>heroku config:add BUILDPACK_URL=https://github.com/ddollar/heroku-buildpack-multi.git</code> to enable it and then just <code>git push heroku master</code> as always.
