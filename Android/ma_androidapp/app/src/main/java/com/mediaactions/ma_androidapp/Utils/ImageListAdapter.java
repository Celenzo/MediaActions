package com.mediaactions.ma_androidapp.Utils;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Context;
import android.support.annotation.NonNull;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;

import com.mediaactions.ma_androidapp.R;
import com.mediaactions.ma_androidapp.RESTClasses.Image;
import com.mediaactions.ma_androidapp.RESTClasses.ImgList;

public class ImageListAdapter extends BaseAdapter {

    private Activity activity;
    private LayoutInflater inflater;
    private ImgList imgList;

    public ImageListAdapter(Activity activity, ImgList imgItems) {
        this.activity = activity;
        this.imgList = imgItems;
    }

    @Override
    public int getCount() {
        return imgList.getImages().size();
    }

    @Override
    public Object getItem(int i) {
        return imgList.getImages().get(i);
    }

    @Override
    public long getItemId(int i) {
        return i;
    }

    @SuppressLint("InflateParams")
    @NonNull
    public View getView(int position, View convertView, @NonNull ViewGroup parent) {

        if (inflater == null)
            inflater = (LayoutInflater) activity
                    .getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        if (convertView == null) {
            assert inflater != null;
            convertView = inflater.inflate(R.layout.item, null);
        }

        ImageView img = convertView.findViewById(R.id.imgItem);
        Image d = imgList.getImages().get(position);

        ImgDl imgDl = new ImgDl(R.string.siteURL + d.getPath(), img);
        new ImageDownloader().execute(imgDl);

        return convertView;
    }
}
