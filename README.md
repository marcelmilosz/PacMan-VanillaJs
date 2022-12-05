# PacMan-VanillaJs

This is my little project just for fun to create fully functional PacMan game. 

It took me about 5 days to complete (~4hours per day) and I think It went well.

The main idea was to just chill, ignore all new technology once and just create something with vanilla JS 

Cool thing about this project is that I actually understood the real importance of classes when my code got longer and sometimes it was getting copied to different places

## How it works 🕵🏻
1. This app works on grid that is created in JS and that grid is a single dimension array (21 elements in one row)
2. There is a function 'generateGrid()' that puts specific element depending on current value of grid element to parent element
3. We have eventListener that waits for user input (W, S, A, D)
4. Player has two states: normal and super (super means that we ate super point and have 6 seconds to eat ghosts)
4. Every key press creates interval that moves Player in direction he clicked
5. Player and ghosts are moving as a single separate child element, while we controll their positions in our grid variable that makes sure we are in good position and can or can't move to choosen direction
6. If player eats super-point then he starts to blink for 6 seconds and if any collision with ghost happen, then we got points and we send ghost to base (where he waits and starts moving again)
7. If player eats all the points and super-points, the app will update highest score (if current is higher) and will send player current score to localstorage to then be retrived and used for next game to be shown on screen
8. If ghost -- player collision will happen and player is on state 'normal' then we lose one heart (or game if we don't have more hearts!)

Cool... 

## What could be better 🪲
- The way ghosts 'catch' player is actually a random move that they can do in current position (Yeah.. I could make it more real. Maybe next time!)
- Better animations when player -- ghost interacts with each other
- Audio would be cool 
- JS is not that good to create this kind of apps 😅
- I belive that my approach is not that good. It could be done wayyy cleaner and easier. But now I understand creating 'games' in JS and problems in creating them so my next attempt will be better!

Anyway, I enjoyed this project. Learned some cool things and tricks about JS.

Thats how this game looks like 

## Starting screen
![game](https://user-images.githubusercontent.com/61027817/205605224-757e7d06-440c-4a13-98da-71d9a796270d.png)

## Game over 
![gameover](https://user-images.githubusercontent.com/61027817/205605297-5b490524-3555-47eb-af93-426913b149f9.png)

Back to learning 🔥
