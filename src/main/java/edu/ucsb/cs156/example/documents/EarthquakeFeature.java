package edu.ucsb.cs156.example.documents;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import org.springframework.data.annotation.Id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
// this is the type of the actual objects we'll be storing in the mongoDB collection
@Document(collection = "earthquakes")
// we're using all the fields in the example, this is just here as a safeguard
@JsonIgnoreProperties(ignoreUnknown = true)
public class EarthquakeFeature {
    @Id
    private String _id;

    private String type;
    private EarthquakeFeatureProperties properties;
    private EarthquakeFeatureGeometry geometry;
    private String id;
}
