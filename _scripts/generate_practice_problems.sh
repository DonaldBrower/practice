#!/bin/bash

# TO RUN TESTS IN A SINGLE DIR: npm run test -- euler/
# https://stackoverflow.com/questions/49613127/run-jest-tests-only-for-current-folder

# MAKE A SCRIPT EXECUTABLE (?):
# chmod u+x generate_practice_problems.sh

# take in a file/dirname as an argument
if [[ -n $1 ]] ; then
	new_practice_dir=$1
elif [ !$1 ] ; then
        echo "ERROR: please provide a name for this practice problem"
        exit 1
fi

practice_problems_root="$HOME/git/practice-problems"
new_problem_root=$practice_problems_root/$new_practice_dir
templates=$practice_problems_root/_scripts/templates

# create a directory with that name
mkdir -p $new_problem_root

# create a _test dir  
mkdir -p $new_problem_root/_test

# create the main program file
cp "$templates/program.js" "$new_problem_root/$1.js"

# create the test 
cp "$templates/test.js" "$new_problem_root/_test/$1.test.js"

placeholder_export="$1"
placeholder_filename="../$1.js"

# placeholder strings in templates are replaced with their real values
sed -i '' "s/PLACEHOLDER/$placeholder_export/g" "$new_problem_root/_test/$1.test.js" 
sed -i '' "s/PLACEHOLDER/$placeholder_export/g" "$new_problem_root/$1.js"

# open program file and run the test in seperate panes in a new tmux window
tmux new-window "nvim $new_problem_root/$1.js"
tmux split-window "npm run test-watch -- $1"
tmux send-keys "C-a" " "


# open in nvim
# nvim $new_problem_root

# TODO:
 
# support for more than one file or test? 
#
# support for multiple languages?
# 
# nvim is running in the scripts dir. see this by telescope find_files.
