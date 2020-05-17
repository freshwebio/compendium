package utils

// AccessTokenRequestBody provides the shape of the request body
// for checking and revoking access tokens.
type AccessTokenRequestBody struct {
	AccessToken string `json:"access_token"`
}
