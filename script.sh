#!/bin/bash

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

main () {
	logins=("epresa-c" "mpons" "rburri" "sbars" "tgrivel")

	for login in "${logins[@]}"
	do
		add_user \
			"${login}" \
			"${login}@student.42lausanne.ch" \
			"https://images.template.net/wp-content/uploads/2015/03/Pixel-Art-Mario.jpg"
	done
}

main
