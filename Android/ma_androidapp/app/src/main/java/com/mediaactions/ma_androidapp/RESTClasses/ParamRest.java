package com.mediaactions.ma_androidapp.RESTClasses;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;

public class ParamRest {

    private String uri;
    private HttpEntity httpEntity;
    private HttpMethod mth;

    public ParamRest(String ur, HttpEntity entity, HttpMethod method, java.lang.Class clss) {
        uri = ur;
        httpEntity = entity;
        mth = method;
    }

    String getUri() {
        return uri;
    }

    HttpEntity getHttpEntity() {
        return httpEntity;
    }

    HttpMethod getMth() {
        return mth;
    }
}
