package com.mediaactions.ma_androidapp.Utils;

import android.graphics.Bitmap;

import com.mediaactions.ma_androidapp.RESTClasses.Image;

import java.io.Serializable;

public class ImgDl implements Serializable {

    private String URL;
    private Bitmap bitmap;
    private Image image;

    public ImgDl(String url, Image img) {
        image = img;
        URL = url;
    }

    String getURL() {
        return URL;
    }

    public Bitmap getBitmap() {
        return bitmap;
    }

    void setBitmap(Bitmap bitmap) {
        this.bitmap = bitmap;
    }

    public Image getImage() {
        return image;
    }
}
