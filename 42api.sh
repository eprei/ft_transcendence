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

main () {
	check_environment_variables
	get_ft_token

}

main
