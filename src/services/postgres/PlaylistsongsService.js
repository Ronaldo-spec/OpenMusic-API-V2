const { Pool } = require("pg");
const { nanoid } = require("nanoid");
const InvariantError = require("../../exceptions/InvariantError");
const { mapDBToModel } = require("../../utils");
const NotFoundError = require("../../exceptions/NotFoundError");

class PlaylistsongsService {
  constructor() {
    this._pool = new Pool();
  }

  async addPlaylistsong(songId, playlistId) {
     const songQuery = {
            text: 'SELECT * FROM songs WHERE id = $1',
            values: [songId],
        };

        const songResult = await this._pool.query(songQuery);

        if (!songResult.rowCount) {
            throw new NotFoundError('Lagu gagal ditambahkan');
        }

        const id = `playlist-song-${nanoid(16)}`;

        const playlistQuery = {
            text: 'INSERT INTO playlist_songs VALUES($1, $2, $3) RETURNING id',
            values: [id, playlistId, songId],
        };

        await this._pool.query(playlistQuery);
  }

  async getPlaylistsongById(id) {
    const query = {
      text: `SELECT playlistsongs.*, songs.title, songs.performer FROM playlistsongs LEFT JOIN songs ON songs.id = playlistsongs.song_id 
      WHERE playlistsongs.playlist_id = $1`,
      values: [id],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError("Playlist tidak ditemukan");
    }

    return result.rows.map(mapDBToModel);
  }

  async deletePlaylistsong(songId, playlistId) {
    const query = {
      text: "DELETE FROM playlistsongs WHERE song_id = $1 AND playlist_id = $2 RETURNING id",
      values: [songId, playlistId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError("Lagu gagal dihapus");
    }
  }

  async verifyCollaborator(songId, playlistId) {
    const query = {
      text: "SELECT * FROM playlistsongs WHERE song_id = $1 AND playlist_id = $2",
      values: [songId, playlistId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError("Lagu gagal diverifikasi");
    }
  }
}

module.exports = PlaylistsongsService;