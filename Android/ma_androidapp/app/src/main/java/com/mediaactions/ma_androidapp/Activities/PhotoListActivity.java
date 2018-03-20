package com.mediaactions.ma_androidapp.Activities;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.ListView;
import android.widget.Toast;

import com.mediaactions.ma_androidapp.R;
import com.mediaactions.ma_androidapp.RESTClasses.ImgList;
import com.mediaactions.ma_androidapp.RESTClasses.ParamRest;
import com.mediaactions.ma_androidapp.RESTClasses.RestGallery;
import com.mediaactions.ma_androidapp.RESTClasses.User_;
import com.mediaactions.ma_androidapp.Utils.ImageListAdapter;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;

public class PhotoListActivity extends AppCompatActivity {

    private User_ _user;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_photo_list);

        _user = (User_)getIntent().getSerializableExtra("user");

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        HttpEntity httpEntity = new HttpEntity(httpHeaders);
        ParamRest paramRest = new ParamRest(
                Globals.galleryApiURL,
                httpEntity,
                HttpMethod.GET,
                String.class
        );

        new RestGallery(this).execute(paramRest);
    }

    public void toasty() {
        Toast toast = Toast.makeText(this, R.string.dashErr, Toast.LENGTH_SHORT);
        toast.show();
    }

    public void updateDisplay(ImgList imgList) {
        ImageListAdapter imageListAdapter = new ImageListAdapter(this, imgList);
        ListView listView = findViewById(R.id.imgView);
        listView.setAdapter(imageListAdapter);
    }

    public void launchUpload(View view) {
        Intent intent = new Intent(this, UploadActivity.class);
        intent.putExtra("user", _user);
        startActivity(intent);
    }
}
