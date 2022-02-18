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
// we're using all the fields in the example, this is just here as a safeguard
@JsonIgnoreProperties(ignoreUnknown = true)
public class EarthquakeFeatureGeometry {
    private String type; // seems like this is always "Point"
    private List<Double> coordinates;
    private String id;
}
