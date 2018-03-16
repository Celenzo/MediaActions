package com.mediaactions.ma_androidapp.RESTClasses;

import android.annotation.SuppressLint;
import android.os.AsyncTask;

import com.mediaactions.ma_androidapp.Activities.LoginActivity;

import org.springframework.http.ResponseEntity;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

public class RestLogin extends AsyncTask<ParamRest, Void, User> {

    @SuppressLint("StaticFieldLeak")
    private LoginActivity mainAct;

    public RestLogin(LoginActivity act) {
        mainAct = act;
    }

    @Override
    protected User doInBackground(ParamRest... paramRests) {

        ParamRest paramRest = paramRests[0];
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<User> responseEntity;

        try {
            responseEntity = restTemplate.exchange(paramRest.getUri(), paramRest.getMth(), paramRest.getHttpEntity(), User.class);
        }
        catch (HttpClientErrorException ignored) {
            return null;
        }

        return responseEntity.getBody();
    }

    @Override
    protected void onPostExecute(User user) {
        mainAct.openDash(user.getUser());
    }
}
