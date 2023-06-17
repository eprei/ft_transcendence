#!/bin/sh

FILE_TOKEN_INFO="token_info.json"
FILE_CAMPUS="campus.json"

check_environment_variables () {
	if [ -z "$FT_UID" ]
	then
		echo FT_UID do not exist
		exit 1
	fi
	if [ -z "$FT_SECRET" ]
	then
		echo FT_SECRET do not exist
		exit 1
	fi
}

get_ft_token () {
	if [ -n "$FT_TOKEN" ]
	then
		return
	fi

	if [ -e "${FILE_TOKEN_INFO}" ]
	then
		echo file already exist
	else
		echo Download "${FILE_TOKEN_INFO}"
		curl \
		  --request POST \
		  --data "grant_type=client_credentials" \
		  --data "client_id=${FT_UID}" \
		  --data "client_secret=${FT_SECRET}" \
		  https://api.intra.42.fr/oauth/token \
		  > "$FILE_TOKEN_INFO"
	fi

	export FT_TOKEN=$(jq .access_token "${FILE_TOKEN_INFO}" | tr -d '"''"')
}

get_all_campus () {
	if [ ! -e "${FILE_TOKEN_INFO}" ]
	then
		curl \
		  --header "Authorization: Bearer ${FT_TOKEN}" \
		  https://api.intra.42.fr/v2/campus \
		  > "${FILE_CAMPUS}"
	fi

	jq < "${FILE_CAMPUS}" > clean-"${FILE_CAMPUS}"
}

get_lausanne_id () {
	export LAUSANNE_ID=$(jq  '.[] | select(.name=="Lausanne") | .id' \
		< "${FILE_CAMPUS}")
}

main () {
	check_environment_variables
	get_ft_token
	get_all_campus
	get_lausanne_id
}

main
