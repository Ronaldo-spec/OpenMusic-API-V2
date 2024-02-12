const PlaylistsHandler = require('./handler');
// const NotesHandler = require('./handler');
const routes = require('./routes');
 
module.exports = {
  name: 'playlists',
  version: '1.0.0',
  register: async (server, { playlistsService, service, validator }) => {
    const playlistHandler = new PlaylistsHandler(playlistsService, service, validator);
    server.route(routes(playlistHandler));
  },
};