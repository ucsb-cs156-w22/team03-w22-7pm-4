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
public class EarthquakeFeatureProperties {
    private String mag;
    private String place;
    private String time;
    private String updated;
    private String tz;
    private String url;
    private String detail;
    private String felt;
    private String cdi;
    private String mmi;
    private String alert;
    private String status;
    private String tsunami;
    private String sig;
    private String net;
    private String code;
    private String ids;
    private String sources;
    private String types;
    private String nst;
    private String dmin;
    private String rms;
    private String gap;
    private String magType;
    private String type;
    private String title;
}
