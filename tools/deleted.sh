#!/usr/bin/env bash

diff(){
  awk 'BEGIN{RS=ORS=" "}
       {NR==FNR?a[$0]++:a[$0]--}
       END{for(k in a)if(a[k])print k}' <(echo -n "${!1}") <(echo -n "${!2}")
}

# Delete files with already inside of index
files=$(git diff --name-only --diff-filter=D --staged)
filesRemove=""
space=" "

for file in $files; do
    if [[ "$file" == *"src/"* ]]; then
      fileToDelete=$(echo "$file" | sed -r 's/.ts+/.js/g')
      fileToDelete=$(echo "$fileToDelete" | sed -r 's/src+/dist/g')

      filesRemove=$fileToDelete$space$fileToDelete'.map'

      rm -rf $filesRemove
    fi
done

# Delete files with doesnt inside of index. (New Files)
files1=$(git diff --name-only --diff-filter=A --staged)
files2=$(cat .newfiles.dat 2>/dev/null)
difference=$(diff files1[@] files2[@])

# shellcheck disable=SC2068
for file in ${difference[@]}; do
    if [[ "$file" == *"src/"* ]]; then
      fileToDelete=$(echo "$file" | sed -r 's/.ts+/.js/g')
      fileToDelete=$(echo "$fileToDelete" | sed -r 's/src+/dist/g')

      filesRemove=$fileToDelete$space$fileToDelete'.map'
      rm -rf $filesRemove
    fi
done
