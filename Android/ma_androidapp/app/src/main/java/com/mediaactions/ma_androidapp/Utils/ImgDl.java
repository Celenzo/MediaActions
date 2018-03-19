package com.mediaactions.ma_androidapp.Utils;

import android.widget.ImageView;

public class ImgDl {

    private String URL;
    private ImageView imageView;

    public ImgDl(String url, ImageView imageView) {
        URL = url;
        this.imageView = imageView;
    }

    ImageView getImageView() {
        return imageView;
    }

    String getURL() {
        return URL;
    }
}
