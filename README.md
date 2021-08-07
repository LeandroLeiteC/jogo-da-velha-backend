# Backend para Jogo da Velha
## Para o frontend [clique aqui!](https://github.com/Plops013/jogo-da-velha-react)

## Pre-requisitos
 - [NodeJs](https://nodejs.org/)

## Configurar e Rodar

### Clone o repositório:

```
$ git clone https://github.com/LeandroLeiteC/jogo-da-velha-backend.git
```
### Instalar as dependências e iniciar a aplicação:
```
$ npm install
$ npm run dev
```
Sua aplicação será iniciada em http://localhost:8080

## Endpoints HTTP

### /rooms endpoint
Esse endpoint retorna todas as salas disponíveis.

```json
// GET http://localhost:8080/rooms

// Response
[
    {
        "id": "string",
        "player1": {
            "id": "string",
            "name": "string"
        },
        "player2": {
            "id": "string",
            "name": "string"
        },
        "board": [],
        "status": "string",
        "turn": "string",
        "restartVote": {
            "player1": "boolean",
            "player2": "boolean"
        }
    }
]
```
## Conexão com Socket IO 

#### A biblioteca socket io para o frontend faz tudo o que é preciso para iniciar a conexão WebSocket com o servidor.
```http
GET http://localhost:8080
```

## Eventos emitidos pelo servidor

### Evento: 'room'
Este listener recebe os eventos que acontecem em uma sala.
```json
Response:
    {
        "id": "string",
        "player1": {
            "id": "string",
            "name": "string"
        },
        "player2": {
            "id": "string",
            "name": "string"
        },
        "board": [],
        "status": "string",
        "turn": "string",
        "restartVote": {
            "player1": "boolean",
            "player2": "boolean"
        }
    }
```
Para este evento os status possíveis são:
 
   - WAITING_FOR_OTHER_PLAYER - Quando a sala ainda não possue os 2 jogadores.
   - RUNNING - Quando a sala está com o jogo acontecendo.
   - FINISHED - Quando a sala tem um jogo finalizado.
   - RESTART_VOTE - Quando a sala está com votação para reiniciar acontecendo.

### Evento: 'game-error'
Neste evento todos os erros que acontecerem serão reportados para o usuário logado.
```json
Response:
    {
        "error": "string"
    }
```
para o evento de app-error os resultados possíveis são:

   - ROOM_NOT_FOUND - Quando a sala para uma ação não foi encontrada.
   - ROOM_IS_FULL - Quando o usuário tenta se conectar em uma sala cheia.
   - INVALID_MOVE - Quando o usuário faz um movimento inválido.
   - NOT_YOUR_TURN - Quando o usuário faz um movimento quando não é sua vez.
   - GAME_NOT_RUNNNING - Quando o usuário faz um movimento em uma sala que não possue uma partida em andamento.

## Eventos emitidos pelo cliente
Todos os eventos que o cliente pode emitir.

Lembrando que para dados inválidos/erros que acontecerem a partir de um evento o servidor emite o evento de 'game-error'.
### Evento: 'join'
Neste evento o usuário poderá entrar em uma sala existente ou não.

```json
Body:
{
    "username": "string",
    "room": "string?"
}

room: A '?' indica que o atributo não é obrigatório.
Response:
    Evento: 'room'
```
### Evento: 'move'
Neste evento o jogador envia os dados de sua jogada.
```json
Body:
{
    "x": 0,
    "y": 0
}

x: Valor representa as LINHAS e precisa estar entre 0 e 2
y: Valor representa as COLUNAS e precisa estar entre 0 e 2
Response:
    Evento: 'room'
```

### Evento: 'restart'
Este evento inicia uma votação para reiniciar o jogo.
```json
Body:
{
    "wantTo": true
}

Response:
    Evento: 'room'
```

### Evento: 'leave' ou 'disconnect'
Este evento desconectao o usuário da sua sala atual.

- Caso ainda reste um jogador na sala este jogador receberá o evento.
- Caso nenhum jogador reste na sala ela é fechada.

O evento de 'disconnect' é emitido pelo próprio socket io, para o servidor os dois possuem o mesmo efeito.
```json
Não possue Body.
Response:
    Evento: 'room'
```