package utils

import (
	"net/http/httptest"
	"testing"
)

func Test_set_headers_for_response_writer_with_only_cors_headers(t *testing.T) {
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
}

func Test_set_headers_for_response_writer_with_cors_and_content_type_headers(t *testing.T) {
	recorder := httptest.NewRecorder()
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

func Test_set_headers_without_response_writer_with_only_cors_headers(t *testing.T) {
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
}

func Test_set_headers_without_response_writer_with_cors_and_content_type_headers(t *testing.T) {
	headers := SetHeaders(nil, false)

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
