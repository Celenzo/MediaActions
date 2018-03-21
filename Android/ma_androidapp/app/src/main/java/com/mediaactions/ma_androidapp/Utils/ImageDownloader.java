package com.mediaactions.ma_androidapp.Utils;

import android.annotation.SuppressLint;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.AsyncTask;

import com.mediaactions.ma_androidapp.Activities.PhotoListActivity;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

public class ImageDownloader extends AsyncTask<ImgDl, Void, ImgDl> {

    @SuppressLint("StaticFieldLeak")
    private PhotoListActivity photoListActivity;

    public ImageDownloader(PhotoListActivity act) { photoListActivity = act; }

    @Override
    protected ImgDl doInBackground(ImgDl... imgDls) {

        ImgDl imgDl = imgDls[0];
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<byte[]> responseEntity;
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        HttpEntity httpEntity = new HttpEntity(httpHeaders);

        try {
            responseEntity = restTemplate.exchange(imgDl.getURL(), HttpMethod.GET, httpEntity, byte[].class);
        } catch (HttpClientErrorException ignored) {
            return null;
        }

        Bitmap x = BitmapFactory.decodeByteArray(responseEntity.getBody(), 0, responseEntity.getBody().length);
        imgDl.setBitmap(x);

        return imgDl;
    }

    @Override
    protected void onPostExecute(ImgDl imgDl) {
        photoListActivity.setElement(imgDl);
    }
}
