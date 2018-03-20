package com.mediaactions.ma_androidapp.Utils;

import android.annotation.SuppressLint;
import android.content.Context;
import android.support.annotation.NonNull;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;

import com.mediaactions.ma_androidapp.Activities.PhotoListActivity;
import com.mediaactions.ma_androidapp.R;

import java.util.ArrayList;

public class ImageListAdapter extends BaseAdapter {

    private PhotoListActivity activity;
    private LayoutInflater inflater;
    private ArrayList<ImgDl> imgList;

    public ImageListAdapter(PhotoListActivity photoListActivity, ArrayList<ImgDl> imgItems) {
        this.activity = photoListActivity;
        this.imgList = imgItems;
    }

    @Override
    public int getCount() {
        return imgList.size();
    }

    @Override
    public Object getItem(int i) {
        return imgList.get(i);
    }

    @Override
    public long getItemId(int i) {
        return i;
    }

    @SuppressLint("InflateParams")
    @NonNull
    public View getView(int position, View convertView, @NonNull ViewGroup parent) {

        Log.d("POS:", String.valueOf(position));

        if (inflater == null)
            inflater = (LayoutInflater) activity
                    .getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        if (convertView == null) {
            assert inflater != null;
            convertView = inflater.inflate(R.layout.item, null);
        }

        ImageView img = convertView.findViewById(R.id.imgItem);
        img.setImageBitmap(imgList.get(position).getBitmap());

        return convertView;
    }
}
