package com.mediaactions.ma_androidapp.RESTClasses;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import java.io.Serializable;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
        "Path",
        "Name",
        "Description",
        "Price"
})
public class Image implements Serializable {

    @JsonProperty("Path")
    private String path;
    @JsonProperty("Name")
    private String name;
    @JsonProperty("Description")
    private String description;
    @JsonProperty("Price")
    private double price;

    @JsonProperty("Path")
    public String getPath() {
        return path;
    }

    @JsonProperty("Name")
    public String getName() {
        return name;
    }

    @JsonProperty("Name")
    public void setName(String name) {
        this.name = name;
    }

    @JsonProperty("Description")
    public String getDescription() { return description; }

    @JsonProperty("Price")
    public double getPrice() { return price; }
}