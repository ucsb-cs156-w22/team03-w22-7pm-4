package edu.ucsb.cs156.example.documents;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonIgnoreProperties(ignoreUnknown = true)
public class EarthquakeFeatureListing {
    private String type;
    private EarthquakeFeatureCollectionMetadata metadata;
    private List<EarthquakeFeature> features;
    // ignore bbox field
}
