package utils

import "regexp"

// SanitiseWord removes all characters from the given input
// that aren't included the \w word classification or a hyphen [\w-].
func SanitiseWord(input string) string {
	r, _ := regexp.Compile("[^\\w-]")
	return r.ReplaceAllString(input, "")
}
