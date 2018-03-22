package com.mediaactions.ma_androidapp.RESTClasses;

import android.annotation.SuppressLint;
import android.os.AsyncTask;

import com.mediaactions.ma_androidapp.Activities.RegisterPage;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.List;

public class RestRegister extends AsyncTask<ParamRest, Void, User_>{

    @SuppressLint("StaticFieldLeak")
    private RegisterPage act;

    public RestRegister(RegisterPage act) {
        this.act = act;
    }

    @Override
    protected User_ doInBackground(ParamRest... paramRests) {
        ParamRest paramRest = paramRests[0];
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<List<Registration>> responseEntity;

        try {
            responseEntity = restTemplate.exchange(paramRest.getUri(), paramRest.getMth(),
                    paramRest.getHttpEntity(), new ParameterizedTypeReference<List<Registration>>() {});
        }
        catch (HttpClientErrorException ignored) {
            return null;
        }

        return responseEntity.getBody().get(1).getUser();
    }

    @Override
    protected void onPostExecute(User_ user) {
        if (null != user) { act.openDash(user); }
        else act.toasty();
    }


}
