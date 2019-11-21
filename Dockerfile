FROM node:12

WORKDIR /etc/datadog-agent

ARG DD_API_KEY
ENV DD_INSTALL_ONLY=true
RUN bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_script.sh)"

RUN echo "logs_enabled: true\nprocess_config:\nenabled: 'disabled'" >> datadog.yaml

WORKDIR	/etc/datadog-agent/conf.d

COPY ./datadog/conf.d/nodejs.d ./nodejs.d

WORKDIR /usr/src/app

RUN echo "     deb http://apt.postgresql.org/pub/repos/apt/ stretch-pgdg main" >> /etc/apt/sources.list.d/pgdg.list
RUN wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add -
RUN apt-get update
RUN apt-get install postgresql-11 -y

COPY . .

RUN npm install
RUN npm run build

EXPOSE 3000

CMD ./run.sh