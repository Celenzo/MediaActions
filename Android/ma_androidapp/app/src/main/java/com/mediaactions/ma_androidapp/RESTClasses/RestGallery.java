package com.mediaactions.ma_androidapp.RESTClasses;

import android.annotation.SuppressLint;
import android.os.AsyncTask;
import android.util.Log;

import com.mediaactions.ma_androidapp.Activities.PhotoListActivity;
import com.mediaactions.ma_androidapp.R;

import org.springframework.http.ResponseEntity;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

public class RestGallery extends AsyncTask<ParamRest, Void, ImgList>{

    @SuppressLint("StaticFieldLeak")
    private PhotoListActivity act;

    public RestGallery(PhotoListActivity act) {
        this.act = act;
    }

    @Override
    protected ImgList doInBackground(ParamRest... paramRests) {

        ParamRest paramRest = paramRests[0];

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<ImgList> responseEntity;

        try {
            responseEntity = restTemplate.exchange(paramRest.getUri(), paramRest.getMth(),
                    paramRest.getHttpEntity(), ImgList.class);
        }
        catch (HttpClientErrorException ignored) {
            //act.toasty();
            return null;
        }

        return responseEntity.getBody();
    }

    @Override
    public void onPostExecute(ImgList imgList) {
        if (imgList != null)
            act.updateDisplay(imgList);
    }
}
