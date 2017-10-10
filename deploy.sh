if [ -e "$DEPLOYMENT_TARGET/package.json" ]; then
  cd "$DEPLOYMENT_TARGET"
  eval $NPM_CMD install --production
  eval $NPM_CMD install --only=dev
  eval $NPM_CMD start
  exitWithMessageOnError "npm failed"
  cd - > /dev/null
fi

# 5. Run Gulp Task
if [ -e "$DEPLOYMENT_TARGET/gulpfile.js" ]; then
  cd "$DEPLOYMENT_TARGET"
  eval ./node_modules/.bin/gulp serve
  exitWithMessageOnError "gulp failed"
  cd - > /dev/null
fi