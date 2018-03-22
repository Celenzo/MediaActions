package com.mediaactions.ma_androidapp.Activities;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.drawable.BitmapDrawable;
import android.net.Uri;
import android.os.Bundle;
import android.provider.MediaStore;
import android.provider.Settings;
import android.support.v7.app.AppCompatActivity;
import android.util.Base64;
import android.view.View;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.mediaactions.ma_androidapp.R;
import com.mediaactions.ma_androidapp.RESTClasses.ParamRest;
import com.mediaactions.ma_androidapp.RESTClasses.RestUploadImg;

import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import co.lujun.androidtagview.TagContainerLayout;
import co.lujun.androidtagview.TagView;

public class UploadActivity extends AppCompatActivity {

    public static final int GET_FROM_GALLERY = 3;
    public List<String> tagslist = new ArrayList<>();
    public Uri selectedImage;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_upload);
        ImageView image = findViewById(R.id.imageView);
        image.setImageDrawable(null);
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
            selectedImage = data.getData();
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

    @SuppressLint("SetTextI18n")
    public void Post(View view) {
        EditText editprice = findViewById(R.id.editPrice);
        ImageView image = findViewById(R.id.imageView);
        TextView alertext = findViewById(R.id.alertText);
        if (image.getDrawable() == null) {
            alertext.setText("Image missing");
            return;
        }
        if (editprice.getText().toString().isEmpty()) {
            alertext.setText("Price missing");
            return;
        }

        Bitmap bm = ((BitmapDrawable)image.getDrawable()).getBitmap();

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        bm.compress(Bitmap.CompressFormat.JPEG,100,baos);
        byte[] b = baos.toByteArray();
        String encImage = Base64.encodeToString(b, Base64.DEFAULT);


        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.MULTIPART_FORM_DATA);
        MultiValueMap<String, Object> map= new LinkedMultiValueMap<>();
        map.add("myimage", encImage);
        map.add("titre", "not here yet");
        map.add("tags", tagslist.toString());
        map.add("price", editprice.getText().toString());
        HttpEntity<MultiValueMap<String, Object>> entity = new HttpEntity<>(map, httpHeaders);
        ParamRest paramRest = new ParamRest(
                Globals.UploadApiURL,
                entity,
                HttpMethod.POST,
                null
        );

        new RestUploadImg(this).execute(paramRest);

        finish();
    }

    public void toasty() {
        Toast toast = Toast.makeText(this, R.string.inpError, Toast.LENGTH_SHORT);
        toast.show();
    }

    public void dispOk() {
        Toast toast = Toast.makeText(this, R.string.uploadOK, Toast.LENGTH_SHORT);
        toast.show();
    }
}
