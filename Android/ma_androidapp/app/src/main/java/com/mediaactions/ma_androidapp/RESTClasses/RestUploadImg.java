package com.mediaactions.ma_androidapp.RESTClasses;

import android.annotation.SuppressLint;
import android.os.AsyncTask;
import android.widget.Toast;

import com.mediaactions.ma_androidapp.Activities.LoginActivity;
import com.mediaactions.ma_androidapp.Activities.UploadActivity;
import com.mediaactions.ma_androidapp.R;

import org.springframework.http.ResponseEntity;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

public class RestUploadImg extends AsyncTask<ParamRest, Void, Void> {

    @SuppressLint("StaticFieldLeak")
    private UploadActivity mainAct;

    public RestUploadImg(UploadActivity act) {
        mainAct = act;
    }

    @Override
    protected Void doInBackground(ParamRest... paramRests) {

        ParamRest paramRest = paramRests[0];
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> responseEntity;

        try {
            responseEntity = restTemplate.exchange(paramRest.getUri(), paramRest.getMth(), paramRest.getHttpEntity(), String.class);
        }
        catch (HttpClientErrorException ignored) {
            return null;
        }

        return null;
    }

    @Override
    protected void onPostExecute(Void v) {
    }
}