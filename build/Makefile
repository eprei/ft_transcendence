build:
	docker build . --tag tgrivel/nginx

run:
	docker run \
	--rm \
	--name some-nginx \
	--publish 80:80 \
	--detach \
	--volume $(shell pwd)/frontend:/var/www/transcendence.t-h2o.ch tgrivel/nginx

stop:
	docker stop some-nginx || printf "this container don't exist"

re: stop build run
