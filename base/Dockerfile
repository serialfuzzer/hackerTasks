FROM --platform=linux/amd64 alpine:3.18
ARG NODE_VERSION=18.16.0



# install nodejs and npm
RUN apk add --update nodejs npm
RUN apk add --no-cache netcat-openbsd
RUN apk add --no-cache sed

# Set up hackerTasks
COPY ./hackerTasks /hackerTasks
COPY ./hackerTasks/wait-for-mysql.sh /usr/local/bin/wait-for-mysql.sh

WORKDIR /hackerTasks
RUN npm install --save
RUN chmod +x /usr/local/bin/wait-for-mysql.sh
RUN sed -i 's/\r$//' /usr/local/bin/wait-for-mysql.sh

ENTRYPOINT ["wait-for-mysql.sh"]

