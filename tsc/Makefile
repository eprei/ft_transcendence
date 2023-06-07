all:
	mkdir -p dist
	docker run \
	--rm \
	--volume $(shell pwd):/app tgrivel/tsc tsc \
	ts/main.ts \
	--outfile dist/main.js

