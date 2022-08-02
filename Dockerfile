FROM node:16

WORKDIR /team_sloths

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

RUN chmod +x entry-point.sh
CMD [ "./entry-point.sh" ]
