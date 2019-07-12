.PHONY: test
test:
	go test ./...

.PHONY: clean
clean:
	test -e "cmd/server/main" && rm cmd/server/main || exit 0

.PHONY: build
build: clean
	cd cmd/server && \
	GOOS=linux GOARCH=amd64 go build -o main && \
	cd ../.. && \
	docker-compose -p apydox_server build

.PHONY: api
api: build
	docker-compose -p apydox_server up
