package com.candicetinamartins.lebenindeutschlandtrainer;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Intent;
import android.content.pm.ApplicationInfo;
import android.graphics.Color;
import android.graphics.Insets;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.view.Gravity;
import android.view.View;
import android.view.WindowInsets;
import android.view.Window;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.webkit.WebResourceRequest;
import android.widget.FrameLayout;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.AdSize;
import com.google.android.gms.ads.AdView;
import com.google.android.gms.ads.MobileAds;
import com.google.android.ump.ConsentDebugSettings;
import com.google.android.ump.ConsentInformation;
import com.google.android.ump.ConsentRequestParameters;
import com.google.android.ump.UserMessagingPlatform;

import java.util.concurrent.atomic.AtomicBoolean;

public class MainActivity extends Activity {
    private WebView webView;
    private AdView bannerAd;
    private View topSystemBarSpacer;
    private View bottomSystemBarSpacer;
    private TextView privacyOptionsButton;
    private ConsentInformation consentInformation;
    private final AtomicBoolean isMobileAdsInitializeCalled = new AtomicBoolean(false);

    private int dpToPx(int dp) {
        return Math.round(dp * getResources().getDisplayMetrics().density);
    }

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        requestWindowFeature(Window.FEATURE_NO_TITLE);

        LinearLayout rootLayout = new LinearLayout(this);
        rootLayout.setOrientation(LinearLayout.VERTICAL);
        rootLayout.setBackgroundColor(Color.rgb(253, 251, 247));
        rootLayout.setFitsSystemWindows(true);
        setContentView(rootLayout);
        applySystemBarInsets(rootLayout);

        topSystemBarSpacer = new View(this);
        rootLayout.addView(
                topSystemBarSpacer,
                new LinearLayout.LayoutParams(
                        LinearLayout.LayoutParams.MATCH_PARENT,
                        getStatusBarHeight()
                )
        );

