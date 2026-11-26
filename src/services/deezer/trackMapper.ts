import { Track } from "../../models/Tracks";

export function mapDeezerTrack(data: any): Track | null {
  if (
    !data.id ||
    !data.title ||
    !data.artist ||
    !data.album?.cover_medium ||
    !data.preview
  ) {
    return null;
  }

  return {
    id: data.id,
    title: data.title,
    artist: data.artist.name,
    albumCover: data.album.cover_medium,
    previewUrl: data.preview,
  };
}

