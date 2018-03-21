package com.mediaactions.ma_androidapp.Utils;

import android.graphics.Bitmap;

public class ImgDl {

    private String URL;
    private Bitmap bitmap;

    public ImgDl(String url) {
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
}
