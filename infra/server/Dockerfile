FROM node:22

WORKDIR /app

COPY package*.json ..

RUN npm install

COPY . .

# Docker内で環境に合わせた生成が必要
RUN npx prisma generate

EXPOSE 8000

CMD ["npm", "run", "dev"]