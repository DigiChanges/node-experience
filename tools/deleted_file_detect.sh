#!/bin/bash

diff_array() {
  awk 'BEGIN{RS=ORS=" "}
       {NR==FNR?a[$0]++:a[$0]--}
       END{for(k in a)if(a[k])print k}' <(echo -n "${!1}") <(echo -n "${!2}")
}

files1=$(git diff --name-only --diff-filter=D --staged)

i=0
while read line
do
    files2[ $i ]="$line"
    (( i++ ))
done < .files_deleted.dat

difference=$(diff_array files1[@] files2[@])

# shellcheck disable=SC2068
for file in ${difference[@]}; do
    if [[ "$file" == *"src/"* ]]; then
      (grep -qxF "$file" .files_to_compile.dat || echo "$file" >> .files_to_compile.dat) 2>/dev/null
      sed -i -e "s|${file}||" .files_deleted.dat
      sed -i '/^$/d' .files_deleted.dat
    fi
done
