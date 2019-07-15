IMAGE_NAME := $(IMAGE_NAME)
IMAGE_TAG := $(IMAGE_TAG)

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

.PHONY: cibuild
cibuild: clean
	cd cmd/server && \
	GOOS=linux GOARCH=amd64 go build -o main && \
	cd ../.. && \
	docker build -t $(IMAGE_NAME):$(IMAGE_TAG) .

.PHONY: api
api: build
	docker-compose -p apydox_server up
