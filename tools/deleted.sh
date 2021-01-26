#!/bin/bash

diff_array() {
  awk 'BEGIN{RS=ORS=" "}
       {NR==FNR?a[$0]++:a[$0]--}
       END{for(k in a)if(a[k])print k}' <(echo -n "${!1}") <(echo -n "${!2}")
}

# Delete files with already inside of index - BEGIN
files_D=$(git diff --name-only --diff-filter=D --staged src)
filesRemove=""
space=" "

for file in $files_D; do
  fileToDelete=$(echo "$file" | sed 's/\(.*\).ts/\1.js/')
  fileToDelete=$(echo "$fileToDelete" | sed -r 's/src+/dist/g')

  filesRemove=$fileToDelete$space$fileToDelete'.map'

  (grep -qxF "$file" .files_deleted.dat || echo "$file" >> .files_deleted.dat) 2>/dev/null
  rm -rf $filesRemove
done
# Delete files with already inside of index - END

# Delete files with doesnt inside of index. (New Files) - BEGIN
files_A_1=$(git diff --name-only --diff-filter=A --staged src)

i=0
while read line
do
    files_A_2[ $i ]="$line"
    (( i++ ))
done < .files_to_compile.dat

difference_A=$(diff_array files_A_1[@] files_A_2[@])

# shellcheck disable=SC2068
for file in ${difference_A[@]}; do
    if [[ "$file" == *"src/"* ]]; then
      fileToDelete=$(echo "$file" | sed 's/\(.*\).ts/\1.js/')
      fileToDelete=$(echo "$fileToDelete" | sed -r 's/src+/dist/g')

      filesRemove=$fileToDelete$space$fileToDelete'.map'

      rm -rf $filesRemove
      sed -i -e "s|${file}||" .files_to_compile.dat
      sed -i '/^$/d' .files_to_compile.dat
    fi
done
# Delete files with doesnt inside of index. (New Files) - END

# Delete files with inside of index. (Modified Files who return without changes) - BEGIN
files_M_1=$(git diff --name-only --diff-filter=M --staged src)

i=0
while read line
do
    echo "$line"
    files_M_2[ $i ]="$line"
    (( i++ ))
done < .files_modified.dat

difference_M=$(diff_array files_M_1[@] files_M_2[@])

## shellcheck disable=SC2068
for file in "${difference_M[@]}"; do
echo "1"
echo "${file[@]}"
      (grep -qxF "$file" .files_to_compile.dat || echo "$file" >> .files_to_compile.dat)

      sed -i -e "s|${file}||" .files_modified.dat
      sed -i '/^$/d' .files_modified.dat

done
# Delete files with inside of index. (Modified Files who return without changes) - END
