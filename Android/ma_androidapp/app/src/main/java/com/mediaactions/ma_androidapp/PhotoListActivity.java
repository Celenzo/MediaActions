package com.mediaactions.ma_androidapp;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.media.Image;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.EditText;
import android.widget.ImageView;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.InetAddress;
import java.net.URL;

public class PhotoListActivity extends AppCompatActivity {

    ImageView iv;
    Bitmap bitmap;
    EditText t;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_photo_list);
        iv = (ImageView) findViewById(R.id.imageView3);
        t = (EditText) findViewById(R.id.editText);
        //URL url = new URL("http://www.visualcapitalist.com/wp-content/uploads/2016/04/elon-musk-share.jpg");
        //bitmap = BitmapFactory.decodeStream(url.openStream());
        if (checkInternetConnection() == true)
            t.setText("True");
        else
            t.setText("False");
//        bitmap = getBitmapFromURL("http://www.visualcapitalist.com/wp-content/uploads/2016/04/elon-musk-share.jpg");
  //      iv.setImageBitmap()
    }

    public static Bitmap getBitmapFromURL(String src) {
        try {
            URL url = new URL(src);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setDoInput(true);
            connection.connect();
            InputStream input = connection.getInputStream();
            Bitmap myBitmap = BitmapFactory.decodeStream(input);
            return myBitmap;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    public boolean checkInternetConnection() {
        try {
            InetAddress inAddress= InetAddress.getByName("www.google.com");
            if (inAddress.equals("")) {
                return false;
            } else {
                return true;
            }
        } catch (Exception e) {
            return false;
        }
    }
}