        webView = new WebView(this);
        rootLayout.addView(
                webView,
                new LinearLayout.LayoutParams(
                        LinearLayout.LayoutParams.MATCH_PARENT,
                        0,
                        1f
                )
        );

        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setAllowFileAccess(true);
        settings.setAllowContentAccess(true);
        settings.setMediaPlaybackRequiresUserGesture(true);
        settings.setUserAgentString(settings.getUserAgentString() + " LIDTrainerAndroid");

        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                return handleUrl(request.getUrl());
            }

            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                return handleUrl(Uri.parse(url));
            }
        });
        webView.loadUrl("file:///android_asset/www/index.html");

        FrameLayout adContainer = new FrameLayout(this);
        adContainer.setBackgroundColor(Color.rgb(245, 245, 245));
        rootLayout.addView(
                adContainer,
                new LinearLayout.LayoutParams(
                        LinearLayout.LayoutParams.MATCH_PARENT,
                        dpToPx(50)
                )
        );

        TextView adPlaceholder = new TextView(this);
        adPlaceholder.setText("Advertisement");
        adPlaceholder.setTextColor(Color.rgb(120, 120, 120));
        adPlaceholder.setTextSize(11);
        adPlaceholder.setGravity(Gravity.CENTER);
        adContainer.addView(
                adPlaceholder,
                new FrameLayout.LayoutParams(
                        FrameLayout.LayoutParams.MATCH_PARENT,
                        FrameLayout.LayoutParams.MATCH_PARENT
                )
        );

        privacyOptionsButton = new TextView(this);
        privacyOptionsButton.setText("Privacy");
        privacyOptionsButton.setTextColor(Color.rgb(70, 70, 70));
        privacyOptionsButton.setTextSize(11);
        privacyOptionsButton.setGravity(Gravity.CENTER);
        privacyOptionsButton.setPadding(dpToPx(8), 0, dpToPx(8), 0);
        privacyOptionsButton.setVisibility(View.GONE);
        privacyOptionsButton.setOnClickListener(view ->
                UserMessagingPlatform.showPrivacyOptionsForm(
                        this,
                        formError -> {
                            if (consentInformation != null && consentInformation.canRequestAds()) {
                                initializeMobileAdsSdk();
                            }
                            updatePrivacyOptionsButton();
                        }
                )
        );
        adContainer.addView(
                privacyOptionsButton,
                new FrameLayout.LayoutParams(
                        FrameLayout.LayoutParams.WRAP_CONTENT,
                        FrameLayout.LayoutParams.MATCH_PARENT,
                        Gravity.END | Gravity.CENTER_VERTICAL
                )
        );

        bannerAd = new AdView(this);
        bannerAd.setAdSize(AdSize.BANNER);
        bannerAd.setAdUnitId(getString(R.string.admob_banner_ad_unit_id));
        adContainer.addView(
                bannerAd,
                new FrameLayout.LayoutParams(
                        FrameLayout.LayoutParams.WRAP_CONTENT,
                        FrameLayout.LayoutParams.WRAP_CONTENT,
                        Gravity.CENTER
                )
        );

        bottomSystemBarSpacer = new View(this);
        bottomSystemBarSpacer.setBackgroundColor(Color.rgb(245, 245, 245));
        rootLayout.addView(
                bottomSystemBarSpacer,
                new LinearLayout.LayoutParams(
                        LinearLayout.LayoutParams.MATCH_PARENT,
                        getNavigationBarHeight()
                )
        );

        requestConsentAndLoadAds();
    }

    private void requestConsentAndLoadAds() {
        ConsentRequestParameters.Builder paramsBuilder = new ConsentRequestParameters.Builder();
        if (isDebuggableBuild()) {
            ConsentDebugSettings debugSettings = new ConsentDebugSettings.Builder(this)
                    .setDebugGeography(ConsentDebugSettings.DebugGeography.DEBUG_GEOGRAPHY_EEA)
                    .build();
            paramsBuilder.setConsentDebugSettings(debugSettings);
        }
        ConsentRequestParameters params = paramsBuilder.build();

        consentInformation = UserMessagingPlatform.getConsentInformation(this);
        consentInformation.requestConsentInfoUpdate(
                this,
                params,
                () -> UserMessagingPlatform.loadAndShowConsentFormIfRequired(
                        this,
                        formError -> {
                            updatePrivacyOptionsButton();
                            if (consentInformation.canRequestAds()) {
                                initializeMobileAdsSdk();
                            }
                        }
                ),
                requestConsentError -> {
                    updatePrivacyOptionsButton();
                    if (consentInformation.canRequestAds()) {
                        initializeMobileAdsSdk();
                    }
                }
        );

        if (consentInformation.canRequestAds()) {
            initializeMobileAdsSdk();
        }
    }

    private boolean isDebuggableBuild() {
        return (getApplicationInfo().flags & ApplicationInfo.FLAG_DEBUGGABLE) != 0;
    }

    private boolean handleUrl(Uri uri) {
        if (uri == null) {
            return false;
        }
        String scheme = uri.getScheme();
        if ("http".equalsIgnoreCase(scheme) || "https".equalsIgnoreCase(scheme)) {
            startActivity(new Intent(Intent.ACTION_VIEW, uri));
            return true;
        }
        return false;
    }

    private void updatePrivacyOptionsButton() {
        if (privacyOptionsButton == null || consentInformation == null) {
            return;
        }
        boolean isRequired = consentInformation.getPrivacyOptionsRequirementStatus()
                == ConsentInformation.PrivacyOptionsRequirementStatus.REQUIRED;
        privacyOptionsButton.setVisibility(isRequired ? View.VISIBLE : View.GONE);
    }

    private void initializeMobileAdsSdk() {
        if (isMobileAdsInitializeCalled.getAndSet(true)) {
            return;
        }
        MobileAds.initialize(this, initializationStatus -> bannerAd.loadAd(new AdRequest.Builder().build()));
    }

    private void applySystemBarInsets(View rootView) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            rootView.setOnApplyWindowInsetsListener((view, windowInsets) -> {
                Insets bars = windowInsets.getInsets(WindowInsets.Type.systemBars());
                view.setPadding(bars.left, 0, bars.right, 0);
                setSpacerHeight(topSystemBarSpacer, bars.top);
                setSpacerHeight(bottomSystemBarSpacer, bars.bottom);
                return WindowInsets.CONSUMED;
            });
            rootView.post(rootView::requestApplyInsets);
        } else {
            rootView.setPadding(0, 0, 0, 0);
        }
    }

    private void setSpacerHeight(View spacer, int height) {
        if (spacer == null) {
            return;
        }
        LinearLayout.LayoutParams params = (LinearLayout.LayoutParams) spacer.getLayoutParams();
        if (params.height != height) {
            params.height = height;
            spacer.setLayoutParams(params);
        }
    }

    private int getStatusBarHeight() {
        int resourceId = getResources().getIdentifier("status_bar_height", "dimen", "android");
        return resourceId > 0 ? getResources().getDimensionPixelSize(resourceId) : 0;
    }

    private int getNavigationBarHeight() {
        int resourceId = getResources().getIdentifier("navigation_bar_height", "dimen", "android");
        return resourceId > 0 ? getResources().getDimensionPixelSize(resourceId) : 0;
    }

    @Override
    protected void onPause() {
        if (bannerAd != null) {
            bannerAd.pause();
        }
        super.onPause();
    }

    @Override
    protected void onResume() {
        super.onResume();
        if (bannerAd != null) {
            bannerAd.resume();
        }
    }

    @Override
    protected void onDestroy() {
        if (bannerAd != null) {
            bannerAd.destroy();
        }
        super.onDestroy();
    }

    @Override
    public void onBackPressed() {
        if (webView != null && webView.canGoBack()) {
            webView.goBack();
            return;
        }
        super.onBackPressed();
    }
}
