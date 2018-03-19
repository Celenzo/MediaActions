package com.mediaactions.ma_androidapp.Activities;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.widget.ImageView;

import com.mediaactions.ma_androidapp.R;
import com.mediaactions.ma_androidapp.Utils.ImageDownloader;
import com.mediaactions.ma_androidapp.Utils.ImgDl;

public class PhotoListActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_photo_list);

        final String testURL = "http://www.visualcapitalist.com/wp-content/uploads/2016/04/elon-musk-share.jpg";
        ImageView img = findViewById(R.id.imageView3);

        ImgDl imgDl = new ImgDl(testURL, img);
        new ImageDownloader().execute(imgDl);
    }
}
