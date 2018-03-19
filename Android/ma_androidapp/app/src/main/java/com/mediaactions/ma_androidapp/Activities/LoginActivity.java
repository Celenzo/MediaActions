package com.mediaactions.ma_androidapp.Activities;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

import com.mediaactions.ma_androidapp.R;
import com.mediaactions.ma_androidapp.RESTClasses.ParamRest;
import com.mediaactions.ma_androidapp.RESTClasses.RestLogin;
import com.mediaactions.ma_androidapp.RESTClasses.User;
import com.mediaactions.ma_androidapp.RESTClasses.User_;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

public class LoginActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
    }

    public void loginPageBtn(View view) {

        final EditText editText = findViewById(R.id.loginInput);
        final String userName = String.valueOf(editText.getText());
        final EditText pwdText = findViewById(R.id.passwordInput);
        final String pwd = String.valueOf(pwdText.getText());

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        MultiValueMap<String, String> map= new LinkedMultiValueMap<>();
        map.add("username", userName);
        map.add("password", pwd);
        HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(map, httpHeaders);
        ParamRest paramRest = new ParamRest(
                Globals.loginApiURL,
                entity,
                HttpMethod.POST,
                User.class
        );

        new RestLogin(this).execute(paramRest);
    }

    public void openDash(User_ user) {
        Intent intent = new Intent(this, PhotoListActivity.class);
        intent.putExtra("userData", user);
        startActivity(intent);
    }

    public void toasty() {
        Toast toast = Toast.makeText(this, R.string.inpError, Toast.LENGTH_SHORT);
        toast.show();
    }
}
