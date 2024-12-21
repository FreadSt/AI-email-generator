FROM node:20

WORKDIR /frontend
COPY . .

RUN yarn install
# RUN yarn lint
RUN yarn build
RUN yarn global add serve

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]
