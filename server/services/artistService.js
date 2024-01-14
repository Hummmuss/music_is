const { Artist } = require("../models");
const uuid = require('uuid');
const path = require("path");

class ArtistService {
    async createArtist({ name, image }) {
        const fileName = uuid.v4() + '.jpg';
        image.mv(path.resolve(__dirname, '..', 'artistPhotos', fileName));
        const artist = await Artist.create({ name, image: fileName });
        return artist;
    }

    async getAllArtists() {
        const artists = await Artist.findAll();
        return artists;
    }
}

module.exports = new ArtistService();