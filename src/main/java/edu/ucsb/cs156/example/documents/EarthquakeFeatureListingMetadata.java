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
@JsonIgnoreProperties(ignoreUnknown = true)
public class EarthquakeFeatureListingMetadata {
    private long generated;
    private String url;
    private String title;
    private String api;
    private int count;
    private int status;
}
