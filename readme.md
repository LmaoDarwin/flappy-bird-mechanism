I tried to do flappy bird flying mechanism inside of javascript with HTML5 Canvas

Animate:
the animate function is the loop to make the game starts. I use requestAnimationFrame to loop throught the animate(). There is another way to use it with setInterval, mostly has the same usage.
clearRect is called due to "constanly drawing" trhough the canvas. if it's not used, there'll be trails where cube position was.

Controller:
I use speed to change the speed of the cube so it will have "realistic" gravity effect on falldown or jump.
Player can press space to fly up. I prevent double or more space click by using state "fly" and check it with event listener that way the listener know if the space is already pressed or not.

Out of Bound:
Modify it as you wish. In this example it just stop the cube from falling out the canvas, use cancelAnimationFrame() if you wanna stop the game instead of only stopping the cube.

"Realistic" Gravity:
How is it done? Firstly, if we wanna fly the cube we must change the speed to negative and assign it to the y position.

    this.speed = -20
    this.y += this.speed

But what exactly is happening? the speed is -20 the canvas height is getting larger to down side so we use negative numbers to assign a position to get higher. in the code it will move the 'y' position slightly 20px to the up. this will have no falling effect as if it not yet increasing its value. in order to achieve that we must increase the speed slowly.

    this.speed += 0.5

Right here we increment the speed by 0.5, it will increase the value of the speed since the speed is negative. so it will slowly increase the speed untill it gets to 0 and keep going. After the number got to 0 it will keep increased by 0.5 and falling from current position. Voila you have the "realistic" gravity yourself. Just be careful because your cube will go beyond the canvas area since it kept going untill you tell it to stop