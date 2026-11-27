import { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Button,
    FlatList,
    Image,
    ActivityIndicator,
    StyleSheet,
} from "react-native";

import { searchTracks } from "../services/deezer/deezerServices";
import type { Track } from "../models/Tracks";

export default function TestDeezer() {
    const [query, setQuery] = useState("Daft Punk");
    const [tracks, setTracks] = useState<Track[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSearch() {
        try {
            setLoading(true);
            setError("");

            const results = await searchTracks(query);

            setTracks(results);

        } catch (err) {
            setError("Impossible de récupérer les morceaux.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Test API Deezer</Text>

            <TextInput
                style={styles.input}
                value={query}
                onChangeText={setQuery}
                placeholder="Rechercher un artiste..."
            />

            <Button title="Rechercher" onPress={handleSearch} />

            {loading && <ActivityIndicator size="large" />}

            {error !== "" && <Text style={styles.error}>{error}</Text>}

            <Text style={styles.count}>
                {tracks.length} morceaux récupérés
            </Text>

            <FlatList
                data={tracks}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.track}>
                        <Image
                            source={{ uri: item.albumCover }}
                            style={styles.image}
                        />

                        <View>
                            <Text style={styles.trackTitle}>{item.title}</Text>
                            <Text>{item.artist}</Text>
                            <Text style={styles.preview}>
                                Préécoute : {item.previewUrl ? "OK" : "Indisponible"}
                            </Text>
                        </View>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 60,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: "#999",
        padding: 12,
        marginBottom: 10,
        borderRadius: 8,
    },
    count: {
        marginVertical: 15,
        fontWeight: "bold",
    },
    track: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
        gap: 12,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 6,
    },
    trackTitle: {
        fontWeight: "bold",
    },
    preview: {
        color: "green",
        fontSize: 12,
    },
    error: {
        color: "red",
        marginTop: 10,
    },
});
