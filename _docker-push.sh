# Install prod config
cp ../config/config-prod-backend.js config.js
# Build docker
docker build -t matryx-plateform-alpha-backend .
# Tag docker
docker tag matryx-plateform-alpha-backend:latest 441665557124.dkr.ecr.us-west-1.amazonaws.com/matryx-plateform-alpha-backend:latest
# Upload docker to secured repo
docker push 441665557124.dkr.ecr.us-west-1.amazonaws.com/matryx-plateform-alpha-backend:latest
