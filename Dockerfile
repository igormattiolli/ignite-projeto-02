# ver quais imagens estão disponiveis no docker hub
# imagem do node, latest irá pegar a ultima versão
FROM node 

# definir em qual diretorios nossas informações serão salvas
WORKDIR /usr/app

#copia o package.json, para o diretorio acima
COPY package.json ./

# agora baixará as dependencias
RUN npm install

# depois que as dependencias foram baixadas,
# será copiado tudo para o diretorio
COPY . .

EXPOSE 3333

# comandos que serão executados no cmd
CMD [ "npm","run", "dev" ]