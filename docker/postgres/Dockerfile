FROM postgres:13.1

WORKDIR /

USER root

RUN set -ex \
  && apt-get update \
  && apt-get install -y postgis postgresql-13-postgis-2.5-scripts

COPY ./initdb-postgis.sh /docker-entrypoint-initdb.d

EXPOSE 5432