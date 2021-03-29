DEPLOY_DIR=~/www/doctor

meteor build --server-only --directory $DEPLOY_DIR

cd $DEPLOY_DIR
tar -cvzf ~/doctor.tar.gz -C $DEPLOY_DIR/bundle .
