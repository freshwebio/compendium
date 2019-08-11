FROM alpine:latest

ARG APYDOX_API_PORT=4305
ARG APYDOX_API_CONFIG_FILE=/config/apydox-api.conf

# Will be overriden if provided at container runtime.
ENV APYDOX_API_CONFIG_FILE=$APYDOX_API_CONFIG_FILE

RUN apk --no-cache add ca-certificates

COPY ./cmd/server/main /apydox-api

RUN chmod +x /apydox-api

EXPOSE "${APYDOX_API_PORT}"

# We can only use args in CMD running through sh.
# https://github.com/moby/moby/issues/5509#issuecomment-45243772
CMD ["sh", "-c", "/apydox-api -config ${APYDOX_API_CONFIG_FILE}"]