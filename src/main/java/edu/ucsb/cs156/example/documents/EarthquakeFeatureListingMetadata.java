package edu.ucsb.cs156.example.documents;

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
public class EarthquakeFeatureListingMetadata {
    private int generated;
    private String url;
    private String title;
    private int status;
    private String api;
    private int count;
}
