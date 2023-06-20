#!/bin/bash

usage () {
	printf "usage:
sh ./script add
sh ./script delete\n"
}

# $1: login
# $2: email
# $3: url
add_user () {
	curl http://localhost:8080/api/player \
	  --request POST  \
	  --data login="$1" \
	  --data email="$2" \
	  --data avatarUrl="$3"
}

# $1: login
delete_user () {
	curl http://localhost:8080/api/player/"${1}" \
	  --request DELETE
}

main () {
	logins=("epresa-c" "mpons" "rburri" "sbars" "tgrivel")

	if [ "${1}" == "add" ]
	then
		for login in "${logins[@]}"
		do
			add_user \
				"${login}" \
				"${login}@student.42lausanne.ch" \
				"https://images.template.net/wp-content/uploads/2015/03/Pixel-Art-Mario.jpg"
		done
	elif [ "${1}" == "delete" ]
	then
		for login in "${logins[@]}"
		do
			delete_user "${login}"
		done
	fi

}

if [ -z "${1}" ]
then
	usage
	exit 1
fi

main "${1}"
