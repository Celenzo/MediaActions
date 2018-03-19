package com.mediaactions.ma_androidapp.Utils;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.AsyncTask;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class ImageDownloader extends AsyncTask<ImgDl, Void, Void> {

    @Override
    protected Void doInBackground(ImgDl... imgDls) {

        ImgDl imgDl = imgDls[0];

        HttpURLConnection connection;
        InputStream input = null;

        try {
            connection = (HttpURLConnection) new URL(imgDl.getURL()).openConnection();
            connection.setRequestProperty("User-agent","Mozilla/4.0");
            connection.connect();
            input = connection.getInputStream();
        } catch (IOException ignored) {

        }

        Bitmap x = BitmapFactory.decodeStream(input);
        imgDl.getImageView().setImageBitmap(x);

        return null;
    }
}
