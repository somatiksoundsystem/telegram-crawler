#!/bin/bash
set -eo pipefail
IFS=$'\n\t'

docker compose -f docker-compose.yml -f docker-compose.dev.yml up $@
