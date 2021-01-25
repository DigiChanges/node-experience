#!/bin/bash

dir_files_deleted=.files_deleted.dat
dir_files_to_compile=.files_to_compile.dat
dir_files_modified=.files_modified.dat

if [ ! -f "$dir_files_deleted" ]; then
    touch "$dir_files_deleted"
fi

if [ ! -f "$dir_files_to_compile" ]; then
    touch "$dir_files_to_compile"
fi

if [ ! -f "$dir_files_modified" ]; then
    touch "$dir_files_modified"
fi