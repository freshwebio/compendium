FROM alpine:latest

ARG COMPENDIUM_API_PORT=4305
ARG COMPENDIUM_API_CONFIG_FILE=/config/compendium-api.conf

# Will be overriden if provided at container runtime.
ENV COMPENDIUM_API_CONFIG_FILE=$COMPENDIUM_API_CONFIG_FILE

RUN apk --no-cache add ca-certificates

COPY ./cmd/server/main /compendium-api

RUN chmod +x /compendium-api

EXPOSE "${COMPENDIUM_API_PORT}"

# We can only use args in CMD running through sh.
# https://github.com/moby/moby/issues/5509#issuecomment-45243772
CMD ["sh", "-c", "/compendium-api -config ${COMPENDIUM_API_CONFIG_FILE}"]