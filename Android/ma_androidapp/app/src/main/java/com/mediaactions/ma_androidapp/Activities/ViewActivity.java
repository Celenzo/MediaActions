package com.mediaactions.ma_androidapp.Activities;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

import com.mediaactions.ma_androidapp.R;
import com.mediaactions.ma_androidapp.RESTClasses.Image;
import com.mediaactions.ma_androidapp.RESTClasses.User_;

public class ViewActivity extends AppCompatActivity {

    private User_ _user;
    private Image _img;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_view);

        _user = (User_)getIntent().getSerializableExtra("user");
        _img = (Image)getIntent().getSerializableExtra("imgdata");


        ImageView imageView = findViewById(R.id.imageDesc);
        imageView.setImageBitmap(Globals.transferBmp);
        TextView textView = findViewById(R.id.titleDisp);
        textView.setText(_img.getName());
        TextView textView1 = findViewById(R.id.descDisp);
        textView1.setText(_img.getDescription());
        TextView textView2 = findViewById(R.id.priceView);
        textView2.setText(String.valueOf(_img.getPrice()));
    }

    public void backBuyBtnClick(View view) {
        finish();
    }
}
