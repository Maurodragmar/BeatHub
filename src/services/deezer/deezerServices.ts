import { mapDeezerTrack } from "./trackMapper";
import type { Track } from "../../models/Tracks";

const DEEZER_API = "https://api.deezer.com";

export async function searchTracks(query: string): Promise<Track[]> {
    const response = await fetch(`${DEEZER_API}/search?q=${encodeURIComponent(query)}`);

    if (!response.ok) {
        throw new Error("Erreur lors de la récupération des morceaux");
    }

    const data = await response.json();

    if (!Array.isArray(data.data)) {
        throw new Error("Réponse Deezer invalide");
    }

    // Transformer les données Deezer
    const tracks: Track[] = data.data.map((item: any) => mapDeezerTrack(item)).filter((track: Track | null): track is Track => track !== null);

    // Supprimer les doublons
    const uniqueTracks: Track[] = Array.from(
        new Map<number, Track>(tracks.map((track: Track) => [track.id, track])).values()
    );

    return uniqueTracks;
}
