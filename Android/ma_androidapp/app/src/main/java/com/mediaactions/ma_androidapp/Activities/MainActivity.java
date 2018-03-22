package com.mediaactions.ma_androidapp.Activities;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;

import com.mediaactions.ma_androidapp.R;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    public void loginBtnFn(View view) {
        Intent intent = new Intent(this, LoginActivity.class);

        startActivityForResult(intent, 0);
    }

    protected void onActivityResult(int r, int g, Intent data) {

    }

    public void registerBtnFn(View view) {
        Intent intent = new Intent(this, RegisterPage.class);

        startActivityForResult(intent, 0);
    }
}
