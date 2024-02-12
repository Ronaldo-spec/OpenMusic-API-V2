require("dotenv").config();

const Hapi = require("@hapi/hapi");
const Jwt = require('@hapi/jwt');
const ClientError = require("./exceptions/ClientError");

//Notes
//const notes = require("./api/notes");
//const NotesService = require("./services/postgres/NotesService");
//const NotesValidator = require("./validator/notes");

// users
const users = require("./api/users");
const UsersService = require("./services/postgres/UsersService");
const UsersValidator = require("./validator/users");

// authentications
const authentications = require("./api/authentications");
const AuthenticationsService = require("./services/postgres/AuthenticationsService");
const TokenManager = require("./tokenize/TokenManager");
const AuthenticationsValidator = require("./validator/authentications");

// collaborations
const collaborations = require('./api/collaborations');
const CollaborationsService = require('./services/postgres/CollaborationsService');
const CollaborationsValidator = require('./validator/collaborations');

// songs
const songs = require("./api/songs");
const SongsService = require("./services/postgres/SongsService");
const SongsValidator = require("./validator/songs");

// albums
//const albums = require("./api/albums");
//const albumsService = require('./services/postgres/AlbumsService');
//const AlbumsValidator = require('./validator/albums');

// playlists
const playlists = require("./api/playlists");
const PlaylistsService = require("./services/postgres/PlaylistsService");
const PlaylistsValidator = require("./validator/playlists");

// playlistsongs
const playlistsongs = require("./api/playlistsongs");
const PlaylistsongsService = require("./services/postgres/PlaylistsongsService");
const PlaylistsongsValidator = require("./validator/playlistsongs");

const init = async () => {
  const collaborationsService = new CollaborationsService();
  //const notesService = new NotesService(collaborationsService);
  const usersService = new UsersService();
  const authenticationsService = new AuthenticationsService();
  const songsService = new SongsService();
  const playlistsService = new PlaylistsService(collaborationsService);
  const playlistsongsService = new PlaylistsongsService();

  const server = Hapi.server({
    port: 3000,
    host: process.env.NODE_ENV !== "production" ? "localhost" : "0.0.0.0",
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  // registrasi plugin eksternal
  await server.register([
    {
      plugin: Jwt,
    },
  ]);

  // mendefinisikan strategy autentikasi jwt
  server.auth.strategy('playlistsapp_jwt', 'jwt', {
    keys: [process.env.ACCESS_TOKEN_KEY],
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE,
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id,
      },
    }),
  });
  console.log(process.env.PORT);

  await server.register([
    {
      plugin: songs,
      options: {
        service: songsService,
        validator: SongsValidator,
      },
    },
    //{
      //plugin: albums,
      //options: {
        //service: albumsService,
        //validator: AlbumsValidator,
      //},
    //},
    {
      plugin: users,
      options: {
        service: usersService,
        validator: UsersValidator,
      },
    },
    {
      plugin: authentications,
      options: {
        authenticationsService,
        usersService,
        tokenManager: TokenManager,
        validator: AuthenticationsValidator,
      },
    },
    {
      plugin: collaborations,
      options: {
        collaborationsService,
        playlistsService,
        validator: CollaborationsValidator,
      },
    },
    {
      plugin: playlists,
      options: {
        playlistsService,
        usersService,
        validator: PlaylistsValidator,
      },
    },
    {
      plugin: playlistsongs,
      options: {
        playlistsongsService,
        playlistsService,
        validator: PlaylistsongsValidator,
      },
    },
  ]);

  server.ext("onPreResponse", (request, h) => {
    // mendapatkan konteks response dari request
    const { response } = request;

    // penanganan client error secara internal.
    if (response instanceof ClientError) {
      const newResponse = h.response({
        status: "fail",
        message: response.message,
      });
      newResponse.code(response.statusCode);
      return newResponse;
    }

    return h.continue;
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
