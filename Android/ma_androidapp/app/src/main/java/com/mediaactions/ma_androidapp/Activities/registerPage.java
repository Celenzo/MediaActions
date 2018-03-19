package com.mediaactions.ma_androidapp.Activities;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

import com.mediaactions.ma_androidapp.R;
import com.mediaactions.ma_androidapp.RESTClasses.ParamRest;
import com.mediaactions.ma_androidapp.RESTClasses.RestRegister;
import com.mediaactions.ma_androidapp.RESTClasses.User;
import com.mediaactions.ma_androidapp.RESTClasses.User_;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

public class registerPage extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register_page);
    }

    private void showAlertError() {
        Toast toast = Toast.makeText(this, R.string.emptyFieldError, Toast.LENGTH_SHORT);
        toast.show();
    }

    public void registerBtnClick(View view) {

        final EditText editText = findViewById(R.id.userInput);
        final EditText pwdText = findViewById(R.id.pwdInput);
        final EditText mailText = findViewById(R.id.mailInput);
        final EditText pwdConfText = findViewById(R.id.pwdConfInput);

        final String userName = String.valueOf(editText.getText());
        final String mail = String.valueOf(mailText.getText());
        final String pwd = String.valueOf(pwdText.getText());
        final String pwdConf = String.valueOf(pwdConfText.getText());

        if (null == userName || null == mail || null == pwd || null == pwdConf) {
            showAlertError();
            return ;
        }

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        MultiValueMap<String, String> map= new LinkedMultiValueMap<>();
        map.add(getString(R.string.mail_s), mail);
        map.add(getString(R.string.usr), userName);
        map.add(getString(R.string.pwd), pwd);
        map.add(getString(R.string.pwdconf), pwdConf);

        HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(map, httpHeaders);

        ParamRest paramRest = new ParamRest(
                Globals.registerApiURL,
                entity,
                HttpMethod.POST,
                User.class
        );

        new RestRegister(this).execute(paramRest);
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
