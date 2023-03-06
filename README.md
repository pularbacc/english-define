# english-define
- This app like visual dictionary 
- When user type word it will return define of word, visual image and sentences 

# this code have two path: FE, BE 

# Run

## FE
$ cd FE
$ yarn
$ yarn dev

## BE
$ cd BE
$ yarn
$ yarn dev 

-> Fe will start at port 8002 and BE will start at port 8001

# How it's work 
- When User type word in Fe and enter to search
- Fe will send word for Be
- Be will crawl data from other pages like yahoo, sentences,...
- Be will return result for FE 
- Fe will display result 
