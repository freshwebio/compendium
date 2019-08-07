package utils

import "testing"

func Test_sanitise_word_strips_out_unacceptable_characters(t *testing.T) {
	expected := "scriptalert0scriptDELETEFROMusers"
	sanitised := SanitiseWord("<script>alert(0);</script>;DELETE * FROM users;")
	if sanitised != expected {
		t.Errorf("Expected sanitised string to be %s but received %s", expected, sanitised)
	}
}
