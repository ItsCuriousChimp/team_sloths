FROM node:16

WORKDIR /team_sloths

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000
CMD [ "./entry-point.sh" ]
