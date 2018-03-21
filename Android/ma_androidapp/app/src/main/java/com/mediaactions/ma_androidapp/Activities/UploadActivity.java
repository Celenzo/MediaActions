package com.mediaactions.ma_androidapp.Activities;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Bundle;
import android.provider.MediaStore;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.EditText;
import android.widget.ImageView;

import com.mediaactions.ma_androidapp.R;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import co.lujun.androidtagview.TagContainerLayout;
import co.lujun.androidtagview.TagView;

public class UploadActivity extends AppCompatActivity {

    public static final int GET_FROM_GALLERY = 3;
    public List<String> tagslist = new ArrayList<>();


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_upload);
    }

    public void uploadAction(View view) {
        startActivityForResult(new Intent(Intent.ACTION_PICK, android.provider.MediaStore.Images.Media.INTERNAL_CONTENT_URI), GET_FROM_GALLERY);
    }


    public void addTag(View view) {
        EditText et = findViewById(R.id.addTagText);
        final TagContainerLayout mTagContainerLayout = findViewById(R.id.tagList);
        if (Objects.equals(et.getText().toString(), "") || et.getText().toString().isEmpty())
            return ;

        tagslist.add(et.getText().toString());
        mTagContainerLayout.setTags(tagslist);

        mTagContainerLayout.setOnTagClickListener(new TagView.OnTagClickListener() {

            @Override
            public void onTagClick(int position, String text) {
            }

            @Override
            public void onTagLongClick(final int position, String text) {

                mTagContainerLayout.removeTag(position);
                tagslist.remove(position);
            }

            @Override
            public void onTagCrossClick(int position) {

            }

        });

        et.setText("");
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);


        //Detects request codes
        if (requestCode == GET_FROM_GALLERY && resultCode == Activity.RESULT_OK) {
            Uri selectedImage = data.getData();
            Bitmap bitmap;
            try {
                bitmap = MediaStore.Images.Media.getBitmap(this.getContentResolver(), selectedImage);
                ImageView myImageView = findViewById(R.id.imageView);
                myImageView.setImageBitmap(bitmap);
            } catch (IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }
    }

}
