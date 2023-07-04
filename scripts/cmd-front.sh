#!/bin/sh

# no parameters
usage () {
	printf "Usage cmd-front.sh:\n\n"

	printf "npm install:\n"
	printf "sh ./cmd-front.sh npm <package_to_install>\n"
}

# no parameters
format_code () {
	make format
}

usage_npm_install () {
	printf "Usage cmd-front.sh:\n\n"

	printf "npm install:\n"
	printf "sh ./cmd-front.sh npm <type_dependency> <package_to_install>\n"
	printf "the <type_dependency> is either \"normal\" or either \"dev\"\n"

}

# $1 (useless)  : option
# $2            : [normal / dev] dependency
# $3            : package name
npm_install () {
	# check if the arguments are empty
	if [ -z "${2}" ] || [ -z "${3}" ]
	then
		usage_npm_install
		exit
	fi

	if [ "${2}" == "normal" ]
	then
		flag_save="--save"
	elif [ "${2}" == "dev" ]
	then
		flag_save="--save-dev"
	else
		usage_npm_install
		exit
	fi

	if ! docker exec our-frontend npm install "${flag_save}" ${3}
	then
		printf "error: docker exec\n"
		exit 1
	fi

	format_code
	git add .
	git commit -F - <<- body
	npm install: ${3}

	command used:

	docker exec our-frontend npm install \\
	${3}
	body

}

# $1 : option
main () {
	if [ "${1}" == "npm" ]
	then
		npm_install "${@}"
	else
		usage
	fi
}

main "${@}"
