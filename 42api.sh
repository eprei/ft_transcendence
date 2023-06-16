FILE_TOKEN_INFO="token_info.json"

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
	if [ ! -z "$FT_TOKEN" ]
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

main () {
	check_environment_variables
	get_ft_token
}

main
