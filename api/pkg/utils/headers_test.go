package utils

import (
	"net/http/httptest"
	"testing"
)

func TestSetHeadersWithResponseWriter(t *testing.T) {
	recorder := httptest.NewRecorder()
	SetHeaders(recorder, true)

	if recorder.Header().Get("Access-Control-Allow-Origin") == "" {
		t.Errorf("Expected the Access-Control-Allow-Origin to be set but was not")
	}

	if recorder.Header().Get("Access-Control-Allow-Methods") == "" {
		t.Errorf("Expected the Access-Control-Allow-Methods to be set but was not")
	}

	if recorder.Header().Get("Access-Control-Allow-Headers") == "" {
		t.Errorf("Expected the Access-Control-Allow-Headers to be set but was not")
	}

	if recorder.Header().Get("Access-Control-Max-Age") == "" {
		t.Errorf("Expected the Access-Control-Max-Age to be set but was not")
	}

	if recorder.Header().Get("Content-Type") != "" {
		t.Errorf("Expected Content-Type to not be set when corsOnly is passed as true")
	}

	recorder = httptest.NewRecorder()
	SetHeaders(recorder, false)

	if recorder.Header().Get("Access-Control-Allow-Origin") == "" {
		t.Errorf("Expected the Access-Control-Allow-Origin to be set but was not")
	}

	if recorder.Header().Get("Access-Control-Allow-Methods") == "" {
		t.Errorf("Expected the Access-Control-Allow-Methods to be set but was not")
	}

	if recorder.Header().Get("Access-Control-Allow-Headers") == "" {
		t.Errorf("Expected the Access-Control-Allow-Headers to be set but was not")
	}

	if recorder.Header().Get("Access-Control-Max-Age") == "" {
		t.Errorf("Expected the Access-Control-Max-Age to be set but was not")
	}

	if recorder.Header().Get("Content-Type") == "" {
		t.Errorf("Expected Content-Type to be set when corsOnly is passed as false")
	}
}

func TestSetHeadersWithoutResponseWriter(t *testing.T) {
	headers := SetHeaders(nil, true)

	if headers["Access-Control-Allow-Origin"] == "" {
		t.Errorf("Expected the Access-Control-Allow-Origin to be set but was not")
	}

	if headers["Access-Control-Allow-Methods"] == "" {
		t.Errorf("Expected the Access-Control-Allow-Methods to be set but was not")
	}

	if headers["Access-Control-Allow-Headers"] == "" {
		t.Errorf("Expected the Access-Control-Allow-Headers to be set but was not")
	}

	if headers["Access-Control-Max-Age"] == "" {
		t.Errorf("Expected the Access-Control-Max-Age to be set but was not")
	}

	if headers["Content-Type"] != "" {
		t.Errorf("Expected Content-Type to not be set when corsOnly is passed as true")
	}

	headers = SetHeaders(nil, false)

	if headers["Access-Control-Allow-Origin"] == "" {
		t.Errorf("Expected the Access-Control-Allow-Origin to be set but was not")
	}

	if headers["Access-Control-Allow-Methods"] == "" {
		t.Errorf("Expected the Access-Control-Allow-Methods to be set but was not")
	}

	if headers["Access-Control-Allow-Headers"] == "" {
		t.Errorf("Expected the Access-Control-Allow-Headers to be set but was not")
	}

	if headers["Access-Control-Max-Age"] == "" {
		t.Errorf("Expected the Access-Control-Max-Age to be set but was not")
	}

	if headers["Content-Type"] == "" {
		t.Errorf("Expected Content-Type to be set when corsOnly is passed as false")
	}
}
